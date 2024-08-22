import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const baseUrl=import.meta.env.VITE_REACT_APP_API;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    conform_password:'',
    gender:' '
  });

  const [errors, setErrors] = useState({
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password ,conform_password,gender} = formData;

    if (!validateEmail(email)) {
      setErrors({ email: 'Invalid email address' });
      toast.error('Invalid email address');
      return;
    }

    if(password!==conform_password){
      toast.error("Passwords doesnt match");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/v1/signup`, {name, email, password, gender });
      
      if (response.status === 409) {
        toast.error('Email Already Registered');
      } else if (response.status === 200) {
        localStorage.setItem('userEmail', email);
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/details');
        }, 3000);
      } else {
        toast.error('Unexpected error occurred');
      }
    } catch (error) {
      
      if (error.response && error.response.status === 409) {
        toast.error('Email Already Registered');
      } else {
        toast.error('Signup failed');
      }
    }
    
  };

  return (
    <>

<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://plus.unsplash.com/premium_photo-1680700221525-c41dc28197f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <a className="block text-blue-600" href="#">
          <span className="sr-only">Home</span>
          <svg
  className="h-8 w-8 text-yellow-500" // Adjust color and size as needed
  fill="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 4a2 2 0 00-2 2v1a2 2 0 004 0V6a2 2 0 00-2-2zM4.22 5.64a2 2 0 00-1.41 2.8l.35.6a2 2 0 002.8 1.41l.6-.35a2 2 0 00-1.41-2.8l-.6.35a2 2 0 00-1.41 1.41l-.35-.6a2 2 0 00-1.41-1.41zM19.78 5.64a2 2 0 00-1.41 1.41l-.35.6a2 2 0 002.8 1.41l.6-.35a2 2 0 00-1.41-2.8l-.6.35a2 2 0 00-1.41 1.41l-.35-.6a2 2 0 00-1.41-1.41zM12 16a2 2 0 00-2 2v1a2 2 0 004 0v-1a2 2 0 00-2-2zM4.22 18.36a2 2 0 00-1.41-2.8l.35-.6a2 2 0 002.8-1.41l.6.35a2 2 0 00-1.41 2.8l-.6-.35a2 2 0 00-1.41-1.41l-.35.6a2 2 0 00-1.41 1.41zM19.78 18.36a2 2 0 00-1.41-2.8l-.35.6a2 2 0 002.8 1.41l.6-.35a2 2 0 00-1.41-2.8l-.6.35a2 2 0 00-1.41 1.41l-.35-.6a2 2 0 00-1.41-1.41zM12 9a3 3 0 00-3 3v1a3 3 0 006 0V12a3 3 0 00-3-3z"
  />
</svg>
<p>Splash</p>
        </a>
        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Singup For Splash
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              User Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full h-9 rounded-md border border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
               />
          </div>


          <div className="col-span-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full h-9 rounded-md border border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
              />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full h-9 rounded-md border border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
              />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="conform_password" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="conform_password"
              name="conform_password"
              value={formData.conform_password}
              onChange={handleChange}
              className="mt-1 w-full h-9 rounded-md border border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
              />
          </div>

          <div className="col-span-6">
            <label htmlFor="gender" className="flex gap-4">
            <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="mt-1 w-full h-9 rounded-md border bg-white border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
             
      >
        <option defaultValue="Select Gender">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
            </label>
          </div>

         

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-black-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-black hover:text-white-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to="/login" className="text-gray-700 underline">Log in</Link>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
<ToastContainer />
    </>
  )
}

export default Signup