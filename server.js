import { config } from "dotenv";
import app from "./src/app.js";
import db from "./src/config/dbConnection.js";

config();
let port = process.env.PORT;
console.log(port);
app.listen(5400, async () => {
  await db();
  console.log(`server started at port ${port}`);
});

console.log("server");
