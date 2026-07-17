import { useState } from "react";
import "./App.css";
import api from "./api/api.js";

const platformLimits = {
  Twitter: 280,
  Facebook: 63206,
  Instagram: 2200,
  LinkedIn: 3000,
};

function App() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState([]);

  const availablePlatforms = ["Twitter", "Facebook", "Instagram", "LinkedIn"];


  const togglePlatform = (platform) => {
    setPlatforms((currentPlatforms) =>
      currentPlatforms.includes(platform)
        ? currentPlatforms.filter((item) => item !== platform)
        : [...currentPlatforms, platform],
    );
  };
  const currentLimit =
  platforms.length > 0
    ? Math.min(...platforms.map((platform) => platformLimits[platform]))
    : null;
  
  const validatePost = () => {
  const errors = [];

  platforms.forEach((platform) => {
    if (content.length > platformLimits[platform]) {
      errors.push(
        `${platform}: Maximum ${platformLimits[platform]} characters allowed.`
      );
    }
  });

  return errors;
};
const errors = validatePost();  

const handlePublish = async () => {
  try {
    const response = await api.post("/posts", {
      content,
      platforms,
    });

    alert(response.data.message);

    setContent("");
    setPlatforms([]);

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};
  
  return (
    
    <div className="container">

      <h1 className="composer-title">Social Post Composer</h1>

      <div className="platforms">
        {availablePlatforms.map((platform) => (
          <label key={platform}>
            <input
              type="checkbox"
              checked={platforms.includes(platform)}
              onChange={() => togglePlatform(platform)}
            />
            {platform}
          </label>
        ))}
      </div>

      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      

      <p>Characters : {content.length}
        {currentLimit && ` / ${currentLimit}`}
      </p>

      {errors.length > 0 ? (
  <div className="errors">
    {errors.map((error, index) => (
      <p key={index}>{error}</p>
    ))}
  </div>
) : (
  <p className="success">✅ Ready to publish</p>
)}

      <button
  type="button"
  disabled={!content.trim() || platforms.length === 0 || errors.length > 0}
  onClick={handlePublish}
>
  Publish
</button>

    </div>
  );
  
}


export default App;