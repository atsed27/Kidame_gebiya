import Order from '@/model/Order';
import axios from 'axios';

const chapaVerification = async (req, res) => {
  if (req.method === 'GET') {
    try {
      let tx_ref = req.query.id;
      console.log(tx_ref);
      const option = {
        headers: {
          Authorization: process.env.chapa_id,
          'Content-Type': 'application/json',
        },
      };
      await axios
        .get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, option)
        .then(async (response) => {
          console.log(response.data);
          const orderFind = await Order.findOne({ tx_ref: tx_ref });
          if (!orderFind) return res.status(404).json('order is not found');
          const order = await Order.findByIdAndUpdate(
            orderFind._id,
            {
              $set: {
                isPaid: true,
                paidAt: Date.now(),
              },
            },
            {
              new: true,
            }
          );
          console.log(order);
          res.send(order);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export default chapaVerification;
