import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import subscribeUser from "../src/_utils/subscribeUser.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const result = await subscribeUser(email);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
