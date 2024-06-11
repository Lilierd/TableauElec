"use server"

import conn from "@/controller/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
    try {
        // const headers = new Headers(req.headers);
        const userid = req.nextUrl.searchParams.get('user');

        let query = "SELECT id_utilisateur, nom, id_role FROM utilisateurs";
        if (userid !== null)
            query = `SELECT id_utilisateur, nom, id_role FROM utilisateurs WHERE id_utilisateur=${userid}`;

        const result = await conn.query(
            query,
            // values
        );

        const users = result.rows;
        console.log("Req sur les utilisateurs");

        if (users.length == 0)
            return NextResponse.json({ message: "Utilisateurs", headers: { 'content-type': 'application/json', 'Cache-Control': 'no-cache', 'cache': 'no-store' }, body: "No data" }, { status: 200 });

        return NextResponse.json({ message: "Utilisateurs", headers: { 'content-type': 'application/json' }, body: users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
};

export async function POST(req) {
    try {
        // const headers = new Headers(req.headers);

        let query = "SELECT id_utilisateur, nom, id_role FROM utilisateurs";
        if (user !== null)
            query = `SELECT id_utilisateur, nom, id_role FROM utilisateurs WHERE id_utilisateur=${userid}`;

        const result = await conn.query(
            query,
            // values
        );

        const users = result.rows;
        console.log("Insertion sur les utilisateurs");

        if (users.length == 0)
            return NextResponse.json({ message: "Utilisateurs", headers: { 'content-type': 'application/json', 'Cache-Control': 'no-cache', 'cache': 'no-store' }, body: "No data" }, { status: 200 });

        return NextResponse.json({ message: "Utilisateurs", headers: { 'content-type': 'application/json' }, body: users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
};

export async function PATCH(req)
{
    try {
        const body = await req.json();

        const query = `UPDATE utilisateurs SET nom='${body.nom}', id_role=${body.id_role} WHERE id_utilisateur=${body.id_utilisateur}`;

        const result = await conn.query(
            query,
            // values
        );

        console.log("Modification sur les utilisateurs");

        return NextResponse.json({ message: "Utilisateurs", headers: { 'content-type': 'application/json' }, body: body }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
    }
}

