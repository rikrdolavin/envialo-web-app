import React from "react";


const FilterIcon = ({
  fill = "#2c8254",
  size = 20,
  bg,
  style = {},
  className,
}: {
  fill?: string;
  size?: number;
  bg?: string;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={
        bg
          ? {
              background: bg,
              borderRadius: "50%",
              padding: "3px",
              ...style,
            }
          : style
      }
    >
      <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 .8 1.6l-6.4 8.53V20a1 1 0 0 1-1.45.89l-2-1A1 1 0 0 1 9 19V13.14L2.2 5.6A1 1 0 0 1 3 4z" />
    </svg>
  );
};

export default FilterIcon;
