import React from "react";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const LoadingSpin = ({ loading }) => {
  return (
    <div style={containerStyle}>
      <div className="sweet-loading">
        <PropagateLoader
          css={override}
          size={15}
          color={"#17033a"}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LoadingSpin;
