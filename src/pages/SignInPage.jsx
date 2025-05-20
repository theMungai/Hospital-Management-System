import React from 'react'
import Layout from "../components/Layout.jsx";
import LoginComponent from "../components/LoginComponent.jsx";

const SignInPage = () => {
  return (
    <div className="bg-customWhite">
      <Layout>
        <LoginComponent />
      </Layout>
    </div>
  )
}

export default SignInPage
