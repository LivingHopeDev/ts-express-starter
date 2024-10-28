import * as Express from "express"
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role?: UserType;
            };
        }
    }
}
