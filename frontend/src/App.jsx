import { useState } from 'react';
import Landing from './components/Landing.jsx';
import ChatBot from './components/ChatBot.jsx';
import DocumentPreview from './components/DocumentPreview.jsx';

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [projectData, setProjectData] = useState(null);

  function handleComplete(data) {
    setProjectData(data);
    setScreen('preview');
  }

  function resetDemo() {
    setProjectData(null);
    setScreen('chat');
  }

  if (screen === 'landing') {
    return <Landing onStart={() => setScreen('chat')} />;
  }

  if (screen === 'chat') {
    return <ChatBot onComplete={handleComplete} />;
  }

  return <DocumentPreview projectData={projectData} onReset={resetDemo} />;
}
