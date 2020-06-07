import React, { useState } from "react";
import PropTypes from "prop-types";

//actions
import { filterByHashtags, filterBySearchKeyword } from "core/actions/note";

//antd
import { Input } from "antd";
//components
import HashtagsList from "./HashtagsList";

const Filters = ({ dispatch, notes }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const { selectedHashtags, hashtagsList } = notes;
  //filter by tags
  const handleHashtagClick = (hashtag) => {
    dispatch(filterByHashtags([...new Set([...selectedHashtags, hashtag])]));
  };

  //search by keyword
  const handleSearch = (keyword) => {
    dispatch(filterBySearchKeyword(keyword));
  };

  //delete hashtag
  const handleDeleteHashtag = (hashtag) => {
    const newHashtags = selectedHashtags.filter((i) => i !== hashtag);
    dispatch(filterByHashtags(newHashtags));
  };

  return (
    <React.Fragment>
      <div style={{ marginBottom: "2em" }} className="filters">
        <Input.Search
          placeholder="Search"
          value={searchKeyword}
          onSearch={handleSearch}
          size="large"
          onChange={(e) => setSearchKeyword(e.target.value)}
          allowClear
        />
      </div>
      <HashtagsList
        selectedHashtags={selectedHashtags}
        hashtags={hashtagsList}
        onHashtagClick={handleHashtagClick}
        onDeleteHashtag={handleDeleteHashtag}
      />
    </React.Fragment>
  );
};

Filters.proptype = {
  dispatch: PropTypes.func,
  notes: PropTypes.object,
};

export default Filters;
