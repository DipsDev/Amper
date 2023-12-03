import { Menubar } from "primereact/menubar";

function Navbar() {
  return (
    <header className="flex flex-col items-center justify-center w-full">
      <Menubar
        start={<h1 className="font-semibold text-2xl">Amper</h1>}
        pt={{
          root: {
            className:
              "justify-between bg-[#1E2934] text-[#BBCCDC] px-6 py-4 w-full",
          },
        }}
        model={[
          {
            label: "Quit",
          },
        ]}
      />
    </header>
  );
}

export default Navbar;
