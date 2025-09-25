"use client";

import { useParams } from "next/navigation";

function UserPage() {
  const { id } = useParams(); // 👈 super simple

  const user = {
    username: "Avinash Kumar",
    email: "avinnash@gmail.com",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">User Profile</h1>

      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center">
        <p className="mb-2 text-lg">
          <span className="font-semibold">ID:</span> {id}
        </p>
        <p className="mb-3 text-lg">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p className="mb-6 text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}

export default UserPage;
