// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  // name: string
  ok: boolean;
  message: string;
  method: string;
  secret?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  console.log(process.env);
  
  res.status(200).json({
    // name: 'John Doe'
    ok: true,
    message: 'Todo correcto',
    method: req.method || 'No hay metodo',
    secret: process.env.SECRET_KEY
  })
}
