import { Card, Space, theme } from "antd";
import { patient } from "@/types/Patient";

interface Props {
  patient: patient;
}

function PatientIndexCard({ patient }: Props) {
  const bgColor: string = "#000000";
  const { phoneNumber, name, id } = patient;
  return (
    <Space direction="vertical" size={16}>
      <Card
        size="small"
        title={name}
        extra={<a href={`/details/${id}`}>More</a>}
        headStyle={{ color: "#e6e9ec" }}
        style={{
          width: 200, //make dynamic for responsiveness
          backgroundColor: bgColor,
          color: "#b3bcc6",
        }}
      >
        <p>Phone #: {phoneNumber}</p>
      </Card>
    </Space>
  );
}

export default PatientIndexCard;
