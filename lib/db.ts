let pool: any = null;

async function getPool() {
    if (!pool) {
        // Dynamic import to prevent crash at startup if module is missing/troublesome
        const mysql = await import('mysql2/promise');

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
        const poolInstance = await getPool();
        const [results] = await poolInstance.execute(sql, params);
        return results;
    } catch (error: any) {
        console.error('Database query error:', error.message);
        throw error;
    }
}
