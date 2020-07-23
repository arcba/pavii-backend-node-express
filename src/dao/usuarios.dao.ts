import { Usuario } from '../models/usuario'
import { QueryResult } from 'pg';
import pool from '../database';

export class UsuariosDao {

    static async Insert(usuarioemail: string, usuarionombre: string, usuarioclave: string): Promise<Usuario> {
        const response = await pool.query('insert into usuarios (usuarioemail, usuarionombre, usuarioclave) values ($1,$2,$3) returning usuarioid', [usuarioemail, usuarionombre, usuarioclave]);
        if (response.rowCount == 0)
            return null;
        return this.getByusuarioid(response.rows[0].usuarioid);
    }

    static async getAll(): Promise<Usuario[]> {
        try {
            let response: QueryResult<Usuario> = await pool.query('SELECT TOP 100 usuarioid, usuarioemail, usuarionombre, usuarioclave FROM Usuarios order by usuarionombre');
            return response.rows;
        } catch (error) {
            return null;
        }
    }
    static async getByusuarioid(usuarioid: number): Promise<Usuario> {
        try {
            console.log('getusuariobyid');
            let response: QueryResult<Usuario> = await pool.query('SELECT usuarioid, usuarioemail, usuarionombre, usuarioclave FROM Usuarios where usuarioid = $1', [usuarioid]);
            if (response.rowCount == 1)
                return response.rows[0];
            else
                return null;
        } catch (error) {
            return null;
        }
    }

    static async getByusuarionombre(usuarionombre: string): Promise<Usuario> {
        try {
            let response: QueryResult<Usuario> = await pool.query('SELECT usuarioid, usuarioemail, usuarionombre, usuarioclave FROM Usuarios where usuarionombre = $1', [usuarionombre]);
            return response.rows[0];
        } catch (error) {
            return null;
        }
    }

}