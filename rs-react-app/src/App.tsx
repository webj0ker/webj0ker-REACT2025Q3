import './App.css';
import { useState } from 'react';
import Modal from './components/Modal/Modal';

function App() {
  const [modalType, setModalType] = useState<'uncontrolled' | 'controlled' | null>(null);

  return (
    <div className="app-container">
      <h1>Forms Demo</h1>
      <button onClick={() => setModalType('uncontrolled')}>Open Uncontrolled Form</button>
      <button onClick={() => setModalType('controlled')}>Open Controlled Form</button>
      {/* Место для модального окна */}
      
       <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>

        </Modal>
    </div>
  );
}

export default App;
