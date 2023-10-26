import { useState } from "react";
import { createComponent } from "@lit/react";
import React from "react";
import DragFrame from "./drag-frame";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";

// @ts-ignore
import { MyElement } from "http://localhost:8000/dev/my-element.js";
import "https://1.www.s81c.com/common/carbon/web-components/version/v2.0.1/checkbox.min.js";
import "http://localhost:8000/dev/canvas-renderer.js";

window.React = React;

const elementsJSON = [
  {
    type: "div",
    props: {
      className: "myClass",
      innerHTML: "Hello",
      style: { x: 10, y: 10 },
    },
  },
  {
    type: "my-element",
    props: {
      className: "myClass",
      innerHTML: "Hello",
      style: { x: 50, y: 50 },
    },
  },
  {
    type: "cds-checkbox",
    props: {
      className: "myClass",
      innerHTML: "Hello",
      style: { x: 100, y: 300 },
    },
  },
  // Add more elements
];

const MyElementComponent = createComponent({
  tagName: "my-element",
  elementClass: MyElement,
  react: React,
  events: {
    onactivate: "activate",
    onchange: "change",
  },
});

function App() {
  // const [count, setCount] = useState(0);
  const win = window as any;
  const renderer = new win.ElementRenderer();
  console.log("renderer", renderer);

  const [view, setView] = useState("canvas");

  // Generate React elements
  const reactElements = elementsJSON.map((jsonElement, index) => {
    const element = renderer.createElement(jsonElement, "React");
    return React.cloneElement(element, { key: index });
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="sidebar">
        <button
          onClick={() => {
            setView("canvas");
          }}
        >
          canvas
        </button>
        <button
          onClick={() => {
            setView("iframe");
          }}
        >
          iframe
        </button>
      </div>
      <div className="canvas">
        {view === "canvas" ? (
          <div className="frame">{reactElements}</div>
        ) : (
          <div className="frame">
            <DragFrame />

            <iframe
              src="/drop.html"
              onDragOver={() => {
                console.log("drag over");
              }}
            ></iframe>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default App;
