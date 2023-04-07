/*

  *** Back-end con base de datos relacional (MySQL en Ionos) ***
  Entrar en: https://login.ionos.es/
  Correo: david.borge.olmedo@gmail.com
  Datos de la API: https://docs.google.com/document/d/1QQ8aXD48xA9Iu7Uhvps1r2fUzNcRCpd5X_n41F0AiPU/edit?usp=sharing

*/

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ProductInterface } from '../../models/product.interface';
import { CategoryInterface } from '../../models/category.interface';

import { environment } from 'projects/web/src/environments/environment.development';

// (Antiguo) Firestore Database
// import { Firestore, collectionData, docData } from '@angular/fire/firestore';
// import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'  // Injectable permite inyectar un servicio en un servicio. providedIn pone el servicio a disposición de toda la app (solo para Angular 6 o mayor; para Angular 5 o menor, añadir el servicio al providers de AppModule)
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient
  ) {}

  // Get all Products
  getAllProducts() {
    return this.httpClient
      .get<ProductInterface[]>(environment.apiBaseUrl + '/getAllProducts.php', {})
      // .pipe()
      ;
  }

  // (No usado) Get Featured Products
  /* getFeaturedProducts() {
    return this.getAllProducts()
    .pipe(

        map(
          // Todos los productos
          ( allProducts: ProductInterface[] ) => {

            // Filtro todos los productos
            return allProducts.filter(

              // Cada producto
              ( product: ProductInterface ) => {

                // Criterio para mostrar o no cada producto
                return (product.featured == 1);

              }

            );

          }

        )
        
    );
  } */

  // (No usado) Get Deal Products
  /* getDealProducts() {
    return this.getAllProducts()
    .pipe(

        map(
          // Todos los productos
          ( allProducts: ProductInterface[] ) => {

            // Filtro todos los productos
            return allProducts.filter(

              // Cada producto
              ( product: ProductInterface ) => {

                // Criterio para mostrar o no cada producto
                return (product.deal == 1);

              }

            );

          }

        )
        
    );
  } */

  // Get all Categories
  getAllCategories() {
    return this.httpClient
      .get<CategoryInterface[]>(environment.apiBaseUrl + '/getAllCategories.php', {})
      // .pipe()
      ;
  }



  /* // (Antiguo) Firestore Database
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
    }) as Observable<ProductInterface[]>;
  } */

}
