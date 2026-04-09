const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Post = require("../models/post.js")

const multer = require("multer")
const uploadToCloudinary = require("../services/cloudinary")

const storage = multer.memoryStorage()
const upload = multer({
  storage,
     limits: { fileSize: 5 * 1024 * 1024 }
});

router.get("/", async (req, res) => {
     try{
          const posts = await Post.find()
          res.json(posts)
     } catch(err){
          res.status(500).json({message:err.message})
     }
})

router.get("/user/:userUid", async (req, res) =>{
     const userUid = req.params.userUid

     try{
          const posts = await Post.find({userUid})
          res.json(posts)

          if(!posts || posts.length === 0){
            return res.status(404).json({message:"anuncios não encontrados"})
        }
     } catch(err){
          res.status(500).json({message: err.message})
     }
})

router.get("/:postId", async (req, res) =>{
     const postId = req.params.postId

     if (!mongoose.Types.ObjectId.isValid(postId)) {
          return res.status(400).json({ message: "id inválido" })
     }

     try{
          const post = await Post.findById(postId)
          
          if(!post || posts.length === 0) return res.status(404).json({message:"anuncio não encontrado"})

          res.json(post)

     } catch(err){
          res.status(500).json({message: err.message})
     }
})

router.post("/", upload.array("images"), async (req, res) =>{
     try {
          let imageUrls = []

          if (req.files) {
               for (let file of req.files) {
                    const result = await uploadToCloudinary(file.buffer)
                    imageUrls.push(result.secure_url)
               }
          }

          const post = new Post({
               userUid: req.body.userUid,
               post: {
                    title: req.body.title,
                    desc: req.body.desc,
                    type: req.body.type,
                    images: imageUrls
               }
          })

          const newPost = await post.save()
          res.status(201).json(newPost)

     } catch(err){
          res.status(400).json({message: err.message})
     }
})

router.put("/:postId", async (req, res) => {
     const postId = req.params.postId

     if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ message: "id inválido" })

     try{

          const post = await Post.findOneAndUpdate({_id: postId}, {
               $set:{
                    "post.title": req.body.title,
                    "post.desc": req.body.desc,
                    "post.type": req.body.type,
                    "post.isRent": req.body.isRent
               }
          }, { new: true })


          if(!post) return res.status(404).json({message: "anuncio não encontrado"})
          res.status(200).json({message: "anuncio atualizado", post})
     } catch(err){
          res.status(400).json({message: err.message})
     }
})

router.delete("/:postId", async (req, res) => {
     const postId = req.params.postId

     if (!mongoose.Types.ObjectId.isValid(postId)) {
          return res.status(400).json({ message: "id inválido" })
     }

     try{
          const result = await Post.deleteOne({_id: postId})

          if(result.deletedCount > 0){
               res.status(200).json({message: "anuncio deletado"})
          } else {
               res.status(404).json({message: "anuncio não encontrado"})
          }
     } catch(err){
          res.status(500).json({message: err.message})
     }
})

module.exports = router