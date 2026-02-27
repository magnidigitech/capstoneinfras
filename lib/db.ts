import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getPool() {
    if (!pool) {
        if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
            console.warn("WARNING: Database environment variables (DB_USER/DB_PASSWORD) are missing!");
        }

        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
}

export async function query(sql: string, params?: any[]) {
    try {
        const [results] = await getPool().execute(sql, params);
        return results;
    } catch (error: any) {
        console.error('Database query error:', error.message);
        throw error;
    }
}
