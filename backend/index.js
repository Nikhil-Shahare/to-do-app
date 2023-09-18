require("dotenv").config()
const express = require("express")
const connectDatabase = require("./db")
const {PORT}=process.env
const app = express()
const todoroute = require("./route/todoroute")

connectDatabase();

app.use(express.json())

app.use("/api/todo",todoroute)

app.get("/",(req,res)=>{
    res.send("Hare Krishna")
})


app.listen(PORT,(req,res)=>{
    console.log("COnneted to server",PORT)
})