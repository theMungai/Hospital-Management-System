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
import AdminDashboard from "./components/Dashboards/Admin/AdminDashboard.jsx";
import PatientDashboard from "./components/Dashboards/Patient/PatientDashboard.jsx";
import DoctorDashboard from "./components/Dashboards/Doctor/DoctorDashboard.jsx";
import Appointments from "./components/Dashboards/Admin/Main_Menu/Appointments.jsx";
import Doctors from "./components/Dashboards/Admin/Main_Menu/Doctors.jsx";
import Patients from "./components/Dashboards/Admin/Main_Menu/Patients.jsx";
import Departments from "./components/Dashboards/Admin/Other_Menu/Departments.jsx";
import Analytics from "./components/Dashboards/Admin/Other_Menu/Analytics.jsx";
import DoctorsLeaderboard from "./components/Dashboards/Admin/Other_Menu/DoctorsLeaderboard.jsx";
import MedicalRecords from "./components/Dashboards/Admin/Other_Menu/MedicalRecords.jsx";
import Payments from "./components/Dashboards/Admin/Other_Menu/Payments.jsx";
import QualityAndSafety from "./components/Dashboards/Admin/Other_Menu/QualityAndSafety.jsx";
import Notifications from "./components/Dashboards/Admin/Other_Menu/Notifications.jsx";
import Account from "./components/Dashboards/Admin/Settings/Account.jsx";


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
          <Route path={'/admin'} element={<AdminDashboard/>} />
          <Route path={'/patient'} element={<PatientDashboard/>} />
          <Route path={'/doctor'} element={<DoctorDashboard/>} />
          <Route path={'/appointments'} element={<Appointments/>} />
          <Route path={'/doctors'}  element={<Doctors/>} />
          <Route path={'/patients'}  element={<Patients/>} />
          <Route path={'/departments'}  element={<Departments/>} />
          <Route path={'/analytics'}  element={<Analytics/>} />
          <Route path={'/doctors-leaderboard'}  element={<DoctorsLeaderboard/>} />
          <Route path={'/medical-records'}  element={<MedicalRecords/>} />
          <Route path={'/payments'}  element={<Payments/>} />
          <Route path={'/quality-and-safety'}  element={<QualityAndSafety/>} />
          <Route path={'/notifications'}  element={<Notifications/>} />
          <Route path={'/account-settings'}  element={<Account/>} />
        </Routes>
      </Router>
     
    </>
  )
}

export default App
