import $api from '../api';
import { OrderResponse } from '../types';

export const getOrder = () => $api.get<OrderResponse>('order');
