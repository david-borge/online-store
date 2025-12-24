/* Cookies Service */
// Fuente: https://github.com/david-borge/javascript (Ejercicios 157 a 166)

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {
    // Crear Cookie
    ponerCookie(nombre: string, valor: string, dias: number) {
        //funci�n sacada de w3schools.com
        var micookie = '';

        if (dias > 0) {
            var d = new Date(); //fecha actual
            d.setTime(d.getTime() + dias * 24 * 60 * 60 * 1000); //le a�ado los d�as indicados como par�metro pasados a milisegundos

            var caduca = 'expires=' + d.toUTCString(); //lo pasamos a UTC para que lo entienda document.cookie
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
        //Si buscamos una cookie que no existe, no saca nada en el alert. Funci�n sacada de w3schools.com
        var resultado = '';
        var buscada = nombre + '='; //para evitar errores por los nombres, le pongo el igual

        var listaCookies = document.cookie.split(';');

        for (var i = 0; i < listaCookies.length; i++) {
            var c = listaCookies[i]; //Cada elemento del array de cookies: nombre de la cookie y car�cter =
            //c valdr� los pares atributo=valor, como calle=mirabel, etc.

            //Se quitan los espacios en blanco que hay despu�s del punto y coma
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            //Se compara los que buscamos con el elemento del array. Si devuelve como �ndice 0 se ha encontrado
            //si c=�coche=opel�, tengo que sacar desde donde he buscado (coche=) hasta el final
            if (c.indexOf(buscada) == 0) {
                resultado = c.substring(buscada.length, c.length);
            }
        }
        return resultado;
    }

    // Borrar Cookie
    eliminarUnaCookie(nombre: string) {
        document.cookie = nombre + '=; max-age=0';
    }
}
