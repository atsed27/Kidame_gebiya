import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Payment() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      return toast.error('payment method not selected');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPayment });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPayment,
      })
    );
    router.push('/placeOrder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPayment(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="payment">
      <CheckoutWizard activeStep={2} />
      <form className="max-w-md m-auto" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['paypal', 'Stripe', 'Chapa', 'SantimPay', 'CashOnDelivery'].map(
          (payment) => (
            <div className="mb-4" key={payment}>
              <input
                id={payment}
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0"
                type="radio"
                checked={selectedPayment === payment}
                onChange={() => setSelectedPayment(payment)}
              />
              <label htmlFor={payment} className="p-2">
                {payment}
              </label>
            </div>
          )
        )}
        <div className="flex justify-between my-4">
          <button
            onClick={() => router.push('/shipping')}
            className="default-button"
            type="button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

export default Payment;
