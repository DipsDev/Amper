import { Link } from "react-router-dom";

function ServersPage() {
  return (
    <div className="flex flex-row items-center justify-center mt-10">
      <div className="flex flex-row items-center justify-between bg-main-bg w-[50%] py-6 px-4 text-gray-400">
        <div className="flex flex-row items-center justify-start gap-10">
          <h3>CONTAINER NAME</h3>
          <p>RUNNING</p>
          <p>CPU 10%</p>
        </div>
        <Link
          to="/server/random-container/"
          className=" px-4 py-2 border rounded text-white border-gray-400 uppercase hover:brightness-75 transition-all"
        >
          Manage
        </Link>
      </div>
    </div>
  );
}

export default ServersPage;
