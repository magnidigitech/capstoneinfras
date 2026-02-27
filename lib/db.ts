// lib/db.ts - Emergency troubleshoot mode
// This mocks the database to prevent startup crashes on Hostinger
export async function query(sql: string, params?: any[]) {
    console.warn("Database query skipped (troubleshooting mode):", sql);
    return [] as any[];
}
