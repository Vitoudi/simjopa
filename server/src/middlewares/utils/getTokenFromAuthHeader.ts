import jwt from "jsonwebtoken";

export function getRawTokenFromAuthHeader(authHeader: string) {
    const token = authHeader.split(" ")[1];
    return token;
}

export function getDecodedTokenFromAuthHeader(authHeader: string) {
    const token = getRawTokenFromAuthHeader(authHeader);
    const decodedToken = jwt.decode(token) as any;
    return decodedToken;
}