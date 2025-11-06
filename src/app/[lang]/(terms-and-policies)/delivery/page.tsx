export default async function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-justify leading-relaxed text-gray-800">
      <h1 className="text-2xl font-bold text-center mb-6 uppercase">
        ENTREGAS
      </h1>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        1. POLÍTICA DE ENTREGA
      </h2>
      <p className="mb-4 text-lg">
        Al realizar el pedido, el cliente deberá proporcionar los datos del
        destinatario, la dirección de entrega y un número de contacto. Los datos
        de teléfono y/o dirección electrónica del destinatario, ingresados por
        el cliente en la ficha del destinatario, podrán ser utilizados por el
        transportista o el equipo de gestión para coordinar el horario de
        entrega y otros detalles del servicio con el destinatario. Una vez
        confirmada la orden, el envío se realizará dentro del horario
        establecido y en el plazo acordado, entregándose directamente en la
        puerta del domicilio indicado. El equipo de transporte se comunicará
        mediante vía telefónica (llamada o mensaje) con el destinatario
        correspondiente a cada orden para confirmar la dirección, informar sobre
        el estado del pedido y asegurar una entrega exitosa del mismo.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. DOMICILIO</h2>
      <p className="mb-4 text-lg">
        En el momento que la orden sea entregada en su domicilio es deber del
        destinatario revisar de conjunto con el transportista que los productos
        y las cantidades declaradas en la factura coincidan con la mercancía
        recibida. Si existe algún faltante de alguno de los productos de la
        orden en la factura entregada por el transportista, esto deberá ser
        reflejado en las notas de la factura (asegúrese de informarlo al
        transportista y reportar el incidente) y firmar el resto del pedido.
      </p>

      <p className="mb-4 text-lg">
        Una vez que la factura haya sido firmada y aceptada por el destinatario
        no se aceptarán reclamaciones por faltante de productos que no fueron
        reflejados en la misma.
      </p>

      <p className="mb-4 text-lg">
        En el caso de que una orden no pueda ser entregada por la ausencia del
        beneficiario en su domicilio, esto será notificado al cliente y
        regresará a nuestros centros de distribución para ser reprogramada la
        entrega. Dado el caso de que la orden no pueda ser entregada en un plazo
        de 3 días procede a ser cancelada. Todo con previa coordinación con el
        cliente.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. ENTREGAS</h2>
      <p className="mb-4 text-lg">
        Una entrega total se realiza cuando todos los productos del pedido están
        disponibles y pueden enviarse juntos en un único envío a la dirección
        indicada, siempre que no incluyan artículos como electrodomésticos o
        productos pesados que requieran logística diferenciada. Por otro lado,
        la entrega parcial ocurre cuando parte de los productos necesita un
        manejo específico por su tipo o tamaño; en este caso, se envía primero
        lo disponible y se informa al cliente sobre los artículos pendientes,
        que se gestionarán posteriormente.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        4. ENTREGAS A PERSONAS ALTERNATIVAS
      </h2>
      <p className="mb-4 text-lg">
        Si el destinatario no está presente en el momento de la entrega, la
        orden puede ser entregada a vecinos, amigos u otras personas siempre y
        cuando recibamos previa autorización por parte del cliente o
        destinatario. Preferiblemente solicitaremos una copia o foto de la
        identificación de la persona que recibe. Esta persona debe revisar la
        orden y firmar, no nos hacemos responsables de faltantes o daños a
        simple vista que no hayan sido reportados al momento de la entrega.
      </p>

      <p className="mb-4 text-lg">
        Las personas designadas para recibir una entrega en su domicilio deben
        poseer todas las facultades mentales para lo mismo, se evita la entrega
        a personas que cumplan los siguientes casos: discapacidad mental, bajo
        el consumo de alcohol o drogas o menores de edad. Para el caso de
        personas con discapacidad física o motora el equipo se encargará de
        asistir adecuadamente para que la entrega se haga de forma segura.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        5. ERRORES EN LAS ÓRDENES
      </h2>
      <p className="mb-4 text-lg">
        Las órdenes se pueden retener temporalmente si la información del
        destinatario (dirección y nombre de entrega) aportada es incorrecta,
        estas pueden seguir su curso una vez que sean corregidos estos errores y
        se proporcione la información correcta. Si la información suministrada
        por el cliente está incompleta o no es suficiente para realizar la
        entrega de forma segura, la orden puede ser cancelada y el dinero
        devuelto al comprador.
      </p>

      <p className="mb-4 text-lg">
        Para evitar fraudes y/o usos indebidos de tarjetas de crédito, nos
        atribuimos el derecho de retardar la entrega de los productos y/o
        servicios hasta se verifique la autenticidad de la compra y, en caso de
        considerarlo oportuno, profundizará en el origen de cualquier
        transacción realizada en el sitio, según lo establecido en las
        regulaciones internas de la empresa.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. PRECIOS DE ENVÍO</h2>
      <p className="mb-4 text-lg">
        Todos los productos que se ofertan en ENVIALO cuentan con servicio a
        domicilio dentro de todo Panamá y tiene un costo de 7 usd, a excepción
        de los materiales de la construcción de gran volumen de tamaño (se
        encuentra especificado en la descripción de cada producto) que sólo
        tendrán recogida en almacén.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        7. RECOGIDA EN ALMACÉN
      </h2>
      <p className="mb-4 text-lg">
        Los productos que tienen esta modalidad (se especifica a la hora de la
        compra) son aquellos que tienen un gran volumen como los materiales de
        la construcción. Estos deben ser recogidos en nuestros almacenes, a
        partir de las 24 horas de realizada la orden en los horarios de 9:00 am
        a 3:00 pm con previa coordinación con nuestro equipo logístico.
      </p>
    </div>
  );
}
