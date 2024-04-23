"use server"

import conn from "@/controller/db";
import Server, { NextResponse } from "next/server";

export async function GET() {
    try {
        const query = 'SELECT * FROM activites';

        const result = await conn.query(
            query,
            // values
        );
        const activites = result.rows;
        console.log("Req sur les activités", activites);
        
        return NextResponse.json({ message: "Req all activites.", headers: { 'content-type': 'application/json' }, body: activites }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Injection échouée." });
    }
}

export async function POST() {
    try {

        console.log("Nouvelle activité créée.");

        const values = [data.formData];
        const query = `INSERT INTO activites(nom, descript, date_activite, id_ct) VALUES('${data.formData.titre}', '${data.formData.desc}', TIMESTAMP '2024-10-19 09:00:00+02', '${data.formData.cdt}')`;
        const result = await conn.query(
            query
        );
        console.log("ttt", result.rows);

        return NextResponse.json({ message: "Nouvelle activité créée.", headers: { 'content-type': 'application/json' }, body: users }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Injection échouée." });
    }
};
