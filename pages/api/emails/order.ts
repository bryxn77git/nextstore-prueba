import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer";
import { db } from '../../../database'
import { Category } from '../../../models'
import { ICartProduct, ICategorias } from '../../../interfaces';

type Data = 
| { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'POST':
            return sendEmailContact( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const sendEmailContact = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const fecha = new Date();

    const { url } = req.body;
    

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  
    try {
      await transporter.sendMail({
        from: 'bryxn.alex77@gmail.com [Cotización]',
        to: "bryxn.alex77@gmail.com",
        subject: 'Cotización para Next Store Uniforms',
        html: `<h1>Cotización de productos</h1>
        <p><strong>Fecha:</strong> ${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}</p>
        <a href="${url}">Ver cotización...</a>`,
      });
    } catch (error) {
      return res.status(500).json({ message: 'error' });
    }
    return res.status(200).json({ message: "enviado" });

}