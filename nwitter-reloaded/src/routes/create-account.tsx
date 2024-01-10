import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import {auth} from"../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import {
    Error,
    Input,
    Switcher,
    Title,
    Wrapper,
    Form,
} from "../assets/components/auth-components"
import GihubButton from "../assets/components/github-btn"


 
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
        setError("")
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
            if(e instanceof FirebaseError){
                setError(e.message)
            }
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
            <Switcher>
                Already have an account?{" "}
                <Link to="/login">Login &rarr;</Link>
            </Switcher>
            <GihubButton/>
        </Wrapper>
    )
}