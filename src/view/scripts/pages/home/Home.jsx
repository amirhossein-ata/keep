import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//actions
import { getNotes } from "core/actions/note";
//antd imports
import Row from "antd/lib/row";
import Col from "antd/lib/col";
//components
import Notes from "./blocks/Notes";
import AddNewNote from "./blocks/AddNewNote";
import Filters from "./blocks/Filters";

const Home = ({ notes, dispatch }) => {
  //get notes when component loaded
  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return (
    <div>
      <Row
        gutter={24}
        justify="center"
        style={{ marginTop: "2em", padding: "2em" }}
      >
        <Col span={6}>
          <Filters dispatch={dispatch} notes={notes} />
        </Col>
        <Col span={3} />

        <Col span={10}>
          <AddNewNote dispatch={dispatch} />
          <Notes notes={notes} dispatch={dispatch} />
        </Col>
        <Col span={5} />
      </Row>
    </div>
  );
};

Home.proptype = {
  notes: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => ({ notes: state.note });

export default connect(mapStateToProps)(Home);
