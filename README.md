# Online Store

<!--
    TODO: fix SSR for dinamic content (loaded by HTTP Request, like a Product info)
        This is a BIG refactor, since, according to GPT:
            1 Use Angular Universal: Your project already has SSR setup (main.server.ts, server.ts).
            2 Fetch Data in Resolvers or Services: Use Angular’s HttpClient in services or route resolvers.
            3 Use TransferState: To avoid duplicate HTTP requests on the client, use Angular’s TransferState to transfer fetched data from server to client.
            4 Example Flow:
                1 On the server, fetch data in a resolver/service.
                2 Store the result in TransferState.
                3 On the client, check TransferState first before making an HTTP request.
    TODO: remove NgModules and turn all components to standalone
        TODO: make standalone components an error again (instead of a warning) (in eslint.config.js, delete "'@angular-eslint/prefer-standalone': 'warn',")
    TODO: remove vertical scrolling in initial loading screen (appears during animations)
    TODO: take cookies service from a library i create or find one (projects\web\src\app\core\services\cookies\cookies.service.ts)
    TODO: add Lint to backend (does it work with PHP?)
    TODO: in the future, change backend to Node.js
    TODO: move backend to online-store-backend.davidborge.com (hosted in Ionos)
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

## Automatic Deployment to Firebase App Hosting

It its deployed automatically when committing to master by Firebase App Hosting itself (it is integrated automatically with GitHub, so there is NO need for GitHub Actions).
