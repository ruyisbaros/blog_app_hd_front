import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import defaultAvatar from "../images/default-user.png";
import { fetchFinish, fetchStart } from "../redux/authSlicer";
import loadingImage from "../images/loading.gif";
import JoditEditor from "jodit-react";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editor = useRef();

  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState({ id: "", url: "" });
  const [isCreated, setIsCreated] = useState(false);
  const [token, setToken] = useState("");
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setLoggedInUser(JSON.parse(localStorage.getItem("currentUser")));
    }
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);
  console.log(token);
  console.log(loggedInUser);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    categoryTitle: "",
    userId: "",
    imageId: "",
  });
  console.log(newPost);
  const fetchCategories = async () => {
    const { data } = await axios.get("/api/v1/categories/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, [token]);

  const handleInput = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
      userId: loggedInUser?.id,
    });
  };

  //Post image settings start
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectFile = async (e) => {
    const file = e.target.files[0];
    setIsCreated(true);

    if (!file) return alert("Please select an image");
    if (file.size > 1024 * 1024 * 1) {
      alert("Your file is too large (max 1mb allowed)");
      setSelectedFile("");
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Only jpeg, jpg or PNG images are allowed");
      setSelectedFile("");
      return;
    }

    setSelectedFile(file);
    let formData = new FormData();
    formData.append("multipartFile", file);

    const { data } = await axios.post("/api/v1/images/upload", formData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setIsCreated(false);
    console.log(data);
    setSelectedImage({
      ...selectedImage,
      id: data.imageId,
      url: data.imageUrl,
    });
    setNewPost({
      ...newPost,
      imageId: data.imageId,
    });
  };

  const deleteImage = async () => {
    setSelectedFile("");
    const { data } = await axios.delete(
      `/api/v1/images/delete/${selectedImage.id}`
    );
    setNewPost({
      ...newPost,
      imageId: "",
    });
  };

  //Submit and create post
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(fetchStart());
      const { data } = await axios.post(
        "/api/v1/posts/create",
        { ...newPost },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(data);
      dispatch(fetchFinish());
      toast.success("Post has been created successufully...");
      navigate("/posts");
    } catch (error) {
      dispatch(fetchFinish());
      toast.error(error.response.data.message);
    }
  };

  const cancelCreatePost = () => {
    navigate("/");
  };
  return (
    <div className="add_post">
      <form onSubmit={submitHandler}>
        <h3 className=" text-center my-5">
          Welcome{" "}
          <span
            style={{
              color: "blue",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {loggedInUser?.name}.
          </span>{" "}
          What is going in your mind?
        </h3>
        <div className="form-group">
          <label htmlFor="title">Post Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            required
            placeholder="Post Title"
            value={newPost.title}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Post Content:</label>
          <textarea
            className="text_area"
            type="text"
            name="content"
            id="content"
            required
            placeholder="Post Content"
            value={newPost.content}
            onChange={handleInput}
          ></textarea>
        </div>
        <div className="form-group cat_options">
          <label className="cat_title" htmlFor="categoryTitle">
            Post Category:
          </label>
          {categories?.map((cat) => (
            <div key={cat.id}>
              <label className="cat_input" htmlFor="content">
                {cat.title}
              </label>
              <input
                type="radio"
                name="categoryTitle"
                required
                value={cat.title}
                onChange={handleInput}
              />
            </div>
          ))}
        </div>
        <div className="form-group post_image_upload">
          <label htmlFor="image">Post Image:</label>
          <div className="image_select">
            <input
              type="file"
              accept="image/png/* , image/jpeg/*"
              //value={newUser.photos}
              onChange={handleSelectFile}
            />
          </div>
          {isCreated ? (
            <div className="post_upload_preview ">
              <img className="loading_image" src={loadingImage} alt="" />
            </div>
          ) : (
            <div className="post_upload_preview">
              <img src={preview ? preview : defaultAvatar} alt="" />
              {preview && <span onClick={deleteImage}>X</span>}
            </div>
          )}
        </div>
        <div className="button_box">
          <button type="submit" className="btn btn-primary w-30">
            Submit
          </button>
          <button
            onClick={cancelCreatePost}
            type="button"
            className="btn btn-danger w-30"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
