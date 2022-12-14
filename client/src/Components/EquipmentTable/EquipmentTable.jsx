import { Link } from "react-router-dom";
import "./EquipmentTable.css";



const EquipmentTable = ({ equipments, onDelete }) => (
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
        equipments.map((equipment) => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td>{equipment.amount}</td>
            <td>
              <Link to={`/update/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipment._id)}>
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
