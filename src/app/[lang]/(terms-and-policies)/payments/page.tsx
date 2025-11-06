export default async function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-justify leading-relaxed text-gray-800">
      <h1 className="text-2xl font-bold text-center mb-6 uppercase">PAGOS</h1>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. MÉTODOS DE PAGO</h2>
      <p className="mb-4 text-lg">
        ENVIALO acepta pagos con tarjetas de crédito, débito, prepago y
        virtuales, además de métodos de pagos alternativos. Los precios se
        expresan en dólares estadounidenses (USD). ENVIALO no interviene
        ni asume responsabilidad por posibles cargos adicionales aplicados por
        las entidades emisoras. No se aceptan pagos en efectivo.
      </p>

      <p className="mb-4 text-lg">
        La compra solo es confirmada al recibir el pago de la misma.
        Próximamente, ofreceremos nuevas modalidades de pago, incluyendo la
        Billetera Digital ENVIALO para brindar mayor flexibilidad y comodidad a
        nuestros clientes. Los cupones de descuentos no son acumulables y se
        aplican únicamente durante el proceso de pago, siempre que cumplan con
        las condiciones establecidas para cada campaña promocional.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. POLÍTICA DE PAGOS Y SEGURIDAD
      </h2>
      <p className="mb-4 text-lg">
        En ENVIALO, la protección y seguridad de los datos financieros de
        nuestros usuarios es nuestra prioridad. Por ello, hemos implementado
        medidas técnicas y organizativas avanzadas para garantizar la seguridad
        de cada transacción.
      </p>

      <p className="mb-4 text-lg">
        ENVIALO no almacena ni retiene información sensible de tarjetas de
        crédito o débito en sus servidores. Los datos de pago ingresados durante
        el proceso de compra se transfieren directamente a través de pasarelas
        de pago certificadas que cumplen con estándares internacionales de
        seguridad y encriptación.
      </p>

      <p className="mb-4 text-lg">
        Por su seguridad, será necesario ingresar los datos de su tarjeta en
        cada compra. Esta medida evita la retención de información confidencial
        y reduce el riesgo de uso indebido o accesos no autorizados.
      </p>

      <p className="mb-4 text-lg">
        Al utilizar nuestros servicios, usted puede confiar en que su
        información personal y financiera será tratada con la máxima precaución
        y conforme a nuestra Política de Privacidad.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-3">
        2.1 Prevención de fraudes y comunicaciones seguras
      </h3>
      <p className="mb-4 text-lg">
        ENVIALO nunca solicitará por correo electrónico, mensaje de texto o
        llamada telefónica que proporcione información confidencial como
        contraseñas, códigos de verificación o los datos completos de su tarjeta
        bancaria. Si recibe alguna comunicación sospechosa en nombre de ENVIALO,
        le recomendamos no hacer clic en enlaces, no descargar archivos adjuntos
        y reportar inmediatamente el incidente a nuestro equipo de atención al
        cliente.
      </p>

      <p className="mb-4 text-lg">
        Recomendamos verificar siempre que se encuentre navegando en nuestro
        sitio oficial (https://www.envialo.com) antes de ingresar cualquier
        dato. Para su mayor seguridad, mantenga su sistema operativo, navegador
        y antivirus actualizados.
      </p>

      <p className="mb-4 text-lg">
        ENVIALO se reserva el derecho de suspender o cancelar operaciones en
        caso de detectar patrones inusuales, inconsistencias en la información
        proporcionada o indicios de actividades fraudulentas. Estas medidas
        tienen como objetivo proteger tanto al usuario como a la plataforma.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        3. MEDIOS DE PAGO RECHAZADOS
      </h2>
      <p className="mb-4 text-lg">
        Si su pago ha sido rechazado, le recomendamos verificar lo siguiente:
      </p>

      <ul className="list-disc pl-8 mb-4 space-y-1 text-lg">
        <li>
          Que los datos ingresados de su tarjeta (número, fecha de vencimiento,
          CVV y nombre) coincidan exactamente con los registrados en su banco.
        </li>
        <li>
          Que cuente con saldo suficiente o límite de crédito disponible,
          incluyendo posibles cargos por conversión de moneda.
        </li>
        <li>
          Que su banco no haya bloqueado la operación por motivos de seguridad.
        </li>
      </ul>

      <p className="mb-4 text-lg">
        Si el problema persiste, puede intentar con otro método de pago o
        comunicarse con nuestro equipo para recibir asistencia personalizada.
      </p>

      <p className="mb-4 text-lg">
        Importante: Los rechazos de pago dependen en su mayoría de su entidad
        financiera, ya que ENVIALO no procesa ni almacena directamente los datos
        de su tarjeta.
      </p>

      <p className="mb-4 text-lg">
        En ENVIALO valoramos su confianza. Si tiene dudas relacionadas con
        pagos, puede contactarnos por las siguientes vías:
      </p>

      <ul className="list-disc pl-8 mb-4 space-y-1 text-lg">
        <li>
          Chat en línea: Haga clic en el ícono de chat en la esquina inferior
          derecha para comunicarse con un representante en tiempo real.
        </li>
        <li>
          Centro de Ayuda: Consulte nuestra sección de Preguntas Frecuentes o
          escríbanos a nuestro equipo de soporte.
        </li>
      </ul>

      <p className="mb-4 text-lg">¡Estamos aquí para ayudarle!</p>
    </div>
  );
}
