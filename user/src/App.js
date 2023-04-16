import './App.css';
import { BrowserRouter, Route, Routes,  Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Addpost from './pages/Addpost';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from './Redux/actions/postsActions';
import { getAllUsers } from './Redux/actions/userActions';
import AllUsers from './pages/AllUsers';
import Editprofile from './pages/Editprofile';




function App() {
  const {loading, likeOrUnlikeLoading}=useSelector((state)=>state.alertsReducer);
  
const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllPosts())
    dispatch(getAllUsers())
  },[])

  return (
    <div className="App">

      {(loading||likeOrUnlikeLoading)&& (<div className="spinner-border text-primary" role="status">
        <span class="sr-only"></span>
      </div>)}
      

      <BrowserRouter>
        <Routes>
          <Route  path='/login' element={<Login />} />
          <Route  path='/register' element={<Register />} />
          <Route  path='/' element={<ProtectedRouted><Home /></ProtectedRouted>} />
          <Route  path='/profile/:userid' element={<ProtectedRouted><Profile /></ProtectedRouted>} />
          <Route  path='/addpost' element={<ProtectedRouted><Addpost /></ProtectedRouted>} />
          <Route  path='/allusers' element={<ProtectedRouted><AllUsers /></ProtectedRouted>} />
          <Route  path='/editprofile' element={<ProtectedRouted><Editprofile /></ProtectedRouted>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;



function ProtectedRouted({children}){
  
  if(localStorage.getItem('user')){
    return children
  }else{
    return <Navigate to='/login'/>
}

}
