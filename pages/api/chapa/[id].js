import User from '@/model/User';
import db from '@/utils/db';
import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const order = req.body;
    await db.connect();
    const findUser = await User.findById(order.user);
    if (!findUser) {
      return res.status(404).json('user is not found');
    }
    console.log(findUser.email);
    //const email = findUser.email;
    const name1 = findUser.name;
    const option = {
      headers: {
        Authorization: process.env.chapa_id,
        'Content-Type': 'application/json',
      },
    };

    const randomNumber = Math.floor(Math.random() * 10000000);
    const randomString = 'daniel-chap' + randomNumber;
    const tx = randomString;
    console.log(tx);
    const data = {
      amount: order.totalPrice,
      currency: 'ETB',
      email: 'danielnigatu09@gmail.com',
      first_name: name1,
      last_name: name1,
      phone_number: '0916213371',
      tx_ref: tx,
      callback_url: `https://kidame-gebiya.vercel.app/api/chapa/verification/${tx}`,
      return_url: 'https://kidame-gebiya.vercel.app/',
    };
    await axios
      .post('https://api.chapa.co/v1/transaction/initialize', data, option)
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await db.disconnect();
    console.log('hy');
  }
};
export default handler;
