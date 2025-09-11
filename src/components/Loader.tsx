"use client";

import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="spinner" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #F8F7F3;

  .spinner {
    position: relative;
    width: 7em;
    height: 7em;
  }

  .spinner:before {
    transform: rotateX(60deg) rotateY(45deg) rotateZ(45deg);
    animation: rotateBefore 750ms infinite linear reverse;
  }

  .spinner:after {
    transform: rotateX(240deg) rotateY(45deg) rotateZ(45deg);
    animation: rotateAfter 750ms infinite linear;
  }

  .spinner:before,
  .spinner:after {
    box-sizing: border-box;
    content: "";
    display: block;
    position: absolute;
    margin-top: -5em;
    margin-left: -5em;
    width: 10em;
    height: 10em;
    transform-style: preserve-3d;
    transform-origin: 50%;
    perspective-origin: 50% 50%;
    perspective: 340px;
    background-size: 10em 10em;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2NnB4IiBoZWlnaHQ9IjI5N3B4IiB2aWV3Qm94PSIwIDAgMjY2IDI5NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNzEuNSwzLjI1IEMyMjYuMiwxMi44NSAyOTcuMSw3MS40OSAyNTAuOSwxMDguNDEgQzIxNi41OCwxMzUuODIgMTg2LjUyLDk3LjA2IDE1Ni44LDg1Ljc3IEMxMjcuMDcsNzQuNDggNzYuODgsODQuMjEgNjAuMTMsMTA4LjQxIEMtMTUuOTgsMjE4LjI4IDE0NS4yNywyOTYuNjYgMTQ1LjI3LDI5Ni42NiBDMTQ1LjI3LDI5Ni42NiAtMjUuNDQsMjU3LjI0IDMuMzksMTA4LjQxIEMxNi4zLDQxLjgxIDg0LjczLC0xMS45OSAxNzEuNSwzLjI1IFoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=");
  }

  @keyframes rotateBefore {
    from {
      transform: rotateX(60deg) rotateY(45deg) rotateZ(0deg);
    }
    to {
      transform: rotateX(60deg) rotateY(45deg) rotateZ(-360deg);
    }
  }

  @keyframes rotateAfter {
    from {
      transform: rotateX(240deg) rotateY(45deg) rotateZ(0deg);
    }
    to {
      transform: rotateX(240deg) rotateY(45deg) rotateZ(360deg);
    }
  }
`;

export default Loader;
