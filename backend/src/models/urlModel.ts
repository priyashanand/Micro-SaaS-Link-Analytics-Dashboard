import mongoose, { Document, Schema } from 'mongoose';

export interface IShortLink extends Document {
  userId: mongoose.Types.ObjectId;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  createdAt: Date;
  expirationDate?: Date;
  totalClicks: number;
}

const ShortLinkSchema: Schema = new Schema<IShortLink>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  originalUrl: { 
    type: String, 
    required: true 
  },
  shortCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  customAlias: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  expirationDate: { 
    type: Date 
  },
  totalClicks: { 
    type: Number, 
    default: 0 
  }
});

const ShortLink = mongoose.model<IShortLink>('ShortLink', ShortLinkSchema);
export default ShortLink;
