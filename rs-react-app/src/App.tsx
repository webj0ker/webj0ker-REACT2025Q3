import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Modal from './components/Modal/Modal';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import ControlledForm from './components/ControlledForm/ControlledForm';
import Tiles from './components/Tiles/Tiles';

import './App.css';

function App() {
  const [modalType, setModalType] = useState<'uncontrolled' | 'controlled' | null>(null);

  return (
    <Provider store={store}>
      <div className="app-container">
        <h1>Forms</h1>
        <button onClick={() => setModalType('uncontrolled')}>Open Uncontrolled Form</button>
        <button onClick={() => setModalType('controlled')}>Open Controlled Form</button>
        <Tiles />
        <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
          {modalType === 'uncontrolled' && <UncontrolledForm onSuccess={() => setModalType(null)} />}
          {modalType === 'controlled' && <ControlledForm onSuccess={() => setModalType(null)} />}
        </Modal>
      </div>
    </Provider>
  );
}

export default App;
