import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [clickedItems, setClickedItems] = useState([]);
  const [startPop, setStartPop] = useState(false);
  const intervalRef = useRef(null);

  const handleItemClick = (item) => {
    setClickedItems((prev) => {
      const updated = prev.includes(item) ? prev : [...prev, item];
      if (updated.length === items.length) {
        setStartPop(true);
      }
      return updated;
    });
  };

  useEffect(() => {
    if (startPop && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setClickedItems((prev) => {
          if (prev.length > 0) {
            const updated = [...prev];
            updated.pop();
            console.log(updated);
            return updated;
          } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setStartPop(false);
            return [];
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startPop]);

  return (
    <div className="App">
      <div className="itemsWrapper">
        {items.map((item) => (
          <div
            key={item}
            className={`item ${clickedItems.includes(item) ? "clicked" : ""}`}
            onClick={() => handleItemClick(item)}
          ></div>
        ))}
      </div>
    </div>
  );
}
