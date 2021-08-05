import React from "react";
import { Button, ButtonGroup, Paper } from "@material-ui/core";
import {
  ZoomIn,
  ZoomOut,
  Fullscreen,
  Pause,
  PlayArrow,
  ArrowBack,
  ArrowForward,
  FastForward,
  FastRewind,
} from "@material-ui/icons";
import { isPlaying, isSidebarOpen } from "../Canvas/Canvas";
import { Infobox } from "../Infobox";

export function Toolbar({
  onZoomIn = () => {},
  onZoomOut = () => {},
  onFitView = () => {},
  onStepForward = () => {},
  onStepBackward = () => {},
  onPlay = () => {},
  onPause = () => {},
  onSkipForward = () => {},
  onSkipBackward = () => {},
  onGetCount = () => {},
  onSpeedSlow = () => {},
  onSpeedNormal = () => {},
  onSpeedFast = () => {},
  onIDDFS = () => {},
  onOpenSidebar = () => {},
  goals,
  currAlgorithm,
  currAlgorithm2,
  algorithmObject,
  algorithmObject2,
  algorithmObject1,
  elements,
}) {
  function onSpeedSelect() {
    var speedSelect = document.getElementById("selectSpeed");
    let value = speedSelect.value.toString();
    switch (value) {
      case "0":
        onSpeedSlow();
        break;
      case "2":
        onSpeedFast();
        break;
      default:
        onSpeedNormal();
        break;
    }
  }

  return (
    <Paper
      style={{
        bottom: 10,
        left: 15,
        padding: 7,
        display: "flex",
        position: "absolute",
        zIndex: "4",
        width: "calc(100% - 45px)",
        overflow: "auto",
      }}
      elevation={4}
    >
      <Button
        variant="outlined"
        onClick={onOpenSidebar}
        aria-label="Open sidebar"
        style={{
          textTransform: "none",
          display: isSidebarOpen() ? "none" : "block",
          marginRight: 20,
        }}
        data-testid="open-sidebar-button"
      >
        &#9776;
      </Button>
      <ButtonGroup style={{ marginRight: 20 }} aria-label="View controls">
        <Button variant="outlined" onClick={onZoomIn} aria-label="Zoom in">
          <ZoomIn />
        </Button>
        <Button variant="outlined" onClick={onZoomOut} aria-label="Zoom out">
          <ZoomOut />
        </Button>
      </ButtonGroup>
      <ButtonGroup style={{ marginRight: 20 }}>
        <Button variant="outlined" onClick={onFitView} aria-label="Fit view">
          <Fullscreen />
        </Button>
      </ButtonGroup>
      <ButtonGroup style={{ marginRight: 20 }} aria-label="Playback controls">
        <Button
          variant="outlined"
          onClick={onSkipBackward}
          aria-label="Skip back"
        >
          <FastRewind />
        </Button>
        <Button
          variant="outlined"
          onClick={onStepBackward}
          aria-label="Step back"
        >
          <ArrowBack />
        </Button>
      </ButtonGroup>
      <Button
        variant="outlined"
        onClick={isPlaying() ? onPause : onPlay}
        aria-label={isPlaying() ? "Pause" : "Play"}
      >
        {isPlaying() ? <Pause /> : <PlayArrow />}
      </Button>
      <p
        style={{ marginLeft: 20, fontSize: "1rem", marginRight: 20 }}
        data-testid="step-count"
      >
        Step: {onGetCount}
      </p>
      <ButtonGroup style={{ marginRight: 20 }}>
        <Button
          variant="outlined"
          onClick={onStepForward}
          aria-label="Step forward"
          data-testid="step-forward-button"
        >
          <ArrowForward />
        </Button>
        <Button
          variant="outlined"
          onClick={onSkipForward}
          aria-label="Skip forward"
        >
          <FastForward />
        </Button>
      </ButtonGroup>
      <label
        htmlFor="selectSpeed"
        style={{ paddingRight: "6px", paddingTop: "10px", fontSize: "1rem" }}
      >
        Playback speed:
      </label>
      <select id="selectSpeed" onChange={onSpeedSelect} defaultValue="1">
        <option value="0">Slower</option>
        <option value="1">Default</option>
        <option value="2">Faster</option>
      </select>
      <p style={{ marginLeft: 20, fontSize: "1rem" }} data-testid="iddfs-text">
        {onIDDFS}
      </p>
      <ButtonGroup style={{ marginLeft: "auto", marginRight: 0 }}>
        <Infobox
          currStep={onGetCount}
          currAlgorithm={currAlgorithm}
          currAlgorithm2={currAlgorithm2}
          algorithmObject={algorithmObject}
          algorithmObject2={algorithmObject2}
          algorithmObject1={algorithmObject1}
          goals={goals}
          elements={elements}
        />
      </ButtonGroup>
    </Paper>
  );
}
