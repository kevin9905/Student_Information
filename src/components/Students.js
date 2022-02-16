import React from "react";

import { nanoid } from "nanoid";

const StudentInformation = ({ data, addTagStudent }) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const calculateAvgScore = (scores) => {
    const sum = scores.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    const avgScore = sum / scores.length || 0;

    return avgScore;
  };
  const addTag = React.useCallback(
    (id) => {
      const value = inputValue;
      if (value.trim().length > 0) {
        addTagStudent(value, id);
        setInputValue("");
      }
    },
    [addTagStudent, inputValue]
  );

  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTag(data.id);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-3 text-center">
          <img
            className="border border-light rounded-circle img-responsive"
            style={{
              width: "150px",
              height: "150px",
            }}
            src={data.pic}
            alt="ava"
          />
        </div>
        <div className="col-9">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h1 className="text-dark">
              <strong>
                {data.firstName.toUpperCase()} {data.lastName.toUpperCase()}
              </strong>
            </h1>
            <button
              className="btn btn-white"
              onClick={() => setOpen((value) => !value)}
            >
              <i
                className={
                  open
                    ? "fa fa-minus text-secondary"
                    : "fa fa-plus text-secondary"
                }
              ></i>
            </button>
          </div>
          <div direction="vertical">
            <span>Email: {data.email}</span>
            <br />
            <span>Company: {data.company}</span>
            <br />
            <span>Skill: {data.skill}</span>
            <br />
            <span>Average: {calculateAvgScore(data.grades)}%</span>
          </div>

          <div
            direction="vertical"
            style={{
              paddingLeft: "10px",
              lineHeight: "1.6",
              display: open ? "block" : "none",
            }}
          >
            {data.grades.map((grade, index) => (
              <span key={nanoid()}>
                Test {index + 1}: &emsp; {grade}%<br />
              </span>
            ))}
          </div>
          <div style={{ marginBottom: "40px" }}>
            {data.tags.map((tag) => (
              <span
                className="rounded text-light bg-secondary"
                style={{
                  margin: "10px",
                  padding: "2px",
                  fontSize: "18px",
                }}
                key={nanoid()}
              >
                {tag}
              </span>
            ))}
            <br />
            <input
              className="no-border"
              placeholder="Add a tag"
              size="large"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={handleUserInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;
