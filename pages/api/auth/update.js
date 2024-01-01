import { unstable_getServerSession } from 'next-auth';
import Nextauth from './[...nextauth]';
import User from '@/model/User';
import db from '@/utils/db';
import bcryptjs from 'bcryptjs';
const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(400).json(`${req.method} is not supported`);
  }
  const session = await unstable_getServerSession(req, res, Nextauth);
  if (!session) {
    return res.status(401).json('sign in requierd');
  }
  await db.connect();
  const { user } = session;
  const findUser = await User.findOne({ email: user.email });
  if (!findUser) return res.status(404).json('user is not found');
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(req.body.password, salt);
  await User.findByIdAndUpdate(
    findUser._id,
    {
      $set: { ...req.body, password: hash },
    },
    {
      new: true,
    }
  );
  await db.disconnect();
  res.status(200).json('user is update ');
};

export default handler;
