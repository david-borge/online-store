import { PaymentMethodInterface } from './paymentMethod.interface';

export interface AddNewCardPHPInterface {
    newCard: {
        id: PaymentMethodInterface['id'];
        type: PaymentMethodInterface['type'];
        cardBankName: PaymentMethodInterface['cardBankName'];
        cardPersonFullName: PaymentMethodInterface['cardPersonFullName'];
        cardNumber: PaymentMethodInterface['cardNumber'];
        cardExpirationMonth: PaymentMethodInterface['cardExpirationMonth'];
        cardExpirationYear: PaymentMethodInterface['cardExpirationYear'];
        cardType: PaymentMethodInterface['cardType'];
    };
}
