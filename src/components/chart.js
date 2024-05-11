import React from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { SaveRestore } from "./SaveRestore";

export const getNodeId = () => `randomnode_${+new Date()}`;

export const initialNodes = [];

export const initialEdges = [];

export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
