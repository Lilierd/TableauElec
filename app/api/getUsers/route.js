import conn from "@/controller/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
    try {
        const headers = new Headers(req.headers);

        const query = 'SELECT * FROM utilisateurs';
        
        const result = await conn.query(
            query,
            // values
        );
        const users = result.rows;
        console.log("Req sur les utilisateurs");

        return NextResponse.json({ message: "getUsers", headers: { 'content-type': 'application/json' }, body: users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
};