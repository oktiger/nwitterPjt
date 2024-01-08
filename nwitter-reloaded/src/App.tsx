import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "./assets/components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import LoadingScreen from "./assets/components/loading-screen"



const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children: [
      {
        path:"",
        element: <Home/>,
      },

      {
        path: "profile",
        element: <Profile/>,
      },
    ]
  },

  // Layout에 넣지않았음
    {
      path:"/login",
      element: <Login/>,
    },
    {
      path:"/create-accounts",
      element: <CreateAccount/>
    }
])

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



function App() {
  const [isLoading, setLoading] = useState(true)
  const init = async() => {
    // wait for firebase
    setLoading(false)
  } 

  useEffect(() => {
    init()
  }, [])

  return (
    <>
    <GlobalStyles/>
    {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/>}
    </>
  )
}

export default App
