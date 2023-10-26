import React from "react";
import { useDrag } from "react-dnd";

const DragFrame = () => {
  function Card({ children, id }: { children: React.ReactNode; id: string }) {
    const [{ opacity }, dragRef] = useDrag(
      () => ({
        type: "CARD",
        item: { hello: "world", id: id },
        end: () => {
          // Tell iframe that dragging has ended
          const iframeWindow = document?.querySelector("iframe")?.contentWindow;
          console.log("iframeWindow", iframeWindow);
          if (iframeWindow) {
            console.debug("iframe:found");
          }
          iframeWindow?.postMessage(
            { eventType: "DRAG_END", data: children },
            "*"
          );
        },
        collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.5 : 1,
        }),
      }),
      []
    );
    return (
      <div ref={dragRef} style={{ opacity }}>
        {children}
      </div>
    );
  }

  const generateRandomElementName = () => {
    const elementNames = [
      "cds-button",
      "cds-checkbox",
      "cds-radio",
      "cds-input",
      "cds-textarea",
      "cds-select",
      "cds-datalist",
      "cds-datepicker",
      "cds-timepicker",
      "cds-range",
      "cds-progress-circle",
      "cds-progress-bar",
      "cds-control-action",
      "cds-control-message",
      "cds-control",
      "cds-icon",
      "cds-badge",
      "cds-alert",
      "cds-modal",
      "cds-dialog",
      "cds-toast",
      "cds-popover",
    ];
    return elementNames[Math.floor(Math.random() * elementNames.length)];
  };

  const items = Array.from(
    { length: 9 },
    (_, i) => `${generateRandomElementName()} ${i}`
  );

  return (
    <div className="dragFrameBody">
      <div style={{ fontSize: "20px" }}>DRAG A LIST ITEM FROM THIS FRAME</div>
      <ul>
        {items.map((item, index) => (
          <Card key={index} id={`dragFrame-${index}`}>
            {item}
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default DragFrame;
