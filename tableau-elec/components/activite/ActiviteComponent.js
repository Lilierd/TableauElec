import Link from "next/link";

export default function ActiviteComponent({ activite }) {
    const activity = {
        name: activite[0],
        CdT: activite[1],
        exec: activite[2],
    };

    return (
        <div className="inline-block my-3">
            <Link className="divide-y divide-gray-400 border duration-300 hover:scale-110 hover:border-none transition-all border-gray-400 rounded p-4 inline-block my-2 mx-1 bg-gray-100 hover:bg-gray-300"
                href={{
                    pathname: "/activite",
                    query: { activite: activity.name},   //Remplacer par l'id dans la BDD
                }}>
                <h2 className="pb-2">Activité "{activity.name}"</h2>
                <div className="py-2"><p className="font-semibold">Chargé de travaux</p><span id="CdT">{activity.CdT}</span></div>
                <div className="pt-2"><p className="font-semibold">Exécutants</p><span id="Execs">{activity.exec}{/* Remplacer par un map de la liste de execs */}</span></div>
            </Link>
        </div>
    );
}