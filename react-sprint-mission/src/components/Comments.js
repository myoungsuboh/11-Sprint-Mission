import React, { useCallback, useEffect, useState } from "react";
import {
  VerticalSelect,
  Textarea,
  Button,
  ImgPath,
  UserIconInfo,
} from "components/index";
import { getAxios } from "utils/api";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Comments({ id, limit = 10 }) {
  const [commentData, setCommentData] = useState({ list: [], nextCursor: 0 });
  const [inquiry, setInquiry] = useState("");

  const getComments = useCallback(async () => {
    const res = await getAxios({
      path: `${process.env.REACT_APP_API_URL}/${id}/comments`,
      params: { limit },
    });
    if (res.status === 200) {
      setCommentData(res.data);
    } else {
      alert("댓글 조회 오류!!");
    }
  }, [id, limit]);

  const handleSelectChagne = (value) => {
    // 코멘트 수정 및 삭제 기능 추가 예정
    console.log(value);
  };
  const handleInquiryChange = (value) => {
    setInquiry(value);
  };
  const handleItamSubmit = () => {
    //문의글 저장 기능 추가 예정
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <>
      <h4>문의하기</h4>
      <Textarea
        id="itemInquiryInput"
        className="inputBox textarea"
        type="textarea"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        onChange={handleInquiryChange}
      />
      <div className="flexEnd">
        <Button
          className="itemSubmit"
          type="button"
          bg={"var(--skyblue)"}
          onClick={handleItamSubmit}
        >
          등록
        </Button>
      </div>
      <div>
        {commentData.list.map((comment, idx) => {
          return (
            <div key={comment.id}>
              <div className="spaceBetween">
                <CommentText>{comment.content}</CommentText>
                <VerticalSelect onChange={handleSelectChagne} />
              </div>
              <UserIconInfo
                image={comment.writer.image}
                nickname={comment.writer.nickname}
                desc={comment.updatedAt}
              />
              <div className="line" />
            </div>
          );
        })}
      </div>

      <BackButton>
        <NavLink className="navLink" to={"/items"}>
          목록으로 돌아가기
          <Image src={`${ImgPath("/common/ic_return.png")}`} alt="return" />
        </NavLink>
      </BackButton>
    </>
  );
}

const CommentText = styled.span`
  width: 90%;
  margin: 10px 0;
`;

const BackButton = styled.button`
  display: flex;
  flex-direction: row;
  padding: 4px 12px;
  margin: 0 auto;
  width: 240px;
  height: 48px;
  background: var(--skyblue);
  border: 1px solid #e5e7eb;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  color: var(--white);
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  right: 20px;
  top: 15px;
`;

export default Comments;
