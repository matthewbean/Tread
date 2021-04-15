import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";


export default function Test() {
  const [cards, set] = useState(["A"]);

  useEffect(() => {
    setInterval(() => {
      set(cards => (cards[0] === "A" ? "B" : "A"));
    }, 4000);
  }, []);

  const transitions = useTransition(cards, null, {
    from: { o: 0 },
    enter: { o: 1 },
    leave: { o: 2 },
    config: { duration: 2000 }
  });
  return transitions.map(({ item, key, props }) => (
    <div style={{ fontSize: "300px" }}>
      <animated.div
        style={{
          position: "absolute",
          opacity: props.o.interpolate([0, 0.5, 1, 1.5, 2], [0, 0, 1, 0, 0])
        }}
      >
        {item}
      </animated.div>
    </div>
  ));
}