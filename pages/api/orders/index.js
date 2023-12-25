import { getSession } from 'next-auth/react';

const Handler = async (req, res) => {
  const session = await getSession(req);
  if (session === null) {
    return res.status(401).json('session is no');
  }
  return res.status(200).json(session);
};

export default Handler;
