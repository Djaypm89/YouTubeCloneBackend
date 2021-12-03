const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
    replyBody: {type: String, required: true}
});

const commentSchema = new mongoose.Schema({
    videoId: {type: String, required: true},
    commentBody: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    replies: [replySchema]
});

const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

function validateComment(Comment){
    const schema = Joi.object({
        videoId: Joi.string().required(),
        commentBody: Joi.string().min(1).max(100).required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        replies: Joi.array()
    });
    return schema.validate(Comment);;
}

module.exports = {
    Comment: Comment,
    Reply: Reply,
    validateComment: validateComment
}