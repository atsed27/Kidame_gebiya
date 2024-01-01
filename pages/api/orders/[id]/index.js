import db from '@/utils/db';
import Order from '@/model/Order';
import { getSession } from 'next-auth/react';

const Handler = async (req, res) => {
  const session = await getSession({ req });
  if (session === null) {
    return res.status(400).json('sign in requierd');
  }
  await db.connect();
  console.log('danie2');
  const order = await Order.findById(req.query.id);
  if (!order) return res.status(404).json('order is not found');
  await db.disconnect();
  console.log(order);
  return res.status(201).json(order);
};

export default Handler;
