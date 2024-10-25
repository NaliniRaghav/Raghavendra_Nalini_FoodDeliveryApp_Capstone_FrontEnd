import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RestaurantDisplayForm from './pages/RestaurantDisplayForm';
import ResetPasswordPage from './pages/PasswordResetPage';
import SignupPage from './pages/SignUpForm';

function App() {
  const [currentForm, setCurrentForm] = useState('login');  

  return (
    <div>
      {currentForm === 'login' && <LoginPage setCurrentForm={setCurrentForm} />}
      {currentForm === 'restaurantDisplay' && <RestaurantDisplayForm />}
      {currentForm === 'reset' && <ResetPasswordPage setCurrentForm={setCurrentForm} />}
      {currentForm === 'signup' && <SignupPage setCurrentForm={setCurrentForm} />}
    </div>
  );
}

export default App;
