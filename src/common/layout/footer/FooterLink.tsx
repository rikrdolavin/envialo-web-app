import Link from "next/link";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <p className=" ps-[22px] pr-1 hover:bg-gray-600/10 hover:cursor-pointer">
      {" "}
      <Link className="text-white! " href={href} passHref>
        {children}
      </Link>{" "}
    </p>
  );
}
