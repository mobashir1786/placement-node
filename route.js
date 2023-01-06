const express = require("express");
const route = express.Router();
const mongoose = require('mongoose');
const schema = require('./schema')
const bcrypt = require("bcryptjs");
mongoose.connect("mongodb+srv://mobashir:mobashir123@cluster0.sv5dvda.mongodb.net/Grocery?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected with mongodb");
    })
    .catch((err) => {
        console.log(err);
    });



const Model = new mongoose.model("AssUser", schema);

// signup
route.post("/signup", async (req, res) => {
    console.log(req.body);
    let bodyData = req.body;
    const name = bodyData.name;
    const number = bodyData.number;
    const email = bodyData.email;
    const password = bodyData.password;
    const image= bodyData.image;
    const add = bodyData.add;
    console.log(name, number, email, password, add);

    const output = await Model.create({
        name, number, email, password,image, add
    });

    const token = output.getJwtToken();
    output.token = token;
    await output.save();

    res.status(200).json({
        success: true,
        message: "User Register Successfully",
        output,
        "token": token
    })
})

//login routes
route.post('/login', async (req, res) => {
    const bodyData = req.body;
    const email = bodyData.email;
    const password = bodyData.password;
    const userData = await Model.findOne({ email: email });
    console.log(userData);
    let token = userData.getJwtToken();
    if (!userData) {
        return res.json({ status: 200, message: "User Not Exist Please Register First", "key": 0, "token": null })
    } else {
        const result2 = await bcrypt.compare(password, userData.password);
        if (result2) {
            console.log("match");
            userData.token = token;
            await userData.save();
            return res.json({ status: 200, message: "User Successfully Login", "key": 1, "token": token })
        } else {
            return res.json({ status: 200, message: "Email Id Or Password Did Not Match", "key": 0, "token": null })
        }

    }
})


module.exports = route;