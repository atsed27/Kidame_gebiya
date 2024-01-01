import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session === null) {
    return res.status(400).json('sign in requierd');
  }
  console.log('daniel3');

  res.send(process.env.PayPal_client_Id || 'sb');
};

export default handler;
