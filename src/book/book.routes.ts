import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "./book.controller";

import express from "express";
const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getSingleBook);
bookRouter.put("/:bookId", updateBook);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
