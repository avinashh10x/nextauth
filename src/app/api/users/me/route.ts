import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDB()

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request)
        const res = await User.findById(userID).select("-password -isAdmin")
        return NextResponse.json({
            message: "user found",
            data: res
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}