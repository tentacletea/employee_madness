import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleInput = async (e) => {
    if (e.target.value.trim() === "") {
      const data = await fetch("/api/employees");
      const res = await data.json();
      setData(res);
    }

    const paramObjects = {
      search: e.target.value
    }
    const searchParam = new URLSearchParams(paramObjects);

    const data = await fetch(`/api/employees?${searchParam}`);
    const res = await data.json()
    setData(res)
  }

  const handleSort = async (e) => {
    const paramObjects = {
      sort: e.target.value
    }
    const searchParam = new URLSearchParams(paramObjects)
    const data = await fetch(`/api/employees?${searchParam}`);
    const res = await data.json()
    setData(res)
  }

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleCheck = async (id, presence) => {
    let presenceBoolean = !presence;

    const updatePresence = {
      present: presenceBoolean
    }

    const res = await fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePresence),
    })

    setData(data.map(employee => {
      if (employee._id === id) {
        return { ...employee, ...updatePresence }
      } else {
        return employee
      }
    }))
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
        console.log(employees)
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);



  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={data} onDelete={handleDelete} onInput={handleInput} onSelect={handleSort} onCheck={handleCheck} />;
};

export default EmployeeList;
