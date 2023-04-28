export interface PaymentMethodInterface {

    id                 : number;
    userId             : number;
    type               : string;
    cardBankName       : string;
    cardPersonFullName : string;
    cardnumber         : string;
    cardExpiringMonth  : string;
    cardExpiringYear   : string;
    cardType           : string;
    isDefault          : number;  // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0

}
