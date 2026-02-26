"use client";

import { Card, Skeleton, Space } from "antd";

export default function SkeletonProductCard() {
  return (
    <Card
      hoverable
      style={{
        backgroundColor: "gray",
        borderColor: "#333",
      }}
      cover={<Skeleton.Image active className="h-32" />}
    >
      <Card.Meta
        title={
          <span style={{ color: "whitesmoke" }}>
            <Skeleton.Input size="small" block active />
          </span>
        }
        description={
          <Space orientation="vertical" className="w-full">
            <Skeleton.Input size="small" block active />
            <Skeleton.Input size="small" block active />
            <Skeleton.Input block active className="mt-20" />
          </Space>
        }
      />
    </Card>
  );
}
