/**** Archivo de configuración de producción ****/
// Angular usa environment.ts para desarrollo y environment.prod.ts para producción automáticamente.




export const environment = {
    production: true,
  
    // Configuración de producción
    
    // API URL
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
