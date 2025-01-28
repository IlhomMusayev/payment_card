import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
    const pricing = [
        { "id": 1, "price": 1000 },
        { "id": 2, "price": 1250 },
        { "id": 3, "price": 400 },
        { "id": 4, "price": 6000 },
        { "id": 5, "price": 550 },
        { "id": 6, "price": 300 }
    ];
    return NextResponse.json(pricing);
}
