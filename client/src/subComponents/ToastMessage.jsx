import React from "react";
import { toast } from "sonner";

const ToastMessage = (type, message) => {
  const config = {
    position: "bottom-right",
    duration: 5000,
    style: {
      padding: "16px",
      fontSize: "16px",
      borderRadius: "10px",
    },
  };

  if (type === "error") {
    return toast.error(
      <div className="flex flex-col items-start">
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>,
      {
        ...config,
        style: {
          ...config.style,
          background: "#2c2c54",
          color: "#fff",
          border: "1px solid #ff6b6b",
        },
      }
    );
  } else if (type === "success") {
    return toast.success(
      <div className="flex flex-col items-start">
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>,
      {
        ...config,
        style: {
          ...config.style,
          background: "#4CAF50",
          color: "#fff",
          border: "1px solid #34eb98",
        },
      }
    );
  }
};

export default ToastMessage;
