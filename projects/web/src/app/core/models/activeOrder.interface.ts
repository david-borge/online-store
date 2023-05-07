import { OrderInterface } from "./order.interface";
import { ProductInterface } from "./product.interface";

export interface ActiveOrderInterface {

    id               : OrderInterface["id"];
    imageThumbnail   : ProductInterface["imageThumbnail"];
    orderTotal       : number;
    deliveryFullDate : OrderInterface["deliveryFullDate"];
}
