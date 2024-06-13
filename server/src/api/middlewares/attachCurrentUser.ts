import { Request, Response, NextFunction } from 'express';


const attachCurrentUser = async (req:Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (e) {
    return next(e);
  }
};

export default attachCurrentUser;
