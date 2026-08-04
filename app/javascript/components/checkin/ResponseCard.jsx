import React from "react";

const ResponseCard = ({ response, onDone }) => {
  return (
    <div className='min-h-screen bg-dabba-bg flex items-center justify-center px-6'>
      <div className='w-full max-w-sm'>
        <p className='font-mono text-[10px] tracking-wide text-dabba-text/40 uppercase text-center mb-3'>
          for you right now
        </p>

        <div className='ticket-card pt-6 px-7 pb-7'>
          <p className='font-display text-lg text-dabba-text leading-relaxed'>
            {response}
          </p>
        </div>

        <button
          onClick={onDone}
          className='w-full text-dabba-text/50 text-sm py-3 mt-4 cursor-pointer'
        >
          done for me
        </button>
      </div>
    </div>
  );
};

export default ResponseCard;
