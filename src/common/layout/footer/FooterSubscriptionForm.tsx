import { Button, Input } from "antd";

const FooterSubscriptionForm = () => {
  return (
    <div className="flex items-center w-auto xs:w-60 sm:w-70 lg:w-120">
      <Input
        className="flex-1 w-auto"
        type="text"
        placeholder="Correo electrónico*"
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: "16px",
          height: "3rem",
          borderRadius: "0.25rem 0 0 0.25rem",
          border: "1px solid #ccc", //,
          //padding: "0.5rem"
        }}
      />

      <Button
        className="md:w-auto"
        style={{
          width: "5rem",
          background: "#11833c",
          color: "white",
          fontSize: "16px",
          borderRadius: "0 0.25rem 0.25rem 0",
          height: "3rem",
          border: "1px solid #ccc",
          padding: "0.5rem",
          cursor: "pointer",
        }}
      >
        Enviar
      </Button>
    </div>
  );
};

export default FooterSubscriptionForm;
