import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

import { RestaurantData } from "./db/data/RestaurantData"

const port = process.env.NODE_PORT || 4848;


export async function run() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(express.json())

  app.get("/api/menu", async (req, res) => {
    const menu = await RestaurantData.getMenu()
    res.status(200).json({ menu })
  });

  app.get("/api/order/:id", async (req, res) => {
    const orderId = req.params.id
    const order = await RestaurantData.getOrder(orderId)
    res.status(200).json({ order })
  });

  app.post("/api/order", async (req, res) => {
    const { selectedItems } = req.body
    const order = await RestaurantData.placeOrder(selectedItems)
    // chef
    setTimeout(async () => {
      await RestaurantData.updateOrder(order.id)
    }, 5000);

    res.status(200).json({ order })
  });

  return app.listen(port, async () => {
    // Port is forwarded by docker to 80.
    console.log(`Listening on http://localhost:${port}`);
  })
}

if (process.env.NODE_ENV !== 'testing') {
  run();
}
