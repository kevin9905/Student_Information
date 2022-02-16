import { bindActionCreators } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import "./App.css";

import Students from "./components/Students";

import {
  studentsSelector,
  isFetchingStudentsSelector,
} from "./features/reducer";

import {
  searchByName,
  addTag,
  searchStudents,
  searchByTag,
} from "./features/actions";

import { fetchStudents } from "./features/students";

const App = ({
  students,
  searchStudentsByName,
  fetchStudentsData,
  addTagStudent,
  searchStudents,
  searchByTag,
}) => {
  React.useEffect(() => {
    fetchStudentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid student-modal">
      <input
        className="search-input"
        placeholder="Search by name"
        size="large"
        onChange={(e) => {
          searchStudentsByName(e.target.value);
          searchStudents();
        }}
      />
      <input
        className="search-input"
        placeholder="Search by tag"
        size="large"
        onChange={(e) => {
          searchByTag(e.target.value);
          searchStudents();
        }}
      />

      {students.map((student) => (
        <Students
          key={student.id}
          data={student}
          addTagStudent={addTagStudent}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: studentsSelector(state),
  loading: isFetchingStudentsSelector(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchStudentsData: fetchStudents,
      searchStudentsByName: searchByName,
      addTagStudent: addTag,
      searchStudents: searchStudents,
      searchByTag: searchByTag,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
