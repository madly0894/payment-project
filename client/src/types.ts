import { ToastMessage } from 'primereact/toast';

export interface PaymentOrderRequest {
   order_id: number;
   card_number: string;
   card_expires_date: string;
   card_cvv: string;
   cardholder_name: string;
}

export interface Form extends Omit<PaymentOrderRequest, 'order_id'> {}

export interface OrderResponse {
   id: number;
   fullname: string;
   service: string;
   price: number;
}

export interface SuccessStatusResponse {
   message: string;
   status: ToastMessage['severity'];
}

export interface ErrorResponse {
   message: string;
   errors: Form;
}
