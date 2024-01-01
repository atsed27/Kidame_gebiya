import Order from '@/model/Order';
import db from '@/utils/db';
import { unstable_getServerSession } from 'next-auth';
import Nextauth from '../../auth/[...nextauth]';
const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, Nextauth);
  if (session === null) {
    console.log('seesion error');
    return res.status(400).json('sign in requierd');
  }
  console.log('adniel4');
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res.status(400).json('order already paid');
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res
      .status(200)
      .json({ message: 'Order paid succusfully', order: paidOrder });
  } else {
    db.disconnect();
    res.status(404).json('order is not found');
  }
};

export default handler;
