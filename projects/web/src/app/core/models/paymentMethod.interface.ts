export interface PaymentMethodInterface {

    id                 : number;
    userId             : number;
    type               : 'card'; // card (relational en el futuro)
    cardBankName       : string;
    cardPersonFullName : string;
    cardnumber         : string;
    cardExpiringMonth  : string;
    cardExpiringYear   : string;
    cardType           : 'visa' | 'mastercard'; // VISA / MasterCard
    isDefault          : number;  // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0

}
