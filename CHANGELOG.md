Changelog
=========

## 0.3.0

### Features

- Added wallet creation screen that appears when there is no wallet yet

- Updated to the latest design specs and refactor to 
[react-toolbox](http://react-toolbox.com/) instead of
material-ui for the UI components. This gives us much better style 
customization and theming options.

- Cleaned up the boilerplate app menus

- Added basic form validations using [mobx-react-form](https://github.com/foxhound87/mobx-react-form)

- Added i18n support with [react-intl](https://github.com/yahoo/react-intl)

- Added wallet send / receive / transactions screens

### Fixes

- Fixed problems with the form validations

- Fixed the electron build process & ensured that it worked

### Chore

- Updated to react-router v4

- Testing setup with cucumber & spectron