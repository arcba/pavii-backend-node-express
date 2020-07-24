import express from "express";
import morgan from "morgan";
import cors from "cors";
//import dotenv from 'dotenv';
import passport from "passport";
import passportMiddleware from "./middelwares/passport";

import authRoutes from "./routes/auth.routes";
import specialRoutes from "./routes/special.routes";
import articulosRoutes from "./routes/articulos.routes";
import articulosFamiliasRoutes from "./routes/articulosfamilias.routes";
import expAutoSan from "express-autosanitizer";
import helmet from "helmet";

//inicializaciones
const app = express();

//configurar las variables de entorno ver mas en => https://www.youtube.com/watch?v=U6st9-lNUyY
//let result: dotenv.DotenvConfigOutput = dotenv.config();

//settings
app.set("port", process.env.PORT || 3000);

//middewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//middleware para sanitizar
app.use(expAutoSan.allUnsafe);
//para asegurar la aplicacion
app.use(helmet());

//middleware para que use passport con jwt
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get("/", (req, res) => {
  res.send(`La API esta en http://localhost:${app.get("port")}`);
});
app.use(authRoutes);
app.use(specialRoutes);
app.use(articulosRoutes);
app.use(articulosFamiliasRoutes);

export default app;
