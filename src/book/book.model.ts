import { Document, ObjectId, Schema, model } from "mongoose";

// Interface for Book document
interface IBook {
  title: string;
  author: string;
  genre: string;
  reviews: number;
  user: ObjectId;
  publicationDate: Date;
}

interface IBookDocument extends IBook, Document {}

// Cow schema
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    reviews: { type: Number, required: true, default: 0 },
    user: { type: String },
    publicationDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// Cow model
const BookModel = model<IBookDocument>("Book", bookSchema);

export { BookModel, IBook };
