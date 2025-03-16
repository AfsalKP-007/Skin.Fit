
const { response } = require("../../app");
const User = require("../../models/userSchema")



const loadSignup = async(req, res)=> {
    try {
        res.render("signup"); 

    } catch (error) {
        console.log("Home page not working", error)
        res.status(500).send("Server Error")
    }
}

const signup = async (req, res) => {
    console.log("Received req.body:", req.body); // Debugging log

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send("Error: Request body is empty.");
    }

    const { name, email, phone, password } = req.body;
    
    try {
        const newUser = new User({ name, email, phone, password });
        await newUser.save();
        return res.redirect("/signup");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Internal Server Error");
    }
};



const pageNotFound = async(req, res)=> {
    try {
        res.render("pageNotFound"); 

    } catch (error) {
        res.redirect("/pageNotFound")
    }
}




const loadHomePage = async (req, res)=> {
    try{
        return res.render("home",{ currentRoute: "/" })
    }catch (error){
        console.log("Home page not found")
        res.status(500).send("server Error")
    }
}

module.exports = {
    loadHomePage,
    pageNotFound,
    loadSignup,
    signup
}