import { Menubar } from "primereact/menubar";
import { TabMenu } from "primereact/tabmenu";
import { classNames } from "primereact/utils";
import React from "react";

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
      <TabMenu
        pt={{
          root: {
            className:
              "bg-[#3E4D5B] w-full px-6 py-5 flex flex-row items-center justify-center md:justify-start",
          },
          menu: {
            className: "flex flex-row items-center gap-4",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          action: ({ context, state }: any) => ({
            className: classNames({
              "text-[#99A4AD]": state.activeIndex !== context.index,
              "text-gray-200": state.activeIndex === context.index,
            }),
          }),
        }}
        model={[
          {
            label: "Console",
          },
          {
            label: "File Manager",
          },
          {
            label: "Settings",
          },
        ]}
      />
    </header>
  );
}

export default Navbar;
