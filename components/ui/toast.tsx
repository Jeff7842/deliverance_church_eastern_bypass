"use client";

// Common toast. One component; `variant` only changes the colour set.
import * as React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

export type ToastVariant = "success" | "error" | "warning" | "info";

const PALETTE: Record<ToastVariant, { fg: string; wash: string; icon: string }> = {
  success: { fg: "var(--status-success)", wash: "color-mix(in srgb, var(--status-success) 22%, transparent)", icon: "lucide:check-circle-2" },
  error: { fg: "var(--status-error)", wash: "color-mix(in srgb, var(--status-error) 22%, transparent)", icon: "lucide:x-circle" },
  warning: { fg: "var(--status-warning)", wash: "color-mix(in srgb, var(--status-warning) 25%, transparent)", icon: "lucide:alert-triangle" },
  info: { fg: "var(--status-info)", wash: "color-mix(in srgb, var(--status-info) 22%, transparent)", icon: "lucide:info" },
};

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message?: string;
  onClose?: () => void;
}

export function Toast({ variant = "success", title, message, onClose }: ToastProps) {
  const p = PALETTE[variant];
  return (
    <Card role={variant === "error" ? "alert" : "status"} $fg={p.fg} $wash={p.wash}>
      <svg className="wave" viewBox="0 0 1440 320" aria-hidden="true">
        <path d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L0,320Z" />
      </svg>
      <span className="icon-container">
        <Icon icon={p.icon} className="icon" />
      </span>
      <div className="text">
        <p className="message-text">{title}</p>
        {message ? <p className="sub-text">{message}</p> : null}
      </div>
      {onClose ? (
        <button type="button" className="close" aria-label="Dismiss" onClick={onClose}>
          <Icon icon="lucide:x" />
        </button>
      ) : null}
    </Card>
  );
}

// ponytail: transient $props keep colour logic here; swap to CSS vars if the
// toast moves to Tailwind later.
const Card = styled.div<{ $fg: string; $wash: string }>`
  width: 330px;
  max-width: 100%;
  min-height: 80px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: var(--toast-bg, #ffffff);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 15px;
  .wave {
    position: absolute;
    transform: rotate(90deg);
    left: -31px;
    top: 32px;
    width: 80px;
    fill: ${(p) => p.$wash};
  }
  .icon-container {
    width: 35px;
    height: 35px;
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.$wash};
    border-radius: 50%;
    margin-left: 8px;
    color: ${(p) => p.$fg};
  }
  .icon {
    width: 17px;
    height: 17px;
  }
  .text {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .message-text,
  .sub-text {
    margin: 0;
    cursor: default;
  }
  .message-text {
    color: ${(p) => p.$fg};
    font-size: 17px;
    font-weight: 700;
  }
  .sub-text {
    font-size: 14px;
    color: var(--toast-sub, #555);
  }
  .close {
    flex: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 0;
    background: none;
    color: var(--toast-sub, #555);
    cursor: pointer;
  }
`;

export default Toast;
