


const pageNotFound = async(req, res)=> {
    try {
        res.render("pageNotFound"); 

    } catch (error) {
        res.redirect("/pageNotFound")
    }
}



const loadHomePage = async (req, res)=> {
    try{
        return res.render("home")
    }catch (error){
        console.log("Home page not found")
        res.status(500).send("server Error")
    }
}

module.exports = {
    loadHomePage,
    pageNotFound
}