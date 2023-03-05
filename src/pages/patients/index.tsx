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
import { Input, Button } from "antd";

const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };

async function fetchPatients(cb: Function, user: User) {
  if (user) {
    const res = await axios.get(
      `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/all/${user.uid}`
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
  const rowSize = isOver1300px ? 3 : 2;
  const [patient, setPatient] = useState<patient>({
    Name: "",
    ID: 0,
    PhoneNumber: "",
    CaretakerId: "",
  });
  const [patients, setPatients] = useState<patient[]>([]);

  useEffect(() => {
    if (user?.user) fetchPatients(setPatients, user?.user);
  }, [user]);

  function onChange<Type extends ChangeType>(e: Type) {
    const newValue = e.currentTarget.value;
    const attributeName = e.currentTarget.name;
    setPatient((prevEve) => ({
      ...prevEve,
      [attributeName]: newValue,
    }));
  }

  const handleNewPatientSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await axios.post(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/patient`, {
      name: patient.Name,
      caretakerId: user?.user?.uid,
      phoneNumber: patient.PhoneNumber,
    });
    if (user?.user) {
      fetchPatients(setPatients, user.user);
      setPatient({ Name: "", ID: 0, PhoneNumber: "", CaretakerId: "" });
    }
  };

  return (
    <div
      style={{
        paddingTop: "3em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginLeft: "5em" }}>Patients</h1>
      <form
        onSubmit={handleNewPatientSubmit}
        style={{
          display: "flex",
          border: "1px grey solid",
          borderRadius: "1em",
          padding: "20px 30px",
          maxWidth: "75vw",
          alignSelf: "start",
          marginLeft: "10em",
          marginTop: "2em",
          marginBottom: "2em",
        }}
      >
        <Input
          placeholder="Patient Name"
          type="text"
          value={patient.Name}
          onChange={onChange}
          name="Name"
          id="name"
          style={{ marginRight: "3em" }}
        />

        <Input
          type="text"
          value={patient.PhoneNumber}
          onChange={onChange}
          name="PhoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          style={{ marginRight: "3em" }}
        />
        <Button onClick={handleNewPatientSubmit} type="primary">
          Add Patient
        </Button>
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
