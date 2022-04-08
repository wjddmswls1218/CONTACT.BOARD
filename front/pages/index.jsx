import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Typist from "react-typist";
import { Table, Modal, Button, Form, Input, message } from "antd";
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
  margin-top: ${(props) => props.mt || 0};

  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.al || "center"};
  justify-content: ${(props) => props.jc || "center"};
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

const __D_deleteBtn = styled.button`
  margin-top: 20px;

  width: 120px;
  height: 27px;
  line-height: 23px;
  outline: none;
  background-color: red;
  border: none;
  color: #ffff;
  border-radius: 7px;

  margin-left: 10px;

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

const WriteTextArea = styled(Input.TextArea)`
  resize: none;
`;

const MyWeb = () => {
  const [boardList, setBoardList] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [writeModal, setWriteModal] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [mpassModal, setmPassModal] = useState(false);

  const [selectId, setSelectId] = useState(null);
  const [dTitle, setDTitle] = useState("");
  const [dAuthor, setDAuthor] = useState("");
  const [dCreatedAt, setDCreatedAt] = useState("");
  const [dContent, setDcontent] = useState("");
  const [dPass, setDPass] = useState(null);

  const [mselectId, setMselectId] = useState(null);
  const [mTitle, setMTitle] = useState("");
  const [mAuthor, setMAuthor] = useState("");
  const [mCreatedAt, m] = useState("");
  const [] = useState("");
  const [] = useState(null)

  const writeForm = useRef();
  const passForm = useRef();

  const getList = async () => {
    const result = await axios.get("http://localhost:4000/api/list");

    setBoardList(result.data);
  };

  const writeModalToggle = () => {
    setWriteModal((prev) => !prev);
  };

  const detailModalToggle = () => {
    setDetailModal((prev) => !prev);
  };

  const passModalToggle = () => {
    setPassModal((prev) => !prev);
  };

  const dpassModalToggle = () => {
    setdPassModal((prev) => !prev);
  };

  useEffect(() => {
    getList();
  }, []);

  const titleClickHandler = (data) => {
    setSelectId(data.id);
    setDTitle(data.title);
    setDAuthor(data.author);
    setDCreatedAt(data.formatCreatedAt);
    setDcontent(data.content);
    setDPass(data.pass);

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

  const writeFormHanddler = async (fd) => {
    console.log(fd);

    const result = await axios.post("http://localhost:4000/api/write", fd);

    if (result.status === 201) {
      message.success("새로운 게시글이 등록되었습니다.");
      writeModalToggle();

      writeForm.current.resetFields();

      getList();
    } else {
      message.error("게시글 등록에 실패하셨습니다. 다시 시도해주세요");
    }
  };

  const deleteHandler = async (d) => {
    const result = await axios.post("http://localhost:4000/api/delete", {
      selectId,
    });

    if (result.status === 200) {
      message.success("게시글이 삭제되었습니다.");
      detailModalToggle();
      getList();
    } else {
      message.error("게시글 삭제에 실패하셨습니다.");
    }
  };

  const passwordCheckHandler = useCallback(
    (data) => {
      const realPass = "" + dPass;
      const comparePass = "" + data.pass;

      if (realPass === comparePass) {
        message.success("비밀번호가 일치하였습니다.");
        passForm.current.resetFields();
        passModalToggle();
        deleteHandler();
      } else {
        message.error("비밀번호가 일치하지않습니다.");
        passForm.current.resetFields();
        return;
      }
    },
    [passForm.current, dPass]
  );

  const dpasswordCheckHandler = useCallback((data) => {
    const realDpass = "" + 
  })
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
      <Wrapper al="flex-end">
        <Button type="primary" size="small" onClick={() => writeModalToggle()}>
          작성
        </Button>
        <MyTable
          rowKey="id"
          columns={columns}
          dataSource={boardList}
          size={"small"}
        />
      </Wrapper>

      {/*********************************** DETAIL MODAL ***********************************/}
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
        <_D_deleteBtn onClick={() => passModalToggle()}>삭제</_D_deleteBtn>
        <__D_deleteBtn onClick={() => dpassModalToggle()}>삭제2</__D_deleteBtn>
        <_D_updateBtn>수정</_D_updateBtn>
      </Modal>
      {/*시험 개좆같당 ㅎㅎ*/}
      {/*********************************************************************************/}

      {/*********************************** WRITE MODAL ***********************************/}
      <Modal
        footer={null}
        visible={writeModal}
        title="게시글 작성하기"
        width="100%"
        onCancel={() => writeModalToggle()}
      >
        <Form
          ref={writeForm}
          wrapperCol={{ span: 22 }}
          labelCol={{ span: 2 }}
          onFinish={writeFormHanddler}
        >
          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                messages: "제목은 필수 입력 사항입니다.",
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="작성자"
            name="author"
            rules={[
              {
                required: true,
                messages: "작성자는 필수 입력 사항입니다.",
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="pass"
            rules={[
              {
                required: true,
                messages: "비밀번호는 필수 입력 사항입니다.",
              },
            ]}
          >
            <Input type="password" allowClear maxLength={4} />
          </Form.Item>

          <Form.Item
            label="내용"
            name="content"
            rules={[
              {
                required: true,
                messages: "내용은 필수 입력 사항입니다.",
              },
            ]}
          >
            <WriteTextArea allowClear rows={14} />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button type="primary" htmlType="submit">
              작성
            </Button>
          </Wrapper>
        </Form>
      </Modal>
      {/*********************************************************************************/}

      {/*********************************** DELETE MODAL ***********************************/}
      <Modal
        visible={passModal}
        width="400px"
        footer={null}
        title="비밀번호 확인"
        onCancel={() => passModalToggle()}
      >
        <Form
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          onFinish={passwordCheckHandler}
          ref={passForm}
        >
          <Form.Item label="비밀번호" name="pass" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>

          <Wrapper>
            <Button size="small" type="danger" htmlType="submit">
              확인
            </Button>
          </Wrapper>
        </Form>
        {/*********************************************************************************/}

        {/*********************************** DELETE2 MODAL ***********************************/}
        <Modal
          visible={dpassModal}
          width="400%"
          footer={null}
          title="비밀번호확인"
          onCancel={() => dpassModalToggle()}
        >
          <From wrapperCol={{ span: 20 }} labelCol={{ span: 5 }} onFinish={}></From>
        </Modal>

        {/*********************************************************************************/}
      </Modal>
    </Whole>
  );
};

export default MyWeb;
