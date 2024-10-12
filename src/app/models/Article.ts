import mongoose, { Document, Schema } from "mongoose";

export interface IArticle extends Document {
    category_id: string;
    title: string;
    content: string;
    author: string;
    imageUrl: string;
    created_date: Date;
}

const ArticleSchema = new mongoose.Schema({
    category_id: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
});

const Article = mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;

