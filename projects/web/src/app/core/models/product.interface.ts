export interface ProductInterface {

    slug                         : string;
    name                         : string;
    manufacturer                 : string;
    price                        : number;
    descripcion                  : string;
    category                     : string;
    imageThumbnail               : string;
    imageFull                    : string;
    imageWidth                   : string;
    imageHeight                  : string;
    ratingNumber                 : number;
    cardAndHeaderBackgroundColor : string;
    featured                     : number;  // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0
    deal                         : number;  // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0

}
