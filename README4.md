# nwitterPjt 3일차 0110 #4 ~

# 에러 해결
- Home화면에 가지않고 계속 login 화면만 보였던 이유는 App.tsx에 Layout 컴포넌트가 ProtectRoute로 감싸져 있어서
로그인하지 않으면 들어가지 못하게 막기 때문이다..

# 4.1 Post Tweet Form
- src/components/post-tweet-form.tsx 생성
- 꿀팁! TextArea는 기본적으로 사이즈를 조절할 수 있기 떄문에 속성에서 resize를 none으로 바꿔주면 크기를 고정할 수 있다.
```js
    import { useState } from "react";
import styled from "styled-components"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`

const AttachFileInput = styled.input`
    display: none;
`

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm(){
    const [isLoading, setLoading] = useState(false)
    const [tweet, setTweet] = useState("")
    const [file, setFile] = useState<File|null>(null)
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value)
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e?.target
        if(files && files.length === 1){
            setFile(files[0])
        }
    }
    return(<Form>
        <TextArea 
        rows={5}
        maxLength={180}
        onChange={onChange} 
        value={tweet} 
        placeholder="What is happening?!"
        />
        <AttachFileButton htmlFor="file">{file ? "Photo added✅" : "Add Photo"}</AttachFileButton> 
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
        <SubmitBtn 
        type="submit"
        value={isLoading ? "Posting..." :"Post Tweet"}/>
    </Form>
    )
}
```

- routes/home.tsx
```js
    import styled from "styled-components"
import PostTweetForm from "../assets/components/post-tweet-form"

const Wrapper = styled.div`
  
`
export default function Home(){
  return <Wrapper>
  <PostTweetForm/>
  </Wrapper>
}
```