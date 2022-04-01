const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db");

const PORT = 4000;
const app = express();

app.use(morgan(`dev`));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/test/seed/database", (req, res) => {
  const title = [
    "세븐틴 캐렌 T구역에 있던 사람들",
    "이번 선공개곡 미친거 아님?",
    "반티 정해야 하는데 추천",
    "학교에서 집에 가고 싶을때 참는 법",
    "지하철 너무 멀어요",

    "세븐틴 에스쿱스 실물",
    "공부하기 싫을때 뭐하면 좋을까",
    "ㄹㅈㄷ 아이돌 나왔다",
    "빌리 츠키 표정 뭐야?",
    "정은진 앞머리 개망했던데 ㅋㅋ",
  ];
  const author = [
    "캐럿",
    "선공개",
    "삼다시삼",
    "최지육",
    "콩나물",

    "쿱스홈마",
    "공부광",
    "빠순희",
    "신인돌만",
    "악갱",
  ];
  const pass = [1431, 2543, 3674, 4654, 5876, 6327, 7123, 8654, 9456];

  for (let i = 0; i < 7; i++) {
    const ran1 = Math.floor(Math.random() * title.length);
    const ran2 = Math.floor(Math.random() * author.length);
    const ran3 = Math.floor(Math.random() * pass.length);

    const _title = title[ran1];
    const _author = author[ran2];
    const _pass = pass[ran3];

    const insertQuery = `
      INSERT INTO board (title, content, author, pass, createdAt) VALUES
      ("${_title}", "SEED CONTENT", "_${_author}", "${_pass}", now())
    `;

    db.query(insertQuery, (err, row) => {
      if (err) {
        console.log(err);
      }

      console.log("Database In Seed New Data");
    });
  }

  return res.send("Create New Data");
});

// 1. 쿼리작성
// 2. Network Protocol 작성
// 3. 프론트 개발

app.get("/api/list", (req, res) => {
  const selectQuery = `
  SELECT  id,	
          title, 
          author,
          DATE_FORMAT(createdAt, "%Y.%m.%d")     AS    fromatCreatedAt,
          content,
          createdAt,
          hit
    FROM  board
   ORDER  BY createdAt  DESC
  `;

  db.query(selectQuery, (error, rows) => {
    if (error) {
      console.group(error);
    }

    return res.status(200).json(rows);
  });
});

app.post("/api/write", (req, res) => {
  const { title, author, pass, content } = req.body;

  const insertQuery = `
    INSERT INTO board (
      title,
      author,
      pass,
      content,
      createdAt
    ) VALUES (
      "${title}",
      "${author}",
      "${pass}",
      "${content}",
      now()
    )
  `;

  db.query(insertQuery, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    return res.status(201).send("게시물 등록에 성공 하셨습니다.");
  });
});

app.post("/api/delete", (req, res) => {
  const { selectId } = req.body;

  const deleteQuery = `
    DELETE FROM board
     WHERE id = ${selectId}
  
  `;

  db.query(deleteQuery, (error, result) => {
    if (error) {
      console.group(error);
      return;
    }
    return res.status(200).send("게시물 삭제 성공했습니다.");
  });
});

app.post("/api/");

app.listen(PORT, () => {
  console.log(`${PORT} Talk To Me Backend Server Starting`);
});
