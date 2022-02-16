import {
  FETCH_STUDENTS_PENDING,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_ERROR,
  SEARCH_STUDENT_BY_NAME,
  ADD_TAG,
  SEARCH_STUDENT_BY_TAG,
  SEARCH_STUDENTS,
} from "./actions";

import produce from "immer";

const initialState = {
  loading: false,
  rawData: [],
  students: [],
  error: null,
  nameSearch: "",
  tagSearch: "",
};

const searchByTag = (tags, tagSearch) => {
  if (tagSearch.trim() === "") {
    return true;
  }

  let isTagsContain = false;
  tags.forEach((tag) => {
    isTagsContain = isTagsContain || tag.toLowerCase().includes(tagSearch);
  });

  return isTagsContain;
};

const searchByName = (name, firstName, lastName) => {
  return firstName.includes(name) || lastName.includes(name);
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        rawData: action.payload,
        students: action.payload,
      };
    case FETCH_STUDENTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case SEARCH_STUDENT_BY_NAME: {
      const name = action.payload;
      return { ...state, nameSearch: name };
    }
    case ADD_TAG: {
      const { value, id } = action.payload;
      const students = produce(state.students, (draftState) => {
        const indexStudentsData = draftState.findIndex(
          (student) => student.id === id
        );
        draftState[indexStudentsData].tags.push(value);
      });

      const rawData = produce(state.rawData, (draftState) => {
        const indexRawData = draftState.findIndex(
          (student) => student.id === id
        );
        draftState[indexRawData].tags.push(value);
      });

      return { ...state, students: students, rawData: rawData };
    }

    case SEARCH_STUDENT_BY_TAG: {
      const name = action.payload;
      return { ...state, tagSearch: name };
    }

    case SEARCH_STUDENTS: {
      const name = state.nameSearch;

      const students = produce(state.rawData, (draftState) => {
        const searchResult = draftState.filter(
          (student) =>
            searchByTag(student.tags, state.tagSearch) &&
            searchByName(
              name,
              student.firstName.toLowerCase(),
              student.lastName.toLowerCase()
            )
        );

        return searchResult;
      });

      return { ...state, students: students };
    }
    default:
      return state;
  }
};

export const studentsSelector = (state) => state.students.students;
export const isFetchingStudentsSelector = (state) => state.students.loading;

export default studentsReducer;
