import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const API_URL = "http://127.0.0.1:8000/query";

  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async () => {
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setResultData("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      if (!res.ok) {
        // Handle HTTP errors
        throw new Error("Failed to fetch from the backend");
      }

      const response = await res.json();
      let responseString = response["Answer: "];

      let responseArray = responseString.split("**");

      let newResponse;

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");

      let newResponseArray = newResponse2.split(" ");

      for (let i = 0; i < newResponseArray.length; i++) {
        {
          const nextWord = newResponseArray[i];
          delayPara(i, nextWord + " ");
        }
      }

      setPreviousPrompts((prev) => [...prev, recentPrompt]); // Keep track of prompts
    } catch (error) {
      console.error(error);
      setResultData("No response from backend");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    previousPrompt,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
