"use client";

import { Pagination as AntdPagination } from "antd";
import { useCallback } from "react";

interface PaginationItemProps {
  page: number;
  isActive: boolean;
}

const PaginationItem = ({ page, isActive }: PaginationItemProps) => (
  <div
    className={`flex items-center justify-center w-full h-full rounded-full ${
      isActive ? "bg-brinco text-white" : "bg-transparent text-black"
    }`}
  >
    {page}
  </div>
);

interface PaginationProps {
  page: number;
  totalCount: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page: currentPage,
  totalCount,
  pageSize,
  onChange,
}: Readonly<PaginationProps>) {
  const itemRender = useCallback(
    (
      page: number,
      type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
      originalElement: React.ReactNode,
    ) => {
      if (type === "page") {
        return <PaginationItem page={page} isActive={page === currentPage} />;
      }
      return originalElement;
    },
    [currentPage],
  );

  return (
    <AntdPagination
      current={currentPage}
      total={totalCount}
      pageSize={pageSize}
      showSizeChanger={false}
      styles={{
        item: {
          borderRadius: 999,
          background: "transparent",
          border: "none",
        },
      }}
      itemRender={itemRender}
      onChange={onChange}
    />
  );
}
