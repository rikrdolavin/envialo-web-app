"use client";

import { Card, Col, Skeleton, Space } from "antd";

export default function SkeletonProductCard() {
  return (
    <Col className="w-full!">
      <Card
        hoverable
        style={{
          backgroundColor: "gray",
          borderColor: "#333",
        }}
        cover={<Skeleton.Image active />}
      >
        <Card.Meta
          title={
            <span style={{ color: "whitesmoke" }}>
              <Skeleton.Input active />
            </span>
          }
          description={
            <Space orientation="vertical">
              <Skeleton.Input size="small" active />
            </Space>
          }
        />
      </Card>
    </Col>
  );
}
