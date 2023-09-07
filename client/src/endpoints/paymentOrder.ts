import $api from '../api';
import { PaymentOrderRequest, SuccessStatusResponse } from '../types';

export const paymentOrder = (body: PaymentOrderRequest) => $api.post<SuccessStatusResponse>('payment/order', body);
