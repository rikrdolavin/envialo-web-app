"use client";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsAppButton = () => {
  const phoneNumber = "+50764954941";
  const message = "Hola Brincoxpress 👋🏻, necesito ayuda";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-5 right-5 
        bg-[#11833cff] hover:bg-green-600 
        text-white rounded-full 
        w-14 h-14 
        flex items-center justify-center 
        shadow-lg shadow-green-500/30 
        transition-all duration-300 
        hover:scale-110
        z-50
      "
      aria-label="Contáctanos por WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default FloatingWhatsAppButton;
