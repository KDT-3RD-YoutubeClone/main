const express = require("express");
const app = express();
const PORT = 8000;
// axios 요청
const axios = require("axios");
const googleKey = "AIzaSyB5RPkxyIe4yXFove-TwgRn05jMKhR2FYA";
const { google } = require("googleapis");
const { request } = require("gaxios");
const youtube = google.youtube({
  version: "v3",
  auth: googleKey,
});

app.set("view engine", "ejs"); //view engine 등록
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));

// body-parser: 데이터를 쉽게 처리할 수 있도록 도와주는 라이브러리
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // json형식으로 데이터를 받겠다고 선언

//views 파일 설정
// req : 요청, res: 응답
app.get("/", async function (req, res, next) {
  // res.send('root page');
  try {
    const response = await youtube.search.list({
      part: "snippet",
      //  q = 검색어 (설정가능);
      chart: "mostPopular",
      regionCode: "KR",
      type: "video",
      maxResults: "8",
      order: "viewCount",
      safeSearch: "strict",
    });
    let items = response.data.items;

    let trendVideoId = [];
    for (i = 0; i < items.length; i++) {
      trendVideoId.push(items[i].id.videoId);
      // console.log(items);
    }
    // res.send(trendVideoId);
    res.render("index", { trendVideoId: trendVideoId });
  } catch (err) {
    next(err);
  }
  //views/index.ejs 파일을 찾아서 응답
});
// localhost:8000/search로 q(검색어) 에 해당하는 검색 결과 데이터를 보내기

app.get("/search", async (req, res, next) => {
  try {
    console.log(res);
    let searchName = req.query.search;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchName,
      chart: "mostPopular",
      regionCode: "KR",
      type: "video",
      maxResults: "8",
      order: "viewCount",
      safeSearch: "strict",
    });
    let items = response.data.items;
    let trendVideoId = [];
    for (i = 0; i < items.length; i++) {
      trendVideoId.push(items[i].id.videoId);
      // console.log(trendVideoId);
    }
    // res.send(trendVideoId);
    res.render("search", { trendVideoId: trendVideoId });
  } catch (err) {
    next(err);
  }
  //views/index.ejs 파일을 찾아서 응답
});
// localhost:8000/trend로 mostPopular한 검색 결과 데이터를 보내기
app.get("/trend", async (req, res, next) => {
  try {
    let searchName = req.query.search;
    const response = await youtube.search.list({
      part: "snippet",
      //  q = 검색어 (설정가능);
      q: searchName,
      chart: "mostPopular",
      regionCode: "KR",
      type: "video",
      maxResults: "8",
      order: "viewCount",
      safeSearch: "strict",
    });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});
