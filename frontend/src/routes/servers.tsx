import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";

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

function ServersPage() {
  const { data } = useQuery({
    queryKey: ["containers"],
    queryFn: async () =>
      await axios.get("http://localhost:8000/api/containers"),
  });
  return (
    <div className="flex flex-row items-center justify-center mt-10">
      {data?.data &&
        data.data.map((v: Container) => {
          return (
            <div
              key={v.Id}
              className="flex flex-row items-center justify-between bg-main-bg w-[50%] py-6 px-4 text-gray-200"
            >
              <div className="flex flex-row items-center justify-start gap-10">
                <h3>{v.Name.substring(1)}</h3>
                <p className="flex items-center justify-center gap-3 uppercase">
                  <Tag
                    severity="warning"
                    pt={{
                      root: {
                        className:
                          "w-2 h-2 rounded-full " +
                          (v.State.Status === "exited"
                            ? "bg-red-600"
                            : v.State.Status === "running"
                            ? "bg-green-400"
                            : "bg-orange-400"),
                      },
                    }}
                  ></Tag>
                  {v.State.Status}
                </p>
                <p>{new Date(v.State.StartedAt).toLocaleString()}</p>
              </div>
              <Link
                to={`/server/${v.Id.substring(0, 13)}/`}
                className=" px-4 py-2 border rounded text-white border-gray-400 uppercase hover:brightness-75 transition-all"
              >
                Manage
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default ServersPage;
