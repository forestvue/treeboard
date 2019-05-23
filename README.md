# treeboard
simple dashboard with login support
## 개요
이벤트는 사용자가 브라우저에서 취하는 모든 행동을 의미합니다. 자바스크립트에서는 DOM 객체에 리스너를 붙여줌으로써 이벤트 발생 시 원하는 동작을 정의할 수 있습니다. Vue 프레임워크에서는 태그에 `v-on` 키워드를 적어주는것으로 해당 기능을 구현해줍니다.
## Todo(필수)
[Vue 공식 문서(한국어)](https://kr.vuejs.org/v2/guide/index.html)

[Firebase Cloudstore 문서](https://firebase.google.com/docs/firestore/quickstart?hl=ko)

[Firebase 로그인 문서](https://firebase.google.com/docs/firestore/quickstart?hl=ko)

### Task 0. 라우팅 및 컴포넌트 구성

`/` - 권한에 따라 다른 페이지 반환
    비로그인 - 로그인이 필요하다는 안내문 출력
    사용자 - 자신의 정보를 출력
    관리자 - 모든 사용자의 리스트 출력
`*` - **404 페이지 출력**

### Task 1. 상단 메뉴바 파어베이스 로그인 기능 구현

- 구글 회원 가입

- 읿반 회원 가입

  1. 이메일 포맷이 맞는지 확인
  
  2. 비밀번호가 다음 조건을 만족하는지 확인
  
      - 8자 이상
    
      - 특수문자, 영문 숫자 포함
      

### Task 2. 이벤트 헨들링을 구현

`v-on` 이벤트 사용 

- 관리자 대시보드에서 클릭 이벤트를 통한 사용자 권한 승격(사용자 - 관리자)
  
- 스크롤 발생 시 상단 메뉴바가 그대로 따라옴 (css 속성 중 1position: fixed` 부여)
  

### Task 3. 로딩화면 구현

- 데이터가 완전히 로드될 때까지 보여주기

