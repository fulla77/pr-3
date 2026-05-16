import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Space+Mono:wght@400;700&display=swap');

  .uc-wrap {
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    min-height: 100vh;
    padding: 2.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background: #f7f6f2;
  }

  /* ── Header ── */
  .uc-header {
    text-align: center;
  }
  .uc-header h1 {
    font-size: 28px;
    font-weight: 800;
    color: #2c2c2a;
    margin: 0 0 6px;
  }
  .uc-header p {
    font-size: 14px;
    color: #888780;
    margin: 0;
  }

  /* ── Feedback buttons ── */
  .uc-feedback {
    display: flex;
    flex-direction: row-reverse;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .fb-btn {
    font-family: 'Tajawal', sans-serif;
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 14px;
    padding: 14px 28px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 100px;
    transition: transform 0.12s, filter 0.12s;
    position: relative;
    overflow: hidden;
  }
  .fb-btn:active { transform: scale(0.95); }
  .fb-btn .fb-icon { font-size: 26px; line-height: 1; }
  .fb-btn .fb-count {
    font-family: 'Space Mono', monospace;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
  }
  .fb-btn .fb-label { font-size: 13px; font-weight: 500; opacity: 0.85; }

  .fb-good  { background: #1D9E75; color: #fff; }
  .fb-good:hover  { filter: brightness(1.08); }
  .fb-neutral { background: #534AB7; color: #fff; }
  .fb-neutral:hover { filter: brightness(1.08); }
  .fb-bad   { background: #D85A30; color: #fff; }
  .fb-bad:hover   { filter: brightness(1.08); }

  /* ── Stats card ── */
  .uc-stats-card {
    background: #ffffff;
    border: 0.5px solid #d3d1c7;
    border-radius: 16px;
    padding: 1.5rem 1.75rem;
    width: 100%;
    max-width: 420px;
  }
  .uc-stats-card h2 {
    font-size: 15px;
    font-weight: 700;
    color: #5F5E5A;
    margin: 0 0 1rem;
    text-align: right;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* empty state */
  .uc-empty {
    text-align: center;
    color: #b4b2a9;
    font-size: 15px;
    padding: 1rem 0;
  }

  /* stats table */
  .uc-table {
    width: 100%;
    border-collapse: collapse;
  }
  .uc-table tr {
    border-bottom: 0.5px solid #f1efe8;
  }
  .uc-table tr:last-child { border-bottom: none; }
  .uc-table td {
    padding: 10px 4px;
    font-size: 15px;
    color: #2c2c2a;
  }
  .uc-table td:last-child {
    text-align: left;
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    font-weight: 700;
  }
  .uc-table .row-good td:last-child  { color: #0F6E56; }
  .uc-table .row-bad  td:last-child  { color: #D85A30; }
  .uc-table .row-total td            { font-weight: 700; color: #444441; }
  .uc-table .row-avg td:last-child   { color: #534AB7; }
  .uc-table .row-pos td:last-child   { color: #1D9E75; }

  /* progress bar */
  .uc-progress-wrap {
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .uc-progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #888780;
  }
  .uc-progress-track {
    height: 8px;
    border-radius: 999px;
    background: #f1efe8;
    overflow: hidden;
  }
  .uc-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #1D9E75, #5DCAA5);
    transition: width 0.4s cubic-bezier(.4,0,.2,1);
  }

  /* reset */
  .uc-reset {
    font-family: 'Tajawal', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #b4b2a9;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-decoration-style: dotted;
  }
  .uc-reset:hover { color: #D85A30; }
`;

const StatisticLine = ({ text, value, rowClass }) => (
  <tr className={rowClass}>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div className="uc-empty">لم يتم جمع أي آراء بعد 🕊️</div>
    );
  }

  const average = (good - bad) / total;
  const positivePercent = (good / total) * 100;

  return (
    <>
      <table className="uc-table">
        <tbody>
          <StatisticLine text="جيد 😊"       value={good}                          rowClass="row-good" />
          <StatisticLine text="عادي 😐"       value={neutral}                       rowClass="row-neutral" />
          <StatisticLine text="سيء 😞"        value={bad}                           rowClass="row-bad" />
          <StatisticLine text="المجموع"       value={total}                         rowClass="row-total" />
          <StatisticLine text="المعدل"        value={average.toFixed(2)}            rowClass="row-avg" />
          <StatisticLine text="النسبة الإيجابية" value={`${positivePercent.toFixed(1)}%`} rowClass="row-pos" />
        </tbody>
      </table>

      <div className="uc-progress-wrap">
        <div className="uc-progress-label">
          <span>النسبة الإيجابية</span>
          <span>{positivePercent.toFixed(1)}%</span>
        </div>
        <div className="uc-progress-track">
          <div
            className="uc-progress-fill"
            style={{ width: `${positivePercent}%` }}
          />
        </div>
      </div>
    </>
  );
};

const FeedbackButton = ({ onClick, label, count, icon, className }) => (
  <button className={`fb-btn ${className}`} onClick={onClick}>
    <span className="fb-icon">{icon}</span>
    <span className="fb-count">{count}</span>
    <span className="fb-label">{label}</span>
  </button>
);

const Unicafe = () => {
  const [good, setGood]       = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad]         = useState(0);

  const reset = () => { setGood(0); setNeutral(0); setBad(0); };

  return (
    <>
      <style>{styles}</style>
      <div className="uc-wrap">

        <div className="uc-header">
          <h1>أعطنا رأيك</h1>
          <p>اختر تقييمك للخدمة</p>
        </div>

        <div className="uc-feedback">
          <FeedbackButton onClick={() => setGood(good + 1)}       label="جيد"   count={good}    icon="😊" className="fb-good" />
          <FeedbackButton onClick={() => setNeutral(neutral + 1)} label="عادي"  count={neutral} icon="😐" className="fb-neutral" />
          <FeedbackButton onClick={() => setBad(bad + 1)}         label="سيء"   count={bad}     icon="😞" className="fb-bad" />
        </div>

        <div className="uc-stats-card">
          <h2>الإحصائيات</h2>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </div>

        {(good + neutral + bad) > 0 && (
          <button className="uc-reset" onClick={reset}>إعادة تعيين</button>
        )}

      </div>
    </>
  );
};

export default Unicafe;