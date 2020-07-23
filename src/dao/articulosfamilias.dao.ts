import { ArticuloFamilia } from '../models/articulofamilia'
import { QueryResult } from 'pg';
import pool from '../database';

export class ArticulosFamiliasDao {
    static async getAll(): Promise<ArticuloFamilia[]> {
        try {
            const response: QueryResult<ArticuloFamilia> = await (await pool.query('SELECT idarticulofamilia as "IdArticuloFamilia", nombre as "Nombre" FROM ArticulosFamilias '));
            return response.rows;
        } catch (error) {
            return null;
        }
    }
}