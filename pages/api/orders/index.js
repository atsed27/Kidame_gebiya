import { unstable_getServerSession } from 'next-auth';
import Nextauth from '../auth/[...nextauth]';

const Handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, Nextauth);
  console.log(session);
  if (session === null) {
    return res.status(400).json('sign in requierd');
  }
  return res.status(200).json('ok');
};

export default Handler;
