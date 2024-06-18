
export function TeButton({ texte, onClick, alert }) {
    const fond = alert ? "bg-red-600 hover:bg-red-800 text-white" : "bg-orange-500 hover:bg-orange-800";

    return (
        <button type="button" className={`px-4 py-1 mr-5 rounded ${fond} transition-all`} onClick={onClick}>{texte}</button>
    );
}