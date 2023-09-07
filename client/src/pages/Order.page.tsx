import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ErrorResponse, OrderResponse } from '../types';
import { AxiosError } from 'axios';
import { getOrder } from '../endpoints/getOrder';

const OrderPage: FC = () => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [errorMessage, setErrorMessage] = useState<string>('');
   const [orderInfo, setOrderInfo] = useState<OrderResponse | null>(null);

   useEffect(() => {
      getOrder()
         .then(({ data }) => setOrderInfo(data))
         .catch((err: AxiosError<ErrorResponse>) => setErrorMessage(err.response?.data?.message ?? err.message))
         .finally(() => setIsLoading(false));
   }, []);

   if (isLoading) {
      return <ProgressSpinner aria-label='Loading' />;
   }

   if (!!errorMessage) {
      return <h2>{errorMessage}</h2>;
   }

   return (
      <Card
         title={orderInfo?.fullname}
         subTitle={orderInfo?.service}
         footer={<Button onClick={() => navigate(`/payment/order/${orderInfo?.id}`)}>Оплатить</Button>}
         className='order'
      >
         <h3>{orderInfo?.price} грн</h3>
      </Card>
   );
};

export default OrderPage;
