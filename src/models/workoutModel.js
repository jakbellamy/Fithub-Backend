import mongoose from 'mongoose' 
const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    name: 
        {
            type: String,
            required: 'Enter Workout Name',
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
    setCards:  
        [{
            setCard_id:
                {
                    type: Schema.Types.ObjectId,
                    ref: 'SetCard'
                }
            
        }],
    user_id: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
})


export const Workout = mongoose.model('Workout', WorkoutSchema)
