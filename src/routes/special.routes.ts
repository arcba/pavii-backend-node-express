import { Router, Request, Response } from 'express'
import passport from 'passport'
import { Autenticar } from '../middlewares/passport'

const router = Router();

/*router.get("/special", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("entro el usuario autenticado");
    console.log(req.user); //Usuario del token que se guardo dentro de la Strategy del middleware de passport
    res.send('success');
})*/

router.get("/special", Autenticar(), (req, res) => {
    console.log("entro el usuario autenticado");
    console.log(req.user); //Usuario del token que se guardo dentro de la Strategy del middleware de passport
    res.send('success');
})


export default router