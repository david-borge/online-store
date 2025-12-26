/* Cookies Service */
// Fuente: https://github.com/david-borge/javascript (Ejercicios 157 a 166)

import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {
    private platformId = inject(PLATFORM_ID);

    // Crear Cookie
    ponerCookie(nombre: string, valor: string, dias: number) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        //funci�n sacada de w3schools.com
        let micookie = '';

        if (dias > 0) {
            const d = new Date(); //fecha actual
            d.setTime(d.getTime() + dias * 24 * 60 * 60 * 1000); //le a�ado los d�as indicados como par�metro pasados a milisegundos

            const caduca = 'expires=' + d.toUTCString(); //lo pasamos a UTC para que lo entienda document.cookie
            //Si no pusi�semos tiempo de expiraci�n, la cookie se borrar�a al cerrar el navegador

            micookie = nombre + '=' + valor + ';' + caduca;
        } else {
            micookie = nombre + '=' + valor;
        }

        document.cookie = micookie; //sobreescribe el valor anterior si la cookie ya existe
    }
    //Podr�amos a�adir la ruta como cuarto par�metro, indicar�a en qu� partes del servidor es v�lida la cookie. Si no lo ponemos, por defecto la ruta ser� el archivo (HTML o PHP) que ha creado el archivo.

    // Leer valor de una Cookie
    leerUnaCookie(nombre: string) {
        if (!isPlatformBrowser(this.platformId)) {
            return '';
        }
        //Si buscamos una cookie que no existe, no saca nada en el alert. Funci�n sacada de w3schools.com
        let resultado = '';
        const buscada = nombre + '='; //para evitar errores por los nombres, le pongo el igual

        const listaCookies = document.cookie.split(';');

        for (let cookie of listaCookies) {
            //Cada elemento del array de cookies: nombre de la cookie y carácter =
            //c valdrá los pares atributo=valor, como calle=mirabel, etc.

            //Se quitan los espacios en blanco que hay despu�s del punto y coma
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }

            //Se compara los que buscamos con el elemento del array. Si devuelve como �ndice 0 se ha encontrado
            //si c=�coche=opel�, tengo que sacar desde donde he buscado (coche=) hasta el final
            if (cookie.indexOf(buscada) == 0) {
                resultado = cookie.substring(buscada.length, cookie.length);
            }
        }
        return resultado;
    }

    // Borrar Cookie
    eliminarUnaCookie(nombre: string) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        document.cookie = nombre + '=; max-age=0';
    }
}
