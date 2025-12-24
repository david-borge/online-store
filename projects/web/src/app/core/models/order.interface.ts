export interface OrderInterface {
    id: number;
    userId: number;
    orderFullDate: string;
    deliveryFullDate: string;
    addressId: number;
    paymentMethodId: number;
    active: number; // En MySQL no hay tipo Boolean, sino TINIINT, con valores 1 y 0. Por defecto: 1 (activa, es decir, no entregada todavía, not delivered)
}
