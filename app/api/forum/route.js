import conn from "@/controller/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
    try {
        // const headers = new Headers(req.headers);
        const activityid = req.nextUrl.searchParams.get('activite');

        let query = "SELECT * FROM forummessages";
        if (activityid !== null)
            query = `SELECT * FROM forummessages WHERE id_activite=${activityid}`;

        const result = await conn.query(
            query,
            // values
        );

        const roles = result.rows;
        console.log("Req sur les messages de forum");

        if (roles.length == 0)
            return NextResponse.json({ message: "Forum Messages", headers: { 'content-type': 'application/json', 'Cache-Control': 'no-cache', 'cache': 'no-store' }, body: "No data" }, { status: 200 });

        return NextResponse.json({ message: "Forum Messages", headers: { 'content-type': 'application/json' }, body: roles }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
};