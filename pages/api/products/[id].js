import Products from '@/model/Product';
import db from '@/utils/db';

const handler = async (req, res) => {
  await db.connect();
  const product = await Products.findById(req.query.id);
  await db.disconnect();
  res.json(product);
};

export default handler;
