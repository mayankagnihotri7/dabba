import { useState } from "react";
import api from "../lib/api";
import { MAX_LENGTH } from "../utils/constants";

const extractTags = (text) => {
  return [
    ...new Set([...text.matchAll(/!#(\w+)/g)].map((m) => m[1].toLowerCase())),
  ];
};

const CheerPostComposer = ({ onPosted }) => {
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const trimmedBody = body.trim();

  const submit = async (e) => {
    e.preventDefault();
    if (!trimmedBody) return;

    setPosting(true);
    setError(null);

    try {
      const tags = extractTags(trimmedBody);
      await api.post("/cheer_posts", {
        cheer_post: { body: trimmedBody, tags },
      });
      setBody("");
      onPosted();
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Couldn't post right now");
    } finally {
      setPosting(false);
    }
  };

  return (
    <form onSubmit={submit} className='ticket-card pt-5 px-6 pb-5 mb-5'>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value.slice(0, MAX_LENGTH))}
        disabled={posting}
        placeholder='share something good - try !#tags'
        rows={3}
        className='w-full bg-dabba-bg border border-dabba-text/10 rounded-lg px-3.5 py-3 text-dabba-text text-sm mb-2 focus:outline-none focus:border-dabba-amber resize-none'
      />
      <div className='flex justify-between items-center'>
        <p className='text-[11px] text-dabba-text/40'>
          {body.length}/{MAX_LENGTH}
        </p>
        <button
          type='submit'
          disabled={!trimmedBody || posting}
          className='bg-dabba-amber text-dabba-bg font-semibold text-sm rounded-lg px-5 py-2 disabled:opacity-40'
        >
          {posting ? "posting..." : "share"}
        </button>
      </div>
      {error && <p className='text-dabba-alert text-sm mt-2'>{error}</p>}
    </form>
  );
};

export default CheerPostComposer;
