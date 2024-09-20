import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Members from './components/Members'
import Classes from './components/Classes';
import Account from './components/Account';
import Pricing from './components/Pricing';
import { useState } from 'react';




function App() {
  const [userType, setUserType] = useState(false)

  const handleLogout = () => {
    console.log("Logout")
  };

  return (
    <Router>
      <NavBar settingUserType={(type)=> setUserType(type)} onLogout={handleLogout} isOwner={userType}/>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/account' element={<Account/>}></Route>
        <Route path='/members' element={<Members isOwner={userType} />}></Route>
        <Route path='/classes' element={<Classes isOwner={userType}/>}></Route>
        <Route path='/pricing' element={<Pricing isOwner={userType}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
