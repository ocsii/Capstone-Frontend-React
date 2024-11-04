import { useState, React, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, previousPrompts, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.icon_menu_orange}
          alt=""
        />

        <div className="new-chat">
          <img src={assets.icon_plus_orange} alt="" />
          {extended ? <p> New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                  key={index}
                >
                  <img src={assets.icon_comment_orange} alt="" />
                  <p>{item.slice(0, 18)}..</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.icon_history_orange} alt="" />
          {extended ? <p> Activity </p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.icon_information} alt="" />
          {extended ? <p> Info </p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
