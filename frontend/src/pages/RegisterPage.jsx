// import { useNavigate } from 'react-router-dom';
// import { RegisterForm } from '../components/auth';

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const handleRegisterSuccess = () => {
//     navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col justify-center items-center px-6"
//       style={{
//         backgroundImage: "url('/beach2.jpg')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >

//       <div
//         className="w-full max-w-md
//         bg-white/5
//         backdrop-blur-2xl
//         border border-white/20
//         shadow-2xl
//         rounded-2xl
//         p-8"
//       >

//         <h1 className="text-center text-3xl font-extrabold text-white mb-4 drop-shadow-md">
//           Eventure
//         </h1>

//         <h2 className="text-center text-2xl font-bold text-white drop-shadow-sm">
//           Create your account
//         </h2>

//         <p className="mt-2 text-center text-sm text-white text-opacity-90 drop-shadow-sm">
//           Join Eventure to participate in college events
//         </p>

//         <div className="mt-8">
//           <RegisterForm onSuccess={handleRegisterSuccess} />
//         </div>

//       </div>

//     </div>
//   );
// };

// export default RegisterPage;

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/auth";

const RegisterPage = () => {

  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/login", {
      state: { message: "Registration successful! Please log in." }
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6"
      style={{
        backgroundImage: "url('/beach2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div
        className="w-full max-w-md
        bg-white/5
        backdrop-blur-2xl
        border border-white/20
        shadow-2xl
        rounded-2xl
        p-8"
      >

        <h1 className="text-center text-3xl font-extrabold text-white mb-4 drop-shadow-md">
          Eventure
        </h1>

        <h2 className="text-center text-2xl font-bold text-white drop-shadow-sm">
          Create your account
        </h2>

        <p className="mt-2 text-center text-sm text-white text-opacity-90 drop-shadow-sm">
          Join Eventure to participate in college events
        </p>

        <div className="mt-8">
          <RegisterForm onSuccess={handleRegisterSuccess} />
        </div>

        <p className="text-center text-sm text-gray-200 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-300 hover:text-white font-medium"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default RegisterPage;