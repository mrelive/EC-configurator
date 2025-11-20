# EC EDITION FC CONFIGURATOR

Cross‑platform configuration and management tool for the EC Edition flight controller firmware.

This project is a community fork and rebrand of the original Betaflight Configurator. It removes all Betaflight logos and sponsor branding. The code remains GPL‑3.0 licensed per the upstream project.

## Install

- Windows, macOS, Linux, Android
- Download installers from Releases: https://github.com/mrelive/EC-configurator/releases

Minimum Windows version: Windows 8.

Linux: ensure your user is in the `dialout` group and `libatomic1` is installed.

## Development

Requirements: Node 20.x, Yarn

Commands:

```
yarn install
yarn dev         # start dev server
yarn build       # production build
yarn preview     # serve built app
yarn android:run # build + run on Android
```

The app uses Vite + Vue 3 and ships as a PWA. Android packaging is via Capacitor.

## Documentation & Support

- Project wiki: https://github.com/mrelive/EC-configurator/wiki
- Issue tracker: https://github.com/mrelive/EC-configurator/issues

## Trademarks

“Betaflight” and related logos are trademarks of their respective owners. This fork does not use Betaflight branding or sponsor marks.

## License

GPL‑3.0. See LICENSE.
