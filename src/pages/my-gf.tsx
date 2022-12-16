import BrainWaterIcon from "../images/brainwater.jpeg";
import * as React from "react";

const MyGF = () => {
  return (
    <div>
      <h1>My Girl Friend is So Pretty</h1>
      <img
        alt="Brain with water"
        src={BrainWaterIcon}
        style={{
          width: "100%",
          maxWidth: "320px",
          marginBottom: 48,
        }}
      />
    </div>
  );
};

export default MyGF;
