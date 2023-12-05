import '@picocss/pico'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import CreateUserPage from './pages/CreateUserPage/CreateUser';
import CreatePostPage from './pages/CreatePostPage/CreatePost';
import AllUsers from './pages/AllUsersPage/AllUsers';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from "@apollo/client/link/error"
import EditUserPage from './pages/EditUserPage/EditUserPage';
import PostPage from './pages/PostPage/PostPage';

const errorLink = onError(({ graphqlError, networkError }) => {
  if (graphqlError)
    console.log(graphqlError)
})

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000" }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-user' element={<CreateUserPage />} />
          <Route path='/new-post' element={<CreatePostPage />} />
          <Route path='/users' element={<AllUsers />} />
          <Route path='/edit-user/:id' element={<EditUserPage />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
