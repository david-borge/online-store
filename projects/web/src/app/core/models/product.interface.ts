export interface ProductInterface {

    slug                         : string;
    name                         : string;
    manufacturer                 : string;
    price                        : number;
    descripcion                  : string;
    category                     : string;
    imageThumbnail               : string;
    imageFull                    : string;
    reviews                      : string;
    cardAndHeaderBackgroundColor : string;
    deal                         : boolean;
    featured                     : boolean;

    // nombreMetodo: (param1, param2) => tipoDeDatoQueDevuelveElMétodo;
    // greet: () => void;

}
