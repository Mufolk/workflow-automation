import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}


const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export { AppError, errorHandler };
