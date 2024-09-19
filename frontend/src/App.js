import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Members from './components/Members'
import Classes from './components/Classes';
import Account from './components/Account';
import Pricing from './components/Pricing';
import Test from './components/Test';
import { useState } from 'react';




function App() {
  const [userType, setUserType] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const handleLogout = () => {
    setIsLogin(false)
    console.log("Logout")
  };

  return (
    <Router>
      <NavBar isLogin={isLogin} onLogout={handleLogout} isOwner={userType}/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/members' element={<Members isOwner={userType} />}></Route>
        <Route path='/classes' element={<Classes isOwner={userType}/>}></Route>
        <Route path='/account' element={<Account/>}></Route>
        <Route path='/pricing' element={<Pricing isOwner={userType}/>}></Route>
        <Route path='/test' element={<Test settingUserType={(type)=> setUserType(type)}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
