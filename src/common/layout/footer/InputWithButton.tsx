import React from "react";

const InputWithButton = () => {
  return (
    <div className="flex">
      <input
        className=" flex-1 bg-white text-black text-[16px] h-12 rounded-tl-sm rounded-bl-sm  border border-[#ccc] p-2 xs:w-95 sm:w-95 md:w-95"
        type="text"
        placeholder="Correo electrónico*"
      />
      <button className=" w-20 bg-[#11833cff] text-white text-[16px] rounded-tr-sm rounded-br-sm h-12  border border-[#ccc] p-2 cursor-pointer md:w-30">
        Enviar
      </button>
    </div>
  );
};

export default InputWithButton;
