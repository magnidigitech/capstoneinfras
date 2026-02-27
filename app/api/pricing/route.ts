import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const results: any = await query('SELECT * FROM packages');

        const packages: Record<string, any> = {};
        const packageFeatures: Record<string, string[]> = {};

        results.forEach((pkg: any) => {
            // Using lowercase package_name as key for compatibility with current frontend (basic, premium, etc.)
            const key = pkg.package_name.toLowerCase();

            packages[key] = {
                id: pkg.id,
                name: pkg.package_name,
                price: parseFloat(pkg.rate_per_sqft),
                materials: pkg.materials_json ? JSON.parse(pkg.materials_json) : {}
            };

            packageFeatures[key] = pkg.features ? JSON.parse(pkg.features) : [];
        });

        return NextResponse.json({ packages, packageFeatures });
    } catch (error) {
        console.error('Error fetching pricing data from DB:', error);
        return NextResponse.json({ error: 'Failed to read data from database' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // This is for updating packages from the admin side
        // Expecting an array or a specific package object
        // For now, let's support updating a single package by ID
        const { id, package_name, rate_per_sqft, features, materials_json } = body;

        if (id) {
            await query(
                'UPDATE packages SET package_name = ?, rate_per_sqft = ?, features = ?, materials_json = ? WHERE id = ?',
                [package_name, rate_per_sqft, JSON.stringify(features), JSON.stringify(materials_json), id]
            );
        } else {
            await query(
                'INSERT INTO packages (package_name, rate_per_sqft, features, materials_json) VALUES (?, ?, ?, ?)',
                [package_name, rate_per_sqft, JSON.stringify(features), JSON.stringify(materials_json)]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing pricing data to DB:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
