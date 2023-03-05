import PatientIndexCard from "./PatientIndexCard";
import { Col, Row } from "antd";
import { patient } from "@/types/Patient";

interface Props {
  patients: patient[];
  rowSize: number;
}

function PatientCardRow({ patients, rowSize }: Props) {
  const fillerCol: any[] = [];
  for (let i = 0; i < rowSize - patients.length; i++) {
    fillerCol.push(
      <Col
        key={i}
        // xs={{ span: 1, offset: 1 }}
        // sm={{ span: 1, offset: 1 }}
        // xl={{ span: 2, offset: 0 }}
      ></Col>
    );
  }
  const isOver700px = true;
  return (
    <Row justify="center">
      {patients.map((p) => (
        <Col
          key={p.ID}
          span={4}
          //   xs={{ span: 1, offset: 1 }}
          //   sm={{ span: 1, offset: 1 }}
          //   xl={{ span: 2, offset: 0 }}
        >
          <PatientIndexCard patient={p} />
        </Col>
      ))}
      {fillerCol}
    </Row>
  );
}

export default PatientCardRow;
