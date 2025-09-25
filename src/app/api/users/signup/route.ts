import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/model/userModel"
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



connectDB()


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody

        console.log(reqBody);

        // check if user alreasy exist

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({ message: "Used created successfully", success: true, savedUser }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}