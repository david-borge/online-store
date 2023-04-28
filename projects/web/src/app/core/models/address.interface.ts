export interface AddressInterface {

    id         : number;
    userId     : number;
    fullName   : string;
    address    : string;
    postalCode : string;
    city       : string;
    countryId  : number;
    isDefault  : number;  // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0

}
