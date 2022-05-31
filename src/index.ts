import express from "express";
import cors from "cors";
import { createWish, getWishes } from "./service/wishlist.service";
import { config } from "dotenv";

// grabs the things from .env and put in the app
config();

// to install any package that doesn't use TS as standard,
// run yarn add @types/express
// run yarn add @types/express

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    await createWish(req.body);
    res.send(200);
  } catch (err) {
    // send teh response a json object instead of text
    res.status(400).send({
      message: "Wish is not Possible",
    });
  }
});

app.get("/", async (req, res) => {
  const wishes = await getWishes();
  res.send(wishes);
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
