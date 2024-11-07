import logo from './logo.svg';
import './App.css';
import FormState from './FormState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadMore from './Component/LoadMorePagination.jsx/LoadMore';
import SimpleForm from './Component/Form/SimpleForm'

function App() {
  return (
    <Router>
    <div>

      <header>
       
      </header>
      <Routes>
        <Route path='/' element={<FormState />}></Route>
        <Route path='/next-page' element={<LoadMore />}></Route>
        <Route path='/api-method' element={<SimpleForm/>}></Route>
  

      </Routes>


    </div>
    </Router>
  );
}

export default App;
