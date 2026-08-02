import { useState } from "react";
import api from "../../lib/api";

const NamePrompt = ({ token, onDone }) => {
  const [name, setName] = useState("");

  const save = async () => {
    await api.patch("/users/name");
    onDone();
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <p>What should we call you? (optional)</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={save}>Save</button>
      <button onClick={onDone}>Skip</button>
    </div>
  )
};

export default NamePrompt;
