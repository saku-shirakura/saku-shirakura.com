import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyProfile} from "./page/MyProfile.tsx";
import {StarOrbitClock} from "./page/StarOrbitClock.tsx";
import {Signup} from "./page/Signup.tsx";
import {Login} from "./page/Login.tsx";
import { Header } from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<MyProfile/>}/>
          <Route path="/star_orbit_clock" element={<StarOrbitClock/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
