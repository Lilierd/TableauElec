import { getAllUsers } from "@/app/actions";

export default async function Page() {
  const users = await getAllUsers();

  return (
    <div>
      <h1>Utilisateurs</h1>
      <table>
        <thead><th>ID</th><th>Prénom NOM</th><th>ID role</th></thead>
        <tbody>
          {
            users.map(user => <tr key={user.id_utilisateur}>
              <td>{user.id_utilisateur}</td>
              <td>{user.nom}</td>
              <td>{user.id_role}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}