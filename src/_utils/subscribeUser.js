// subscribeUser.js
const { doc, setDoc } = require("firebase/firestore");
const { db } = require("./firebase.js"); 
const transporter = require('./nodemailerConfig');

async function subscribeUser(email) {
  try {
    const userRef = doc(db, "subscribedUsers", email);
    await setDoc(userRef, {
      email,
      subscribedAt: new Date(),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Subscription Confirmation - Welcome to CheeseCake Movies!",
text: `Thank you for subscribing! We're excited to have you with us on CheeseCake Movies.`,
html: `
  <h1>Welcome to CheeseCake Movies!</h1>
  <p>Thank you for subscribing! We're thrilled to have you join our movie-loving community.</p>
  
  <h2>What to Expect</h2>
  <p>As a subscriber, you'll receive:</p>
  <ul>
    <li>Personalized movie recommendations based on your preferences</li>
    <li>Exclusive sneak peeks at upcoming films and series</li>
    <li>Insider tips on movie nights and must-watch titles</li>
    <li>Curated lists of classic films and hidden gems</li>
  </ul>

  <h2>Join Our Movie Community</h2>
  <p>Connect with fellow film enthusiasts on our social media channels:</p>
  <ul>
    <li><a href="https://facebook.com/CheeseCakeMovies">Facebook</a></li>
    <li><a href="https://instagram.com/CheeseCakeMovies">Instagram</a></li>
    <li><a href="https://twitter.com/CheeseCakeMovies">Twitter</a></li>
    <li><a href="https://letterboxd.com/CheeseCakeMovies">Letterboxd</a></li>
  </ul>

  <h2>Need Movie Recommendations?</h2>
  <p>If you're ever in need of movie suggestions or have questions, simply reply to this email or reach out to our support team. We're here to help!</p>

  <p>Thank you for joining us on this cinematic adventure! Get ready for some great movie recommendations!</p>
  <p>Best regards,<br>The CheeseCake Movies Team</p>
`,

    });

    console.log("Subscription successful, confirmation email sent.");
    return { success: true, message: "Subscription successful" };
  } catch (error) {
    console.error("Error subscribing user:", error);
    return { success: false, message: "Subscription failed" };
  }
}

module.exports = subscribeUser;
