import express from "express";
import cors from "cors"

import { MenuData } from "./db/data/MenuData"

const port = process.env.NODE_PORT || 4848;

export async function run() {
  const app = express();

  app.use(cors());

  app.get("/api/menu", async function (_, res) {
    const menu = await MenuData.getMenu()
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
