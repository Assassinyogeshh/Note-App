import express from "express";
import { addUserNotes, updateUserNote, getAllNotes, deleteNotes } from "../Controller/notes.js";
import auth from "../MiddleWear/auth.js";

const router = express.Router();

router.post("/addNotes/:id", auth, addUserNotes);

router.patch("/updateNotes/:id", auth, updateUserNote);

router.get("/getUserNotes/:id", auth, getAllNotes);

router.patch("/deleteNotes/:id", auth, deleteNotes);

export default router;
