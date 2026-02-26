import Image from "next/image";
import { Divider } from "antd";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import FaceBookIcon from "../icons/FaceBookIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import TelegramIcon from "../icons/TelegramIcon";
import FooterSections from "./footer/FooterSections";
import FooterSubscriptionForm from "./footer/FooterSubscriptionForm";
import { useLang } from "@/context/LangContext";

export default function FooterCustom() {
  const { dictionary: dictionaries } = useLang();
  const footer = dictionaries.footer;
  return (
    <footer>
      <div className="flex flex-col transition-shadow bg-[#EB593D] text-white gap-2 px-3 py-10">
        <div className="max-w-[1420px] mx-auto">
          <div className="flex justify-between flex-wrap gap-4 md:gap-25 md:flex-nowrap lg:gap-35">
            <div className="flex flex-col">
              <p className="text-[20px]">
                <b>{footer.subcribe.title}</b>
              </p>
              <p>{footer.subcribe.subtitle}</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <FooterSubscriptionForm></FooterSubscriptionForm>
              <p>{footer.subcribe.form_subtitle}</p>
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
                      {footer.subcribe.support.schedule}
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
                      {footer.subcribe.support.help_message}
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
            <p>BrincoExpress &copy; 2025. {footer.copyright}</p>
          </section>
        </div>
      </div>
    </footer>
  );
}
