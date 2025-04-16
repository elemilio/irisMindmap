
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTransform, useAnimate } from 'framer-motion';

interface MindMapNode {
  name: string;
  children?: MindMapNode[];
}

interface MindMapProps {
  data: MindMapNode;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const mindMapRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate()
  const [rootSize, setRootSize] = useState({ width: 0, height: 0 })

  // Zoom functionality
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const zoomSpeed = 0.05;
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


  const renderNode = (node: MindMapNode, level: number = 0): JSX.Element => {
    const isHovered = node.name === hoveredNode;
    const nodeStyle = {
      padding: '0.5rem 1rem',
      margin: '0.5rem',
      border: '1px solid',
      borderRadius: '0.5rem',
      backgroundColor: isHovered ? 'hsl(var(--accent))' : 'hsl(var(--secondary))',
      color: isHovered ? 'hsl(var(--accent-foreground))' : 'hsl(var(--foreground))',
      transition: 'background-color 0.3s, color 0.3s',
      cursor: 'pointer',
      display: 'inline-block', // Ensure inline display
    };

    const containerStyle = {
      marginLeft: `${level * 2}rem`,
      textAlign: 'left', // Align text to the left
    };

    return (
      <div key={node.name} style={containerStyle}>
        <div
          style={nodeStyle}
          onMouseEnter={() => setHoveredNode(node.name)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {node.name}
        </div>
        {node.children && (
          <div>
            {node.children.map((child, index) => (
              <React.Fragment key={index}>
                {renderNode(child, level + 1)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
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
        {renderNode(data)}
      </div>
    </div>
  );
};

export default MindMap;
