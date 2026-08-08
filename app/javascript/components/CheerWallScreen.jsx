import { useEffect, useState } from "react";
import api from "../lib/api";
import CheerPostComposer from "./CheerPostComposer";
import CheerPostCard from "./CheerPostCard";

const CheerWallScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMineOnly, setShowMineOnly] = useState(false);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (reset = false) => {
    try {
      const targetPage = reset ? 1 : page;

      const params = {
        page: targetPage,
        ...(showMineOnly && { mine: "true" }),
        ...(activeTag && { tag: activeTag }),
      };

      const { data } = await api.get("/cheer_posts", { params });

      setPosts((prev) => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === 20);
      setPage(targetPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    const res = await api.get("/tags");
    setTags(res.data);
  };

  const handlePosted = () => {
    loadPosts(true);
    loadTags();
  };

  useEffect(() => {
    loadPosts(true);
  }, [showMineOnly, activeTag]);

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className='w-full max-w-sm px-6 py-10'>
      <div className='max-w-sm mx-auto'>
        <p className='font-mono text-[11px] tracking-widest text-dabba-teal uppercase mb-1 text-center'>
          Dabba · Local
        </p>
        <h1 className='font-display text-2xl text-dabba-text text-center mb-6'>
          cheer wall
        </h1>

        <div className='flex justify-center mb-8'>
          <button
            className='text-xs font-mono text-dabba-teal uppercase tracking-widest cursor-pointer'
            onClick={() => setShowMineOnly((v) => !v)}
          >
            {showMineOnly ? "show everyone" : "show mine"}
          </button>
        </div>

        {tags.length > 0 && (
          <div className='flex flex-wrap gap-2 justify-center mb-5'>
            {tags.map((name) => (
              <button
                key={name}
                onClick={() => setActiveTag(activeTag === name ? null : name)}
                className={`font-mono text-[11px] px-2 py-1 rounded ${activeTag === name ? "bg-dabba-amber text-dabba-bg" : "bg-dabba-bg text-dabba-teal"} cursor-pointer`}
              >
                !#{name}
              </button>
            ))}
          </div>
        )}

        <CheerPostComposer onPosted={handlePosted} />

        {loading ? (
          <p className='text-dabba-text/40 text-sm text-center'>loading...</p>
        ) : posts.length === 0 ? (
          <p className='text-dabba-text/40 text-sm text-center'>
            nothing here yet - be the first
          </p>
        ) : (
          posts.map((post) => <CheerPostCard key={post.id} post={post} />)
        )}
        {hasMore && !loading && (
          <button
            onClick={() => loadPosts(false)}
            className='w-full text-dabba-text/50 text-sm py-3 cursor-pointer'
          >
            load more
          </button>
        )}
      </div>
    </div>
  );
};

export default CheerWallScreen;
