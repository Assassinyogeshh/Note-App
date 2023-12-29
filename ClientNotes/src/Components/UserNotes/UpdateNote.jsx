import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    notes: "",
  };

  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues,
    onSubmit: async (values, Action) => {
      try {
        const apiUrl = "https://user-note-app.onrender.com";

        const userProfileData =JSON.parse(localStorage.getItem("userProfile"));
 
    const userID = userProfileData?.data?._id;
    console.log("yo Iam id:",userID);
        const token = JSON.parse(localStorage.getItem("userToken"));

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
        };

        const response = await axios.patch(
          `${apiUrl}/Notes/updateNotes/${id}`,
          values,
          config
        );

        console.log("Notes Add:", response);

        if (response?.status === 200) {
          alert("Update Successfully");
        }
        Action.resetForm();

        navigate(`/Notes/getUserNotes/${userID}`);
      } catch (error) {
        const errorResponse = error.response;

        console.log(error);

        if (errorResponse?.status === 500) {
          alert("Unable To Add Note");
        }

        if (errorResponse?.status === 404) {
          alert("User Not Found");
        }
        if (errorResponse?.status === 401) {
          alert("Before Adding Note Login First");
          navigate("/Auth/login");
        }
      }
    },
  });

  return (
    <>
      <div className="adding_user_notes">
        <h1>Update Your Notes</h1>
        <form className="adding_note" onSubmit={handleSubmit}>
          <span className="create_note title_span">
            <label htmlFor="newTitle">Title:</label>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              id="newTitle"
              autoComplete="off"
              required
            />
          </span>
          <span className="create_note">
            <label htmlFor="newNotes">Note:</label>
            <textarea
              placeholder="Enter Note"
              name="notes"
              value={values.notes}
              onChange={handleChange}
              id="newNotes"
              autoComplete="off"
              rows="4"
              cols="50"
              required
            />
          </span>

          <button type="submit" className="add_btn" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateNote;
