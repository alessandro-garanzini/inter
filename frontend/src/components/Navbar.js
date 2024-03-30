import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                <Image src="/logo.png" alt="" width={50} height={50} />
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
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/login"
              className="py-2 px-2 font-medium text-blue-700 hover:text-black hover:border-b-2 hover:border-black transition duration-300"
            >
              LOG IN
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
