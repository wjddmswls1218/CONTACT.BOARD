import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typist from "react-typist";
import { Table, Modal } from "antd";
import axios from "axios";

const Whole = styled.section`
  width: 100%;
  padding: 15px;

  background-color: #f0f0f0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid #d7d7d7;
  box-shadow: 3px 3px 9px #d7d7d7;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height || "100%"};
  padding: 15px;
  margin-top: ${(props) => props.mt || 0}px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.h2`
  position: relative;

  &:before {
    content: "WEB|APP Developer";
    position: absolute;

    right: -40px;
    bottom: -16px;

    font-size: 12px;

    //background-color: ;
    color: #fff;

    padding: 1px 5px;
    border-radius: 5px;

    background-color: #92a8d1;

    box-shadow: 3px 3px 3px #999;
    text-shadow: 2px 2px 2px #999;

    transform: rotate(-8deg);
  }
`;

const SubText = styled.p`
  color: #444;
  font-size: 15px;

  margin-top: 14px;

  font-weight: 600;
`;

const MyTable = styled(Table)`
  width: 100%;
`;

const _D_title = styled.div`
  margin: 10px 40px 0px;
  font-size: 18px;
  padding: 0px 3px;
  border-bottom: 3px solid #999;
`;

const _D_author = styled.div`
  font-size: 14px;
  color: #999;
  margin: 5px 0px;
`;

const _D_createdAt = styled.div`
  font-size: 14px;
  color: #999;
  margin: 5px 0px;
`;

const _D_content = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: 7px;
  box-shadow: 0px 0px 3px #d7d7d7;
  padding: 5px;
  overflow: scroll;
`;

const _D_deleteBtn = styled.button`
  margin-top: 20px;

  width: 120px;
  height: 27px;
  line-height: 23px;
  outline: none;
  background-color: red;
  border: none;
  color: #ffff;
  border-radius: 7px;

  cursor: pointer;
`;

const _D_updateBtn = styled.button`
  margin-top: 20px;
  margin-left: 15px;

  width: 120px;
  height: 27px;
  line-height: 23px;
  outline: none;
  background-color: skyblue;
  border: none;
  color: #ffff;
  border-radius: 7px;

  cursor: pointer;
`;

const MyWeb = () => {
  const [boardList, setBoardList] = useState([]);
  const [detailModal, setDetailModal] = useState(false);

  const [dTitle, setDTitle] = useState("");
  const [dAuthor, setDAuthor] = useState("");
  const [dCreatedAt, setDCreatedAt] = useState("");
  const [dContent, setDcontent] = useState("");

  const getList = async () => {
    const result = await axios.get("http://localhost:4000/api/list");

    setBoardList(result.data);
  };

  const detailModalToggle = () => {
    setDetailModal((prev) => !prev);
  };

  useEffect(() => {
    getList();
  }, []);

  const titleClickHandler = (data) => {
    setDTitle(data.title);
    setDAuthor(data.author);
    setDCreatedAt(data.formatCreatedAt);
    setDcontent(data.content);

    detailModalToggle();
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
    },
    {
      title: "Title",
      render: (data) => (
        <div onClick={() => titleClickHandler(data)}>{data.title}</div>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "CreatedAt",
      dataIndex: "fromatCreatedAt",
    },
    {
      title: "Hit",
      dataIndex: "hit",
    },
  ];
  return (
    <Whole>
      {/* title setion*/}
      <Wrapper height="180px">
        <TitleText>Talk To Developer JEJ</TitleText>
        <Typist cursor={{ show: false }}>
          <SubText>
            제에게 전하고 싶은 말이 있으신가요? 게시글을 작성해주세요✍🏻
          </SubText>
        </Typist>
      </Wrapper>

      {/*board setion */}
      <Wrapper mt="100">
        <MyTable
          rowKey="id"
          columns={columns}
          dataSource={boardList}
          size={"small"}
        />
      </Wrapper>

      <Modal
        footer={null}
        visible={detailModal}
        title="게시글 상세정보"
        width="100%"
        onCancel={() => detailModalToggle(null)}
      >
        <_D_title>{dTitle}</_D_title>
        <_D_author>{dAuthor}</_D_author>
        <_D_createdAt>{dCreatedAt}</_D_createdAt>
        <_D_content>{dContent}</_D_content>
        <_D_deleteBtn>삭제</_D_deleteBtn>
        <_D_updateBtn>수정</_D_updateBtn>
      </Modal>
    </Whole>
  );
};

export default MyWeb;
