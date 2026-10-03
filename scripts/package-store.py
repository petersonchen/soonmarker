"""Package only extension runtime assets for Chrome Web Store upload."""
import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parent.parent
manifest = json.loads((root / "manifest.json").read_text())
output = root / "dist" / f"soonmarker-{manifest['version']}.zip"
files = [root / name for name in ("manifest.json", "background.js", "LICENSE", "PRIVACY.md")]
for directory in ("content", "icons", "lib", "manage", "popup", "sites"):
    files.extend(p for p in (root / directory).rglob("*")
                 if p.is_file() and p.suffix in (".js", ".css", ".html", ".png", ".svg"))
output.parent.mkdir(exist_ok=True)
with ZipFile(output, "w", ZIP_DEFLATED) as archive:
    for path in sorted(files):
        archive.write(path, path.relative_to(root))
with ZipFile(output) as archive:
    assert archive.testzip() is None
    assert json.loads(archive.read("manifest.json")) == manifest
print(f"Created {output} ({len(files)} files, {output.stat().st_size} bytes)")
