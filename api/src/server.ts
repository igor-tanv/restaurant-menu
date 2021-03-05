import express from "express";
import cors from "cors"

require("./db/mysql")

const port = process.env.NODE_PORT || 4848;

export function run() {
  const app = express();

  app.use(cors({ origin: 'http://localhost:3000' }));

  app.get("/api/menu", function (_, res) {
    res.type('text/plain').send("Food can be served");
  });

  return app.listen(port, function () {
    // Port is forwarded by docker to 80.
    console.log(`Listening on http://localhost:${port}`);
  })
}

if (process.env.NODE_ENV !== 'testing') {
  run();
}
