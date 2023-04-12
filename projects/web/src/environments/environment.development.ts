/**** Archivo de configuración de desarrollo ****/
// Angular usa environment.ts para desarrollo y environment.prod.ts para producción automáticamente.




// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    // Configuración de desarrollo

    // API Base URL
    apiBaseUrl: 'https://davidborge.com/pruebas/online-store-backend',

    // (Antiguo) Firestore Database
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    /* firebaseConfig: {
        apiKey: "AIzaSyDm_T6ppByPdLdVgi6865FuYJviIfrZ27I",
        authDomain: "online-store-7de9d.firebaseapp.com",
        databaseURL: "https://online-store-7de9d-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "online-store-7de9d",
        storageBucket: "online-store-7de9d.appspot.com",
        messagingSenderId: "167104200640",
        appId: "1:167104200640:web:4b98dbf0f1b3674ac2d225",
        measurementId: "G-CRTF83N67K"
    } */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
