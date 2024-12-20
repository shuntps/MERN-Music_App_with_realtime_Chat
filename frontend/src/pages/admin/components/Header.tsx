import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/" className="rounded-lg">
          <img src="/spotify.png" alt="" className="size-10 text-black" />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="mt-1 text-zinc-400">Manage your music library</p>
        </div>
      </div>
      <div className="-mt-5 mr-3 flex">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-12",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;
