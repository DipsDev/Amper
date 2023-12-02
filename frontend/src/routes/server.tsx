import { Card } from "primereact/card";

import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

function ServerPage() {
  const { containerId } = useParams();

  const footer = (
    <>
      <Button
        label="start"
        disabled
        className="border text-white px-4 py-2 rounded uppercase text-sm disabled:text-gray-400 disabled:border-gray-500"
      />
      <Button
        label="Restart"
        className="border border-gray-400 text-white px-4 py-2 rounded uppercase text-sm hover:brightness-75 transition-all"
      />
      <Button
        label="Stop"
        severity="danger"
        className=" bg-red-500 px-4 py-2 rounded text-white uppercase text-sm hover:bg-red-600 transition-all"
      />
    </>
  );
  return (
    <>
      <div className="flex flex-row items-center justify-center mt-10">
        <Card
          pt={{
            footer: {
              className:
                "flex flex-row items-center justify-center gap-2 px-3 py-2",
            },
          }}
          footer={footer}
          className=" shadow-md bg-[#3E4D5B] rounded text-white w-[300px]"
        >
          <h3 className="bg-[#1E2934] py-3 rounded-t pl-4 font-medium">
            MINECRAFT{" "}
            <span className="text-gray-400 text-sm italic font-normal">
              #{containerId}
            </span>
          </h3>
          <ol className="mt-5 mb-4 ml-4 my-2 flex flex-col items-start justify-center gap-1 text-sm">
            <li>STARTING</li>
            <li>211.19%</li>
            <li>307.02 MB</li>
            <li>164.91 MB</li>
          </ol>
        </Card>
      </div>
    </>
  );
}

export default ServerPage;
