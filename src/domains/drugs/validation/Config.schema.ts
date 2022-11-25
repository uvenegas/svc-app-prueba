import { Schema } from 'mongoose';

export const ConfigSchema = new Schema({
    type: { type: String },
    platforms: [{
        name: { type: String },
        all:{
            fact: { type: String },
            operator: { type: String },
            value: { type: Number },
        },
        metadata: { isOptional: { type: Boolean } },
    }],
    
});