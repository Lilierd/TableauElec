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
        const headers = new Headers(req.headers);

        const activite = req.nextUrl.searchParams.get('activite');
        const role = req.nextUrl.searchParams.get('role'); //TODO

        let query = `SELECT * FROM activites`;
        if(activite !== null)
            query = `SELECT * FROM activites WHERE id_activite=${activite}`;

        const result = await conn.query(
            query,
            // values
        );
        const activites = result.rows;
        console.log("Req sur les activités");

        if(activites.length == 0)
            return NextResponse.json({ message: "Req all activites.", headers: { 'content-type': 'application/json', 'Cache-Control' : 'no-cache', 'cache' : 'no-store' }, body: "No data" }, { status: 200 });
        
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
