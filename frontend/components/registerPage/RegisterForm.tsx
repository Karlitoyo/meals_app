import React from "react";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle input changes
  const handleRegister = async (event) => {
    event.preventDefault();
    
    const userData = {
      firstName,
      lastName,
      email,
      password,
      isActive: false, // Set default value for isActive
    };
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        if (response.ok) {
          router.push('/login');
        }
      const data = await response.json();
      console.log('Registration successful:', data);
    } 
    } catch (error) {
      console.error('Error during registration:', error);
    }
    
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Register for a new account!
          </h2>
        </div>
        <div>
        <form onSubmit={handleRegister} className="max-w-sm mx-auto">
            <div className="mb-5 mt-8">
              <input type="text" id="firstName" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required />
            </div>
            <div className="mb-5">
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Second Name" required />
            </div>
            <div className="mb-5 mt-8">
              <input type="email" id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-Mail" required />
            </div>
            <div className="mb-5">
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-900 dark:text-gray-400">
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400">Login</Link>
              </p>
              </div>
              <div className="text-center">
              <p className="text-sm text-gray-900 dark:text-gray-400">
              <Link href="/venueRegister" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400">Host Register</Link>
              </p>
              </div>
          </div>
        </div>
      </div>
  );
};

export default RegisterForm;