import React, { useState , useEffect } from 'react'
import EmployeeTable from '../Components/EmployeeTable';

export default function Missing() {
    const [missing, setMissing] = useState([])

    const missingEmployees = async () => {
        const data = await fetch("/api/employees/missing");
        setMissing(await data.json());
    }

    useEffect(() => {
        missingEmployees();
    }, [])
    
    return <EmployeeTable employees={missing}></EmployeeTable>
}
