const { Comment, Reply, validateComment, validateReply } = require("../models/comments");
const express = require("express");
const comments = require("../models/comments");
const router = express.Router();

router.get("/:id", async (req, res) => {

    try{
        const comments = await Comment.find(
            { videoId: req.params.id }

        );
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


router.post("/:id/replies", async (req, res) => {
    
    try{

        const { error } = validateReply(req.body);
        if(error) return res.status(400).send(error);

        const comments = await Comment.findById(
            req.params.id
        )
        const replies = new Reply({
        replyBody: req.body.replyBody
        });

        comments.replies.push(replies);

         await comments.save();

        return res.send(comments.replies);

    }catch(ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});


router.put("/:id", async (req, res) => {

    try{

        const { error } = validateComment(req.body);
        if(error) return res.status(400).send(error);
        
        const comments = await Comment.findByIdAndUpdate(
            req.params.id, 

            {
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                videoId: req.body.videoId,
                commentBody: req.body.commentBody
                
            },
            { new: true}
        );
    

            await comments.save();

            return res.send(comments);
        
    }catch(ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
})


// router.put("/:id", async (req, res) => {

//     try{

//         const { error } = validateComment(req.body);
//         if(error) return res.status(400).send(error);
        
//         const comments = await Comment.findByIdAndUpdate(
//             req.params.id, 

//             {
//                 likes: req.body.likes,
//                 dislikes: req.body.dislikes,
//                 videoId: req.body.videoId,
//                 commentBody: req.body.commentBody
//             },
//             { new: true}
//         );
    

//             await comments.save();

//             return res.send(comments);
        
//     }catch(error){
//         return res.status(500).send(`Internal Server Error:${ex}`);
//     }
// })


module.exports = router;