import './App.css';
import { useState } from 'react';

function App() {
  const [modalType, setModalType] = useState<'uncontrolled' | 'controlled' | null>(null);

  return (
    <div className="app-container">
      <h1>Forms Demo</h1>
      <button onClick={() => setModalType('uncontrolled')}>Open Uncontrolled Form</button>
      <button onClick={() => setModalType('controlled')}>Open Controlled Form</button>
      {/* Место для модального окна */}
    </div>
  );
}

export default App;
