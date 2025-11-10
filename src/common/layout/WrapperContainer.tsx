import { ReactNode, HTMLAttributes } from "react";

interface WrapperContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function WrapperContainer({
  children,
  className,
  ...rest
}: Readonly<WrapperContainerProps>) {
  return (
    <div className={`max-w-[1460px] ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
}
