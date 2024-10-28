import * as bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import config from "../config";

export const getIsInvalidMessage = (fieldLabel: string) =>
  `${fieldLabel} is invalid`;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function generateAccessToken(userId: string) {
  return await jwt.sign({ userId }, config.TOKEN_SECRET!, {
    expiresIn: config.TOKEN_EXPIRY,
  });
}

export const generateNumericOTP = (length: number): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 9 + 1).toString();
  }
  return otp;
};

export const verifyToken = (token: string): Record<string, unknown> | null => {
  try {
    const payload = jwt.verify(token, config.TOKEN_SECRET!);
    return payload as Record<string, unknown>;
  } catch (error) {
    if (error instanceof Error)
      return {
        error: error.message,
      };
    return {
      error: "An unknown error occurred",
    };
  }
};

export const Limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
