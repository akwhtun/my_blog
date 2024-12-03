import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    imageUrl: string;
    isAdmin: boolean;
    created_date: Date;

}

const UserShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    created_date: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserShema);

export default User;

