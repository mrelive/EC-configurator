# EC Logo Replacement Status

## ✅ Completed Replacements

All SVG logo files have been replaced with the EC Edition logo:
- `light-wide-1.svg` ✅
- `light-wide-2.svg` ✅
- `light-wide-2-compact.svg` ✅
- `dark-wide-2.svg` ✅
- `dark-wide-2-compact.svg` ✅
- `ec-logo.svg` (new master file) ✅

## 📝 Pending Manual Replacements

The following icon files need to be replaced manually with PNG/ICO versions:
You'll need to export the EC logo SVG to these formats using an image editor.

### Icon Files to Replace:
1. **Application Icons (src/images/):**
   - `bf_icon.icns` (Mac app icon)
   - `bf_icon.ico` (Windows app icon)
   - `bf_icon_128.png` (128x128 icon)
   - `bf_icon_128.psd` (Photoshop source - optional)

2. **PWA Icons (src/images/pwa/):**
   - `favicon.ico` (16x16, 32x32, 48x48)
   - `apple-touch-icon.png` (180x180)
   - `pwa-192-192.png` (192x192)
   - `pwa-512-512.png` (512x512)

3. **Linux Icons (assets/linux/icon/):**
   - `bf_icon_128.png` (128x128 icon)
   - `bf_icon_english_128.png` (128x128 English variant)

4. **Windows Installer Icons (assets/windows/):**
   - `bf_installer.bmp` (installer banner)
   - `bf_installer_icon.ico` (installer icon)
   - `bf_installer_small.bmp` (installer small banner)

5. **Android Icons (assets/android/icon/):** - May be auto-generated
   - Various drawable-*-icon.png files (already present, may need updating)

### Recommendation:
Use an online SVG to PNG/ICO converter or tool like:
- Inkscape (free, can export to PNG and ICO)
- GIMP (free, can create ICO files)
- Online converters: cloudconvert.com, convertio.co

### Source File:
Use `src/images/ec-logo.svg` as the source for all conversions.
