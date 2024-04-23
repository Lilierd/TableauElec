"use server"

import conn from "@/controller/db";
import Server, { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // const body = await req.json();

        const data = await req.json();

        console.log("Nouvelle activité créée.");

        // const query = 'INSERT INTO posts(content) VALUES($1)'
        const values = [data.formData];
        const query = `INSERT INTO activites(nom, descript, date_activite, id_ct) VALUES('${data.formData.titre}', '${data.formData.desc}', TIMESTAMP '2024-10-19 09:00:00+02', '${data.formData.cdt}')`;
        const result = await conn.query(
            query
        );
        console.log("ttt", result.rows);

        return Response.json({ message: "Nouvelle activité créée." });
    } catch (error) {
        console.log(error);
        
        return Response.json({ message: "Injection échouée." });
    }
};