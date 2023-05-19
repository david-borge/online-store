import { AddressInterface } from "./address.interface";

export interface GetAddressesPHPInterface {

    addresses: {
        id         : AddressInterface["id"];
        fullName   : AddressInterface["fullName"];
        address    : AddressInterface["address"];
        postalCode : AddressInterface["postalCode"];
        city       : AddressInterface["city"];
        country    : string;
        isDefault  : AddressInterface["isDefault"];
    }[]

}
