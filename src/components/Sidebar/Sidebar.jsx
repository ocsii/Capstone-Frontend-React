import { useState, React } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [commentIcon, setCommentIcon] = useState(assets.icon_comment_orange);

  const [extended, setExtended] = useState(false);

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
            <div
              className="recent-entry"
              onMouseEnter={() => setCommentIcon(assets.icon_comment_black)}
              onMouseLeave={() => setCommentIcon(assets.icon_comment_orange)}
            >
              <img src={commentIcon} alt="" />
              <p> What is Sunway</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.icon_history_orange} alt="" />
          {extended ? <p> Activity </p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.icon_settings_orange} alt="" />
          {extended ? <p> Settings </p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
