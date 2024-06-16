import { IPermission } from "@/dataschema/IPermissionPersistence";
import mongoose from "mongoose";

const Permission = new mongoose.Schema(
    {
        id:{
            type: String,
            unique: true
        },
        user:{
            type: String,
            required: [true, 'Please enter user for permission']
        },
        accesslevel:{
            type: String,
            required: [true, 'Please enter access level']
        }
    },
    { timestamps: true },
);

export default mongoose.model<IPermission & mongoose.Document>('BoardPermission', Permission)