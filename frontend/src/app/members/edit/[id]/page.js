"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ToolLogo from "../../../../components/ToolLogo";
import Link from "next/link";

export default function EditMember(context) {
  const params = useParams();
  const { id } = params;

  const [member, setMember] = useState({
    name: "",
    email: "",
    birthdate: "",
    role: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/members/${id}`)
        .then((response) => response.json())
        .then((data) => setMember(data));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/members/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With":"XMLHttpRequest"
      },
      body: JSON.stringify(member),
    });

    if (response.ok) {
      setIsModalOpen(true);
      console.log("Utente aggiornato!");
    } else {
      console.error("Errore nell'aggiornamento dell'utente");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4">
          <p className="font-bold mt-5 mb-5">
            La modifica è stata salvata con successo.
          </p>
          <Link
            href="/"
            className="bg-blue-900 text-white hover:bg-black mt-3 font-bold py-2 px-4 transition duration-300"
          >
            TORNA ALLA DASHBOARD
          </Link>
          <button
            onClick={onClose}
            className="bg-black text-white font-bold ml-4 py-2 px-4"
          >
            CHIUDI
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">
      <ToolLogo />
      <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-2xl text-white font-semibold mb-6">
          MODIFICA TEAM MEMBER
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nome:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              value={member.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              value={member.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthdate"
            >
              Data di Nascita:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="birthdate"
              name="birthdate"
              value={member.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Ruolo:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="role"
              name="role"
              value={member.role}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-900 hover:bg-black text-white  font-bold py-2 px-4 transition duration-300"
              type="submit"
            >
              AGGIORNA
            </button>
          </div>
        </form>
      </div>
      <Link
        href="/"
        className="bg-white text-blue-900 hover:bg-blue-900 hover:text-white  mt-3 font-bold py-2 px-4 transition duration-300"
      >
        TORNA ALLA DASHBOARD
      </Link>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
