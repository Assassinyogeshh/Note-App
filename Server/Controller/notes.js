import mongoose from "mongoose";
import userNotes from "../Model/userNoteSchema.js";


export const addUserNotes = async (req, res) => {


    try {


        const { title, notes } = req.body;

        const { id: _id } = req.params;
        const userId = req.userId;

        console.log(_id + "i am id");
        console.log("New Notes:", title, notes);

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            console.log("Not Found ID:", _id);
            return res.status(404).send("User Not Found")
        }

        if (!userId) {
            console.log("Unauthorized from addNotes");
            return res.status(404).send("Unauthorized User")
        }

        const existingUser = await userNotes.findOne({ userId });

        if (!existingUser) {
            try {

                const addNotes = new userNotes({
                    userId,
                    userNotes: [{ title, notes }]
                });

                const addNewNotes = await addNotes.save();
                console.log("notes Successfully added:", addNewNotes);
                return res.status(200).json({ message: "User Notes Successfully Added", data: addNewNotes })

            } catch (error) {
                console.log("Notes Error:", error);
                return res.status(500).json("Failed Add The User Notes")
            }
        }

        const addAnotherNote = await userNotes.findByIdAndUpdate(_id, { $addToSet: { userNotes: { title, notes } } }, { new: true })

        return res.status(200).json({ message: "User Notes Successfully Added", data: addAnotherNote })

    } catch (error) {
        console.log("Notes Error:", error);
        return res.status(500).json("Failed Add The User Notes")
    }
}

export const updateUserNote = async (req, res) => {

    try {
        const { id: _id } = req.params;

        const { title, notes } = req.body;
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(_id)) {

            return res.status(404).json("User Not Found");

        }

        if (!userId) {

            return res.status(404).send("User Unauthorized")

        }
        const existingUser = await userNotes.findOne({ userId })

        const filter = {
            userId,
            "userNotes._id": _id
        };

        const update = {
            $set: {
                "userNotes.$.title": title,
                "userNotes.$.notes": notes,
            },
        };

        const updatedUser = await userNotes.findOneAndUpdate(filter, update, {
            new: true,
        });


        return res.status(200).json("User Note Successfully Updated");
    } catch (error) {

        console.log("Updated Error:", error);

        return res.status(500).json("Unable to Update User Notes")

    }

}

export const getAllNotes = async (req, res) => {

    try {
        // const {id:_id}=req.params;

        const userId = req.userId;

        // if (!mongoose.Types.ObjectId.isValid(_id)) {
        //     return res.status(404).json("Unable To Find User Notes");
        // }

        if (!userId) {
            return res.status(404).json("User Not Found");
        }

        const storedNotes = await userNotes.findOne({ userId });

        const fetchUserNotes = await userNotes.findById(storedNotes._id, { userNotes });

        // console.log("User Notes:", fetchUserNotes);

        res.status(200).json({ message: "User Notes Successfully Fetched", data: fetchUserNotes });


    } catch (error) {
        console.log("Fetched Error:", error);
        res.status(500).json("Failed TO Fetched User Notes");
    }

}

export const deleteNotes = async (req, res) => {
    try {

        console.log("i am here i n delete");
        const { noteId } = req.body;

        const { id: _id } = req.params;
        console.log("note id:", _id);
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(_id)) {

            return res.status(404).send("User Not Found")

        }

        if (!userId) {
            return res.status(404).send("Unauthorized User")
        }

        console.log("look here:", userId);

        const existingUser = await userNotes.findOne({ userId })

        if (!existingUser) {
            console.error("usrId:", existingUser);
        }


        await userNotes.findOneAndUpdate({ userId }, { $pull: { userNotes: { _id: noteId } } }, { new: true });
        console.log("i am here");
        return res.status(200).json("User Note Successfully deleted")

    } catch (error) {

        console.log("delete error:", error);

        return res.status(500).json("Unable to delete User Note")

    }
}