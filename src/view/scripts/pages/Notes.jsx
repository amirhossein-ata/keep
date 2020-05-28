import React from "react";
import { Row, Col, Card } from "antd";

const Notes = (props) => {
  return (
    <div>
      <Row justify="center" style={{ marginTop: "2em" }}>
        <Col span={12}>
          {[...Array(10).keys()].map((_, index) => (
            <Card key={index} style={{ marginBottom: "1em" }}>
              <Card.Meta
                title={`note ${index + 1} title`}
                description={`note ${index + 1} description goes here`}
              />
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Notes;
