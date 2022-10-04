import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchFinish, fetchStart } from "../redux/authSlicer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Pagination Sorting Filter
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [pageNumber, setpageNumber] = useState(1);
  const [pageSize, setpageSize] = useState(3);
  const [arrow, setArrow] = useState(true);
  const [sortDir, setSortDir] = useState("desc");
  const [sortField, setSortField] = useState("createdDate");
  const [pageEmpty, setPageEmpty] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [posts, setPosts] = useState([]);

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
  console.log(loggedInUser);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber]);

  const fetchPosts = async () => {
    dispatch(fetchStart());

    try {
      const { data } = await axios.get(
        `/api/v1/posts/all_paginated?pageSize=${pageSize}&pageNo=${pageNumber}&sortDir=${sortDir}&sortField=${sortField}&keyword=${keyword}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchFinish());
      console.log(data);
      setPosts(data.content);
      setTotalPages(data.totalPages);
      setPageEmpty(data.empty);
      setIsFirstPage(data.first);
      setIsLastPage(data.last);
    } catch (error) {
      dispatch(fetchFinish());
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [pageNumber, pageSize, sortDir, arrow, keyword, token]);

  console.log(posts);

  return (
    <div className="posts_main_container">
      <div className="search_box">
        <label htmlFor="keyword">Search By Keyword:</label>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      {pageEmpty ? (
        <div className="no_posts text-center">
          No Users match with your field!..
        </div>
      ) : (
        posts?.map((post) => (
          <Post
            key={post.id}
            token={token}
            loggedInUser={loggedInUser}
            post={post}
          />
        ))
      )}

      {!pageEmpty && totalPages > 1 && (
        <div className="page_actions">
          <div className="page_selections">
            <label htmlFor="">Page Size:</label>
            <input
              defaultValue={null}
              type="text"
              onChange={(e) => setpageSize(e.target.value)}
            />
          </div>
          <div className="the_pages">
            <button
              disabled={isFirstPage === true}
              className="arrow_btn"
              type="button"
              onClick={() => setpageNumber(pageNumber - 1)}
            >
              <ArrowBackIosIcon />
            </button>
            <div className="page_numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (val, index) => (
                  <div
                    key={index}
                    onClick={() => setpageNumber(index + 1)}
                    className={
                      pageNumber === index + 1
                        ? "page_number active"
                        : "page_number"
                    }
                  >
                    {index + 1}
                  </div>
                )
              )}
            </div>
            <button
              disabled={isLastPage === true}
              className="arrow_btn"
              type="button"
              onClick={() => setpageNumber(pageNumber + 1)}
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
