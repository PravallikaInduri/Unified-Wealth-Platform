export default function Navbar() {

  return (
    <div className="
      flex
      justify-between
      items-center
      mb-10
    ">

      <div>

        <h1 className="
          text-4xl
          font-bold
          text-white
        ">
          Admin Dashboard
        </h1>

        <p className="
          text-gray-400
          mt-2
        ">
          Real-time wealth platform monitoring
        </p>

      </div>

      <div className="
        w-12
        h-12
        rounded-full
        bg-indigo-500
        flex
        items-center
        justify-center
        text-white
        font-bold
      ">
        A
      </div>

    </div>
  );
}
