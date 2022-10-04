import React from "react";

const SearchPosts = ({
  setKeyword,
  categories,
  setCategory,
  setCategoryValued,
}) => {
  return (
    <>
      <div className="search_box search_box-first">
        <label htmlFor="keyword">Search By Keyword:</label>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setKeyword(e.target.value);
            setCategoryValued(true);
          }}
        />
      </div>
      <div className="search_box">
        <label htmlFor="keyword">Search By Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} name="" id="">
          <>
            <option value="">No selected</option>
            {categories?.map((cat) => (
              <option value={cat.title}>{cat.title}</option>
            ))}
          </>
        </select>
      </div>
    </>
  );
};

export default SearchPosts;
