import { AddressInterface } from './address.interface';

export interface AddNewAddressPHPInterface {
    newAddress: {
        id: AddressInterface['id'];
        fullName: AddressInterface['fullName'];
        address: AddressInterface['address'];
        postalCode: AddressInterface['postalCode'];
        city: AddressInterface['city'];
        countryId: AddressInterface['countryId'];
    };
}
