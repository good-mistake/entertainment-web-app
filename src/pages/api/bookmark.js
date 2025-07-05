import { connectDB } from "../../app/utils/connectDB";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PATCH")
    return res.status(405).json({ message: "Method not allowed" });

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { mediaId } = req.body;
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.dummyData.find((i) => i.id === mediaId);
    if (!item) return res.status(404).json({ message: "Media not found" });

    item.isBookmarked = !item.isBookmarked;
    user.markModified("dummyData");
    await user.save();

    res.status(200).json({ success: true, updatedItem: item });
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Invalid token" });
  }
}
