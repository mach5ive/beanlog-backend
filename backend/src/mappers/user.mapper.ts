import { IUser } from '../models/user.model';

export const toUserResponse = (user: IUser) => {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  };
};