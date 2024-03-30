// pages/members/edit/[id].js
"use client"
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

export default function EditMember(context) {
  const params = useParams();
  const { id } = params;

  const [member, setMember] = useState({
    name: '',
    email: '',
    birthdate: '',
    role: '',
  });

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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    if (response.ok) {
      console.log("Utente aggiornato!")
    } else {
      console.error('Errore nell\'aggiornamento dell\'utente');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  return (
<div className="max-w-xl mx-auto mt-10">
  <h2 className="text-2xl font-semibold mb-6">Modifica Utente</h2>
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Nome:
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" name="name" value={member.name} onChange={handleChange} />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email:
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" name="email" value={member.email} onChange={handleChange} />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthdate">
        Data di Nascita:
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="birthdate" name="birthdate" value={member.birthdate} onChange={handleChange} />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
        Ruolo:
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="role" name="role" value={member.role} onChange={handleChange} />
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Aggiorna
      </button>
    </div>
  </form>
</div>

  );
}
