import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(__dirname, "serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  databaseURL: "https://cheesecake-aa2bc.firebaseio.com",
});
console.log(
  "Firebase Admin initialized with project ID:",
  admin.app().options.credential.projectId
);

const app = express();
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.REACT_APP_NODEMAILER_EMAIL_ID,
    pass: process.env.REACT_APP_NODEMAILER_PASSWORD,
  },
});

app.post("/send-free-notification", async (req, res) => {
  const { movieId, movieTitle } = req.body;

  if (!movieId || !movieTitle) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    console.log("Received movieId:", movieId);

    const numericMovieId = parseInt(movieId, 10);
    console.log("Querying Firestore with numericMovieId:", numericMovieId);

    const usersSnapshot = await admin
      .firestore()
      .collection("users")
      .where("subscriptions", "array-contains", numericMovieId)
      .get();

    console.log("Found documents count:", usersSnapshot.size);

    if (usersSnapshot.empty) {
      console.error("No users subscribed to this movie.");
      return res
        .status(404)
        .json({ success: false, message: "No subscribers found" });
    }

    console.log("Found subscribed users, preparing emails...");

    const emailPromises = [];
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      const userEmail = userData.email;

      if (userEmail) {
        console.log("Sending email to:", userEmail);

        const mailOptions = {
          from: process.env.REACT_APP_NODEMAILER_EMAIL_ID,
          to: userEmail,
          subject: `Good News! "${movieTitle}" is now FREE!`,
          text: `Hi there,\n\n"${movieTitle}" is now available to watch for free! Click the link below to start watching:\n\nhttps://www.themoviedb.org/movie/${movieId}/watch\n\nEnjoy!\n\nBest regards,\nCheesecake Team`,
        };

        emailPromises.push(transporter.sendMail(mailOptions));
      }
    });

    await Promise.all(emailPromises);

    console.log("Emails sent successfully!");
    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, message: "Failed to send emails" });
  }
});

app.listen(3003, () => {
  console.log("Notification server running on http://localhost:3003");
});
