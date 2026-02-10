'use client';

import type React from 'react';

const BoxLoader: React.FC = () => {
  return (
    <>
      <style>{`
        .bl-boxes {
          --size: 32px;
          --duration: 800ms;
          height: calc(var(--size) * 2);
          width: calc(var(--size) * 3);
          position: relative;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
        }
        .bl-box {
          width: var(--size);
          height: var(--size);
          top: 0;
          left: 0;
          position: absolute;
          transform-style: preserve-3d;
        }
        .bl-box:nth-child(1) {
          transform: translate(100%, 0);
          animation: bl-box1 var(--duration) linear infinite;
        }
        .bl-box:nth-child(2) {
          transform: translate(0, 100%);
          animation: bl-box2 var(--duration) linear infinite;
        }
        .bl-box:nth-child(3) {
          transform: translate(100%, 100%);
          animation: bl-box3 var(--duration) linear infinite;
        }
        .bl-box:nth-child(4) {
          transform: translate(200%, 0);
          animation: bl-box4 var(--duration) linear infinite;
        }
        .bl-face {
          position: absolute;
          width: var(--size);
          height: var(--size);
        }
        .bl-front {
          transform: translateZ(calc(var(--size) / 2));
        }
        .bl-right {
          transform: rotateY(90deg) translateZ(calc(var(--size) / 2));
        }
        .bl-top {
          transform: rotateX(90deg) translateZ(calc(var(--size) / 2));
        }
        .bl-back {
          background: rgba(255, 255, 255, 0.05);
          transform: translateZ(calc(var(--size) / -2));
        }
        /* Box 1 */
        .bl-b1 .bl-front { background: #FF6B6B; }
        .bl-b1 .bl-right { background: #e55a5a; }
        .bl-b1 .bl-top   { background: #ff8a8a; }
        /* Box 2 */
        .bl-b2 .bl-front { background: #FF8E53; }
        .bl-b2 .bl-right { background: #e57a45; }
        .bl-b2 .bl-top   { background: #ffa673; }
        /* Box 3 */
        .bl-b3 .bl-front { background: #FFD93D; }
        .bl-b3 .bl-right { background: #e6c235; }
        .bl-b3 .bl-top   { background: #ffe066; }
        /* Box 4 */
        .bl-b4 .bl-front { background: #FF6B6B; }
        .bl-b4 .bl-right { background: #e55a5a; }
        .bl-b4 .bl-top   { background: #ff8a8a; }

        @keyframes bl-box1 {
          0%, 50% { transform: translate(100%, 0); }
          100%    { transform: translate(200%, 0); }
        }
        @keyframes bl-box2 {
          0%   { transform: translate(0, 100%); }
          50%  { transform: translate(0, 0); }
          100% { transform: translate(100%, 0); }
        }
        @keyframes bl-box3 {
          0%, 50% { transform: translate(100%, 100%); }
          100%    { transform: translate(0, 100%); }
        }
        @keyframes bl-box4 {
          0%   { transform: translate(200%, 0); }
          50%  { transform: translate(200%, 100%); }
          100% { transform: translate(100%, 100%); }
        }
      `}</style>
      <div className="bl-boxes">
        <div className="bl-box bl-b1">
          <div className="bl-face bl-front" />
          <div className="bl-face bl-right" />
          <div className="bl-face bl-top" />
          <div className="bl-face bl-back" />
        </div>
        <div className="bl-box bl-b2">
          <div className="bl-face bl-front" />
          <div className="bl-face bl-right" />
          <div className="bl-face bl-top" />
          <div className="bl-face bl-back" />
        </div>
        <div className="bl-box bl-b3">
          <div className="bl-face bl-front" />
          <div className="bl-face bl-right" />
          <div className="bl-face bl-top" />
          <div className="bl-face bl-back" />
        </div>
        <div className="bl-box bl-b4">
          <div className="bl-face bl-front" />
          <div className="bl-face bl-right" />
          <div className="bl-face bl-top" />
          <div className="bl-face bl-back" />
        </div>
      </div>
    </>
  );
};

export default BoxLoader;
