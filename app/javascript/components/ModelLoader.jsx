const ModelLoader = ({ progress }) => (
  <div className='min-h-screen bg-dabba-bg flex items-center justify-center px-6'>
    <div className='w-full max-w-sm text-center'>
      <p className='font-mono text-[11px] tracking-widest text-dabba-teal uppercase mb-1'>
        Dabba · Local
      </p>
      <h1 className='font-display text-2xl text-dabba-text mb-6'>
        getting things ready
      </h1>
      <div className='ticket-card pt-6 px-7 pb-7'>
        <div className='w-full bg-dabba-bg rounded-full h-2 overflow-hidden mb-3'>
          <div
            className='bg-dabba-amber h-full transition-all duration-300'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className='text-xs text-dabba-text/50'>
        just once cached after this, works offline every time after
      </p>
    </div>
  </div>
);

export default ModelLoader;
