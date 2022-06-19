import React from 'react'
import LoginGoogle from './LoginGoogle'

function Login() {

    return (
        <>
            <div className='bg-light my-5'>
                <div className='p-4'>
                    <h4>Login with google</h4>
                    {/* this is the LoginGoogle component */}
                    <LoginGoogle />
                </div>
            </div>
        </>
    )
}

export default Login