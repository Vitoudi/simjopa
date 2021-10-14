import { NextFunction, Request, Response } from "express";
import { IRequest } from "../Request&Response/IRequest";
import { IResponse } from "../Request&Response/IResponse";
import jwt from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../utils/HttpResponses";
import { getRawTokenFromAuthHeader } from "./utils/getTokenFromAuthHeader";
import { UserRole } from "../entities/User";

export interface IAuthToken {
  id: number;
  role: UserRole;
  iat: number;
}

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader)
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({msg: "not allowed"});

    const token = getRawTokenFromAuthHeader(authHeader);

    try {
        await jwt.verify(token, process.env.JWT_KEY!);

        const decodedToken = jwt.decode(token);

        (req as any).decodedToken = decodedToken;

        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({msg: "not allowed: invalid token"});
    }
    
}