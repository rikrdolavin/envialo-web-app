import Image from "next/image";
import { Locale } from "@/models/language";

interface FooterProps {
  lang: Locale["locale"];
  imageUrl: string
}

export default function FooterCustom({ lang,imageUrl }: Readonly<FooterProps>) {
  return (
    <footer className="bg-orange-500 text-white py-8">
      <div className="container mx-auto  px-4">
        {/* Fila 1 */}
        <div className="border-b border-white/40 pb-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold">
                {" "}
                Suscríbete aquí para conocer más de nuestras ofertas
              </h2>
              <p className="text-sm">
                Regístrese ahora para recibir las últimas actualizaciones sobre
                promociones y cupones. ¡No te preocupes, no enviamos spam!
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Suscríbete a nuestro boletín
              </h2>
              <form className="flex mb-2">
                <input
                  type="email"
                  placeholder="Correo electrónico*"
                  className="flex-grow px-2 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-green-700 text-white-600 px-4 py-2 rounded-r-md font-semibold hover:bg-orange-100 transition"
                >
                  Enviar
                </button>
              </form>
              <p className="text-sm text-white/80">
                Rellena este campo obligatorio.<br/><br/>
                Al suscribirte aceptas nuestros <a href="#">Términos y condiciones</a> y <a href="#"> Política de privacidad</a>
              </p>
            </div>
          </div>
        </div>

        {/* Fila 2 */}
        <div className="col-span-2 border-b border-white/40 pb-4 grid grid-cols-2 gap-6">
          <div className="row-span-2" >
            <div className="cursor-pointer">
                      <Image
                        src={imageUrl}
                        alt={""}
                        width={300}
                        height={300}
                        className="object-contain w-full h-40"
                      />
                      <p className="line-clamp-2 my-2"></p>
             </div>
              <div className="col-span-2">
                <div>
                 <p>Lunes a Sábado 8:00 am a 5:00 pm. 
                      +5350800288  
                      </p>
                </div>
                <div>  
                      <p> ¿Necesitas ayuda con tu pedido? 
                      soporte@brincoxpress.com 
                      </p>
                </div>
                    
             </div>
                 
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Recursos</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Ayuda</a>
                </li>
                <li>
                  <a href="#">Soporte</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recursos</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Ayuda</a>
                </li>
                <li>
                  <a href="#">Soporte</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recursos</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Ayuda</a>
                </li>
                <li>
                  <a href="#">Soporte</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fila 3 - Copyright */}
        <div className="col-span-3 text-center text-sm pt-2">
           BrincoXpress ©{new Date().getFullYear()} . Todos los derechos
          reservados
        </div>
      </div>
    </footer>
  );
}
