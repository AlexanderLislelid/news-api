import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: number, email: string): string => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};
