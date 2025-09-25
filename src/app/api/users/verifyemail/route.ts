import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
connectDB()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        console.log("Token received:", token);

        if (!token) {
            return NextResponse.json({ success: false, message: "Token is missing" }, { status: 400 });
        }

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            console.log("User not found with token:", token);
            // Also check if token exists but expired
            const expiredUser = await User.findOne({ verifyToken: token });
            if (expiredUser) {
                console.log("Token found but expired for user:", expiredUser.email);
                return NextResponse.json({
                    message: "Token has expired. Please request a new verification email."
                }, { status: 400 })
            }
            return NextResponse.json({
                message: "Invalid verification token"
            }, { status: 400 })
        }

        console.log("User found, verifying:", user.email)
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        const savedUser = await user.save();
        console.log("User verification saved. isVerified:", savedUser.isVerified);

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
            user: {
                email: savedUser.email,
                isVerified: savedUser.isVerified
            }
        })


    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
