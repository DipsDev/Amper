import { Card } from "primereact/card";

import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";

import { TabMenu } from "primereact/tabmenu";
import { classNames } from "primereact/utils";
import { Tag } from "primereact/tag";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface Container {
  Id: string;
  Created: string;
  Name: string;
  State: {
    Dead: boolean;
    Error: string;
    ExitCode: number;
    Running: boolean;
    StartedAt: string;
    Status: string;
  };
}

function ServerPage() {
  const navigate = useNavigate();
  const { containerId } = useParams();
  const { data, status } = useQuery<{
    data: Container;
  }>({
    queryKey: ["container", containerId],
    queryFn: async ({ queryKey }) =>
      await axios.get(`http://localhost:8000/api/containers/${queryKey[1]}`),
  });

  useEffect(() => {
    if (status === "error") {
      navigate("/");
    }
  }, [status, navigate]);

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-3xl font-semibold text-white">Loading Server...</h2>
        <p className="text-lg font-medium text-gray-300">
          Is this server a real thing?
        </p>
      </div>
    );
  }

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
      <TabMenu
        pt={{
          root: {
            className:
              "bg-main-bg w-full px-6 py-5 flex flex-row items-center justify-center md:justify-start",
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
            url: `/server/${containerId}/`,
          },
          {
            label: "File Manager",
            url: `/server/${containerId}/file-manager`,
          },
          {
            label: "Settings",
            url: `/server/${containerId}/settings`,
          },
        ]}
      />
      <div className="flex flex-row items-center justify-center mt-10">
        <Card
          pt={{
            footer: {
              className:
                "flex flex-row items-center justify-center gap-2 px-3 py-2",
            },
          }}
          footer={footer}
          className=" shadow-md bg-main-bg rounded text-white w-[300px]"
        >
          <h3 className="bg-main-bg-darker py-3 rounded-t pl-4 font-medium">
            {data?.data.Name.substring(1)}{" "}
            <span className="text-gray-400 text-sm italic font-normal">
              #{containerId}
            </span>
          </h3>
          <ol className="mt-5 mb-4 ml-4 my-2 flex flex-col items-start justify-center gap-1 text-sm">
            <li className="flex items-center justify-center gap-3 uppercase">
              <Tag
                severity="warning"
                pt={{
                  root: {
                    className:
                      "w-2 h-2 rounded-full " +
                      (data?.data.State.Status === "exited"
                        ? "bg-red-600"
                        : data?.data.State.Status === "running"
                        ? "bg-green-400"
                        : "bg-orange-400"),
                  },
                }}
              ></Tag>
              {data?.data.State.Status}
            </li>
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
