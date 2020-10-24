import { useState, useCallback, useMemo } from "react";
import './App.css';

function App() {
  const ACTIVATE_KEY = ';';
  const startingPhrase = "Oh toda poderosa bola de cristal, seu conhecimento é infinito! Poderia, por obséquio responder minha humilde pergunta";
  const [active, setActive] = useState(false);
  const [activatable, setActivatable] = useState(true);  
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  useMemo(() => {
    setActivatable(question.length === 0);
  }, [question]);

  const activate = useCallback(() => setActive(true), [setActive]);
  const deactivate = useCallback(() => setActive(false), [setActive]);

  const forgeQuestion = useCallback((key) => {
    if (key!==ACTIVATE_KEY) {
      setResponse(r => r + key);
      setQuestion(q => {
        if (q) {
          return q + startingPhrase[q.length];
        }
        return q + startingPhrase[0];
      });
    }    
  }, []);

  const onChange = useCallback((e) => {
    const value = e.target.value;    
    if (!active && value[value.length-1]!==ACTIVATE_KEY) {
      setQuestion(value);
    }
  }, [setQuestion, active]);

  const onKeyPress = useCallback((e) => {
    if (e.key==='Enter') {
      e.preventDefault();
      setShowResponse(true);
    } else if (showResponse) {
      setShowResponse(false);
    }
    if (active) {
      if (e.key===ACTIVATE_KEY) {
        deactivate();
      } else {
        forgeQuestion(e.key);
      }
    } else {
      if (activatable && e.key===ACTIVATE_KEY) {
        setResponse("");
        activate();
      }
    }
  }, [activatable, active, setShowResponse, showResponse, deactivate, activate, forgeQuestion]);

  return (
    <div className="App">
      <header className="App-header">
        <p
          className="label"
        >
          Faça  uma pergunta
        </p>
        <form>
          <input
            className="question-input"
            autoFocus
            type="text"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={question}
          ></input>
        </form>
        {
          showResponse && (
            <div
              className="response-box"
            >
              {response}
            </div>
          )
        }
      </header>
    </div>
  );
}

export default App;
