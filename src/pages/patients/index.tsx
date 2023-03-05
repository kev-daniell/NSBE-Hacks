import { patient } from "@/types/Patient";
import PatientCardContainer from "@/components/PatientCardContainer";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { ChangeType } from "@/types/formOnchange";
import { useContext } from "react";
import { AuthContext } from "@/hooks/context";
import { useEffect } from "react";
import PatientIndexCard from "@/components/PatientIndexCard";
import axios from "axios";
import { User } from "firebase/auth";
import { Input } from "antd";

const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };

async function fetchPatients(cb: Function, user: User) {
  if (user) {
    const res = await axios.get(
      `http://localhost:8080/patient/all/${user.uid}`
    );
    cb(res.data);
  }
}

const formatPatients = (
  patients: patient[],
  rowSize: number
): [patient[][], patient[] | null] => {
  let organizedPatients: patient[][] = [];
  let tempRow: patient[] = [];
  let toBeOrganized: patient[] = [];
  let remainder: patient[] | null = [];
  if (patients.length % rowSize) {
    toBeOrganized = patients.slice(
      0,
      rowSize * Math.floor(patients.length / rowSize)
    );
    remainder = patients.slice(rowSize * Math.floor(patients.length / rowSize));
  } else {
    remainder = null;
    toBeOrganized = patients;
  }
  for (let i = 0; i < toBeOrganized.length; i++) {
    tempRow.push(toBeOrganized[i]);
    if (tempRow.length === rowSize) {
      organizedPatients.push(tempRow);
      tempRow = [];
    }
  }
  return [organizedPatients, remainder];
};

function PatientsListPage() {
  const user = useContext(AuthContext);
  const isOver1300px = useMediaQuery("(min-width:1300px)");
  const rowSize = isOver1300px ? 4 : 3;
  const [patient, setPatient] = useState<patient>({
    Name: "",
    ID: 0,
    PhoneNumber: "",
    CaretakerId: "",
  });
  const [patients, setPatients] = useState<patient[]>([]);

  useEffect(() => {
    console.log("hlekrjhak");
    console.log(user);
    if (user?.user) fetchPatients(setPatients, user?.user);
  }, [user]);

  console.log(patients);

  function onChange<Type extends ChangeType>(e: Type) {
    const newValue = e.currentTarget.value;
    const attributeName = e.currentTarget.name;
    setPatient((prevEve) => ({
      ...prevEve,
      [attributeName]: newValue,
    }));
  }

  const handleNewPatientSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/patient", {
      name: patient.Name,
      caretakerId: user?.user?.uid,
      phoneNumber: patient.PhoneNumber,
    });
  };

  return (
    <div
      style={{
        paddingTop: "3em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Patients</h1>
      <form
        onSubmit={handleNewPatientSubmit}
        style={{
          display: "flex",
          border: "1px black solid",
          padding: "2px",
          maxWidth: "75vw",
          alignSelf: "center",
        }}
      >
        <Input
          placeholder="Patient Name"
          type="text"
          value={patient.Name}
          onChange={onChange}
          name="Name"
          id="name"
        />

        <Input
          type="text"
          value={patient.PhoneNumber}
          onChange={onChange}
          name="PhoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
        />
        <button type="submit">Add Patient</button>
      </form>
      <PatientCardContainer
        rowSize={rowSize}
        patientSets={formatPatients(patients, rowSize)}
      />
      {/* {patients.map((p, i) => {
        return <PatientIndexCard key={i} patient={p} />;
      })} */}
      {/* {patients && <PatientIndexCard patient={patients[0]} />} */}
    </div>
  );
}

export default PatientsListPage;
