// import { useNavigate } from 'react-router-dom';
// import { LoginForm } from '../components/auth';

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const handleLoginSuccess = () => {
//     // Redirect to dashboard or home page after successful login
//     navigate('/home');
//   };

//   return (
//     <div 
//       className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
//       style={{
//         backgroundImage: "url('/beach2.jpg')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 ring-1 ring-white/10">
//         <h1 className="text-center text-3xl font-extrabold text-white mb-4 drop-shadow-md">Eventure</h1>
//         <h2 className="text-center text-2xl font-bold text-white drop-shadow-sm">
//           Sign in to your account
//         </h2>
//         <div className="mt-8">
//           <LoginForm onSuccess={handleLoginSuccess} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/beach2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"> */}
      <div
  className="w-full max-w-md
  bg-white/5
  backdrop-blur-2xl
  border border-white/20
  shadow-2xl
  rounded-2xl
  p-8"
>

        <h1 className="text-center text-4xl font-extrabold text-white drop-shadow-md">
          Eventure
        </h1>

        <p className="text-center text-white-100 mt-2 mb-6">
          Sign in to your account
        </p>

        <LoginForm onSuccess={handleLoginSuccess} />

      </div>
    </div>
  );
};

export default LoginPage;