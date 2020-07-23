import { Pool, QueryResult, Submittable, QueryArrayConfig, QueryArrayResult, QueryResultRow, QueryConfig } from 'pg';
import config from './config/config';

const pool = new Pool({
    host: config.DB.host,
    user: config.DB.user,
    password: config.DB.password,
    database: config.DB.database,
    port: config.DB.port
});

pool.once('open', () => {
    console.log("Postgre Pool open");
});

pool.on('error', err => {
    console.log(err);
    process.exit(0);
});

export default pool;