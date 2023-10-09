import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { validations } from '../../../utils';

type Data = 
| { message: string }
| IUser
| IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch( req.method ) {
        case 'GET':
            return getUsers(req, res);
        case 'POST':
            return CreateUser(req, res);
        case 'PUT':
            return updateUser(req, res);

        case 'DELETE':
            return deleteUser(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })

    }


}

const getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {

    await db.connect();
    const users = await User.find().select('-password').lean();
    await db.disconnect();

    return res.status(200).json( users );


}



const CreateUser = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {
        
    const { email = '', password = '', name = '', role = '' } = req.body as { email: string, password: string, name: string, role: string };

    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'La contraseña debe de ser de 6 caracteres'
        });
    }

    if ( name.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }
    
    if ( !validations.isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }
    
    
    await db.connect();
    const user = await User.findOne({ email });

    if ( user ) {
        return res.status(400).json({
            message:'No puede usar ese correo'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role,
        name,
    });

    try {
        await newUser.save({ validateBeforeSave: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    return res.status(200).json({ message: 'Usuario creado' });
     
}

const updateUser = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {
    
    const { _id = '', email = '', role = '', name = '', password = ''  } = req.body;
    
    if ( !isValidObjectId(_id) ) {
        return res.status(400).json({ message: 'No existe usuario por ese id' })
    }

    const validRoles = ['admin', 'clientA', 'clientB', 'clientC'];
    if ( !validRoles.includes(role) ) {
        return res.status(400).json({ message: 'Rol no permitido: ' + validRoles.join(', ') })
    }
    
    await db.connect();
    const user = await User.findById( _id );

    if ( !user ) {
        await db.disconnect();
        return res.status(404).json({ message: `Usuario no encontrado: ${_id}` });
    }

    user.role = role;
    user.email = email.toLocaleLowerCase();
    user.name = name;
    
    if( password !== '' ){
        if ( password.length < 6 ) {
            return res.status(400).json({
                message: 'La contraseña debe de ser de 6 caracteres'
            });
        }

        user.password = bcrypt.hashSync( password );



    }

    await user.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Usuario actualizado' });
     
}

const deleteUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
        
    try {
        await db.connect();
        const usersInDB = await User.find({ _id: req.body });
        if ( !usersInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay usuarios con ese o esos ID' });
        }
        
        const userDelete = await User.deleteMany({ _id: { $in: req.body }})
        await db.disconnect();

        res.status(200).json({ message: 'Eliminación con éxito'});


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
    return res.status(200).json({ message: 'jalo chido' });
}