import conn from "@/controller/db";
import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default async function POST(req, res) {
    try {
        const data = await req.json();
        console.log("req nom", data);
        // const query = 'INSERT INTO posts(content) VALUES($1)'
        const query = "INSERT INTO activites(nom, descript, date_activite, id_ct) VALUES('$1', '$2', TIMESTAMP '2024-10-19 09:00:00+02', $4)";
        // const values = [req.body.content];
        /* const result = await conn.query(
            query,
             values
        ); */
        // console.log("ttt", result.rows);
    } catch (error) {
        console.log(error);
    }
};