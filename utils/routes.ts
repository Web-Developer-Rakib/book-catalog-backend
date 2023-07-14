import authRouter from "../src/auth/auth.routes";
import bookRouter from "../src/book/book.routes";

export const routes = [
  {
    router: authRouter,
    path: "auth",
  },
  {
    router: bookRouter,
    path: "books",
  },
];
