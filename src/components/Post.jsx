import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import moment from "moment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextsmsIcon from "@mui/icons-material/Textsms";
import axios from "axios";
import { toast } from "react-toastify";

const Post = ({ post, loggedInUser, token }) => {
  //.filter((cmt) => cmt.post.id === post.id)
  //const pathname = window.location.pathname;
  //console.log(pathname);
  //footer
  const [isLiked, setIsLiked] = useState(false);

  //Comments
  const [showButtons, setShowButtons] = useState(false);
  const [makeComment, setMakeComment] = useState("");
  const [showCommentsBody, setShowCommentsBody] = useState(false);
  const [ownComments, setOwnComments] = useState([]);
  const [isCommented, setIsCommented] = useState(false);

  const fetchPostOwnComments = async () => {
    const { data } = await axios.get(`/api/v1/comments/post/${post.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOwnComments(data);
  };

  const submitComment = async (e) => {
    setIsCommented(true);
    if (makeComment !== "") {
      try {
        const { data } = await axios.post(
          "/api/v1/comments/create",
          { content: makeComment, userId: loggedInUser.id, postId: post.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsCommented(false);
        console.log(data);
        setMakeComment("");
        setShowButtons(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please text your comments");
    }

    //window.location.reload();
  };

  useEffect(() => {
    fetchPostOwnComments();
  }, [isCommented]);

  console.log(ownComments);

  return (
    <div key={post.id} className="posts_container">
      <div className="post_owner">
        <Link to={`/user/${post.user.id}`} className="link_class">
          <img
            className="post_owner-img"
            src={post.user.image.imageUrl}
            alt=""
          />
        </Link>
        <div className="post_owner-info">
          <p>
            {post.user.name}. <span>{moment(post.createdDate).fromNow()}</span>
          </p>
          <h3>{post.user.about}</h3>
        </div>
      </div>
      <div className="post_content_box">
        <div className="post_content-header">
          <h3 className="post_category_title">
            <span>Category: </span>
            {post.category.title}
          </h3>
          <h3 className="post_title">{post.title}</h3>
          <p className="post_content">{post.content}</p>
        </div>
        <div className="post_content-body">
          <img src={post.postImage.imageUrl} alt="" />
        </div>
        <div className="post_content-footer">
          <div className="post_content-footer-icons">
            <div className="left_side_icons">
              <div onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                <span>234</span>
              </div>
              <div>
                <ShareIcon />
              </div>
              <div>
                <DownloadIcon />
              </div>
              <div onClick={() => setShowCommentsBody(!showCommentsBody)}>
                <TextsmsIcon />
              </div>
            </div>
            <div className="post_content-footer-more">
              <MoreHorizIcon />
            </div>
          </div>
          {showCommentsBody && (
            <div className="post_content-footer-comments">
              <div className="make_comment">
                <div className="comment_count">34 comments</div>
                <img
                  className="make_comment-img"
                  src={loggedInUser?.image.imageUrl}
                  alt=""
                />
                <input
                  type="text"
                  required
                  placeholder="Add comment..."
                  value={makeComment}
                  onChange={(e) => setMakeComment(e.target.value)}
                  onMouseDown={() => setShowButtons(true)}
                />
              </div>
              {showButtons && (
                <div className="comment_submit-btns">
                  <button
                    type="submit"
                    onClick={submitComment}
                    className="comment_submit comment_ok"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => {
                      setMakeComment("");
                      setShowButtons(false);
                    }}
                    className="comment_submit comment_cancel"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div className="comment_container">
                {ownComments?.map((ownCom) => (
                  <div key={ownCom.id} className="each_comment">
                    <img src={ownCom.user.image.imageUrl} alt="" />
                    <div className="each_comment-info">
                      <p className="info-name">
                        {ownCom.user.name}.{" "}
                        <span>{moment(ownCom.createdDate).fromNow()}</span>
                      </p>
                      <p className="info-content">{ownCom.content}</p>
                      <div className="each_comment-info-icons">
                        <div onClick={() => setIsLiked(!isLiked)}>
                          {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                          <span>24</span>
                        </div>
                        <button className="each_comment-info-replay">
                          replay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
