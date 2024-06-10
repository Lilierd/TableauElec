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

        let values = [];

        let query = `SELECT * FROM activites`;
        if (activite !== null && role !== null) {
            query = `SELECT * FROM activites WHERE id_activite=$1`;
            values = [activite, role];
        }
        else if (activite !== null) {
            query = `SELECT * FROM activites WHERE id_activite=$1`;
            values = [ activite ];
        }
        const result = await conn.query(
            query,
            values
        );
        const activites = result.rows;
        console.log("Req sur les activités");

        if (activites.length == 0)
            return NextResponse.json({ message: "Req all activites.", headers: { 'content-type': 'application/json', 'Cache-Control': 'no-cache', 'cache': 'no-store' }, body: "No data" }, { status: 200 });

        return NextResponse.json({ message: "Req all activites.", headers: { 'content-type': 'application/json', 'Cache-Control': 'no-cache', 'cache': 'no-store' }, body: activites }, { status: 200 });
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

        const values = [
            formData.titre,
            formData.desc,
            "2024-10-19 09:00:00",
            formData.cdt,
            formData.rep
        ];

        const query = "INSERT INTO activites(nom, descript, date_activite, id_ct, rep_fonc) VALUES($1, $2, $3, $4, $5);";

        const result = await conn.query(
            query,
            values
        );

        const resultb = await conn.query("SELECT currval(pg_get_serial_sequence('activites','id_activite'))");

        const id = resultb.rows[0].currval;

        console.log("Nouvelle activité créée.");

        return NextResponse.json({ message: "Nouvelle activité créée.", headers: { 'content-type': 'application/json' }, body: id }, { status: 200 });
    } catch (error) {
        console.log("Erreur : ", error);

        return NextResponse.json({ message: "Injection échouée." });
    }
};

/**
 * 
 * @param {NextRequest} req 
 * @returns {NextResponse}
 */
export async function PATCH(req) {
    try {
        const formData = await req.json();

        const query = `UPDATE activites SET nom='${formData.titre}', id_ct=${formData.cdt}, descript='${formData.desc}', rep_fonc='${formData.rep}' WHERE id_activite=${formData.id_activite}`;

        const result = await conn.query(
            query
        );

        console.log("Modification activité.");

        return NextResponse.json({ message: "Modification activité.", headers: { 'content-type': 'application/json' } }, { status: 200 });
    } catch (error) {
        console.log("Erreur : ", error);

        return NextResponse.json({ message: "Injection échouée." });
    }
};
