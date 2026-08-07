import { useState } from "react";
import AuthScreen from "./auth/AuthScreen";
import NamePrompt from "./auth/NamePrompt";
import MomentScreen from "./checkin/MomentScreen";
import CheerWallScreen from "./CheerWallScreen";

const TABS = {
  MOMENT: "moment",
  CHEER_WALL: "cheerwall",
};

const TOKEN_KEY = "dabba_token";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.MOMENT);

  const handleAuthenticated = (newToken) => {
    setToken(newToken);
    setJustLoggedIn(true);
  };

  if (!token) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  if (justLoggedIn) {
    return <NamePrompt token={token} onDone={() => setJustLoggedIn(false)} />;
  }

  const screens = {
    moment: <MomentScreen />,
    cheerwall: <CheerWallScreen />,
  };

  const tabs = [
    { id: "moment", label: "Check Moment" },
    { id: "cheerwall", label: "Cheer Wall" },
  ];

  return (
    <div className='min-h-screen bg-dabba-bg flex flex-col'>
      <nav className='flex justify-center gap-2 pt-6'>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`text-xs font-mono uppercase tracking-widest px-3 cursor-pointer ${activeTab ? "text-dabba-amber" : "text-dabba-text/40"}`}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className='flex-1 flex items-center justify-center px-6'>
        {screens[activeTab]}
      </div>
    </div>
  );
};

export default App;
