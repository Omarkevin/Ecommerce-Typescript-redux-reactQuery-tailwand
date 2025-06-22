import logo from "../../pics/logo2.jpg";
export default function Navbar() {
  return (
    <div className="w-full h-15 py-4 px-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
      <img
        src={logo}
        alt="Logo"
        className="rounded-full w-20 h-20 object-cover shadow-md border-2 border-white"
      />
    </div>
  );
}
