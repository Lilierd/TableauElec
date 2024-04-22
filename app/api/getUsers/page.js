import conn from "@/controller/db";

export default async (req, res) => {
    let users; // Array
    try {
        console.log("req nom", req.body)
        // const query = 'INSERT INTO posts(content) VALUES($1)'
        const query = 'SELECT * FROM utilisateurs';
        // const values = [req.body.content];
        const result = await conn.query(
            query,
            // values
        );
        users = result.rows;
        console.log(users);
    } catch (error) {
        console.log(error);
    }

    return(
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