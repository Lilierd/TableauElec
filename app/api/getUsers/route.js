import conn from "@/controller/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const query = 'SELECT * FROM utilisateurs';
        
        const result = await conn.query(
            query,
            // values
        );
        const users = result.rows;
        console.log("Req sur les utilisateurs", users);

        return NextResponse.json({ message: "getUsers", headers: { 'content-type': 'application/json' }, body: users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
};