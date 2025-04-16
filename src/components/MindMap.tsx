'use client';

import React, {useState, useRef, useEffect} from 'react';
import {useTransform, useAnimate, motion} from 'framer-motion';

interface MindMapNode {
  name: string;
  children?: MindMapNode[];
  id?: string; // Unique identifier for each node
}

interface MindMapProps {
  data: MindMapNode;
}

const MindMap: React.FC<MindMapProps> = ({data}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]); // Track expanded nodes
  const mindMapRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const [rootSize, setRootSize] = useState({width: 0, height: 0});

  // Generate unique IDs for nodes
  const generateNodeId = (name: string): string => {
    return name.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Math.random().toString(36).substring(2, 9);
  };

  // Initialize node IDs
  useEffect(() => {
    const assignIds = (node: MindMapNode) => {
      node.id = generateNodeId(node.name);
      if (node.children) {
        node.children.forEach(child => assignIds(child));
      }
    };
    assignIds(data);
  }, [data]);


  // Zoom functionality
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const zoomSpeed = 0.0001;
    const newScale = Math.max(0.2, scale - event.deltaY * zoomSpeed); // Prevent scale from going too small
    setScale(newScale);
  };

  // Pan functionality
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const startX = event.clientX - position.x;
    const startY = event.clientY - position.y;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - startX,
        y: event.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Toggle node expansion
  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId);
      } else {
        return [...prev, nodeId];
      }
    });
  };


  const renderNode = (node: MindMapNode, level: number = 0): JSX.Element => {
    if (!node.id) {
      // If the node doesn't have an ID, it's not valid, so return null
      return null;
    }

    const isExpanded = expandedNodes.includes(node.id);
    const nodeStyle = {
      padding: '0.5rem 1rem',
      margin: '0.5rem',
      border: '1px solid',
      borderRadius: '0.5rem',
      backgroundColor: 'hsl(var(--secondary))',
      color: 'hsl(var(--foreground))',
      transition: 'background-color 0.3s, color 0.3s',
      cursor: 'pointer',
      display: 'inline-block', // Ensure inline display
    };

    const containerStyle = {
      marginLeft: `${level * 2}rem`,
      textAlign: 'left', // Align text to the left
    };

    // Only render children if the node is expanded
    const renderChildren = isExpanded && node.children;

    return (
      <motion.div
        key={node.id}
        layout
        style={containerStyle}
      >
        <div
          style={nodeStyle}
          onClick={() => toggleNode(node.id!)} // Use non-null assertion here
        >
          {node.name}
        </div>
        {renderChildren && (
          <motion.div layout>
            {node.children!.map((child, index) => (
              <React.Fragment key={index}>
                {renderNode(child, level + 1)}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </motion.div>
    );
  };


  return (
    <div
      ref={mindMapRef}
      className="mind-map relative overflow-hidden rounded-lg shadow-md"
      style={{
        width: '80vw',
        height: '80vh',
        backgroundColor: 'hsl(var(--card))',
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'top left',
          transition: 'transform 0.5s ease-out',
        }}
      >
        {renderNode(data, 0)}
      </div>
    </div>
  );
};

export default MindMap;
