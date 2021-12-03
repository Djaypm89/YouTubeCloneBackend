const { Comment, Reply, validateComment} = require("../models/comments");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

    try{
        const comments = await Comment.find();
        return res.send(comments); 
    }catch (ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});

router.post("/", async (req, res) => {
    
    try{

        const { error } = validateComment(req.body);
        if(error) return res.status(400).send(error);

        const comments = new Comment({
        videoId: req.body.videoId,
        commentBody: req.body.commentBody
        });

         await comments.save();

        return res.send(comments);

    }catch(ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});

router.put("/:id", async (req, res) => {

    try{
        
        const comments = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                likes: req.body.likes
            },
            { new: true}
        )
    }catch(error){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
})

module.exports = router;