// import { useState } from 'react';

// const SignUpPage = ({ setCurrentForm, onFormSubmit }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: ''
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
 
//     onFormSubmit();
//   };

//   return (
//     <div className="signup-container">
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       <button type="button" onClick={() => setCurrentForm('login')}>Back to Login</button>
//     </div>
//   );
// };

// export default SignUpPage;
import { useState } from 'react';

const SignupPage = ({ setCurrentForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentForm('login'); // Redirect back to login after successful signup
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <button type="button" onClick={() => setCurrentForm('login')}>
        Back to Login
      </button>
    </div>
  );
};

export default SignupPage;
