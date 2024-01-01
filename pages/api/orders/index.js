import { unstable_getServerSession } from 'next-auth';
import Nextauth from '../auth/[...nextauth]';
import User from '@/model/User';
import db from '@/utils/db';
import Order from '@/model/Order';

const Handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, Nextauth);
  console.log(session);
  if (session === null) {
    return res.status(400).json('sign in required');
  }

  await db.connect();
  const userFind = await User.findOne({ email: session.user.email });
  if (!userFind) {
    return res.status(404).json('user is not found');
  }
  const newOrder = new Order({
    ...req.body,
    user: userFind._id,
  });
  const order = await newOrder.save();
  await db.disconnect();
  return res.status(201).json(order);
};

export default Handler;
