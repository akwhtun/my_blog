import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
    part_id: mongoose.Schema.Types.ObjectId;
    user_id: mongoose.Schema.Types.ObjectId;
    content: string;
    created_date: Date;
}

const CommentSchema = new mongoose.Schema({
    part_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
});

const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;

