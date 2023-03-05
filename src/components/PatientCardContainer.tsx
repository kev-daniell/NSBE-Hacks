import { patient } from "@/types/Patient";
import PatientCardRow from "./PatientCardRow";
interface PatientCardContainerProps {
  patientSets: [patient[][], patient[] | null];
  rowSize: number;
}

function PatientCardContainer({
  patientSets,
  rowSize,
}: PatientCardContainerProps) {
  return (
    <div>
      {patientSets[0].map((patRow, i) => (
        <PatientCardRow key={i} rowSize={rowSize} patients={patRow} />
      ))}
      {patientSets[1] && (
        <PatientCardRow rowSize={rowSize} patients={patientSets[1]} />
      )}
    </div>
  );
}

export default PatientCardContainer;
