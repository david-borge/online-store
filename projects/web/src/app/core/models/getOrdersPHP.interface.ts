import { OrderInterface } from "./order.interface";
import { ProductInterface } from "./product.interface";

export interface GetOrdersPHPInterface {

    orders: {
        id               : OrderInterface["id"];
        imageThumbnail   : ProductInterface["imageThumbnail"];
        imageWidth       : ProductInterface["imageWidth"];
        imageHeight      : ProductInterface["imageHeight"];
        orderTotal       : number;
        deliveryFullDate : OrderInterface["deliveryFullDate"];
        active           : OrderInterface["active"];
    }[]

}
