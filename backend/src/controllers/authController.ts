import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";

// Registration function
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, location } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email address is already registered" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user without childAge
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location: location
        ? { latitude: location.lat, longitude: location.lon }
        : undefined,
    });

    await newUser.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login function
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, location } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    if (location) {
      user.location = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
