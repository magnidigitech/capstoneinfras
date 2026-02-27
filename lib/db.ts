// lib/db.ts - Emergency troubleshoot mode
// Database dependencies have been removed in package.json to resolve 503 crash
export async function query(sql: string, params?: any[]) {
    console.warn("Database query skipped (troubleshooting mode):", sql);
    return [] as any[];
}
