import '@picocss/pico'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import CreateUserPage from './pages/CreateUserPage/CreateUser.js/CreateUser';
import CreatePostPage from './pages/CreatePostPage/CreatePost';
import AllUsers from './pages/AllUsersPage/AllUsers';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-user' element={<CreateUserPage />} />
        <Route path='/new-post' element={<CreatePostPage />} />
        <Route path='/users' element={<AllUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
