import { useEffect } from "react";
import { useState } from "react";

const Robert = () => {

  const [employees, setEmployees] = useState([])

  const findRoberts = async () => {
    const data = await fetch("/api/robert");
    setEmployees(await data.json());
  }

  useEffect(() => {
    findRoberts();
  }, [])

  return (
    <div>
      <ol>
        {
          employees.map((employee) => {
            return (
              <li key={employee._id}>{employee.name}</li>
            )
          })
        }
      </ol>
    </div>
  )

}

export default Robert
