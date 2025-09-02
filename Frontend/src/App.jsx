import './App.css'
import { BrowserRouter as Router,Routes, Route  } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ServicesPage from './pages/ServicesPage'
import ContactUsPage from './pages/ContactUsPage'
import HelpPage from './pages/HelpPage'
import BlogsPage from './pages/BlogsPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element= {<LandingPage/>}/>
          <Route path='/services' element= {<ServicesPage/>}/>
          <Route path='/contact-us' element= {<ContactUsPage/>}/>
          <Route path='/help' element= {<HelpPage/>}/>
          <Route path='/blogs' element= {<BlogsPage/>}/>
          <Route path='/sign-up' element= {<SignUpPage/>}/>
          <Route path='/log-in' element= {<SignInPage/>}/>
        </Routes>
      </Router>
     
    </>
  )
}

export default App
