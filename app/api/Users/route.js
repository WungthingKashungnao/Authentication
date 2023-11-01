import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const userData = body.formData;

    // confirm data exists
    if (!userData.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // checking for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    // hashing password
    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    // creating a new user
    const newUser = await User.create(userData);
    return NextResponse.json(
      { message: "New user created", newUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
