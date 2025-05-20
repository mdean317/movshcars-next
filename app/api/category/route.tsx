import { NextResponse } from 'next/server';

// Bank Nomination route get method
export async function GET() {

    try {

        // Post new bank nom to the DB 
        const response = await fetch("http://127.0.0.1:5000/categories/index")

        if (!response.ok) {
            throw new Error('Failed to add movie');

        } else {

            // Parse data
            const allCategories = await response.json();
            
            // Send data back
            return NextResponse.json(allCategories);
        }

    // If an error us caughht, log it. 
    } catch (error) {

        return NextResponse.json(error, { status: 500 });
    }
}