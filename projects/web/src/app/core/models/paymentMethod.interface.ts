export interface PaymentMethodInterface {
    id: number;
    userId: number;
    type: 'card'; // card (relational en el futuro)
    cardBankName:
        | 'Bank of America'
        | 'Goldman Sachs'
        | 'Citigroup'
        | 'Wells Fargo'
        | 'Capital One Financial'; // Aleatorio
    cardPersonFullName: string;
    cardNumber: string;
    cardExpirationMonth: string;
    cardExpirationYear: string;
    cardType: 'visa' | 'mastercard'; // VISA / MasterCard
    isDefault: number; // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0
}
