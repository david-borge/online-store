/*

  *** Back-end con base de datos relacional (MySQL en Ionos) ***
  Entrar en: https://login.ionos.es/
  Correo: david.borge.olmedo@gmail.com
  Datos de la API: https://docs.google.com/document/d/1QQ8aXD48xA9Iu7Uhvps1r2fUzNcRCpd5X_n41F0AiPU/edit?usp=sharing

*/

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'projects/web/src/environments/environment.development';

import { ProductInterface } from '../../models/product.interface';
import { CategoryInterface } from '../../models/category.interface';
import { UserInterface } from '../../models/user.interface';
import { CountryInterface } from '../../models/country.interface';
import { AddressInterface } from '../../models/address.interface';
import { GetOrderDataPHPInterface } from '../../models/getOrderDataPHP.interface';
import { GetOrdersPHPInterface } from '../../models/getOrdersPHP.interface';
import { GetAddressesPHPInterface } from '../../models/getAddressesPHP.interface';
import { GetPaymentMethodsPHPInterface } from '../../models/getPaymentMethodsPHP.interface';
import { PaymentMethodInterface } from '../../models/paymentMethod.interface';
import { GetCartDataPHPInterface } from '../../models/GetCartDataPHP.interface';
import { CartInterface } from '../../models/cart.interface';

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
  getAllProductsHttpRequest() {

    return this.httpClient
      .get<ProductInterface[]>(environment.apiBaseUrl + '/getAllProducts.php', {})
      // .pipe()
      ;

  }



  // Get all Categories
  getAllCategoriesHttpRequest() {

    return this.httpClient
      .get<CategoryInterface[]>(environment.apiBaseUrl + '/getAllCategories.php', {})
      // .pipe()
      ;

  }



  // Sign Up
  signUp(firstName: string, lastName: string, email: string, password: string, signUpFullDate: string, lastLoginFullDate: string, token: string) {

    // Comprobación
    // console.log("DataStorageService > signUp(): " + firstName + ", " + lastName + ", " + email + ", " + password + ", " + signUpFullDate + ", " + lastLoginFullDate);

    return this.httpClient
      .post<UserInterface | any>(environment.apiBaseUrl + '/signup.php', // El any es para cubrirme las espaldas por si la API devuelve un mensaje de error como: {resultado: "SQLSTATE[23000]: Integrity constraint violation: 1…ry 'hewemim@mailinator.com' for key 'users.email'"}
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        signUpFullDate: signUpFullDate,
        lastLoginFullDate: lastLoginFullDate,
        token: token,
      },
      {})
      // .pipe()
      ;

  }



  // Log In
  logIn(email: string, password: string, lastLoginFullDate: string, token: string) {
    
    // Comprobación
    // console.log("DataStorageService > signUp(): " + firstName + ", " + lastName + ", " + email + ", " + password + ", " + signUpFullDate + ", " + lastLoginFullDate);

    return this.httpClient
      .post<UserInterface | any>(environment.apiBaseUrl + '/login.php', // El any es para cubrirme las espaldas por si la API devuelve un mensaje de error como: {resultado: "SQLSTATE[23000]: Integrity constraint violation: 1…ry 'hewemim@mailinator.com' for key 'users.email'"}
      {
        email: email,
        password: password,
        lastLoginFullDate: lastLoginFullDate,
        token: token,
      },
      {})
      // .pipe()
      ;

  }



  // Get Order data (Page: /order/:order-number)
  getOrderDataHttpRequest(orderNumber: number) {
    return this.httpClient
      .post<GetOrderDataPHPInterface>(environment.apiBaseUrl + '/getOrderData.php',
      {
        orderNumber: orderNumber,
      },
      {})
      // .pipe()
      ;
  }



  // Get Orders (Page: /orders)
  getOrdersHttpRequest(email: string) {
    return this.httpClient
      .post<GetOrdersPHPInterface>(environment.apiBaseUrl + '/getOrders.php',
      {
        email: email,
      },
      {})
      // .pipe()
      ;
  }



  // Get Addresses (Page: /addresses)
  getAddressesHttpRequest(email: string) {
    return this.httpClient
      .post<GetAddressesPHPInterface>(environment.apiBaseUrl + '/getAddresses.php',
      {
        email: email,
      },
      {})
      // .pipe()
      ;
  }



  // Get Payment Methods (Page: /payment-methods)
  getPaymentMethodsHttpRequest(email: string) {
    return this.httpClient
      .post<GetPaymentMethodsPHPInterface>(environment.apiBaseUrl + '/getPaymentMethods.php',
      {
        email: email,
      },
      {})
      // .pipe()
      ;
  }



  // Get All Countries
  getAllCountriesHttpRequest() {

    return this.httpClient
      .get<CountryInterface[]>(environment.apiBaseUrl + '/getAllCountries.php', {})
      // .pipe()
      ;
      
  }



  // Add New Address
  addNewAddressHttpRequest(
    newAddress: {
      fullName   : AddressInterface["fullName"],
      address    : AddressInterface["address"],
      postalCode : AddressInterface["postalCode"],
      city       : AddressInterface["city"],
      countryId  : AddressInterface["countryId"],
    },
    authToken: string,
  ) {

    // Comprobación
    // console.log("DataStorageService > signUp(): " + firstName + ", " + lastName + ", " + email + ", " + password + ", " + signUpFullDate + ", " + lastLoginFullDate);

    return this.httpClient
      .post<any>(environment.apiBaseUrl + '/addNewAddress.php', // El any es para cubrirme las espaldas por si la API devuelve un mensaje de error como: {resultado: "SQLSTATE[23000]: Integrity constraint violation: 1…ry 'hewemim@mailinator.com' for key 'users.email'"}
      {
        newAddress: newAddress,
        authToken: authToken,
      },
      {})
      // .pipe()
      ;

  }



  // Add New Card
  addNewCardHttpRequest(
    newCard: {
      type                : PaymentMethodInterface["type"],
      cardBankName        : PaymentMethodInterface["cardBankName"],
      cardPersonFullName  : PaymentMethodInterface["cardPersonFullName"],
      cardNumber          : PaymentMethodInterface["cardNumber"],
      cardExpirationMonth : PaymentMethodInterface["cardExpirationMonth"],
      cardExpirationYear  : PaymentMethodInterface["cardExpirationYear"],
      cardType            : PaymentMethodInterface["cardType"],
    },
    authToken: string,
  ) {

    // Comprobación
    // console.log("DataStorageService > signUp(): " + firstName + ", " + lastName + ", " + email + ", " + password + ", " + signUpFullDate + ", " + lastLoginFullDate);

    return this.httpClient
      .post<any>(environment.apiBaseUrl + '/addNewCard.php', // El any es para cubrirme las espaldas por si la API devuelve un mensaje de error como: {resultado: "SQLSTATE[23000]: Integrity constraint violation: 1…ry 'hewemim@mailinator.com' for key 'users.email'"}
      {
        newCard: newCard,
        authToken: authToken,
      },
      {})
      // .pipe()
      ;

  }



  // Get Cart Data (Page: /cart)
  getCartDataHttpRequest(authToken: string) {

    return this.httpClient
      .post<GetCartDataPHPInterface["cartData"]>(environment.apiBaseUrl + '/getCartData.php',
      {
        authToken: authToken,
      },
      {})
      // .pipe()
      ;
      
  }



  // Get Cart Data (Page: /cart)
  updateProductQuantityHttpRequest(authToken: string, productId: ProductInterface["id"], productQuantity: CartInterface["productQuantity"]) {

    return this.httpClient
      .post<boolean>(environment.apiBaseUrl + '/updateProductQuantity.php',
      {
        authToken      : authToken,
        productId      : productId,
        productQuantity: productQuantity,
      },
      {})
      // .pipe()
      ;
      
  }



  // Delete Product From Cart (Page: /cart)
  deleteProductFromCartHttpRequest(authToken: string, productId: ProductInterface["id"]) {

    return this.httpClient
      .post<boolean>(environment.apiBaseUrl + '/deleteProductFromCart.php',
      {
        authToken: authToken,
        productId: productId,
      },
      {})
      // .pipe()
      ;
      
  }



  // Add Product To Cart (Page: /product/:product-slug)
  addProductToCartHttpRequest(authToken: string, productSlug: ProductInterface["slug"]) {

    return this.httpClient
      .post<GetCartDataPHPInterface["cartData"][0]>(environment.apiBaseUrl + '/addProductToCart.php',
      {
        authToken: authToken,
        productSlug: productSlug,
      },
      {})
      // .pipe()
      ;
      
  }



  authMessages(messageCode: string): string {

    switch (messageCode) {

      case 'GET_ORDER_DATA_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD': // Ver https://github.com/david-borge/online-store-backend > getOrderData.php > Línea: exit("GET_ORDER_DATA_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD");
        return 'The Log In API didn\'t recieve its payload.';
      
      case 'GET_ORDER_DATA_ERROR_GET_ORDER_DATA_FAILED': // Ver https://github.com/david-borge/online-store-backend > getOrderData.php > Línea: "resultado" => 'GET_ORDER_DATA_ERROR_GET_ORDER_DATA_FAILED',
        return 'There was an error recovering the Order data.';
    
      default:
        return '';

    }

  }

  // (No usado) Get Featured Products
  /* getFeaturedProducts() {
    return this.getAllProductsHttpRequest()
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
    return this.getAllProductsHttpRequest()
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


  
  /* // (Antiguo) Firestore Database
  // Colecciones (https://console.firebase.google.com/u/0/project/online-store-7de9d/firestore/data/)
  private productosCollection: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore,
  ) {
    this.productosCollection = collection(this.firestore, 'productos');
  }

  // GET
  getAllProductsHttpRequest() {
    return collectionData(this.productosCollection, {
      // idField: 'id',
    }) as Observable<ProductInterface[]>;
  } */

}
