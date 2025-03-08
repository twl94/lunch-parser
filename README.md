# lunch-parser

Installation
```
npm install lunch-parser
```

# 급식 정보 가져오기

받은 학교 정보로 급식을 조회 할 수 있습니다.

(비동기 함수로 받아야 됨)

date - 가져올 급식의 날짜 (예: 20250307) 

regionCode - 학교 지역코드 (예: X10)

schoolCode - 학교 코드 (예: 123456)


```js
async function getLunch() {
  let data = await lunchAPI.getLunch("20250307", "X10", "123456");
   console.log(data);
}
```

# 학교 검색

원하는 키워드를 입력하여 학교를 검색할 수 있습니다.

(비동기 함수로 받아야 됨)


```js
async function parseSchools(){
   let data = await getSchool("학교")
}
```

# 사용한 API
 - [나이스 교육정보 개방 포털](https://open.neis.go.kr/)

