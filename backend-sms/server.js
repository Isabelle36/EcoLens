const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const accountSid = "ACa37b33a5dd61d7ad75d9fe8d9599aabf";
const authToken = "640302923ffaf316a2eed6b1e6258aeb";
const twilioClient = twilio(accountSid, authToken);
const twilioNumber = "+18307831496";
const recipientNumber = "+919480297594";

app.post("/send-sms", async (req, res) => {
  const { message } = req.body;

  try {
    await twilioClient.messages.create({
      body: message,
      from: twilioNumber,
      to: recipientNumber,
    });
    res.status(200).json({ success: true, message: "SMS sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});