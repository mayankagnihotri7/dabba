import { useEffect, useState } from "react";
import api from "../lib/api";

const StatsFooter = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/stats")
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <p className='text-center text-[11px] font-mono text-dabba-text/30 mt-8'>
      {stats.total_moments} moments · {stats.total_cheer_posts} cheers shared
    </p>
  );
};

export default StatsFooter;
