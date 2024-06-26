"use client";

import { useState } from "react";
import ToolLogo from "../../components/ToolLogo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With":"XMLHttpRequest"
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      //uso windows.location.href al posto di router.push perché voglio rimontare la navbar
      window.location.href = "/dashboard";
    } else if (response.status === 401) {
      setErrorMessage("Credenziali errate!");
    } else {
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-xs">
        <ToolLogo />
        <form
          className="bg-gray-100 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              EMAIL
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              PASSWORD
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-blue-700 mb-3">{errorMessage}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-900 hover:bg-black text-white  font-bold py-2 px-4 focus:outline-none focus:shadow transition duration-300"
              type="submit"
            >
              ACCEDI
            </button>
          </div>
        </form>
        <p className="text-center font-bold text-blue-700 text-xs">
          &copy;2024 Alessandro Garanzini X INTER.
        </p>
      </div>
    </div>
  );
}
