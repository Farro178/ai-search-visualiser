import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Typography, Toolbar } from "@material-ui/core";
import { Tutorial } from "../Tutorial";
import logo from "./logo.svg";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      style={{ background: "#6DC660", color: "#000000" }}
    >
      <Toolbar>
        <img src={logo} alt="App logo: letters 'AI' drawn using nodes and edges" style={{ width: "3%", height: "auto"}}/>
        <Typography variant="h1" style={{ fontSize: "2rem", marginLeft: "10px" }}>
          A.I Search Visualiser
        </Typography>
        <Tutorial />
      </Toolbar>
    </AppBar>
  );
}
