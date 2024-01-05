import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./routers/product.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import morgan from "morgan";
import userRouter from "./routers/user.router.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("pong");
});
app.use("/api/vi/product", productRouter);
app.use("/api/vi/user", userRouter);

app.all("*", (req, res) => {
  res.status(400).send("OOPS! Page not Found");
});

app.use(errorMiddleware);

export default app;
