import {useNavigate}from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {
  const navigate=useNavigate();
  return (
    <div>
     <header className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12">
        <a className="block text-teal-600" href="#">
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
      </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            <button
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
              onClick={() => {
        localStorage.clear(); 
        toast.success('Logout successful');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }}
            >
              Logout
            </button>
          </div>

          <div className="block md:hidden">
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
<ToastContainer />
    </div>
  )
}

export default Header