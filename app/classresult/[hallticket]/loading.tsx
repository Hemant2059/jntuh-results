import React from "react";

const loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen my-4">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
      <div>This might take sometime. Please Wait</div>
    </div>
  );
};

export default loading;
