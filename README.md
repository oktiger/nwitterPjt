# nwitterPjt 1일차 0109

# [할 일!]올릴 Readme와 내용 합치기

# npm create vite@latest
: 프로젝트를 쉽게 생성하게 도와줌

## 첫 프로젝트 청소하기
- assest/index.css, App.css 지우기
- App.tsx에서
```
function App return<></>, export default App빼고 다지우기
``` 
- main.tsx에서 import에 css 지우기

-> 그러면 빈페이지가 나옴

## git을 연결하지 않았다면
```bash
git init. 

git remote add origin {git주소}
```
## Routing, navigation을 위한 react router dom, 스타일을  위한 Style components와 같은 Dependency 설치
```bash
npm i react-router-dom@6.14.2

npm i styled-reset

npm i styled-component@6.0.7

npm i @types/styled-components -D
```


# 라우팅 파트
## src/components 생성
- layout.tsx 생성
```bash
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
        <Outlet />
        </>
    )
}
```

## src/routes/home.tsx 생성
```js
export default function Home(){
    return <h1>Home!</h1>
}
```

## Outlet 궁금증 해결
- 궁금증 : layout.tsx에서 Outlet을 렌더링했는데 routes폴더의 첫번째 파일만 렌더링 되었다. 두번째 파일은 렌더링 되지 않아서 원리가 궁금했음
- 해결 : App.tsx에서 생성한 Path를 따라 바뀌는 것이다.

## src/routes/profile.tsx 생성

## src/routes/login.tsx 생성


# 글로벌 스타일 만들기
```js
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
```
=> 이 부분 제대로 나오게 고치는 방법! : extension `vscode-styled-components` 사용


