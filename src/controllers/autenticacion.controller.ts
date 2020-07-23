import { Request, Response, json } from 'express'
import { UsuariosDao } from '../dao/usuarios.dao'
import { Usuario } from '../models/usuario';
import bcrypt from 'node-pre-gyp';
import jwt from 'jsonwebtoken'
import config from '../config/config'

export class AutenticacionController {
    static createToken(usuario: Usuario) {
        return jwt.sign({
            id: usuario.usuarioid,
            nombre: usuario.usuarionombre, //datos que pasan al token
            email: usuario.usuarioemail
        },
            config.jwtSecret,     //con que string se va a cifrar
            { expiresIn: 86400 }); //expira en un dia
    }

    static signUp = async (req: Request, res: Response) => {
        //valido si no es undefinied
        if (!req.body.usuarioemail || !req.body.usuarionombre
            || !req.body.usuarioclave)
            return res.status(400).json({ msg: 'Por favor envÃ­e su email, nombre de usuario y contraseÃ±a' });

        let usuario: Usuario = await UsuariosDao.getByusuarionombre(req.body.usuarionombre);
        if (usuario)
            return res.status(400).json({ msg: 'El usuario ya existe' });

        //genera el string para cifrar datos, con un costo de 10 (fortaleza del cifrado)
        const salt = await bcrypt.genSalt(10);
        const hashClave = await bcrypt.hash(req.body.usuarioclave, salt); //contraseÃ±a cifrada
        usuario = await UsuariosDao.Insert(req.body.usuarioemail, req.body.usuarionombre, hashClave);

        if (usuario == null)
            return res.status(400).json({ msg: 'Error al crear el usuario' });
        res.status(201).json(usuario);
    }

    static signIn = async (req: Request, res: Response) => {
        if (!req.body.usuarioemail || !req.body.usuarionombre
            || !req.body.usuarioclave)
            return res.status(400).json({ msg: 'Por favor envÃ­e su email, nombre de usuario y contraseÃ±a' });
        //obtengo el usuario
        let usuario: Usuario = await UsuariosDao.getByusuarionombre(req.body.usuarionombre);
        if (usuario == null)
            return res.status(400).json({ msg: 'Error en el nombre de usuario y/o contraseÃ±a' });
        //valido la contraseÃ±a
        const claveCorrecta = await bcrypt.compare(req.body.usuarioclave, usuario.usuarioclave.toString());
        if (claveCorrecta)
            return res.status(200).json({ token: AutenticacionController.createToken(usuario) });
        else
            return res.status(400).json({ msg: 'Error en el nombre de usuario y/o contraseÃ±a' });
        res.send('signin');
    }
}