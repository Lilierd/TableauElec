
export function TeButton({ texte, onClick }) {
    return (
        <button type="button" className="px-4 py-1 mr-5 rounded bg-orange-500 hover:bg-orange-800 transition-all" onClick={onClick}>{texte}</button>
    );
}