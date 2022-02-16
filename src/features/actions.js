export const FETCH_STUDENTS_PENDING = "FETCH_STUDENTS_PENDING";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_ERROR = "FETCH_STUDENTS_ERROR";
export const SEARCH_STUDENT_BY_NAME = "SEARCH_STUDENT_BY_NAME";
export const ADD_TAG = "ADD_TAG";
export const SEARCH_STUDENT_BY_TAG = "SEARCH_STUDENT_BY_TAG";
export const SEARCH_STUDENTS = "SEARCH_STUDENTS";

export const fetchStudentsPending = () => {
  return {
    type: FETCH_STUDENTS_PENDING,
  };
};

export const fetchStudentsSuccess = (students) => {
  return {
    type: FETCH_STUDENTS_SUCCESS,
    payload: students,
  };
};

export const fetchStudentsError = (error) => {
  return {
    type: FETCH_STUDENTS_ERROR,
    payload: error,
  };
};

export const searchByName = (name) => {
  return {
    type: SEARCH_STUDENT_BY_NAME,
    payload: name.toLowerCase(),
  };
};

export const searchByTag = (tag) => {
  return {
    type: SEARCH_STUDENT_BY_TAG,
    payload: tag.toLowerCase(),
  };
};

export const searchStudents = () => {
  return {
    type: SEARCH_STUDENTS,
  };
};

export const addTag = (value, id) => {
  return {
    type: ADD_TAG,
    payload: { value, id },
  };
};
