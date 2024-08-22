import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const baseUrl=import.meta.env.VITE_REACT_APP_API;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
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
    const { username, email, password } = formData;
  
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Invalid email address' });
      toast.error('Invalid email address');
      return;
    }
  
    
    if (username === "admin" && email === "admin@email.com" && password === "Admin@123") {
      toast.success('Login successful');
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    }
  
   
    try {
      const response = await axios.post(`${baseUrl}/api/v1/login`, { username, email, password });
  
      if (response.status === 200) {
        localStorage.setItem('userEmail', email);
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/details');
        }, 3000);
        
        
      }
    } catch (e) {
      toast.error('Login failed');
    }
  };
  

  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
              </a>
            </div>
          </section>

          <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
               
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome You 
              </h1>

              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    User Name
                  </label>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 w-full h-9 rounded-md border border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full h-9 rounded-md border border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full h-9 rounded-md border border-gray-200 p-1.5 outline-0 rounded-md focus:border-blue-500 text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-black-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-black hover:text-white-600 focus:outline-none focus:ring active:text-white-500"
                  >
                    Login
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don’t have an account? <Link to="/signup" className="text-gray-600 underline">Sign up</Link>.
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
