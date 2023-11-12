import Users from '@/model/User';
import db from '../../utils/db';
import data from '@/utils/data';
import Products from '@/model/Product';

const handler = async (req, res) => {
  await db.connect();
  await Users.deleteMany();
  await Users.insertMany(data.users);
  await Products.deleteMany();
  await Products.insertMany(data.products);
  res.send('ok');
};

export default handler;
