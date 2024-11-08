import { Session } from 'express-session'; 
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      session: Session; 
    }
  }
}