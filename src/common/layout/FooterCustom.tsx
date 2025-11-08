import Image from "next/image";
import { Locale } from "@/models/language";
import { Divider } from "antd";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import FaceBookIcon from "../icons/FaceBookIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import TelegramIcon from "../icons/TelegramIcon";
import FooterSections from "./footer/FooterSections";
import FooterSubscriptionForm from "./footer/FooterSubscriptionForm";

interface FooterProps {
  lang: Locale["locale"];
}

export default function FooterCustom({ lang }: Readonly<FooterProps>) {
  return (
    <footer>
      <div className="flex flex-col transition-shadow bg-[#EB593D] text-white gap-2 px-3 py-10">
        <div className="max-w-[1420px] mx-auto">
          <div className="flex justify-between flex-wrap gap-4 md:gap-25 md:flex-nowrap lg:gap-35">
            <div className="flex flex-col">
              <p className="text-[20px]">
                <b>Suscríbete aquí para conocer más de nuestras ofertas</b>
              </p>
              <p>
                Regístrese ahora para recibir las últimas actualizaciones sobre
                promociones y cupones. !No te preocupes, no enviamos spam!
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <FooterSubscriptionForm></FooterSubscriptionForm>
              <p>
                Al suscribirte aceptas nuestros Términos y condiciones y
                Política de privacidad
              </p>
            </div>
          </div>

          <Divider className="bg-white h-px" />

          <div className="flex flex-wrap justify-between md:flex-nowrap">
            <div className="flex flex-col gap-5 pl-5 text-[17px] sm:gap-11">
              <div style={{ color: "white" }}>
                <Image
                  src="/assets/footer.webp"
                  alt="Logo"
                  width={300}
                  height={90}
                />
              </div>
              <div className="text-[18px]">
                <p>Donde estés</p>
              </div>
              <div className="flex flex-col justify-start sm:items-center gap-5 sm:flex-row sm:mx-0 mx-auto">
                <div className="flex justify-start gap-2">
                  <PhoneIcon />

                  <div className="text-white">
                    <p className="text-[14px]">
                      Lunes a sábado 8:00 am a 5:00 pm
                    </p>

                    <p className="text-[18px]">
                      <b>+5350800288</b>
                    </p>
                  </div>
                </div>

                <div className="flex justify-start gap-2">
                  <MailIcon />

                  <div>
                    <p className="text-[14px]">
                      Necesitas ayuda con tu pedido?
                    </p>

                    <p className="text-[18px]">
                      <b>soporte@brincoxpress.com</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-start text-[15px] pl-5 gap-3 pr-13 pt-6 sm:gap-10">
              <FooterSections />
            </div>
          </div>

          <div className="flex justify-start gap-4 pl-5 mr-2 sm:justify-end sm:items-end">
            <FaceBookIcon />
            <WhatsAppIcon />
            <TelegramIcon />
          </div>

          <Divider className="bg-white h-px" />

          <section className="flex justify-center text-center items-center text-[15px]">
            <p>BrincoExpress &copy; 2025. Todos los derechos reservados</p>
          </section>
        </div>
      </div>
    </footer>
  );
}
