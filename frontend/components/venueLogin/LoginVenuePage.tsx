import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginVenue() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with email:", email); // Log email being submitted
    setError("");
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login-venue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies in the request
      });
  
      const data = await response.json();
      console.log("API response:", data); // Log API response for debugging
  
      if (response.ok) {
        // Login successful, redirect user
        router.push('/venueDashboard'); // Redirect to the user dashboard or home page
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Sign in to your account!
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5 mt-8">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="min-h-3.5 bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-3 text-sm text-gray-900 dark:text-gray-400">
              <Link
                href="/venueRegister"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
              >
                Register
              </Link>
            </p>
          </div>
          <div className="text-center">
            <p className="mt-3 text-sm text-gray-900 dark:text-gray-400">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
              >
                Forgot your password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
