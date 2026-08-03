import { useState } from "react";
import api from "../../lib/api";

const NamePrompt = ({ token, onDone }) => {
  const [name, setName] = useState("");

  const save = async () => {
    await api.patch("/users/name", { name });
    onDone();
  };

  return (
    <div className='min-h-screen bg-dabba-bg flex items-center justify-center px-6'>
      <div className='w-full max-w-sm'>
        <div className="text-center mb-8">
          <h1 className='font-display text-2xl text-dabba-text'>
            What should we call you?
          </h1>
          <p className='text-sm text-dabba-text/50 mt-2'>totally optional</p>
        </div>

        <div className='ticket-card pt-6 px-7 pb-7'>
          <input
            className='w-full bg-dabba-bg border border-dabba-text/10 rounded-lg px-3.5 py-3 text-dabba-text text-sm mb-5 focus:outline-none focus:border-dabba-amber'
            placeholder='your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className='w-full bg-dabba-amber text-dabba-bg font-semibold text-sm rounded-lg py-3.5 mb-3'
            onClick={save}
          >
            Save
          </button>
          <button
            className='w-full text-dabba-text/50 text-sm py-2'
            onClick={onDone}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamePrompt;
