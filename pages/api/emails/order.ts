import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer";

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

    const { url, data } = req.body;

    const { address, city, lastname, name, phone, state, commnets = '', company = '', zip } = data;
    

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
        from: 'contacto@segycom.com.mx [Cotización]',
        to: "contacto@segycom.com.mx",
        subject: 'Cotización para www.segycm.mx',
        html: `<h1>Cotización de productos</h1>
        <p><strong>Fecha:</strong> ${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}</p>
        <p><strong>Nombre:</strong> ${name} ${lastname}</p>
        <p><strong>Celular:</strong> ${phone}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Dirección:</strong> ${address}</p>
        <p><strong>Ciudad:</strong> ${city}</p>
        <p><strong>Estado:</strong> ${state}</p>
        <p><strong>Comentarios:</strong> ${commnets}</p>
        <a href="${url}">Ver cotización...</a>`,
      });
    } catch (error) {
      return res.status(500).json({ message: 'error' });
    }
    return res.status(200).json({ message: "enviado" });

}