import User from '@/model/User';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';
const Handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log('ok');
      await db.connect();
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        await db.disconnect();
        return res.status(422).json('User already exists');
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      await newUser.save();
      await db.disconnect();
      res.status(200).json('ok');
    } catch (error) {
      console.log(error);
    }
  }
};

export default Handler;
