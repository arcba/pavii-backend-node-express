import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import passport from "passport";
import { UsuariosDao } from "../dao/usuarios.dao";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export function Autenticar() {
  return passport.authenticate("jwt", { session: false, failureRedirect: "/" });
}

export default new Strategy(opts, async (payload, done) => {
  try {
    console.log("usuario id", payload.id);
    let usuario = await UsuariosDao.getByusuarioid(payload.id);
    if (usuario) return done(null, usuario);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
