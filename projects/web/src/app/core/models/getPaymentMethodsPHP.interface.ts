import { PaymentMethodInterface } from './paymentMethod.interface';

export interface GetPaymentMethodsPHPInterface {
    paymentMethods: {
        id: PaymentMethodInterface['id'];
        userId: PaymentMethodInterface['userId'];
        type: PaymentMethodInterface['type']; // card (relational en el futuro)
        cardBankName: PaymentMethodInterface['cardBankName'];
        cardPersonFullName: PaymentMethodInterface['cardPersonFullName'];
        cardLastFourNumbers: string;
        cardExpirationMonth: PaymentMethodInterface['cardExpirationMonth'];
        cardExpirationYear: PaymentMethodInterface['cardExpirationYear'];
        cardType: PaymentMethodInterface['cardType']; // VISA / MasterCard
        isDefault: PaymentMethodInterface['isDefault']; // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0
    }[];
}
