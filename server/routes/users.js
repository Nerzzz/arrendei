const express = require("express")
const router = express.Router()

const User = require("../models/user.js")

router.get("/", async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/:uid", async (req, res) => {
    const uid = req.params.uid

    try{
        // const user = await User.findById(id)
        const user = await User.findOne({ uid: uid })

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        res.status(200).json(user)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

router.post("/", async (req, res) => {
    const user = new User({
        uid:req.body.uid,
        username:req.body.username,
        email:req.body.email,
        cell:req.body.cell
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.patch("/:id", (req, res) => {
    
})

router.delete("/:id", (req, res) => {
    
})

module.exports = router