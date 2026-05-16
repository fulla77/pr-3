import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Space+Mono:wght@700&display=swap');

  .counter-wrap {
    font-family: 'Tajawal', sans-serif;
    padding: 2rem 1rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    min-height: 340px;
    direction: rtl;
  }
  .counter-title {
    font-size: 15px;
    font-weight: 500;
    color: #888780;
    letter-spacing: 0.04em;
  }
  .counter-card {
    background: #ffffff;
    border: 0.5px solid #d3d1c7;
    border-radius: 12px;
    padding: 1.5rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-width: 220px;
  }
  .counter-val {
    font-family: 'Space Mono', monospace;
    font-size: 56px;
    font-weight: 700;
    line-height: 1;
    color: #2c2c2a;
    transition: color 0.2s, transform 0.15s;
  }
  .counter-val.pos { color: #0F6E56; }
  .counter-val.neg { color: #D85A30; }
  .counter-val.bump { transform: scale(1.12); }
  .step-row {
    display: flex;
    align-items: center;
    gap: 10px;
    direction: rtl;
  }
  .step-label {
    font-size: 14px;
    color: #5F5E5A;
    font-weight: 500;
  }
  .step-input {
    width: 72px;
    text-align: center;
    font-family: 'Space Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    border: 1px solid #b4b2a9;
    border-radius: 8px;
    padding: 6px 8px;
    color: #2c2c2a;
    background: #f1efe8;
    outline: none;
  }
  .step-input:focus {
    border-color: #534AB7;
    box-shadow: 0 0 0 2px #EEEDFE;
  }
  .btns {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .btn {
    font-family: 'Tajawal', sans-serif;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 11px 22px;
    cursor: pointer;
    transition: transform 0.1s, filter 0.1s;
    min-width: 90px;
  }
  .btn:active { transform: scale(0.96); }
  .btn-inc { background: #1D9E75; color: #fff; }
  .btn-inc:hover { filter: brightness(1.1); }
  .btn-dec { background: #D85A30; color: #fff; }
  .btn-dec:hover { filter: brightness(1.1); }
  .btn-reset {
    background: #F1EFE8;
    color: #888780;
    border: 0.5px solid #d3d1c7;
  }
  .btn-reset:hover { background: #D3D1C7; color: #444441; }
  .history-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 26px;
    direction: ltr;
  }
  .hist-pill {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    padding: 3px 9px;
    border-radius: 999px;
    background: #f1efe8;
    color: #888780;
    border: 0.5px solid #d3d1c7;
    animation: fadein 0.2s;
  }
  @keyframes fadein {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [bump, setBump] = useState(false);

  const triggerBump = () => {
    setBump(true);
    setTimeout(() => setBump(false), 200);
  };

  const addHistory = (prev) => {
    setHistory((h) => [...h.slice(-5), prev]);
  };

  const increment = () => {
    addHistory(counter);
    setCounter((c) => c + step);
    triggerBump();
  };

  const decrement = () => {
    addHistory(counter);
    setCounter((c) => c - step);
    triggerBump();
  };

  const reset = () => {
    if (counter !== 0) addHistory(counter);
    setCounter(0);
    setHistory([]);
    triggerBump();
  };

  const valClass = [
    "counter-val",
    counter > 0 ? "pos" : counter < 0 ? "neg" : "",
    bump ? "bump" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style>{styles}</style>
      <div className="counter-wrap">
        <div className="counter-title">العداد المتقدم</div>

        <div className="counter-card">
          <div className={valClass}>{counter}</div>
        </div>

        <div className="step-row">
          <label className="step-label" htmlFor="step-input">
            الخطوة
          </label>
          <input
            id="step-input"
            className="step-input"
            type="number"
            value={step}
            min={1}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v) && v > 0) setStep(v);
            }}
          />
        </div>

        <div className="btns">
          <button className="btn btn-inc" onClick={increment}>
            ＋ {step}
          </button>
          <button className="btn btn-dec" onClick={decrement}>
            － {step}
          </button>
          <button className="btn btn-reset" onClick={reset}>
            تصفير
          </button>
        </div>

        <div className="history-row">
          {history.map((v, i) => (
            <span className="hist-pill" key={i}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Counter;