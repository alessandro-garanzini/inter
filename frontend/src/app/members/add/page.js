"use client";

import { useState } from "react";
import ToolLogo from "../../../components/ToolLogo";
import Link from "next/link";

export default function CreateMember() {
  const [member, setMember] = useState({
    name: "",
    email: "",
    birthdate: "",
    role: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (confirm("Sei sicuro di voler aggiungere questo team member? Verrá inviata una email a: "+member.email)) {
    const response = await fetch(`/api/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With":"XMLHttpRequest"
      },
      body: JSON.stringify(member),
    });

    if (response.ok) {
      setIsModalOpen(true);
      console.log("Membro creato!");
    } else {
      console.error("Errore nella creazione del membro");
      setErrorMessage("Si è verificato un errore");
    }
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
            Il team member é stato aggiunto con successo.
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
          CREA NUOVO TEAM MEMBER
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {errorMessage && <p className="text-blue-700 mb-3">{errorMessage}</p>}
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-900 hover:bg-black text-white font-bold py-2 px-4 transition duration-300"
              type="submit"
            >
              CREA
            </button>
          </div>
        </form>
      </div>
      <Link
        href="/"
        className="bg-white text-blue-900 hover:bg-blue-900 hover:text-white mt-3 mb-3 font-bold py-2 px-4 transition duration-300"
      >
        TORNA ALLA DASHBOARD
      </Link>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
