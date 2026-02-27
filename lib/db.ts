import mysql from 'mysql2/promise';

/**
 * Database abstraction layer with connection pooling and advanced error handling.
 * Designed for reliability on shared hosting environments like Hostinger.
 */

let pool: mysql.Pool | null = null;

/**
 * Lazy-initializes the database pool to prevent connection errors during app boot.
 */
function getPool() {
    if (!pool) {
        // Standard MySQL configuration using environment variables
        const config: mysql.PoolOptions = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 10000,
        };

        // Basic verification of required fields
        if (!config.user || !config.password) {
            console.warn('[DB] WARNING: MySQL credentials (DB_USER/DB_PASSWORD) are not configured.');
        }

        pool = mysql.createPool(config);
    }
    return pool;
}

/**
 * Execute a SQL query with automatic error logging and connection management.
 */
export async function query(sql: string, params?: any[]) {
    try {
        const poolInstance = getPool();
        const [results] = await poolInstance.execute(sql, params);
        return results;
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[DB] Query Error: ${errorMessage}`, { sql, params });

        // Re-throw so the API can decide how to handle the failure (e.g., fallback or 500)
        throw error;
    }
}

export default getPool;
