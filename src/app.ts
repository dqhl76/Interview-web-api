import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.listen(8008, function () {
  console.log("Example app listening on port 8008!");
});
