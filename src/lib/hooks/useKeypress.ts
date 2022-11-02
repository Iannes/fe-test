import { useState, useEffect } from "react";

export enum Keys {
  UP = "keyup",
  DOWN = "keydown",
}

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener(Keys.DOWN, handleKeyDown);
    window.addEventListener(Keys.UP, handleKeyUp);

    return () => {
      window.removeEventListener(Keys.DOWN, handleKeyDown);
      window.removeEventListener(Keys.UP, handleKeyUp);
    };
  }, [targetKey]);

  return keyPressed;
};
