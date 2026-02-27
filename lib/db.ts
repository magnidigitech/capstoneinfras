// lib/db.ts
// Robust database utility with lazy-loading and startup safety
let pool: any = null;

async function getPool() {
    if (pool) return pool;

    try {
        // Dynamic import to prevent crash at startup if module is missing or incompatible
        const mysql = await import('mysql2/promise');

        const config = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 5, // Reduced limit for stability
            queueLimit: 0,
        };

        if (!config.user || !config.password) {
            console.warn("Database credentials missing in environment variables.");
        }

        pool = mysql.createPool(config);
        return pool;
    } catch (error: any) {
        console.error('FATAL: Failed to initialize MySQL pool:', error.message);
        // Return a mock that logs errors instead of throwing
        return {
            execute: async () => {
                throw new Error("Database is currently unavailable: " + error.message);
            }
        };
    }
}

export async function query(sql: string, params?: any[]) {
    try {
        const p = await getPool();
        const [results] = await p.execute(sql, params);
        return results;
    } catch (error: any) {
        console.error('Database query error:', error.message);
        // We throw here so the API route can handle the error and return a 500,
        // rather than crashing the entire Node process.
        throw error;
    }
}
