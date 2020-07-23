import { ArticulosDao } from '../dao/articulos.dao';
import { Articulo } from '../models/articulo';

export class ArticulosController {
    static getArticulos = async (req, res) => {
        let pagina = req.query.Pagina;
        if (pagina === undefined)
            pagina = 1;
        const articulos: Articulo[] = await ArticulosDao.getByNombreActivo(req.query.Nombre, req.query.Activo)
        res.status(200).json({ Lista: articulos.slice(pagina * 10, pagina * 10 + 10), RegistrosTotal: articulos.length });
    }

    static getArticulosById = async (req, res) => {
        const articulo: Articulo = await ArticulosDao.getByIdArticulo(req.params.id);
        res.status(200).json(articulo);
    }

    static postArticulos = async (req, res) => {
        const { Nombre, Precio, CodigoDeBarra, IdArticuloFamilia, Stock, FechaAlta, Activo } = req.body;
        const articulo = await ArticulosDao.Insert(Nombre, Precio, CodigoDeBarra, IdArticuloFamilia, Stock, FechaAlta, Activo)
        res.send().status(200);
    }

    static putArticulos = async (req, res) => {
        const { Nombre, Precio, CodigoDeBarra, IdArticuloFamilia, Stock, FechaAlta, Activo } = req.body;
        const articulo = await ArticulosDao.Update(req.params.id, Nombre, Precio, CodigoDeBarra, IdArticuloFamilia, Stock, FechaAlta, Activo)
        res.send().status(204);
    }

    static putArticulosActivarDesactivar = async (req, res) => {
        const response = await ArticulosDao.ActivarDesactivar(req.params.id)
        res.send().status(204);
    }
}


