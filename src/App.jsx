import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AppPage from './pages/AppPage';
import Login from './pages/Login';
import Translator from './pages/Translator'
import Signup from './pages/signup';
import { useState } from 'react';
import SignLanguageConverter from './components/Translator/SignLanguageConverter.jsx';
import Chatbot from './components/Chatbot';
import Course from './pages/Course.jsx';





function App() {
  const [userlogin, setUserlogin] = useState(null);
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar userlogin={userlogin} />
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/app" element={<AppPage />} />
           <Route path="/course" element={<Course />} />
          <Route path="/login" element={<Login setUserlogin={setUserlogin} />} />
          <Route path="/Signup" element={<Signup />} />

         
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;