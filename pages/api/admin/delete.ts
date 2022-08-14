import type { NextApiRequest, NextApiResponse } from 'next'

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );


type Data = 
| { message: string }


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return deleteFile(req, res);

        case 'DELETE':
            return deleteSimpleFile(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' });
    }

}




const deleteFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { public_id = '' } = req.body

    cloudinary.uploader.destroy(public_id)
    
    return res.status(200).json({ message: 'Se elimino correctamente la imagen' });

}

const deleteSimpleFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const [ fileId, extension ] = req.body.substring( req.body.lastIndexOf('/') + 1 ).split('.')
    cloudinary.uploader.destroy(fileId)
    
    return res.status(200).json({ message: 'Se elimino correctamente la imagen' });

}

