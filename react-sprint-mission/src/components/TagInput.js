import React, { useEffect, useState } from "react";
import { ImgPath } from ".";
import styled from "styled-components";

function TagInput({ children, onChange }) {
  const [inputTagValue, setInputTagValue] = useState([]);
  const [tagArr, setTagArr] = useState([]);

  const handleInputChange = (e) => {
    setInputTagValue(e.target.value.trim());
  };

  const handleOnchange = (data) => {
    const newTagArr = data.reduce((acc, cur) => {
      acc.push(cur.value);
      return acc;
    }, []);
    onChange(newTagArr);
  };

  const handleTagBtnDelete = (key) => {
    const filterTagArr = tagArr.filter((tag, idx) => tag.key !== key);
    setTagArr(filterTagArr);
    handleOnchange(filterTagArr);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      const addTagArr = [
        ...tagArr,
        { key: tagArr.length, value: e.target.value },
      ];
      setTagArr(addTagArr);
      setInputTagValue("");
      handleOnchange(addTagArr);
    }
  };

  return (
    <>
      <label>{children}</label>
      <input
        className="inputBox"
        placeholder="태그를 입력해주세요"
        value={inputTagValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <TagCollect>
        {tagArr.map((tag) => {
          return (
            <button
              id={`tagButton${tag.key}`}
              key={`tagButton${tag.key}`}
              className="tagButton"
              onClick={() => handleTagBtnDelete(tag.key)}
            >
              {`#${tag.value}`}
              <img
                id={`tagButtonCancel${tag.key}`}
                src={ImgPath("/common/ic_X.png")}
                alt="cancel"
              />
            </button>
          );
        })}
      </TagCollect>
    </>
  );
}

const TagCollect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  height: 100%;
  margin-bottom: 32px;
  background: none;
`;

export default TagInput;
