import Link from "next/link";

interface LinkButtonProps {
  url: string;
  text: string;
  className?: string;
}

export default function LinkButton({
  url,
  text,
  className = "",
}: Readonly<LinkButtonProps>) {
  return (
    <Link
      className={`bg-brinco! h-auto w-[150px] flex hover:bg-olive-700 text-white! text-[17px] justify-center py-2 px-6 rounded-full transition-all duration-200 ${className}`}
      href={url}
    >
      <p className="m-0 p-0">{text}</p>
    </Link>
  );
}
