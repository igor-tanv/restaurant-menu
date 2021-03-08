import express from "express";
import cors from "cors"

import { RestaurantData } from "./db/data/RestaurantData"

const port = process.env.NODE_PORT || 4848;

export async function run() {
  const app = express();

  app.use(cors());

  app.get("/api/menu", async (req, res) => {
    const menu = await RestaurantData.getMenu()
    res.status(200).json({ menu })
  });

  app.post("/api/order", async (req, res) => {
    console.log(req.body, 19)
    const menu = await RestaurantData.placeOrder(req.body.total)
    res.status(200).json({ menu })
  });

  return app.listen(port, function () {
    // Port is forwarded by docker to 80.
    console.log(`Listening on http://localhost:${port}`);
  })
}

if (process.env.NODE_ENV !== 'testing') {
  run();
}
