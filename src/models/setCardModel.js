import mongoose from 'mongoose' 
const Schema = mongoose.Schema

const SetCardSchema = new Schema({
    name: 
        {
            type: String,
            required: 'Enter Card Name',
            maxlength: 24
        },
    keywords: 
        [{
            keyword: 
                {
                    type: String,
                    lowercase: true
                }
        }],
    sets:  
        [{
            name: 
                {
                    type: String,
                    required: 'Enter Set Name',
                    maxlength: 24
                },
            type: 
                {
                    type: Boolean,
                    required: 'set as reps or time'
                },
            reps: 
                    {
                        type: Number,
                        min: 1
                    },
            time:
                    {
                        type: Number,
                        min: 1
                    }
        }],
    user_id: 
        {
            type: Schema.Types.ObjectId,
            required: true
        }
})


export const SetCard = mongoose.model('SetCard', SetCardSchema)
