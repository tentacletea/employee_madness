import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyForm from "../Components/CompanyForm";

const createComapny = (company) => {
  return fetch("/api/companies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  }).then((res) => res.json());
};

export default function CompanyCreator() {
  const navigate = useNavigate();

  return (
  <CompanyForm 
    onCancel={() => navigate("/")} />
    );
}
