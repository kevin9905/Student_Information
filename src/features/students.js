import {
  fetchStudentsPending,
  fetchStudentsSuccess,
  fetchStudentsError,
} from "./actions";

const preProcessData = (rawData) => {
  return rawData.map((student) => {
    return {
      ...student,
      tags: [],
    };
  });
};

export const fetchStudents = () => {
  return (dispatch) => {
    dispatch(fetchStudentsPending());
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        const students = preProcessData(res.students);
        dispatch(fetchStudentsSuccess(students));
        return res.students;
      })
      .catch((error) => {
        dispatch(fetchStudentsError(error));
      });
  };
};
