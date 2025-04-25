import React, { useState } from 'react';
import Form from './components/Form';
import Chat from './components/Chat';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSuccess = (email) => {
    setUserEmail(email);
    setFormSubmitted(true);
  };

  return (
    <div className="app-container">
      {formSubmitted ? <Chat email={userEmail} /> : <Form onSuccess={handleFormSuccess} />}
    </div>
  );
}

export default App;
