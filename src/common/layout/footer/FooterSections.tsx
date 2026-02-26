import { useLang } from "@/context/LangContext";
import FooterLink from "./FooterLink";

export default function FooterSections() {
  const { dictionary: dictionaries } = useLang();
  const footerSections = (dictionaries as any).footer.links;

  const sections = [
    {
      title: footerSections.section1.title,
      links: [
        { label: footerSections.section1.link1, href: "/payments" },
        { label: footerSections.section1.link2, href: "/delivery" },
        { label: footerSections.section1.link3, href: "/faq" },
      ],
    },
    {
      title: footerSections.section2.title,
      links: [
        { label: footerSections.section2.link1, href: "/privacy-policies" },
        { label: footerSections.section2.link2, href: "/terms-conditions" },
        { label: footerSections.section2.link3, href: "/returns-and-refunds" },
      ],
    },
    {
      title: footerSections.section3.title,
      links: [
        { label: footerSections.section3.link1, href: "#" },
        { label: footerSections.section3.link2, href: "#" },
        { label: footerSections.section3.link3, href: "#" },
        { label: footerSections.section3.link4, href: "#" },
      ],
    },
  ];

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
