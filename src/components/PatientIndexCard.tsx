import { Card, Space, theme } from "antd";
import { patient } from "@/types/Patient";

interface Props {
  patient: patient;
}

function PatientIndexCard({ patient }: Props) {
  const bgColor: string = "#000000";
  const { PhoneNumber, Name, ID } = patient;
  return (
    <Space direction="vertical" size={16}>
      <Card
        size="small"
        title={Name}
        extra={<a href={`/patients/${ID}`}>More</a>}
        headStyle={{ color: "#e6e9ec" }}
        style={{
          width: 200, //make dynamic for responsiveness
          backgroundColor: bgColor,
          color: "#b3bcc6",
        }}
      >
        <p>Phone #: {PhoneNumber}</p>
      </Card>
    </Space>
  );
}

export default PatientIndexCard;
