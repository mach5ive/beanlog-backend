import Bean, { IBean } from '../models/bean.model';
import { Types } from 'mongoose';

export const createBean = async (payload: Partial<IBean>) => {
  const bean = new Bean(payload);
  return await bean.save();
};

export const getBeansByOwner = async (ownerId: string) => {
  return await Bean.find({ owner: new Types.ObjectId(ownerId) });
};

export const updateBean = async (id: string, payload: Partial<IBean>) => {
  return await Bean.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteBean = async (id: string) => {
  return await Bean.findByIdAndDelete(id);
};