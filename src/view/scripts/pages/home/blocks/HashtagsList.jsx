import React from "react";
import PropTypes from "prop-types";

//antd
import List from "antd/lib/list";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import { CloseOutlined } from "@ant-design/icons";

const HashtagsList = ({
  selectedHashtags,
  hashtags,
  onHashtagClick,
  onDeleteHashtag,
}) => (
  <div className="hashtagsList">
    <Row>
      {selectedHashtags.map((hashtag, index) => (
        <Button
          className="hashtagButton"
          onClick={() => onDeleteHashtag(hashtag)}
          key={index}
        >
          {hashtag}
          <CloseOutlined />
        </Button>
      ))}
    </Row>

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
  selectedHashtags: PropTypes.array,
  onHashtagClick: PropTypes.func,
  onDeleteHashtag: PropTypes.func,
};
export default HashtagsList;
