import { User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}

export interface IUserSignUp {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}
export interface IUserLogin {
    email: string;
    password: string;
}
export interface IProduct {
    name: string;
    description: string;
    price: Decimal;
    stockQuantity: Int;
    threshold: Int;
}
export interface IVariation {
    productId: string;
    type: string;
    value: string;
}

export interface IAuthService {
    login(payload: IUserLogin): Promise<unknown>;
    signUp(payload: IUserSignUp, res: unknown): Promise<unknown>;
    // verifyEmail(token: string, email: string): Promise<unknown>;
    // changePassword(
    //   userId: string,
    //   oldPassword: string,
    //   newPassword: string,
    //   confirmPassword: string,
    // ): Promise<{ message: string }>;
    // generateMagicLink(email: string): Promise<{ ok: boolean; message: string }>;
    // validateMagicLinkToken(
    //   token: string,
    // ): Promise<{ status: string; email: string; userId: string }>;
    // passwordlessLogin(userId: string): Promise<{ access_token: string }>;
}