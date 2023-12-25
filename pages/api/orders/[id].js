import { unstable_getServerSession } from 'next-auth';
import Nextauth from '../auth/[...nextauth]';
import db from '@/utils/db';
import Order from '@/model/Order';

const Handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, Nextauth);
  if (session === null) {
    return res.status(400).json('sign in requierd');
  }
  await db.connect();

  const order = await Order.findById(req.query.id);
  if (!order) return res.status(404).json('order is not found');
  await db.disconnect();
  return res.status(201).json(order);
};

export default Handler;
