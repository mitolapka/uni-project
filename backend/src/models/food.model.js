import { model, Schema } from 'mongoose';

export const FoodSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {type: String, required: true},
    authorName: {type: String, required: true},
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    stars: { type: Number, default: 3 },
    tags: { type: [String] },
    origins: { type: [String], required: true },
     cookTime: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const FoodModel = model('food', FoodSchema);
