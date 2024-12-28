import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyProfile} from "./page/MyProfile.tsx";
import {StarOrbitClock} from "./page/StarOrbitClock.tsx";
import {Signup} from "./page/Signup.tsx";
import {Login} from "./page/Login.tsx";
import { Header } from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import ColorClock from "./page/ColorClock.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/clock/star_orbit" element={<StarOrbitClock/>}/>
          <Route path="/clock/color_code" element={<ColorClock/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<MyProfile/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
