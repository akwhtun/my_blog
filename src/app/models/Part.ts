import mongoose, { Document, Schema } from "mongoose";

export interface IPart extends Document {
    article_id: mongoose.Schema.Types.ObjectId;
    part: string;
    content: string;
    imageUrl: string;
    status: number;
    created_date: Date;
}

const PartSchema = new mongoose.Schema({
    article_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    part: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    status: { type: Number, default: 0 },
    created_date: { type: Date, default: Date.now },
});

const Part = mongoose.models.Part || mongoose.model<IPart>("Part", PartSchema);

export default Part;

