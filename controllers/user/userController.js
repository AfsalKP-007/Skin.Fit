const User = require("../../models/userSchema"); 
const nodemailer = require("nodemailer");
const env = require("dotenv").config();
const transporter = require("../../config/nodemailer"); // Fixed path
const crypto = require("crypto");

const loadSignup = async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.error("Home page not working", error);
        res.status(500).send("Server Error");
    }
};

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendVerificationEmail = async (email, token) => {
    try {
        const verificationUrl = `http://localhost:7000/verify-email?token=${token}`;

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Click the link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`
        };

        console.log("Sending email with options:", mailOptions);
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

    const signup = async (req, res) => {
    try {
        let { name, email, password, cPassword } = req.body;

        console.log("Received Name:", req.body.name);
        console.log("Received Email:", req.body.email);
        console.log("Received Password:", req.body.password);
        console.log("Received Confirm Password:", req.body.confirmPassword);

         password = String(req.body.password).trim();
         cPassword = String(req.body.confirmPassword).trim();

        if (password !== cPassword) {
            return res.status(400).json({ message: "Passwords do not match" }); // ✅ Return JSON instead of rendering HTML
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: "Email already exists" }); // ✅ Return JSON instead of rendering HTML
        }

        const otp = generateOtp();
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Create user but mark as unverified
        const newUser = new User({
            name,
            email,
            password,
            verificationToken,
            isVerified: false
        });

        await newUser.save();

        const emailSent = await sendVerificationEmail(email, verificationToken);

        if (!emailSent) {
            return res.status(500).json({ message: "Email sending failed" });
        }

        req.session.userOtp = otp;
        req.session.userData = { email, password };
        console.log("OTP Sent", otp);

        res.json({ message: "Signup successful. Check your email for verification." });
    } catch (error) {
        console.error("Signup error", error);
        res.status(500).json({ message: "Internal Server Error" }); // ✅ Ensure JSON response
    }
};


const pageNotFound = async (req, res) => {
    try {
        res.render("pageNotFound");
    } catch (error) {
        res.redirect("/pageNotFound");
    }
};

const loadHomePage = async (req, res) => {
    try {
        return res.render("home", { currentRoute: "/" });
    } catch (error) {
        console.error("Home page not found");
        res.status(500).send("Server Error");
    }
};

module.exports = {
    loadHomePage,
    pageNotFound,
    loadSignup,
    signup
};
