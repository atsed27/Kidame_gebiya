import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { getError } from '@/utils/error';
import Link from 'next/link';
import Image from 'next/image';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FILER':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderScreen() {
  const { query } = useRouter();
  const orderId = query.id;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    order: {},
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'FETCH_FILER', payload: getError(error) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order._id, orderId]);

  const {
    shippingAddress,
    orderItems,
    isDelivered,
    paymentMethod,
    deliveredAt,
    isPaid,
    paidAt,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = order;

  return (
    <Layout title={'order'}>
      <h1 className="mb-4 text text-xl">Order {orderId} </h1>
      {loading ? (
        <div>Loading ...</div>
      ) : error ? (
        <div className="my-3 rounded-lg bg-red-100 p-3 text-red-500">
          {error}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-xl">Shipping Address</h2>
              <div>
                {shippingAddress?.fullName},{shippingAddress?.address},
                {shippingAddress?.city},{shippingAddress?.postalCode},
                {shippingAddress?.country},
              </div>
              <div>
                {isDelivered ? (
                  <div className="my-3 rounded-lg bg-green-100 p-3 text-green-500">
                    Delivered {deliveredAt}{' '}
                  </div>
                ) : (
                  <div className="my-3 rounded-lg bg-red-100 p-3 text-red-500">
                    Not Delivered
                  </div>
                )}
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-xl">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                {isPaid ? (
                  <div className="my-3 rounded-lg bg-green-100 p-3 text-green-500">
                    Paid at {paidAt}
                  </div>
                ) : (
                  <div className="my-3 rounded-lg bg-red-100 p-3 text-red-500">
                    Not Paid
                  </div>
                )}
              </div>
            </div>
            <div className="card p-5 overflow-x-auto">
              <h2 className="mb-2 text-xl">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr className="border-b" key={item._id}>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={'da'}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="block mb-5 border border-gray-200 rounded-lg shadow-md  p-5">
              <h2 className="mb-2 text-xl">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div> ${itemsPrice} </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div> ${taxPrice} </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div> ${shippingPrice} </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div> ${totalPrice} </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
