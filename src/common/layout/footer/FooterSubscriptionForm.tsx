import { Button, Input } from "antd";
import React from "react";



const FooterSubscriptionForm = () => {
  return (
    <div className="flex">
         <Input
          type="text"
          placeholder="Correo electrónico*"
          className="flex-1 xs:w-95 sm:w-95 md:w-200" 
          style={{
            backgroundColor: "white",
            color: "black",
            fontSize: "16px",
            height: "3rem",
            borderRadius: "0.25rem 0 0 0.25rem",
            border: "1px solid #ccc",
            padding: "0.5rem"
          }}
        />

      <Button className="md:w-30"
       style={{
            width: "5rem",
            background: "#11833c",
            color: "white",
            fontSize: "16px",
            borderRadius: "0 0.25rem 0.25rem 0",
            height: "3rem",
            border: "1px solid #ccc",
            padding: "0.5rem",
            cursor: "pointer"
          }}>
        Enviar
      </Button>
    </div>
  );
};

export default FooterSubscriptionForm;
