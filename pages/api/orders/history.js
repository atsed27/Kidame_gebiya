import Order from '@/model/Order';
import db from '@/utils/db';

const { getSession } = require('next-auth/react');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json('sign in is required');
    }
    const { user } = session;
    await db.connect();
    const orders = await Order.find({ user: user._id });
    if (!orders) return res.status(404).json('order is not found');
    db.disconnect();
    res.status(200).json(orders);
  }
};

export default handler;
