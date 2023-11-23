import React, { useState } from "react";

const DownloadButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Additional logic or state changes can be added here
  };

  return (
    <div id="div" className="download-container">
      <p className={`text ${clicked ? "Color" : ""}`}>click</p>
      <div
        id="download"
        className={clicked ? "clicked" : ""}
        onClick={handleClick}
      >
        <svg
          // style={{"width: 200px;"}}
          // style={width: "200px"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          <title>download</title>
          <g id="template">
            <circle cx="500" cy="202.87" r="43.6" />
            <path d="M429.56,342.75v-31.7a43.18,43.18,0,0,1,43.18-43.18h54.52a43.18,43.18,0,0,1,43.18,43.18v31.78" />
            <circle cx="500" cy="252.98" r="114.13" />
            <path d="M675.18,899.16h-425a50,50,0,0,1-50-50v-700a50,50,0,0,1,50-50H750a50,50,0,0,1,50,50V773.89" />
          </g>
          <g id="list">
            <line x1="350.6" y1="602.55" x2="685.24" y2="602.55" />
            <circle cx="326.17" cy="503.09" r="10.29" />
            <line x1="350.6" y1="502.55" x2="685.24" y2="502.55" />
            <circle cx="326.17" cy="703.09" r="10.29" />
            <line x1="350.6" y1="702.55" x2="685.24" y2="702.55" />
            <circle cx="326.17" cy="603.09" r="10.29" />
            <path d="M800,773.89v75.28a50,50,0,0,1-50,50h-74.8" />
          </g>
          <g id="downloadarrow">
            <line x1="500" y1="498.07" x2="500" y2="704.33" />
            <polyline points="424.52 623.87 500 705.31 574.45 623.8" />
          </g>
          <g id="downloadtray">
            <polyline points="623.98 703.82 623.98 738.61 623.96 738.75 376.51 738.75 376.33 738.64 376.33 703.83" />
            <path d="M675.12,899.15l125-125Z" />
            <path d="M800,774.13l-74.87,0a50,50,0,0,0-50,50l0,74.93" />
          </g>
          <g id="tick">
            <path
              id="tickround"
              d="M860.41,327.75a394.09,394.09,0,0,1,38.35,170.85c0,220.23-178.53,398.75-398.75,398.75S101.25,718.82,101.25,498.59,279.77,99.84,500,99.84c158.83,0,296,92.86,360.09,227.25L500,721.55l-.15,0L286.06,495.26"
            />
          </g>
        </svg>{" "}
      </div>
    </div>
  );
};

export default DownloadButton;
