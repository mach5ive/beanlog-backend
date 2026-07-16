import {Schema, model, Document, Types} from "mongoose";

export interface IBean extends Document {
  name: string;
  roaster: string;
  roastLevel?: string;
  process?: string;
  origin?: string;
  variety?: string;
  tastingNotes?: string[];
  purchaseDate?: Date;
  grinder?: string;
  rating?: number;
  owner: Types.ObjectId;
}

const BeanSchema = new Schema<IBean> ({
  name: { type: String, required: true },
  roaster: { type: String, required: true },
  roastLevel: String,
  process: String,
  origin: String,
  variety: String,
  tastingNotes: [String],
  purchaseDate: { type: Date, default: Date.now },
  grinder: String,
  rating: { type: Number, min: 0, max: 5 }, // Περιορισμός βαθμολογίας
  owner: { 
  type: Schema.Types.ObjectId, 
  ref: 'User', 
  required: true 
}
},{
  collection: 'beans',
  timestamps: true
}
)

// const Bean = model('Bean', BeanSchema);
const Bean = model<IBean>('Bean', BeanSchema);

export default Bean;