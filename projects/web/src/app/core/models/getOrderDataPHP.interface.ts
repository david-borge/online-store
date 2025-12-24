import { OrderInterface } from './order.interface';
import { ProductInterface } from './product.interface';
import { OrderProductInterface } from './orderProduct.interface';
import { AddressInterface } from './address.interface';
import { CountryInterface } from './country.interface';
import { PaymentMethodInterface } from './paymentMethod.interface';

export interface GetOrderDataPHPInterface {
    resultado: boolean;
    orderData: {
        orderFullDate: OrderInterface['orderFullDate'];
        deliveryFullDate: OrderInterface['deliveryFullDate'];
        orderTotal: number;
    };
    orderProducts: {
        imageThumbnail: ProductInterface['imageThumbnail'];
        name: ProductInterface['name'];
        price: ProductInterface['price'];
        productQuantity: OrderProductInterface['productQuantity'];
    }[];
    orderAddress: {
        id: AddressInterface['id'];
        fullName: AddressInterface['fullName'];
        address: AddressInterface['address'];
        postalCode: AddressInterface['postalCode'];
        city: AddressInterface['city'];
        country: CountryInterface['name'];
    };
    orderPaymentMethod: {
        id: PaymentMethodInterface['id'];
        type: PaymentMethodInterface['type'];
        cardBankName: PaymentMethodInterface['cardBankName'];
        cardPersonFullName: PaymentMethodInterface['cardPersonFullName'];
        cardLastFourNumbers: string;
        cardExpirationMonth: PaymentMethodInterface['cardExpirationMonth'];
        cardExpirationYear: PaymentMethodInterface['cardExpirationYear'];
        cardType: PaymentMethodInterface['cardType'];
    };
}
