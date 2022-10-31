const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs'); //view engine 등록
app.use('/views', express.static(__dirname + '/views'));

// body-parser: 데이터를 쉽게 처리할 수 있도록 도와주는 라이브러리
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // json형식으로 데이터를 받겠다고 선언

//views 파일 설정
// req : 요청, res: 응답
app.get('/',function (req,res) {
  // res.send('root page');
  res.render('index'); //views/index.ejs 파일을 찾아서 응답
});

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});