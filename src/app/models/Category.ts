import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    created_date: Date;
}

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
});

const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;

