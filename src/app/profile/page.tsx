"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ProfilePage() {


  const [user, setUser] = useState({
    _id: "123",
    username: "Avinash Kumar",
    email: "avinnash@gmail.com",
  })

  const router = useRouter()
  const handleLogout = async () => {
    try {

      await axios.get('/api/users/logout')

      toast.success("logout succesfully")
      router.replace('/login')


    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(error.message)
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setUser(res.data.data)
  }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">Profile</h1>

      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center transform hover:scale-105 transition duration-300">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold uppercase">
            {user.username.charAt(0)}
          </div>
        </div>

        <button onClick={getUserDetails}>click me to get data</button>
        <p>
        <Link href={`/profile/${user._id}`}>hh</Link>
        </p>
       

        <p className="mb-3 text-lg">
          <span className="font-semibold">ID:</span> {user._id}
        </p>
        <p className="mb-3 text-lg">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p className="mb-6 text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 py-2 px-6 rounded-full hover:bg-red-600 transition duration-200 font-semibold shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
