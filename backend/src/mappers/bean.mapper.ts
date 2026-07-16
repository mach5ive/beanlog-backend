import { IBean } from '../models/bean.model';

export const toBeanResponse = (bean: IBean) => {
  return {
    id: bean._id.toString(),
    name: bean.name,
    roaster: bean.roaster,
    roastLevel: bean.roastLevel,
    process: bean.process,
    origin: bean.origin,
    variety: bean.variety,
    tastingNotes: bean.tastingNotes,
    purchaseDate: bean.purchaseDate,
    grinder: bean.grinder,
    rating: bean.rating,
    owner: bean.owner.toString()
  };
};