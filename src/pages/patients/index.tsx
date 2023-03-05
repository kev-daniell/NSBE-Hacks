import { patient } from "@/types/Patient";
import PatientCardContainer from "@/components/PatientCardContainer";
import { useMediaQuery } from "@mui/material";
const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };

const seed: patient[] = [
  {
    id: "p001",
    name: "John Doe",
    phoneNumber: "555-1234",
    caretakerId: "c001",
  },
  {
    id: "p002",
    name: "Jane Smith",
    phoneNumber: "555-5678",
    caretakerId: "c002",
  },
  {
    id: "p003",
    name: "Bob Johnson",
    phoneNumber: "555-9012",
    caretakerId: "c003",
  },
  {
    id: "p004",
    name: "Mary Johnson",
    phoneNumber: "555-3456",
    caretakerId: "c003",
  },
  {
    id: "p005",
    name: "David Lee",
    phoneNumber: "555-7890",
    caretakerId: "c001",
  },
  {
    id: "p006",
    name: "Emily Chen",
    phoneNumber: "555-2345",
    caretakerId: "c002",
  },
  {
    id: "p007",
    name: "Michael Davis",
    phoneNumber: "555-6789",
    caretakerId: "c003",
  },
  {
    id: "p008",
    name: "Julia Brown",
    phoneNumber: "555-1234",
    caretakerId: "c001",
  },
  {
    id: "p009",
    name: "Brian Wilson",
    phoneNumber: "555-5678",
    caretakerId: "c002",
  },
  {
    id: "p010",
    name: "Sarah Johnson",
    phoneNumber: "555-9012",
    caretakerId: "c003",
  },
  {
    id: "p011",
    name: "Jason Lee",
    phoneNumber: "555-3456",
    caretakerId: "c001",
  },
  {
    id: "p012",
    name: "Rachel Kim",
    phoneNumber: "555-7890",
    caretakerId: "c002",
  },
  {
    id: "p013",
    name: "Daniel Wu",
    phoneNumber: "555-2345",
    caretakerId: "c003",
  },
  {
    id: "p014",
    name: "Jenny Chen",
    phoneNumber: "555-6789",
    caretakerId: "c001",
  },
  {
    id: "p015",
    name: "Steven Lee",
    phoneNumber: "555-1234",
    caretakerId: "c002",
  },
  {
    id: "p016",
    name: "Grace Wang",
    phoneNumber: "555-5678",
    caretakerId: "c003",
  },
  {
    id: "p017",
    name: "Ethan Davis",
    phoneNumber: "555-9012",
    caretakerId: "c001",
  },
];

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
  const isOver1300px = useMediaQuery("(min-width:1300px)");
  const rowSize = isOver1300px ? 4 : 3;
  return (
    <div
      style={{
        paddingTop: "3em",
        //    display: "flex", justifyContent: "center"
      }}
    >
      <PatientCardContainer
        rowSize={rowSize}
        patientSets={formatPatients(seed, rowSize)}
      />
    </div>
  );
}

export default PatientsListPage;
