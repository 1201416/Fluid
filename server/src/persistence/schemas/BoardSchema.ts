import { IBoardPersistence } from "../../dataschema/IBoardPersistence";
import mongoose from 'mongoose';

const Board = new mongoose.Schema(
    {
        domainId: { 
            type: String,
            unique: true
          },
          boardOwner: {
            type: String,
            required: [true, 'Please enter board owner'],
            index: true,
          },
          boardTitle: {
            type: String,
            required: [true, 'Please enter board title'],
            index: true,
          },
          boardPermissions: {
            type: [String],
            required: [false]
          },  
          fluidId: {
            type: String,
            required: [true]
          },                              
    },
    { timestamps: true },
);

export default mongoose.model<IBoardPersistence & mongoose.Document>('Board', Board)