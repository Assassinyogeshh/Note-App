import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Notes.css";
import { Link } from "react-router-dom";

function Notes() {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [storeId, setStoreId] = useState();
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const apiUrl = "http://localhost:3000";
        const token = await JSON.parse(localStorage.getItem("userToken"));

        if (!token) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(
          `${apiUrl}/Notes/getUserNotes/${id}`,
          config
        );

        const fetchedUserNotes = response.data.data.userNotes;
        const userNoteId = response.data.data._id;
        setStoreId(userNoteId);
        setNotes(fetchedUserNotes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, [id]);

  const handleDelete = async (noteId) => {
    try {
      const apiUrl = "http://localhost:3000";
      const token = JSON.parse(localStorage.getItem("userToken"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.patch(
        `${apiUrl}/Notes/deleteNotes/${id}`,
        { noteId },
        config
      );

      if (response?.status === 200) {
        alert("Note Successfully Deleted");
        window.location.reload();
      }
    } catch (error) {
      const errorResponse = error.response;

      console.log(error);

      if (errorResponse?.status === 500) {
        alert("Unable To Delete Note");
      }

      if (errorResponse?.status === 404) {
        alert("Note Not Found");
      }
    }
  };

  const formatCreationDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filterNotesByMonth = (notes, targetMonth) => {
    return notes.filter((note) => {
      const noteDate = new Date(note.createdNoteTime);
      const noteMonth = noteDate.getMonth() + 1;

      return noteMonth === targetMonth;
    });
  };

  const filteredNotes = selectedMonth
    ? filterNotesByMonth(notes, selectedMonth)
    : notes;
  return (
    <>
      {filteredNotes.length > 0 ? (
        <div className="user_all_notes">
          <div>
            <select
              className="select_month"
              value={!selectedMonth ? "" : selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              <option className="month" value="">
                Select Month
              </option>
              <option className="month" value={1}>
                January
              </option>
              <option className="month" value={2}>
                February
              </option>
              <option className="month" value={3}>
                March
              </option>
              <option className="month" value={4}>
                April
              </option>
              <option className="month" value={5}>
                May
              </option>
              <option className="month" value={6}>
                June
              </option>
              <option className="month" value={7}>
                July
              </option>
              <option className="month" value={8}>
                August
              </option>
              <option className="month" value={9}>
                September
              </option>
              <option className="month" value={10}>
                October
              </option>
              <option className="month" value={11}>
                November
              </option>
              <option className="month" value={12}>
                December
              </option>
            </select>
          </div>
          <div className="user_added_notes">
            {filteredNotes.map((allNotes, index) => (
              <div className="UserNotes" key={index}>
                <p className="title">{allNotes.title}</p>
                <p className="note">{allNotes.notes}</p>
                <div id="update_note">
                  <span className="note_date">
                    <p>{formatCreationDate(allNotes.createdNoteTime)}</p>
                  </span>
                  <span className="edit_note">
                    <Link
                      className="remove_link_style UPDATE_BTN"
                      to={`/Notes/updateNotes/${allNotes._id}`}
                    >
                      <button className="update">Update</button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => handleDelete(allNotes._id)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="add_user_notes">
            <Link
              to={`/Notes/addNotes/${storeId}`}
              className="remove_link_style"
            >
              <button className="add_notes_btn">+</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="check_month_notes">
          Add Your Notes
          <Link to={`/Notes/addNotes/${storeId}`} className="remove_link_style">
            <p>Start Adding</p>
          </Link>
        </div>
      )}
    </>
  );
}
export default Notes;
