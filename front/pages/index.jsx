import React from "react";
import styled from "styled-components";
import Typist from "react-typist";
import { Table } from "antd";

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

const MyWeb = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
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
        <MyTable rowKey="id" columns={columns} dataSource={[]} size={"small"} />
      </Wrapper>
    </Whole>
  );
};

export default MyWeb;
