import { ArticulosFamiliasDao } from "../dao/articulosfamilias.dao";
import { ArticuloFamilia } from "../models/articulofamilia"

export class ArticulosFamiliasController {
    static getArticulosFamilias = async (req, res) => {
        let articulosFamilias: ArticuloFamilia[] = await ArticulosFamiliasDao.getAll();
        res.status(200).json(articulosFamilias);
    }
}
