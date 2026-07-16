import { Request, Response } from 'express';
import * as beanService from '../services/bean.service';
import { toBeanResponse } from '../mappers/bean.mapper';

// src/controllers/bean.controller.ts

export const createBean = async (req: Request, res: Response) => {
  try {
    // Παίρνουμε το ID από το token (μέσω του authMiddleware)
    const ownerId = (req as any).user.id; 
    
    // Προσθέτουμε το ownerId στο body πριν την αποθήκευση
    const beanData = { ...req.body, owner: ownerId };
    const savedBean = await beanService.createBean(beanData);
    
    return res.status(201).json(toBeanResponse(savedBean));
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getBeans = async (req: Request, res: Response) => {
  try {
    // Αγνοούμε το params.ownerId, παίρνουμε τον ιδιοκτήτη από το token
    const ownerId = (req as any).user.id; 
    
    const beans = await beanService.getBeansByOwner(ownerId);
    return res.status(200).json(beans.map(toBeanResponse));
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBean = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (typeof id !== 'string') {
    return res.status(400).json({ message: "ID is required and must be a string" });
  }

  try {
    const updated = await beanService.updateBean(id, req.body);
    if (!updated) return res.status(404).json({ message: "Bean not found" });
    return res.status(200).json(toBeanResponse(updated as any));
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteBean = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (typeof id !== 'string') {
    return res.status(400).json({ message: "ID is required and must be a string" });
  }

  try {
    const deleted = await beanService.deleteBean(id);
    if (!deleted) return res.status(404).json({ message: "Bean not found" });
    return res.status(200).json({ message: "Bean deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};