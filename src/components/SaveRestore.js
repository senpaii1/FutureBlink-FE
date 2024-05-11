import React, { useState, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
} from "reactflow";
import axios from "axios";
import { initialNodes, initialEdges, getNodeId } from "./chart";
import LogoutButton from "./logout";
import "./save.css";
export const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showAddNodePopup, setShowAddNodePopup] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const BASE_URL = "https://futureblink-backend.onrender.com/api";
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log("flow", flow);
      const dataToSave = {
        nodes: flow.nodes,
        edges: flow.edges,
        viewport: flow.viewport,
      };

      const authToken = localStorage.getItem("authToken"); // Get the authentication token from local storage
      if (!authToken) {
        console.error("User not authenticated");
        return;
      }

      axios
        .post(`${BASE_URL}/emailSequence`, dataToSave, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
          },
        })
        .then((response) => {
          console.log("Email sequence saved successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error saving email sequence:", error);
        });
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const authToken = localStorage.getItem("authToken"); // Get the authentication token from local storage
    if (!authToken) {
      console.error("User not authenticated");
      return;
    }
    axios
      .get(`${BASE_URL}/emailSequence`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
        },
      })
      .then((response) => {
        const latestNode = response.data.length - 1;
        const { nodes, edges, viewport } = response.data[latestNode];
        setNodes(nodes);
        setEdges(edges);
        setViewport(viewport);
        console.log("Email sequence restored successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error restoring email sequence:", error);
      });
  }, []);

  const toggleAddNodePopup = () => {
    setShowAddNodePopup((prev) => !prev); // Toggle the state to show/hide the popup
  };

  const onAddNode = useCallback(
    (label) => {
      const newNode = {
        id: getNodeId(),
        data: { label },
        position: {
          x: Math.random() * window.innerWidth - 100,
          y: Math.random() * window.innerHeight,
        },
      };
      setNodes((nds) => nds.concat(newNode));
      setShowAddNodePopup(false); // Close the popup after adding a node
    },
    [setNodes]
  );

  const AddNodePopup = ({ onAddNode }) => {
    const handleAddNode = (label) => {
      onAddNode(label);
    };

    return (
      <div className="popup-container">
        <h2>Select Node Type</h2>
        <button
          onClick={() => handleAddNode("Leads from sample list all emails")}
          className="button1"
        >
          Leads
        </button>
        <button
          onClick={() => handleAddNode("Sequence Start Point")}
          className="button1"
        >
          Sequence
        </button>
        <button
          onClick={() => handleAddNode("Email Template: Signal Fundraise")}
          className="button1"
        >
          Email
        </button>
        <button
          onClick={() => handleAddNode("Wait Some Minutes")}
          className="button1"
        >
          Wait
        </button>
      </div>
    );
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
    >
      <Panel position="top-right">
        <div className="buttons">
          <button onClick={onSave} className="button">
            Save
          </button>
          <button onClick={onRestore} className="button">
            Previous Chart
          </button>
          <button onClick={toggleAddNodePopup} className="button">
            Add node
          </button>
          <LogoutButton />
        </div>
      </Panel>
      <Panel>
        {showAddNodePopup && <AddNodePopup onAddNode={onAddNode} />}
      </Panel>
    </ReactFlow>
  );
};
