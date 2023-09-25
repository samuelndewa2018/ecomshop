import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      {" "}
      <div className="text-center text-5xl">{seconds} seconds</div>
      <div class="text-center flex w-full items-center justify-center">
        <div class="mr-1 font-extralight">processing in...</div>
        <div class="w-24 flex mx-1 p-2  text-yellow-500 rounded-lg">
          <div class="font-mono mr-4 leading-none" x-text="seconds">
            {seconds}
          </div>
          <div class="font-mono leading-none">Seconds</div>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;

// const App = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <CountdownTimer />
//     </div>
//   );
// };

// export default App;
