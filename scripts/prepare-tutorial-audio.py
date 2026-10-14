"""Generate Taiwan Mandarin narration on macOS and measure scene durations."""
import json
import os
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parent.parent
name = os.environ.get("TUTORIAL", "main")
work = root / "dist" / ("tutorial-work-v2" if name == "main" else "timecode-work")
work.mkdir(parents=True, exist_ok=True)
scenes = json.loads((root / ("store/video/scenes.json" if name == "main" else "store/video/timecode-scenes.json")).read_text())
for scene in scenes:
    script = work / f"{scene['id']}.txt"
    audio = work / f"{scene['id']}.aiff"
    script.write_text(scene["voice"])
    subprocess.run(["say", "-v", "Meijia", "-r", "175", "-f", str(script), "-o", str(audio)], check=True)
    result = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(audio)])
    scene["duration"] = round(float(json.loads(result)["format"]["duration"]) + 0.9, 2)
(work / "timing.json").write_text(json.dumps(scenes, ensure_ascii=False, indent=2) + "\n")
