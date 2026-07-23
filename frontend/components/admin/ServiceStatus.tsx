export default function ServiceStatus() {

  const services = [
    {
      name: "Gateway Service",
      status: "Running",
    },
    {
      name: "Equity Service",
      status: "Running",
    },
    {
      name: "MF Service",
      status: "Running",
    },
  ];

  return (
    <div className="
      bg-white/5
      border
      border-white/10
      rounded-3xl
      p-6
      backdrop-blur-xl
    ">

      <h2 className="
        text-2xl
        font-bold
        text-white
        mb-6
      ">
        Service Status
      </h2>

      <div className="
        space-y-4
      ">

        {services.map((service, index) => (

          <div
            key={index}
            className="
              flex
              justify-between
              items-center
              bg-white/5
              p-4
              rounded-2xl
            "
          >

            <p className="
              text-white
            ">
              {service.name}
            </p>

            <span className="
              text-green-400
              font-semibold
            ">
              {service.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}