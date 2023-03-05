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
        extra={
          <a
            style={{ color: "#EEF1F4" }}
            className="card-link"
            href={`/patients/${ID}`}
          >
            More
          </a>
        }
        headStyle={{ background: "#070707", color: "#e6e9ec" }}
        style={{
          width: 275, //make dynamic for responsiveness
          background: "#070707",
          color: "#b3bcc6",
        }}
      >
        <p>Phone #: {PhoneNumber}</p>
      </Card>
    </Space>
  );
}

export default PatientIndexCard;
