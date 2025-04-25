import React from 'react';
import Form from './components/Form';
import { useAuth } from './providers/AuthProvider'
import { useNavigate, Navigate } from 'react-router'

function App() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleFormSuccess = (email) => {
    navigate("/chat")
    auth.loginAction(email)
  };

  if (auth.email) return <Navigate to="/chat" />;

  return (
    <div className="app-container">
      <Form onSuccess={handleFormSuccess} />
    </div>
  );
}

export default App;
