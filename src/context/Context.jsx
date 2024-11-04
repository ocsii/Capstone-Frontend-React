import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const API_URL = "http://127.0.0.1:8000/query";

  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input); // Save the current input as recent prompt

    // Update previous prompts with the current input
    setPreviousPrompts((prev) => [...prev, input]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch from the backend");
      }

      const response = await res.json();
      let responseString = response["Answer: "];
      // Process the response to format it properly
      let newResponse = processResponse(responseString);

      // Display each word with a delay for typing effect
      let newResponseArray = newResponse.split(" ");
      newResponseArray.forEach((nextWord, i) => {
        delayPara(i, nextWord + " ");
      });
    } catch (error) {
      console.error(error);
      setResultData(
        "No response from backend | Error parsing response from backend"
      );
    } finally {
      setLoading(false);
      setInput(""); // Clear input after sending
    }
  };

  const processResponse = (responseString) => {
    let responseArray = responseString.split("**");
    let newResponse = "";

    responseArray.forEach((item, i) => {
      if (i === 0 || i % 2 !== 1) {
        newResponse += item;
      } else {
        newResponse += "<b>" + item + "</b>";
      }
    });

    newResponse = newResponse
      .split("*")
      .join("</br>")
      .split("#")
      .join("</br></br>");
    return newResponse;
  };

  const contextValue = {
    previousPrompts,
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
