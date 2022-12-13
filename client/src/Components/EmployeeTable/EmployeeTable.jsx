import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, onInput, onSelect }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>
            Filter: <input 
              placeholder="Position & Level"
              onChange={(e) => onInput(e)}
            />
          </th>
          <th>
            Sort by: <select
            onChange={(e) => onSelect(e)}
            >
              <option>First name</option>
              <option>Last name</option>
              <option>Middle name</option>
              <option>Position</option>
              <option>Level</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
