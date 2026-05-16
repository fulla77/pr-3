import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Space+Mono:wght@700&display=swap');

  .anec-wrap {
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    min-height: 100vh;
    padding: 2.5rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background: #f7f6f2;
  }

  /* ── Header ── */
  .anec-header {
    text-align: center;
  }
  .anec-header h1 {
    font-size: 30px;
    font-weight: 800;
    color: #2c2c2a;
    margin: 0 0 4px;
  }
  .anec-header p {
    font-size: 13px;
    color: #b4b2a9;
    margin: 0;
  }

  /* ── Main quote card ── */
  .anec-card {
    background: #ffffff;
    border: 0.5px solid #d3d1c7;
    border-radius: 18px;
    padding: 2rem 1.75rem 1.5rem;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
    overflow: hidden;
  }
  .anec-card::before {
    content: '❝';
    position: absolute;
    top: -10px;
    left: 18px;
    font-size: 90px;
    color: #EEEDFE;
    font-family: Georgia, serif;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  .anec-quote {
    font-size: 17px;
    font-weight: 500;
    color: #2c2c2a;
    line-height: 1.8;
    text-align: right;
    font-style: italic;
    position: relative;
    z-index: 1;
    min-height: 72px;
  }

  /* votes badge */
  .anec-vote-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #534AB7;
    background: #EEEDFE;
    border-radius: 999px;
    padding: 5px 14px;
    align-self: flex-start;
  }
  .anec-vote-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #534AB7;
  }

  /* ── Action buttons ── */
  .anec-btns {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
    width: 100%;
    max-width: 500px;
  }
  .anec-btn {
    font-family: 'Tajawal', sans-serif;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    cursor: pointer;
    flex: 1;
    transition: filter 0.12s, transform 0.1s;
  }
  .anec-btn:active { transform: scale(0.96); }
  .anec-btn-vote {
    background: #534AB7;
    color: #fff;
  }
  .anec-btn-vote:hover { filter: brightness(1.1); }
  .anec-btn-next {
    background: #ffffff;
    color: #2c2c2a;
    border: 0.5px solid #d3d1c7;
  }
  .anec-btn-next:hover { background: #f1efe8; }

  /* ── Divider ── */
  .anec-divider {
    width: 100%;
    max-width: 500px;
    border: none;
    border-top: 0.5px solid #d3d1c7;
    margin: 0;
  }

  /* ── Most popular card ── */
  .anec-popular-card {
    background: #ffffff;
    border: 0.5px solid #d3d1c7;
    border-radius: 18px;
    padding: 1.25rem 1.75rem;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .anec-popular-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #888780;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
  .anec-trophy {
    font-size: 16px;
  }
  .anec-popular-quote {
    font-size: 15px;
    font-weight: 500;
    color: #2c2c2a;
    font-style: italic;
    line-height: 1.75;
    text-align: right;
  }
  .anec-popular-votes {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #1D9E75;
    background: #E1F5EE;
    border-radius: 999px;
    padding: 4px 12px;
    align-self: flex-start;
  }

  /* empty state */
  .anec-no-votes {
    font-size: 14px;
    color: #b4b2a9;
    text-align: center;
    padding: 0.5rem 0;
  }

  /* ── Dots indicator ── */
  .anec-dots {
    display: flex;
    gap: 5px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 500px;
  }
  .anec-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #d3d1c7;
    transition: background 0.2s, transform 0.2s;
  }
  .anec-dot.active {
    background: #534AB7;
    transform: scale(1.4);
  }
  .anec-dot.has-votes {
    background: #1D9E75;
  }
  .anec-dot.active.has-votes {
    background: #534AB7;
  }
`;

const Anecdotes = () => {
  const anecdotes = [
    "إذا كان تنقيح الأخطاء هو عملية إزالة الأخطاء، فإن البرمجة هي عملية وضعها.",
    "أفضل طريقة للبدء هي أن تتوقف عن الكلام وتبدأ بالعمل.",
    "أي أحمق يمكنه كتابة كود يفهمه الكمبيوتر. المبرمجون الجيدون يكتبون كوداً يفهمه البشر.",
    "التحسين المبكر هو أصل كل شر.",
    "قبل أن تعمل البرمجيات بشكل جيد، يجب أن تعمل أولاً.",
    "البساطة هي أقصى درجات التطور.",
    "أفضل رسالة خطأ هي تلك التي لا تظهر أبداً.",
    "أصعب جزء في البرمجة هو تسمية الأشياء.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    let next;
    do { next = Math.floor(Math.random() * anecdotes.length); }
    while (next === selected && anecdotes.length > 1);
    setSelected(next);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const maxVotes = Math.max(...votes);
  const mostVoted = votes.indexOf(maxVotes);

  return (
    <>
      <style>{styles}</style>
      <div className="anec-wrap">

        <div className="anec-header">
          <h1>💡 حكمة اليوم</h1>
          <p>اقرأ، صوّت، واكتشف الأكثر شعبية</p>
        </div>

        <div className="anec-card">
          <p className="anec-quote">{anecdotes[selected]}</p>
          <div className="anec-vote-badge">
            <span className="anec-vote-dot" />
            {votes[selected]} {votes[selected] === 1 ? "صوت" : "أصوات"}
          </div>
        </div>

        <div className="anec-btns">
          <button className="anec-btn anec-btn-vote" onClick={handleVote}>
            👍 تصويت
          </button>
          <button className="anec-btn anec-btn-next" onClick={handleNextAnecdote}>
            🔀 حكمة أخرى
          </button>
        </div>

        <div className="anec-dots">
          {anecdotes.map((_, i) => (
            <span
              key={i}
              className={[
                "anec-dot",
                i === selected ? "active" : "",
                votes[i] > 0 ? "has-votes" : "",
              ].filter(Boolean).join(" ")}
            />
          ))}
        </div>

        <hr className="anec-divider" />

        <div className="anec-popular-card">
          <div className="anec-popular-label">
            <span className="anec-trophy">🏆</span>
            الحكمة الأكثر شعبية
          </div>
          {maxVotes > 0 ? (
            <>
              <p className="anec-popular-quote">{anecdotes[mostVoted]}</p>
              <span className="anec-popular-votes">{maxVotes} أصوات</span>
            </>
          ) : (
            <p className="anec-no-votes">لم يتم التصويت بعد</p>
          )}
        </div>

      </div>
    </>
  );
};

export default Anecdotes;