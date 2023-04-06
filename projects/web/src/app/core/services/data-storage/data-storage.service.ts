/*

  *** Back-end en Google Firebase (usando Firestore Database) ***
  Web: https://firebase.google.com/
  Consola: https://console.firebase.google.com/
  Documentación: https://firebase.google.com/docs?hl=en
  
  Correo: david.borge.olmedo@gmail.com
  Proyecto en Firebase: https://console.firebase.google.com/u/0/project/online-store-7de9d/
  Google Analytics: "Online Store"

*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';

import { ProductoInterface } from '../../models/producto.interface';

@Injectable({
  providedIn: 'root'  // Injectable permite inyectar un servicio en un servicio. providedIn pone el servicio a disposición de toda la app (solo para Angular 6 o mayor; para Angular 5 o menor, añadir el servicio al providers de AppModule)
})
export class DataStorageService {

  // Colecciones (https://console.firebase.google.com/u/0/project/online-store-7de9d/firestore/data/)
  private productosCollection: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore,
  ) {
    this.productosCollection = collection(this.firestore, 'productos');
  }

  // GET
  getAllProducts() {
    return collectionData(this.productosCollection, {
      // idField: 'id',
    }) as Observable<ProductoInterface[]>;
  }

}
