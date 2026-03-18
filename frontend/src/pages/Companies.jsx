import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import CompanyCard from "../components/CompanyCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [minPackage, setMinPackage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/companies")
      .then((res) => setCompanies(res.data))
      .catch(() => setMessage("Failed to load companies"))
      .finally(() => setLoading(false));
  }, []);

  const handleApply = async (companyId) => {
    try {
      await api.post(`/users/apply/${companyId}`);
      setMessage("Applied successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Application failed");
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const searchMatch =
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.role.toLowerCase().includes(search.toLowerCase());
      const packageMatch = minPackage ? Number(company.packageLPA) >= Number(minPackage) : true;
      return searchMatch && packageMatch;
    });
  }, [companies, search, minPackage]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Companies</h2>
      <div className="card">
        <input
          placeholder="Search by company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          placeholder="Minimum package LPA"
          value={minPackage}
          onChange={(e) => setMinPackage(e.target.value)}
        />
      </div>
      {message && <div className="card"><p>{message}</p></div>}
      {filteredCompanies.length === 0 ? (
        <div className="card"><p>No companies found.</p></div>
      ) : (
        filteredCompanies.map((company) => (
          <CompanyCard key={company._id} company={company} onApply={handleApply} />
        ))
      )}
    </div>
  );
}
