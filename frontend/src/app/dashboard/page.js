"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ToolLogo from "../../components/ToolLogo";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMembers = async (page) => {
      setLoading(true);
      const response = await fetch(`/api/members?page=${page}`);
      const data = await response.json();
      setMembers(data.data);
      setTotalPages(data.last_page);
      setLoading(false);
    };

    fetchMembers(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-10 mb-5 bg-black">
      <ToolLogo />
      <h2 className="text-2xl text-white font-semibold mb-6">TEAM DASHBOARD</h2>

      <div className="container mx-auto p-4">
        <div className="flex flex-col items-end justify-end mb-5">
          <Link
            href={`/members/add`}
            className="bg-white text-blue-800 hover:bg-blue-900 hover:text-white  font-bold py-2 px-4 transition duration-300"
          >
            AGGIUNGI TEAM MEMBER
          </Link>
        </div>
        <table className="min-w-full rounded-lg table-auto shadow-2xl">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Data di Nascita
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ruolo
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.email}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {member.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {member.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {member.birthdate}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {member.role}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <Link
                    href={`/members/edit/${member.id}`}
                    className="bg-blue-900 hover:bg-black text-white  font-bold py-2 px-4 transition duration-300"
                  >
                    MODIFICA
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Precedente
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Successivo
          </button>
        </div>
      </div>
    </div>
  );
}
