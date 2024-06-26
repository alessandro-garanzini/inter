import Image from "next/image";
import { cookies } from "next/headers";

export default function Navbar() {
  const cookieStore = cookies();
  const auth_token = cookieStore.get("auth_token");

  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                <Image src="/logo.png" alt="logo" width={50} height={50} />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="/dashboard"
                className="py-2 px-2 text-black hover:text-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-30"
              >
                DASHBOARD
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
