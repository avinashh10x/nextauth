import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/userModel"
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


connectDB()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody;

        console.log(reqBody);
        //    check the user exist or not
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "USer doesn't exist" }, { status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 })
        }

        // create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successfull",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}