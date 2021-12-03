const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    videoId: {type: String, required: true},
    commentBody: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    replies: [replySchema]
})

const replySchema = new mongoose.Schema({
    replyBody: {type: String, required: true}
})

const Comment = mongoose.model("Comment", commentSchema);
const Reply = mongoose.model("Reply", replySchema);

module.exports = {
    Comment: Comment,
    Reply: Reply
}