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
        .post(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, option)
        .then((response) => {
          console.log(response.data);
          res.send(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log('ok');
    } catch (error) {
      console.log(error);
    }
  }
};

export default chapaVerification;
