const CheerPostCard = ({ post }) => {
  const renderBody = (body) => {
    const parts = body.split(/(!#\w+)/g);

    return parts.map((part, idx) =>
      part.match(/^!#\w+$/) ? (
        <span key={idx} className='text-dabba-teal'>
          {part}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      ),
    );
  };

  return (
    <div className='ticket-card pt-5 px-6 pb-5 mb-3'>
      <p className='text-dabba-text text-sm leading-relaxed'>
        {renderBody(post.body)}
      </p>
      {post.tags?.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-3'>
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className='font-mono text-[10px] text-dabba-teal bg-dabba-bg px-2 py-1 rounded'
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheerPostCard;
