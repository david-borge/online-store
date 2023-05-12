import { CartInterface } from "./cart.interface";
import { ProductInterface } from "./product.interface";

export interface GetCartDataPHPInterface {

    resultado: boolean,
    cartData: {
        productId       : ProductInterface["id"];
        productQuantity : CartInterface["productQuantity"];
        name            : ProductInterface["name"];
        price           : ProductInterface["price"];
        imageThumbnail  : ProductInterface["imageThumbnail"];
        imageWidth      : ProductInterface["imageWidth"];
        imageHeight     : ProductInterface["imageHeight"];
    }[]

}
