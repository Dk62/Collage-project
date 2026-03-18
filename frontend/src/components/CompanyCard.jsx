import React from "react";
export default function CompanyCard({ company, onApply }) {
  return (
    <div className="card">
      <h3>{company.name}</h3>
      <p>Role: {company.role}</p>
      <p>Package: {company.packageLPA} LPA</p>
      <p>Eligibility: {company.eligibility}</p>
      <p>Description: {company.description || "N/A"}</p>
      <button className="primary" onClick={() => onApply(company._id)}>Apply Now</button>
    </div>
  );
}
