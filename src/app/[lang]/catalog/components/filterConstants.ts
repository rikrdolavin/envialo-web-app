// Static data constants - defined outside component to prevent recreation on every render
export const RATING_ROWS = [5, 4, 3, 2, 1];

export const PROMOTION_OPTIONS = [
  "Productos recientes",
  "Productos en oferta",
  "Productos con entrega gratis",
] as const;

export const CATEGORIES = [
  { href: "/categoria/alimentos", label: "Alimentos y Bebidas" },
  { href: "/categoria/electrodomesticos", label: "Electrodomésticos" },
  { href: "/categoria/ferreteria", label: "Ferretería y Construcción" },
  { href: "/categoria/aseo", label: "Aseo y Limpieza" },
  { href: "/categoria/hogar", label: "Hogar" },
  { href: "/categoria/automotriz", label: "Automotriz" },
] as const;

// Style constants
export const BADGE_STYLE = {
  backgroundColor: "#eb5a3d",
  width: "26px",
  height: "26px",
  borderRadius: "9999px",
  boxShadow: "0 0 4px rgba(0,0,0,0.2)",
  right: "-7px",
  top: "-13px",
} as const;

export const EXPAND_ICON_STYLE = {
  fontSize: "22px",
  color: "#757575",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  lineHeight: "22px",
  transition: "transform 0.25s ease",
  textShadow: `
    0.3px 0 0 #757575,
    -0.3px 0 0 #757575,
    0 0.3px 0 #757575,
    0 -0.3px 0 #757575
  `,
} as const;
