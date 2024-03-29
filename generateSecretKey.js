import crypto from "crypto";
import fs from "fs";

const secretKey = crypto.randomBytes(32).toString("hex");

fs.appendFile(".env", `\nJWT_SECRET_KEY=${secretKey}`, (err) => {
  if (err) {
    console.error("Error appending to .env file:", err);
    return;
  }
  console.log("Secret key appended to .env file.");
});
