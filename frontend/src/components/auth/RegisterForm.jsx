// import { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useAuth } from '../../context';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

// const RegisterForm = ({ onSuccess }) => {

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { register, googleLogin } = useAuth();

//   const [showCollegePrompt, setShowCollegePrompt] = useState(false);
//   const [googleIdToken, setGoogleIdToken] = useState(null);
//   const [collegeInput, setCollegeInput] = useState('');

//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   const registerSchema = Yup.object().shape({
//     firstName: Yup.string().required('First name is required').min(2),
//     lastName: Yup.string().required('Last name is required').min(2),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string()
//       .required('Password is required')
//       .min(8)
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
//         'Password must contain uppercase, lowercase, number and symbol'
//       ),
//     confirmPassword: Yup.string()
//       .required('Confirm your password')
//       .oneOf([Yup.ref('password')], 'Passwords must match'),
//     college: Yup.string().required('College is required'),
//     acceptTerms: Yup.boolean().oneOf([true], 'Accept terms to continue')
//   });

//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       college: '',
//       acceptTerms: false
//     },
//     validationSchema: registerSchema,

//     onSubmit: async (values) => {

//       setIsLoading(true);
//       setError(null);

//       try {

//         const { confirmPassword, acceptTerms, ...registrationData } = values;

//         await register(registrationData);

//         if (onSuccess) onSuccess();

//       } catch (err) {

//         setError(err.message || 'Registration failed');

//       } finally {

//         setIsLoading(false);

//       }
//     }
//   });

//   const handleGoogleSuccess = async (credentialResponse) => {

//     setIsLoading(true);
//     setError(null);

//     try {

//       const idToken = credentialResponse.credential;
//       const response = await googleLogin(idToken);

//       if (response.needCollege) {

//         setShowCollegePrompt(true);
//         setGoogleIdToken(idToken);

//       } else if (response.success) {

//         if (onSuccess) onSuccess();

//       }

//     } catch (err) {

//       setError(err.message || 'Google signup failed');

//     } finally {

//       setIsLoading(false);

//     }
//   };

//   const handleCollegeSubmit = async (e) => {

//     e.preventDefault();

//     setIsLoading(true);
//     setError(null);

//     try {

//       const response = await googleLogin(googleIdToken, collegeInput);

//       if (response.success) {

//         setShowCollegePrompt(false);
//         if (onSuccess) onSuccess();

//       }

//     } catch (err) {

//       setError(err.message || 'Google signup failed');

//     } finally {

//       setIsLoading(false);

//     }
//   };

//   const inputStyle =
//     "w-full px-4 py-2 rounded bg-white/20 text-black placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400";

//   const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
//     // "block text-black-100 text-sm font-semibold mb-2";

//   return (

//     <div className="space-y-4 text-white">

//       {error && (
//         <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       <form onSubmit={formik.handleSubmit}>

//         <div className="grid grid-cols-2 gap-4">

//           <div>
//             <label className={labelStyle}>First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First name"
//               className={inputStyle}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.firstName}
//             />
//           </div>

//           <div>
//             <label className={labelStyle}>Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last name"
//               className={inputStyle}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.lastName}
//             />
//           </div>

//         </div>

//         <div>
//           <label className={labelStyle}>Email Address</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             className={inputStyle}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//         </div>

//         <div>
//           <label className={labelStyle}>College / University</label>
//           <input
//             type="text"
//             name="college"
//             placeholder="Enter college"
//             className={inputStyle}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.college}
//           />
//         </div>

//         <div>
//           <label className={labelStyle}>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Create password"
//             className={inputStyle}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//         </div>

//         <div>
//           <label className= "block text-white-700 text-sm font-bold mb-2">Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm password"
//             className={inputStyle}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.confirmPassword}
//           />
//         </div>

//         <div className="flex items-center gap-2 text-blue-100 text-sm">
//           <input
//             type="checkbox"
//             name="acceptTerms"
//             onChange={formik.handleChange}
//             checked={formik.values.acceptTerms}
//           />
//           <br />
//           <br />

//           <span>
//             I accept the{" "}
//             <a href="#" className="text-indigo-300 hover:text-white">
//               Terms
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-indigo-300 hover:text-white">
//               Privacy Policy
//             </a>
//           </span>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
//         >
//           {isLoading ? "Registering..." : "Register"}
//         </button>

//       </form>

//       <div className="flex justify-center mt-6">

//         <GoogleOAuthProvider clientId={clientId}>
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={() => setError("Google login failed")}
//           />
//         </GoogleOAuthProvider>

//       </div>

//       {showCollegePrompt && (

//         <form onSubmit={handleCollegeSubmit} className="space-y-2">

