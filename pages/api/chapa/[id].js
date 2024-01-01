import User from '@/model/User';
import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const order = req.body;

    const findUser = await User.findById(order.user);
    if (!findUser) {
      return res.status(404).json('user is not found');
    }
    console.log(findUser.email);
    //const email = findUser.email;
    const name1 = findUser.name;
    const option = {
      headers: {
        Authorization: 'Bearer CHASECK_TEST-5fAt1GxUTLgcv5nuq7lRPvfe3QWqjwRM',
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
      phone_number: '0912345678',
      tx_ref: tx,
      callback_url: 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
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
  }
};
export default handler;
