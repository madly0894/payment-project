import * as yup from 'yup';
import { FC, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputMask } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';
import { FieldError } from 'react-hook-form/dist/types';
import { Card } from 'primereact/card';
import { useParams } from 'react-router-dom';
import { paymentOrder } from '../endpoints/paymentOrder';
import { ErrorResponse, Form } from '../types';

const validationSchema = yup.object().shape({
   card_number: yup
      .string()
      .required('Номер карты является обязательным полем')
      .min(16, 'Номер карты должен состоять не менее чем из 16 символов')
      .max(16, 'Номер карты должен состоять не более чем из 16 символов'),
   card_expires_date: yup.string().required('Срок действия карты является обязательным полем'),
   card_cvv: yup
      .string()
      .required('CVV карты является обязательным полем')
      .min(3, 'CVV карты должен состоять не менее чем из 3 символов')
      .max(3, 'CVV карты должен состоять не более чем из 3 символов'),
   cardholder_name: yup.string().required('Имя карты является обязательным полем'),
});

const traverse = (error: any, values: any[] = []) => {
   for (const key in error) {
      if (typeof error[key] === 'object' && error[key] !== null) {
         values = values.concat(traverse(error[key]));
      } else {
         values.push(<li key={error[key]}>{error[key]}</li>);
      }
   }
   return values;
};

const getFormErrorMessage = (fieldError?: FieldError) => {
   return fieldError ? <p className={classNames({ 'p-error': fieldError?.message })}>{fieldError.message}</p> : null;
};

const PaymentPage: FC = () => {
   const { orderId } = useParams<string>();
   const toast = useRef<Toast>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const { control, handleSubmit } = useForm<Form>({
      defaultValues: {
         card_number: '',
         card_expires_date: '',
         card_cvv: '',
         cardholder_name: '',
      },
      resolver: yupResolver(validationSchema),
   });

   const onSubmitForm = (validateValues: Form) => {
      setIsLoading(true);

      paymentOrder({
         order_id: +orderId!,
         ...validateValues,
      })
         .then(
            ({ data }) =>
               toast.current?.show({
                  severity: data.status,
                  detail: data.message,
                  life: 3000,
               }),
         )
         .catch(
            (err: AxiosError<ErrorResponse>) =>
               toast.current?.show({
                  severity: 'error',
                  detail: traverse(err.response?.data?.errors) ?? err.message,
                  life: 3000,
               }),
         )
         .finally(() => setIsLoading(false));
   };

   return (
      <Card
         title='Введите платежные реквизиты'
         footer={
            <Button loading={isLoading} onClick={handleSubmit(onSubmitForm)}>
               Оплатить
            </Button>
         }
         className='payment'
      >
         <Toast ref={toast} />

         <Controller
            name='card_number'
            control={control}
            render={({ field, fieldState }) => (
               <div className='form-group'>
                  <InputText
                     {...field}
                     id='pint'
                     keyfilter='pint'
                     maxLength={16}
                     className={classNames({ 'p-invalid': fieldState.error })}
                     placeholder='Номер карты'
                  />
                  {getFormErrorMessage(fieldState.error)}
               </div>
            )}
         />
         <div className='middle-block'>
            <Controller
               name='card_expires_date'
               control={control}
               render={({ field, fieldState }) => (
                  <div className='form-group'>
                     <InputMask
                        {...field}
                        className={classNames({ 'p-invalid': fieldState.error })}
                        mask='99/99'
                        placeholder='Срок действия'
                     />
                     {getFormErrorMessage(fieldState.error)}
                  </div>
               )}
            />
            <Controller
               name='card_cvv'
               control={control}
               render={({ field, fieldState }) => (
                  <div className='form-group'>
                     <InputText
                        {...field}
                        id='pint'
                        keyfilter='pint'
                        maxLength={3}
                        className={classNames({ 'p-invalid': fieldState.error })}
                        placeholder='CVV'
                     />
                     {getFormErrorMessage(fieldState.error)}
                  </div>
               )}
            />
         </div>
         <Controller
            name='cardholder_name'
            control={control}
            render={({ field, fieldState }) => (
               <div className='form-group'>
                  <InputText {...field} className={classNames({ 'p-invalid': fieldState.error })} placeholder='ФИО' />
                  {getFormErrorMessage(fieldState.error)}
               </div>
            )}
         />
      </Card>
   );
};

export default PaymentPage;
