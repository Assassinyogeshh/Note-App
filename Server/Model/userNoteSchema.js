import mongoose from "mongoose";

const userNotesSchema = new mongoose.Schema({


    userId: {
        type: String,
        required: true
    },

    userNotes: [
        {
            title: {
                type: String,
                required: true
            },

            notes: {
                type: String,
                required: true
            },

            createdNoteTime: {
                type: Date,
                default: Date.now
            }

        }
    ]


});


const userNotes = mongoose.model('UserNote', userNotesSchema);

export default userNotes;