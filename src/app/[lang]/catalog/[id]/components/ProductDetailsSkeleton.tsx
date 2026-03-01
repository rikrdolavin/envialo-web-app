import { Skeleton } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";

export default function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full lg:max-w-6xl mx-auto">
      <div className="md:sticky md:top-20 md:self-start">
        <SkeletonImage
          active
          styles={{
            content: { minWidth: 500, aspectRatio: "1", height: "auto" },
          }}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    </div>
  );
}
