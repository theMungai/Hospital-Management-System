import './App.css'
import { BrowserRouter as Router,Routes, Route  } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ServicesPage from './pages/ServicesPage'
import ContactUsPage from './pages/ContactUsPage'
import HelpPage from './pages/HelpPage'
import BlogsPage from './pages/BlogsPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SelectPortal from "./pages/SelectPortal.jsx";
import RegisterDoctor from "./pages/RegisterDoctor.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import RegisteredSuccessfully from "./utils/Responses/RegisteredSuccessfully.jsx";
import FailedToRegister from "./utils/Responses/FailedToRegister.jsx";
import VerifyOTP from "./utils/VerifyOTP.jsx";
import AdminDashboard from "./components/Dashboards/admin-dashboard/AdminDashboard.jsx";
import PatientDashboard from "./components/Dashboards/patient-dashboard/PatientDashboard.jsx";
import DoctorDashboard from "./components/Dashboards/doctor-dashboard/DoctorDashboard.jsx";
function App() {


  return (
    <>
        {/*<VerifyOTP />*/}
      <Router>
        <Routes>
          <Route path='/' element= {<LandingPage/>}/>
          <Route path='/services' element= {<ServicesPage/>}/>
          <Route path='/contact-us' element= {<ContactUsPage/>}/>
          <Route path='/help' element= {<HelpPage/>}/>
          <Route path='/blogs' element= {<BlogsPage/>}/>
          <Route path='/sign-up' element= {<SelectPortal/>}/>
          <Route path='/Register-patient' element={<SignUpPage />}/>
          <Route path='/Register-doctor' element={<RegisterDoctor />}/>
          <Route path='/log-in' element= {<SignInPage/>}/>
          <Route path='/terms-and-conditions' element={<TermsAndConditions />}/>
          <Route path={'/registration-complete'} element={<RegisteredSuccessfully/>} />
          <Route path={'/registration-failed'} element={<FailedToRegister />} />
          <Route path={'/admin-dashboard'} element={<AdminDashboard/>} />
          <Route path={'/patient-dashboard'} element={<PatientDashboard/>} />
          <Route path={'/doctor-dashboard'} element={<DoctorDashboard/>} />
        </Routes>
      </Router>
     
    </>
  )
}

export default App
