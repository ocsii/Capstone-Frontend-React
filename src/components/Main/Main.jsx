import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p> SunwayGPT </p>

        <img className="sunwayLogo" src={assets.icon_sunway_logo} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="div greet">
              <p>
                <span>Hello, User.</span>
              </p>
              <p>Ask me a question!</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>What is Mr Muthukumarans email?</p>
                <img src={assets.icon_email_orange} alt="" />
              </div>

              <div className="card">
                <p>
                  What is the prerequisites for Object Oriented Programming?
                </p>
                <img src={assets.icon_prerequisite} alt="" />
              </div>

              <div className="card">
                <p>What is the criteria to achieve first class honors?</p>
                <img src={assets.icon_question_mark} alt="" />
              </div>

              <div className="card">
                <p>
                  What is the credit hours for Data Structures and Algorithms?
                </p>
                <img src={assets.icon_clock} alt="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="result">
              <div className="result-title">
                <img src={assets.icon_sunway_logo} alt="" />
                <p>
                  {recentPrompt.charAt(0).toUpperCase() + recentPrompt.slice(1)}
                </p>
              </div>
              <div className="result-data">
                <img src={assets.icon_prerequisite} alt="" />

                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }} />
                )}
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your question..."
            />
            <div>
              <img
                onClick={() => onSent()}
                src={assets.icon_running_black}
                alt=""
              />
            </div>
          </div>

          <p className="bottom-info">
            This is a personal project not an official product of Sunway. Please
            double check any critical information.
          </p>
        </div>
      </div>
      <p className="bottom-info-name"> Christian Cham (2024) </p>
    </div>
  );
};

export default Main;

/* <p>
        
      </p>*/
