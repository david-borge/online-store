# Online Store

<!--
    TODO: fix SSR for some content (is it because there are still NgModules?)
    TODO: resolve HTTP warning in terminal when running ng serve
    TODO: Use built-in control flow (@if) instead of directive ngIf
        Try ng generate @angular/core:control-flow-codemod BUT check the results, as not all cases may be perfectly migrated and manual adjustments may still be needed.
    TODO: check layout of header.component.html > "Step x of x"
    TODO: delete Github workflow config file (.github\workflows\deploy-to-ionos.yaml)
    TODO: delete Github config in the repo (if any)
    TODO: configure modern SSR
    TODO: upload to Firebase App Hosting (supports SSR)
    TODO: check new firebase.json config after uploading
    TODO: in Firebase App Hosting, connect the subdomain (it is liked in my CVs)
    TODO: delete from Ionos hosting
    TODO: remove NgModules and turn all components to standalone
        TODO: make standalone components an error again (instead of a warning) (in eslint.config.js, delete "'@angular-eslint/prefer-standalone': 'warn',")
    TODO: in the future, change backend to Node.js
    TODO: remove vertical scrolling in initial loading screen (appears during animations)
    TODO: take cookies service from a library i create or find one (projects\web\src\app\core\services\cookies\cookies.service.ts)
    TODO: CI with GitHub Actions
    TODO: add Lint to backend (does it work with PHP?)
-->

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
