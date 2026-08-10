const IntroCard = ({ onDone }) => (
  <div className='min-h-screen bg-dabba-bg flex items-center justify-center px-6'>
    <div className='w-full max-w-sm'>
      <div className='text-center mb-8'>
        <p className='font-mono text-[11px] tracking-widest text-dabba-teal uppercase mb-1'>
          Dabba · Local
        </p>
        <h1 className='font-display text-2xl text-dabba-text'>what this is</h1>
      </div>

      <div className='ticket-card pt-6 px-7 pb-7'>
        <p className='text-dabba-text text-sm leading-relaxed mb-4'>
          A quiet moment during your commute. Tap how you feel or write what's
          on your mind - you'll get something back, generated just for you,
          right there on your phone.
        </p>
        <p className='text-dabba-text text-sm leading-relaxed mb-4'>
          What you write never leaves your device. No servers, no accounts
          reading it - just you and this ride.
        </p>
        <p className='text-dabba-text text-sm leading-relaxed mb-6'>
          There's also a Cheer Wall - a small, anonymous place to share
          something good with fellow commuters.
        </p>
        <button
          onClick={onDone}
          className='w-full bg-dabba-amber text-dabba-bg font-semibold text-sm rounded-lg py-3.5 cursor-pointer'
        >
          let's go
        </button>
      </div>
    </div>
  </div>
);

export default IntroCard;
