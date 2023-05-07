import { OrderInterface } from "./order.interface";
import { ProductInterface } from "./product.interface";
import { OrderProductInterface } from "./orderProduct.interface";
import { AddressInterface } from "./address.interface";
import { CountryInterface } from "./country.interface";
import { PaymentMethodInterface } from "./paymentMethod.interface";

export interface GetOrderDataPHPInterface {

    resultado: boolean;
    orderData: {
        orderFullDate    : OrderInterface["orderFullDate"],
        deliveryFullDate : OrderInterface["deliveryFullDate"],
        orderTotal       : number,
    },
    orderProducts: {
        imageThumbnail  : ProductInterface["imageThumbnail"],
        name            : ProductInterface["name"],
        price           : ProductInterface["price"],
        productQuantity : OrderProductInterface["productQuantity"],
    }[],
    orderAddress: {
        fullName   : AddressInterface["fullName"],
        address    : AddressInterface["address"],
        postalCode : AddressInterface["postalCode"],
        city       : AddressInterface["city"],
        country    : CountryInterface["name"],
    },
    orderPaymentMethod: {
        type                : PaymentMethodInterface["type"],
        cardBankName        : PaymentMethodInterface["cardBankName"],
        cardPersonFullName  : PaymentMethodInterface["cardPersonFullName"],
        cardLastFourNumbers : string,
        cardExpiringMonth   : PaymentMethodInterface["cardExpiringMonth"],
        cardExpiringYear    : PaymentMethodInterface["cardExpiringYear"],
        cardType            : PaymentMethodInterface["cardType"],
    }
}
