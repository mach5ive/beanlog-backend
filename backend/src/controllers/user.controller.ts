import { Request, Response, NextFunction } from "express";
import * as userService from '../services/user.service';
import { toUserResponse } from '../mappers/user.mapper';

export const register = async (req: Request, res: Response) => {
  try {
    // 1. Το Service επιστρέφει το Mongoose Document
    const savedUser = await userService.createUser(req.body);
    
    // 2. Ο Mapper μετατρέπει το Document σε καθαρό object (χωρίς password κλπ)
    const userResponse = toUserResponse(savedUser);
    
    // 3. Στέλνουμε το "καθαρό" response στο Frontend
    return res.status(201).json(userResponse);
    
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    
    return res.status(200).json({ 
      token, 
      user: toUserResponse(user) 
    });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
