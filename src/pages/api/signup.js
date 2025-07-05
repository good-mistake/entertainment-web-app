import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { connectDB } from "../../app/utils/connectDB";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data.json");
const dummyData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method !== "POST")
      return res.status(405).json({ message: "Method not allowed" });

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    function getRandomColor() {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      );
    }

    const user = new User({
      email,
      password: hashedPassword,
      color: getRandomColor(),
      dummyData: dummyData.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
        isBookmarked: false,
        isDuplicated: true,
      })),
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
