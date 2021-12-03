const { Comment, Reply, validateComment} = require("../models/comments");
const express = require("express");
const router = express.Router();

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

module.exports = router;