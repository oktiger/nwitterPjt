# nwitterPjt 2일차 0109 #3 Setup~Protected Routes

# Firebase - Authentication
- Firebase에서 Authentication -> emil 로그인 활성화
- 코드로 돌아와서 firebase.ts에 밑의 코드 추가

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" //추가

const firebaseConfig = {
  apiKey: "AIzaSyAog91Ym21dhoxsA9KZpUzWi0IXikiND9A",
  authDomain: "nwitter-reloaded-7ea20.firebaseapp.com",
  projectId: "nwitter-reloaded-7ea20",
  storageBucket: "nwitter-reloaded-7ea20.appspot.com",
  messagingSenderId: "284317618759",
  appId: "1:284317618759:web:c49df3dfeb8e9525a51762"
};


const app = initializeApp(firebaseConfig);
// 추가
export const auth = getAuth(app)
```

- App.tsx로 이동 firebase.tsx의 auth import 
```tsx
function App() {
  const [isLoading, setLoading] = useState(true)
  const init = async() => {
    // wait for firebase
    await auth.authStateReady() // 추가
    setLoading(false)
  } 

  useEffect(() => {
    init()
  }, [])
```


# Forms and UI
- create-account.tsx
```js
import { useState } from "react"
import {styled} from "styled-components"

// styled은 생략
 
export default function CreateAccount(){
    const [isLoading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value,}} = e
        if(name === "name"){
            setName(value)
        } else if(name==="email"){
            setEmail(value)
        } else if (name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // (e: React.FormEvent<HTMLFormElement>): (e)는 이벤트 객체를 나타내는 매개변수입니다. 여기서 e는 React.FormEvent<HTMLFormElement> 타입의 매개변수로 받아들입니다. 이는 React에서 제공하는 이벤트 객체로, 폼(form) 요소에서 발생한 이벤트에 대한 정보를 담고 있습니다.
        e.preventDefault()
        try {

        } catch(e){

        } finally {
            setLoading(false)
        }
    }

    return (
        <Wrapper>
            <Title>Log into 🐱‍👤</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange}  name="name" value={name} placeholder="Name" type="text" required/>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
                <Input onChange={onChange} 
                value={password}
                name="password" placeholder="Password" type="password" required
                />
                <Input 
                type="submit" 
                value={isLoading ? "Loading...": "Create Account"}
                />
            </Form>
            {error !== "" ? <Error>{error}</Error>: null}
        </Wrapper>
    )
}
```

# Creat Account
- create-account.tsx
```js
export default function CreateAccount(){
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value,}} = e
        if(name === "name"){
            setName(value)
        } else if(name==="email"){
            setEmail(value)
        } else if (name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // (e: React.FormEvent<HTMLFormElement>): (e)는 이벤트 객체를 나타내는 매개변수입니다. 여기서 e는 React.FormEvent<HTMLFormElement> 타입의 매개변수로 받아들입니다. 이는 React에서 제공하는 이벤트 객체로, 폼(form) 요소에서 발생한 이벤트에 대한 정보를 담고 있습니다.
        e.preventDefault()
        if (isLoading || name ==="" || email === "" || password === "") return;
        try {
            setLoading(true)
            const credentials = await createUserWithEmailAndPassword(auth,email, password)
            console.log(credentials.user)
            await updateProfile(credentials.user, {
                displayName: name
            })
            navigate("/") // user프로필을 update하면 /의 경로로 보냄
        } catch(e){

        } finally {
            setLoading(false)
        }
    }

    return (
        <Wrapper>
            <Title>Join 🐱‍👤</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange}  name="name" value={name} placeholder="Name" type="text" required/>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
                <Input onChange={onChange} 
                value={password}
                name="password" placeholder="Password" type="password" required
                />
                <Input 
                type="submit" 
                value={isLoading ? "Loadin...": "Create Account"}
                />
            </Form>
            {error !== "" ? <Error>{error}</Error>: null}
        </Wrapper>
    )
}
```

- 꿀팁! 자동 import 
```
import 필요한 것에
crtl + .
```

# LogOut
- home.tsx
```js
import { auth } from "../firebase"

export default function Home(){
  const logOut = () => {
    auth.signOut()
  }
  return (
    <h1>
        <button onClick={logOut}>Log Out </button>
    </h1>
  )
}
```