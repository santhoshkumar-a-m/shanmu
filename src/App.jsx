import { useState, useEffect } from "react";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [noIsYes, setNoIsYes] = useState(false);
  const [trail, setTrail] = useState([]);
  const [confetti, setConfetti] = useState([]);

  // countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setNoIsYes(true);
      return;
    }
    const t = setTimeout(() => {
      setTimeLeft(v => v - 1);
      setPos({
        x: Math.random() * 220 - 110,
        y: Math.random() * 220 - 110
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  // cursor trail hearts
  useEffect(() => {
    const move = e => {
      setTrail(p => [...p.slice(-25), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // accept
  const accept = () => {
    setAccepted(true);

    const pieces = Array.from({ length: 160 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 12 + 6
    }));
    setConfetti(pieces);

    new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_4c3a1b2c47.mp3").play();
  };

  return (
    <div className="scene">

      {/* shooting stars */}
      {[...Array(8)].map((_,i)=>(
        <span key={i} className="star"/>
      ))}

      {/* cursor trail */}
      {trail.map(t=>(
        <span key={t.id} className="trail" style={{left:t.x,top:t.y}}>💖</span>
      ))}

      {/* falling roses */}
      {[...Array(18)].map((_,i)=>(
        <span key={i} className="rose">🌹</span>
      ))}

      {/* floating hearts */}
      {[...Array(30)].map((_,i)=>(
        <span key={i} className="heart">❤️</span>
      ))}

      {/* confetti */}
      {accepted && confetti.map(c=>(
        <span
          key={c.id}
          className="confetti"
          style={{
            left:c.left+"%",
            width:c.size,
            height:c.size,
            animationDelay:c.delay+"s"
          }}
        />
      ))}

      {/* CARD */}
      <div className="border-wrap">

        <div className="card">

          {!accepted ? (
            <>
              <h1 className="title">
                Will you be my Valentine? 💘
              </h1>

              {!noIsYes && (
                <p className="timer">
                  No unlocks in {timeLeft}s 😈
                </p>
              )}

              <div className="btns">

                <button onClick={accept} className="yes">
                  Yes 💖
                </button>

                <button
                  disabled={!noIsYes}
                  onClick={accept}
                  style={{
                    transform: !noIsYes
                      ? `translate(${pos.x}px,${pos.y}px)`
                      : "none"
                  }}
                  className={`no ${noIsYes?"yes":""}`}
                >
                  {noIsYes ? "Yes  💖" : "No 💔"}
                </button>

              </div>
            </>
          ) : (
            <h1 className="success">
              SHE SAID YES 💍✨
            </h1>
          )}

        </div>
      </div>
    </div>
  );
}
