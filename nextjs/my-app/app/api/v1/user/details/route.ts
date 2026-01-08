import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        user: "nik",
        email: "nik@nik.com"
    })
}

export function POST() {
    return NextResponse.json({
        user: "nik",
        email: "nik@nik.com"
    })
}
export function PUT() {
    return NextResponse.json({
        user: "nik",
        email: "nik@nik.com"
    })
}