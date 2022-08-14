import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import fs from 'fs';

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );


type Data = 
| { message: string }
| {
    message: string, public_id: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}
 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' });
    }

}


const saveFile = async( file: formidable.File ): Promise<UploadApiResponse> => {

    // const data = fs.readFileSync( file.filepath );
    // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
    // fs.unlinkSync( file.filepath ); // elimina
    // return;
    const data = await cloudinary.uploader.upload( file.filepath );
    return data;

}


const parseFiles = async(req: NextApiRequest): Promise<UploadApiResponse> => {

    return new Promise( (resolve, reject) => {

        const form = new formidable.IncomingForm();
        form.parse( req, async( err, fields, files ) => {
            // console.log({ err, fields, files });

            if ( err ) {
                return reject(err);
            }

            const filePath = await saveFile( files.file as formidable.File )
            resolve(filePath);
        })

    }) 

}


const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const imageUrl = await parseFiles(req);
    
    return res.status(200).json({ message: imageUrl.secure_url, public_id: imageUrl.public_id });

}

