"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");

    const [verified, setVerified] = useState(false)

    const [error, setError] = useState(false)

    const verifyUserEmail = useCallback(async () => {
        if (!token) return;

        try {
            console.log("Attempting to verify with token:", token);
            const response = await axios.post('/api/users/verifyemail', { token })
            console.log("Verification response:", response.data);
            setVerified(true)

        } catch (error: any) {
            setError(true)
            console.log("Verification error:", error.response?.data || error.message)
        }
    }, [token])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const urlToken = urlParams.get("token")
        setToken(urlToken || "")
        console.log("Token from URL:", urlToken);

    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token, verifyUserEmail])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token} ` : "no token"}
            </h2>
            {verified && (
                <div>
                    <h2>Email verified</h2>
                    <Link href={"/login"} >Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">error</h2>

                </div>
            )}

        </div>
    )

}