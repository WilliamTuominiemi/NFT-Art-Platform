import React from 'react'

const Login = () => {
  return (
    <button
      onClick={() => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self')
      }}
    >
      Login
    </button>
  )
}

export default Login
