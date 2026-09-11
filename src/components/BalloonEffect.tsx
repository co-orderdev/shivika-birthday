import { useCallback, useState } from "react";
import { balloons, textBalloons } from "balloons-js";

export function BalloonEffect() {
  const [isLaunching, setIsLaunching] = useState(false);

  const celebrate = useCallback(() => {
    if (isLaunching) {
      return;
    }

    setIsLaunching(true);

    try {
      balloons();
      window.setTimeout(() => {
        textBalloons([
            {
                text: "SHIVIKA",
                fontSize: 120,
                color: "#B75D69",
            },
        ]);
       },350);
     } finally {
      window.setTimeout(() => {
        setIsLaunching(false);
      }, 2600);
    }
  }, [isLaunching]);

  return (
    <button
      type="button"
      className="button button-secondary celebrate-button"
      onClick={celebrate}
      aria-label="Launch a birthday balloon celebration"
      disabled={isLaunching}
    >
      <span aria-hidden="true">✦</span>
      {isLaunching ? "Celebrating..." : "Celebrate Shivika"}
    </button>
  );
}