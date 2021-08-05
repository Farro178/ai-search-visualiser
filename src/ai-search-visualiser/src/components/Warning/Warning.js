import React from "react";
import Alert from "@material-ui/lab/Alert";

function Warning(props) {
  let isHidden = false;

  if (props.warningMsg !== "") {
    isHidden = true;
  }

  return (
    <div
      style={{
        zIndex: "5",
        position: "absolute",
        left: "20px",
        width: "calc(100% - 40px)",
      }}
    >
      {isHidden && (
        <Alert variant="filled" severity="error" data-testid="warning-alert">
          {props.warningMsg}
        </Alert>
      )}
    </div>
  );
}

export { Warning };
