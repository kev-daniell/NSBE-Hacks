import { useState } from "react";
import { PatientType } from "../types/types";

const Patient = () => {
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientDosages, setNewPatientDosages] = useState("");
  const [newPatientMedicineType, setNewPatientMedicineType] = useState("");
  const [patients, setPatients] = useState<PatientType[]>([]);

  const handleNewPatientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPatient: PatientType = {
      name: newPatientName,
      calendar: JSON.parse(newPatientDosages),
      medicineType: newPatientMedicineType,
    };

    setPatients((prevPatients) => [...prevPatients, newPatient]);
    setNewPatientName("");
    setNewPatientDosages("");
    setNewPatientMedicineType("");
  };

  return (
    <div>
      <h1>Patients</h1>
      <form onSubmit={handleNewPatientSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newPatientName}
            onChange={(e) => setNewPatientName(e.target.value)}
          />
        </label>
        <label>
          Dosages:
          <input
            type="text"
            value={newPatientDosages}
            onChange={(e) => setNewPatientDosages(e.target.value)}
          />
        </label>
        <label>
          Medicine Type:
          <input
            type="text"
            value={newPatientMedicineType}
            onChange={(e) => setNewPatientMedicineType(e.target.value)}
          />
        </label>
        <button type="submit">Add Patient</button>
      </form>
      <div>
        {patients?.map((patient) => (
          <div key={patient.name}>
            <h2>{patient.name}</h2>
            <p>{JSON.stringify(patient.calendar)}</p>
            <p>Medicine Type: {patient.medicineType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patient;
