import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress"; // 这是 Material UI 的一个旋转器组件

export default function LoadingSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </div>
  );
}
