import React from "react";

const AddPost = ({ loggedInUser }) => {
  return (
    <div className="add_post">
      <form>
        <h3 className=" text-center my-5">
          Welcome{" "}
          <span
            style={{
              color: "blue",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {loggedInUser.name}.
          </span>{" "}
          What is going in your mind?
        </h3>
      </form>
    </div>
  );
};

export default AddPost;
