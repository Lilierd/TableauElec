"use server"

import conn from "@/controller/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param {NextRequest} req 
 * @returns {NextResponse}
 */
export async function GET(req) {
    try {
        const query = 'SELECT * FROM activites';

        const result = await conn.query(
            query,
            // values
        );
        const activites = result.rows;
        console.log("Req sur les activités");
        
        return NextResponse.json({ message: "Req all activites.", headers: { 'content-type': 'application/json', 'Cache-Control' : 'no-cache', 'cache' : 'no-store' }, body: activites }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Injection échouée." });
    }
}

/**
 * 
 * @param {NextRequest} req 
 * @returns {NextResponse}
 */
export async function POST(req) {
    let formData;
    try {
        let formData = await req.json();

        console.log("Nouvelle activité créée.");

        const query = `INSERT INTO activites(nom, descript, date_activite, id_ct) VALUES('${formData["titre"]}', '${formData["desc"]}', TIMESTAMP '2024-10-19 09:00:00+02', '${formData["cdt"]}')`;

        const result = await conn.query(
            query
        );
        

        return NextResponse.json({ message: "Nouvelle activité créée.", headers: { 'content-type': 'application/json' } }, { status: 200 });
    } catch (error) {
        console.log("Erreur : ", error);

        return NextResponse.json({ message: "Injection échouée." });
    }
};
