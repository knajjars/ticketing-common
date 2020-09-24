import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_KEY } from "../env";

interface UserPayload {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, JWT_KEY) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
