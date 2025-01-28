import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
    const products = [
        {
          "id": 1,
          "status": 1,
          "name": "Product 1",
          "desc": "Extra cheese and toping",
          "image": "https://placehold.co/600x400"
        },
        {
          "id": 2,
          "status": 0,
          "name": "Product 2",
          "desc": "Extra cheese and toping",
          "image": "https://placehold.co/600x400"
        },
        {
          "id": 3,
          "status": 1,
          "name": "Product 3",
          "desc": "Extra cheese and toping",
          "image": "https://placehold.co/600x400"
        },
        {
          "id": 4,
          "status": 1,
          "name": "Product 4",
          "desc": "Extra cheese and toping",
          "image": "https://placehold.co/600x400"
        },
        {
          "id": 5,
          "status": 0,
          "name": "Product 5",
          "desc": "Extra cheese and toping",
          "image": "https://placehold.co/600x400"
        },
        {
          "id": 6,
          "status": 1,
          "name": "Product 6",
          "desc": "Extra cheese and toping",
          "image": "https://placehold.co/600x400"
        }
      ]
    return NextResponse.json(products);
}
