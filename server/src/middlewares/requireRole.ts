import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { getDecodedTokenFromAuthHeader, getRawTokenFromAuthHeader } from "./utils/getTokenFromAuthHeader";
import { UserRole } from "../entities/User";
import { HTTP_STATUS_CODES } from "../utils/HttpResponses";

export function requireRole(userRole: UserRole) {
    return (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      const decodedToken = getDecodedTokenFromAuthHeader(authHeader!);
      const role = decodedToken.role;

      if (role < userRole)
        return res
          .status(HTTP_STATUS_CODES.UNAUTHORIZED)
          .json({ msg: "sua conta não tem permissão" });

      next();
    }
}
