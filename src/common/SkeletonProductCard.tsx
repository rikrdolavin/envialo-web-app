"use client";

import { Card, Skeleton, Space } from "antd";

interface SkeletonProductCardProps {
  wFull?: boolean;
}

export default function SkeletonProductCard({
  wFull,
}: Readonly<SkeletonProductCardProps>) {
  return (
    <Card
      hoverable
      style={{
        backgroundColor: "gray",
        // borderColor: "#333",
      }}
      cover={
        <Skeleton.Image
          active
          className={`h-36 ${wFull ? "w-full" : "w-96"}`}
        />
      }
      styles={{ body: { background: "white" } }}
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
          </Space>
        }
      />
    </Card>
  );
}
