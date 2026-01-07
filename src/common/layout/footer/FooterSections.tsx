import FooterLink from "./FooterLink";

const sections = [
  {
    title: "Servicio al cliente",
    links: [
      { label: "Pagos", href: "/payments" },
      { label: "Entregas", href: "/delivery" },
      { label: "Preguntas Frecuentes", href: "/faq" },
    ],
  },
  {
    title: "Otros",
    links: [
      { label: "Política de privacidad", href: "/privacy-policies" },
      { label: "Términos y condiciones", href: "/terms-conditions" },
      { label: "Política de devoluciones", href: "/returns-and-refunds" },
    ],
  },
  {
    title: "Productos",
    links: [
      { label: "Alimentos y bebidas", href: "#" },
      { label: "Electrodomésticos", href: "#" },
      { label: "Ferretería y Construcción", href: "#" },
      { label: "Aseo y Limpieza", href: "#" },
      { label: "Hogar", href: "#" },
      { label: "Automotriz", href: "#" },
    ],
  },
];

export default function FooterSections() {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <p className="text-[18px]">{section.title}</p>
          {section.links.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </div>
      ))}
    </>
  );
}
