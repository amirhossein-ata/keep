import React from "react";
import PropTypes from "prop-types";

//antd
import List from "antd/lib/list";
import Tag from "antd/lib/tag";

const HashtagsList = ({
  selectedHashtags,
  hashtags,
  onHashtagClick,
  onDeleteHashtag,
}) => (
  <div>
    {selectedHashtags.map((hashtag, index) => (
      <p closable onClick={() => onDeleteHashtag(hashtag)} key={index}>
        {hashtag}
      </p>
    ))}
    <List
      header="Hashtags List"
      itemLayout="horizontal"
      dataSource={hashtags}
      renderItem={(item) => (
        <List.Item>
          <div onClick={() => onHashtagClick(item)}>
            <h3>{item}</h3>
          </div>
        </List.Item>
      )}
    />
  </div>
);

HashtagsList.proptype = {
  hashtags: PropTypes.array,
};
export default HashtagsList;
