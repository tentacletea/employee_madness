import { Link } from "react-router-dom";
import "./EquipmentTable.css";



const EquipmentTable = ({ characters, onDelete }) => (
  <table className="EquipmentTable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {
        characters.map((character) => (
          <tr key={character._id}>
            <td>{character.name}</td>
            <td>{character.type}</td>
            <td>{character.amount}</td>
            <td>
              <Link to={`/update/${character._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(character._id)}>
                Delete
              </button>
            </td>
            <td></td>
          </tr>
        )
        )}
    </tbody>
  </table>
);

export default EquipmentTable;
