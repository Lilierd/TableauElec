
export default function Activite( { name } ) {

    return (
    <div className="border border-gray-400 rounded p-4 flex-wrap inline-block my-2 mr-2 hover:bg-gray-200">
        <h1>Activite {name}</h1>
    </div>);
}