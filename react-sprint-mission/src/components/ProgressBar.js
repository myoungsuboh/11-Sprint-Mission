import React from "react";
import styled from "styled-components";

function ProgressBar({ maxItem = 10, availableItem = 1 }) {
  return (
    <ProgressBarWrap>
      <Progress width={100 - (availableItem * 100) / maxItem} />
    </ProgressBarWrap>
  );
}

const ProgressBarWrap = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 20px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${(props) => props.width}%;
  height: 1px;
  padding: 0;
  text-align: center;
  background-color: #f96d69;
  color: #111;
`;

export default ProgressBar;
