"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Stato per il messaggio di errore
  const router = useRouter(); // Crea un'istanza di useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Resetta il messaggio di errore ad ogni tentativo

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Login successful!");
      router.push('/dashboard')
    } else if (response.status === 401) {
      console.log("Login failed!");
      setErrorMessage("Credenziali errate!");
    } else {
      // Gestisci altri possibili stati di errore
      console.log("Errore sconosciuto durante il login");
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {" "}
      <div className="w-full max-w-xs">
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
            />
          </div>
          {errorMessage && (
            <p className="text-blue-700 mb-3">{errorMessage}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-900 hover:bg-black text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow"
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
