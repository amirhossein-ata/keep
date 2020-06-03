import React from "react";
import PropTypes from "prop-types";

//antd
import Input from "antd/lib/input";

const SearchInput = ({ value, onSearch, setValue }) => (
  <Input.Search
    placeholder="input search text"
    value={value}
    onSearch={onSearch}
    size="large"
    onChange={(e) => setValue(e.target.value)}

    // style={{ width: 300 }}
  />
);

SearchInput.proptype = {
  value: PropTypes.string,
  onSearch: PropTypes.func,
};

export default SearchInput;
