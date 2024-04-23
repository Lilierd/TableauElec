import conn from "@/controller/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    let users; // Array
    try {
        const data = req.json();
        // const query = 'INSERT INTO posts(content) VALUES($1)'
        const query = 'SELECT * FROM utilisateurs';
        // const values = [req.body.content];
        const result = await conn.query(
            query,
            // values
        );
        users = result.rows;
        console.log(users);

        return Response.json({ message: "Impression de tous les utilisateurs." }/* , { headers: { 'content-type': 'application/json' } }, { body: users } */);
    } catch (error) {
        console.log(error);
    }

    return (
        <div>
            <h1>Utilisateurs</h1>
            <table>
                <tbody>
                    {
                        users.map(user => <tr key={user.id_utilisateur}><td>{user.id_utilisateur}</td><td>{user.nom}</td></tr>)
                    }
                </tbody>
            </table>
        </div>
    )
};