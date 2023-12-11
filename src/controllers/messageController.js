const bcrypt = require('bcrypt');
const xlsx = require('xlsx');
const twilio = require('twilio');
require('dotenv').config();

const sendMessageUsingFile = async (req, res) => {
    try {
        const { message } = req.body;
        const { TWILIO_LIVE_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
        const client = new twilio(TWILIO_LIVE_SID, TWILIO_AUTH_TOKEN);

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Assuming your Excel file has columns named "name" and "phone_number"
        const data = xlsx.utils.sheet_to_json(sheet);

        // Extract phone numbers
        const phoneNumbers = data.map(entry => entry.phone_number);
        // Send messages using Twilio
        const messagePromises = phoneNumbers.map(phoneNumber =>
            client.messages.create({
                body: message,
                from: TWILIO_PHONE_NUMBER,
                to: '+92' + phoneNumber,
            })
        );

        // Wait for all messages to be sent
        await Promise.all(messagePromises);
        return res.status(201).json({ message: "Successfully sent message to all users." });
    } catch (error) {
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const sendMessageAll = async (req, res) => {

    try {
        const { email, password } = req.body;

        return res.status(200).json({ msg:"" });
    } catch (error) {
        console.error('Error signing in user', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { sendMessageUsingFile, sendMessageAll };
