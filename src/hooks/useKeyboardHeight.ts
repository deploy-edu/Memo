import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {
    keyboardHeight,
  };
};

export default useKeyboardHeight;
