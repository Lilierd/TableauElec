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

        const messages = result.rows;
        console.log("Req sur les messages de forum");

        if (messages.length == 0)
            return NextResponse.json({ message: "Forum Messages", headers: { 'content-type': 'application/json', 'Cache-Control': 'no-cache', 'cache': 'no-store' }, body: "No data" }, { status: 200 });

        return NextResponse.json({ message: "Forum Messages", headers: { 'content-type': 'application/json' }, body: messages }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
};

export async function POST(req) {
    try {
        let formData = await req.json();

        const values = [
            formData.titre,
            formData.texte,
            formData.id_activite,
            formData.id_utilisateur
        ];

        const query = "INSERT INTO forummessages(titre, texte, id_activite, id_author, date_message) VALUES($1, $2, $3, $4, NOW() AT TIME ZONE 'Europe/Paris')";

        const result = await conn.query(
            query,
            values
        );

        console.log(`Insertion de message de forum sur l'activité ${formData.id_activite}`);

        return NextResponse.json({ message: "Forum Messages", headers: { 'content-type': 'application/json' } }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
};