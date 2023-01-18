import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, onInput, onSelect, onCheck}) => (
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
              defaultValue={"none"}
            >
              <option value="none" disabled>Select your option</option>
              <option value="name">Name</option>
              <option value="position">Position</option>
              <option value="level">Level</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
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
            <td>
              Present <input type="checkbox" onChange={() => onCheck(employee._id, employee.present)} checked={employee.present}></input>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