//           <input
//             type="text"
//             placeholder="Enter college name"
//             value={collegeInput}
//             onChange={(e) => setCollegeInput(e.target.value)}
//             className={inputStyle}
//           />

//           <button
//             type="submit"
//             className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700"
//           >
//             Submit
//           </button>

//         </form>

//       )}

//       <div className="text-center">

//         <p className="text-blue-100 text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-indigo-300 hover:text-white">
//             Login
//           </a>
//         </p>

//       </div>

//     </div>
//   );
// };

// export default RegisterForm;
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = ({ onSuccess }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, googleLogin } = useAuth();

  const [showCollegePrompt, setShowCollegePrompt] = useState(false);
  const [googleIdToken, setGoogleIdToken] = useState(null);
  const [collegeInput, setCollegeInput] = useState('');

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').min(2),
    lastName: Yup.string().required('Last name is required').min(2),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        'Password must contain uppercase, lowercase, number and symbol'
      ),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    college: Yup.string().required('College is required'),
    acceptTerms: Yup.boolean().oneOf([true], 'Accept terms to continue')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      college: '',
      acceptTerms: false
    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {

      setIsLoading(true);
      setError(null);

      try {

        const { confirmPassword, acceptTerms, ...registrationData } = values;

        await register(registrationData);

        if (onSuccess) onSuccess();

      } catch (err) {

        setError(err.message || 'Registration failed');

      } finally {

        setIsLoading(false);

      }
    }
  });

  const handleGoogleSuccess = async (credentialResponse) => {

    setIsLoading(true);
    setError(null);

    try {

      const idToken = credentialResponse.credential;
      const response = await googleLogin(idToken);

      if (response.needCollege) {

        setShowCollegePrompt(true);
        setGoogleIdToken(idToken);

      } else if (response.success) {

        if (onSuccess) onSuccess();

      }

    } catch (err) {

      setError(err.message || 'Google signup failed');

    } finally {

      setIsLoading(false);

    }
  };

  const handleCollegeSubmit = async (e) => {

    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {

      const response = await googleLogin(googleIdToken, collegeInput);

      if (response.success) {

        setShowCollegePrompt(false);
        if (onSuccess) onSuccess();

      }

    } catch (err) {

      setError(err.message || 'Google signup failed');

    } finally {

      setIsLoading(false);

    }
  };

  const inputStyle =
    "w-full px-4 py-2 rounded bg-white/20 text-black placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400";

  const labelStyle = "block text-white text-sm font-semibold mb-2";

  return (

    <div className="space-y-4 text-white">

      {error && (
        <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className={labelStyle}>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-300 text-sm mt-1">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-300 text-sm mt-1">
                {formik.errors.lastName}
              </p>
            )}
          </div>

        </div>

        <div>
          <label className={labelStyle}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className={inputStyle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-300 text-sm mt-1">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={labelStyle}>College / University</label>
          <input
            type="text"
            name="college"
            placeholder="Enter college"
            className={inputStyle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.college}
          />
          {formik.touched.college && formik.errors.college && (
            <p className="text-red-300 text-sm mt-1">
              {formik.errors.college}
            </p>
          )}
        </div>

        {/* PASSWORD FIELD */}

        <div className="relative">
          <label className={labelStyle}>Password</label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create password"
            className={inputStyle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-white"
          >
            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>

          {formik.touched.password && formik.errors.password && (
            <p className="text-red-300 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}

        <div className="relative">

          <label className={labelStyle}>Confirm Password</label>

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            className={inputStyle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>

          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-300 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}

        </div>

        {/* TERMS */}

        <div className="flex items-start gap-2 text-blue-100 text-sm">

          <input
            type="checkbox"
            name="acceptTerms"
            onChange={formik.handleChange}
            checked={formik.values.acceptTerms}
            className="mt-1"
          />

          <span>
            I accept the{" "}
            <a href="#" className="text-indigo-300 hover:text-white">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-300 hover:text-white">
              Privacy Policy
            </a>
          </span>

        </div>

        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <p className="text-red-300 text-sm">
            {formik.errors.acceptTerms}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

      </form>

      <div className="flex justify-center mt-6">

        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google login failed")}
          />
        </GoogleOAuthProvider>

      </div>

      {showCollegePrompt && (

        <form onSubmit={handleCollegeSubmit} className="space-y-2">

          <input
            type="text"
            placeholder="Enter college name"
            value={collegeInput}
            onChange={(e) => setCollegeInput(e.target.value)}
            className={inputStyle}
          />

          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700"
          >
            Submit
          </button>

        </form>

      )}

      <div className="text-center">

        <p className="text-blue-100 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 hover:text-white">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default RegisterForm;