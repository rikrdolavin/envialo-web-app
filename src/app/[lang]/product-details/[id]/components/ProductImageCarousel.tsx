"use client";

import Image from "next/image";

interface ProductImagesProps {
  listImages: string[];
}

export default function ProductImagesCarousel({
  listImages,
}: Readonly<ProductImagesProps>) {
  return (
    <div className="flex flex-col h-full">
      <div className="cursor-pointer">
        <Image
          src={listImages[0]}
          width={300}
          height={300}
          className="object-contain w-full h-40"
          alt="product"
        />
      </div>
    </div>
    /*<div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
    
    </div>*/
  );
}
