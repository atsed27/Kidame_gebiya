import Users from '@/model/User';
import db from '../../utils/db';
import data from '@/utils/data';

const handler = async (req, res) => {
  await db.connect();
  await Users.deleteMany();
  await Users.insertMany(data.users);
  res.send('ok');
};

export default handler;
