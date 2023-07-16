import { NextFunction, Request, Response } from "express";
import { SortOrder } from "mongoose";
import { BookModel, IBook } from "./book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bookData: IBook = req.body;
    if (!bookData) {
      res.sendStatus(400);
    } else {
      const book = new BookModel(bookData);
      await book.save();
      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Book created successfully",
        data: book,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { search, filter } = req.query;
    const sort = (req.query.sort as SortOrder) || "asc";
    const sortField = (req.query.sortField as string) || "createdAt";
    if (search) {
      const books = await BookModel.find({
        [filter as string]: { $regex: search, $options: "i" },
      })
        .sort({ [sortField]: sort })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      const booksCount = await BookModel.countDocuments();
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Books retrieved successfully",
        meta: {
          page: page,
          limit: limit,
          count: booksCount,
        },
        data: books,
      });
    } else {
      const books = await BookModel.find()
        .sort({ [sortField]: sort })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      const booksCount = await BookModel.countDocuments();
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Books retrieved successfully",
        meta: {
          page: page,
          limit: limit,
          count: booksCount,
        },
        data: books,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bookId = req.params.bookId;
    const book = await BookModel.findOne({ _id: bookId });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bookId = req.params.bookId;
  const updateFields = req.body;
  console.log(bookId);
  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    } else {
      Object.assign(book, updateFields);
      const updatedBook = await book.save();
      res.sendStatus(200).json({
        success: true,
        statusCode: 200,
        message: "Book updated successfully",
        data: updatedBook,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.bookId;
  try {
    const deletedBook = await BookModel.findByIdAndDelete(id).exec();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    next(error);
  }
};
