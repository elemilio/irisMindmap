'use client';

import React, {useState, useRef, useEffect, useCallback} from 'react';

interface MindMapNode {
  name: string;
  children?: MindMapNode[];
  id?: string; // Unique identifier for each node
  category?: string; // Category to define color
}

interface MindMapProps {
  data: MindMapNode;
}

const MindMap: React.FC<MindMapProps> = ({data}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [expandedNodes, setExpandedNodes] = useState<string[]>([data.id || '']); // Track expanded nodes, root node expanded by default
  const mindMapRef = useRef<HTMLDivElement>(null);
  const rootNodeRef = useRef<HTMLDivElement>(null); // Ref for the root node
  const [rootSize, setRootSize] = useState({width: 0, height: 0});
  const contentRef = useRef<HTMLDivElement>(null); // Ref for the content div
  const [activeNode, setActiveNode] = useState<string | null>(null); // Track active node for lighting effect

  // Colors for different categories
  const categoryColors = {
    'PROPIES': 'hsl(var(--propies-color))', // Violet
    'INTERNES': 'hsl(var(--internes-color))', // Green
    'PUBLIQUES': 'hsl(var(--publiques-color))', // Teal
    'EXTERNES': 'hsl(var(--externes-color))', // Orange
    'NOVETATS': 'hsl(var(--novetats-color))', // Blue
  };


  // Generate unique IDs for nodes
  const generateNodeId = (name: string): string => {
    return name.replace(/[^a-zA-Z0-9]/g, '_') + '_' + Math.random().toString(36).substring(2, 9);
  };

  // Initialize node IDs and categories
  useEffect(() => {
    const assignIds = (node: MindMapNode, parentCategory?: string) => {
      // Genera un ID único para el nodo
      node.id = generateNodeId(node.name);
  
      // Si el nodo no tiene categoría, asigna la categoría del padre
      node.category = node.category || parentCategory;
  
      // Si el nodo tiene hijos, aplica la misma lógica recursivamente
      if (node.children) {
        node.children.forEach(child => assignIds(child, node.category));
      }
    };
  
    // Llama a la función con el nodo raíz
    assignIds(data);
  }, [data]);

  // Effect to measure root node size and center it
  useEffect(() => {
    if (rootNodeRef.current && mindMapRef.current) {
      const width = rootNodeRef.current.offsetWidth;
      const height = rootNodeRef.current.offsetHeight;
      setRootSize({width, height});

      const mindMapWidth = mindMapRef.current.offsetWidth;
      const mindMapHeight = mindMapRef.current.offsetHeight;

      // Calculate the center position
      const centerX = (mindMapWidth - width) / 2;
      const centerY = (mindMapHeight - height) / 2;

      setPosition({x: centerX, y: centerY});
    }
  }, []);

  // Zoom functionality
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const zoomSpeed = 0.0005;
    const newScale = Math.max(0.5, scale - event.deltaY * zoomSpeed); // Prevent scale from going too small
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

  const renderNode = (node: MindMapNode, level: number = 0): JSX.Element | null => {
    if (!node.id) {
      return null; // Si el nodo no tiene ID, no es válido
    }
  
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
  
    // Determina el color de fondo según la categoría o el nombre
    const categoryColorKey = node.category as keyof typeof categoryColors;
  
    const backgroundColor = level === 0
      ? 'hsl(var(--primary))'
      : (categoryColorKey && categoryColors[categoryColorKey]) ||
        'hsl(var(--secondary))';
  
    console.log('Node:', node.name, 'Category:', node.category, 'Background:', backgroundColor);
    const textColor = 'hsl(var(--primary-foreground))';
  
    const nodeStyle = {
      padding: '0.5rem 1rem',
      margin: '0.5rem',
      border: '1px solid',
      backgroundColor: backgroundColor,
      color: textColor,
      transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
      cursor: hasChildren ? 'pointer' : 'default',
      display: 'inline-block',
      boxShadow: activeNode === node.id ? `0 0 10px ${textColor}` : 'none',
    };
  
    const containerStyle = {
      marginLeft: `${level * 2}rem`,
      textAlign: 'left',
    };
  
    const childrenStyle = {
      opacity: isExpanded ? 1 : 0,
      height: isExpanded ? 'auto' : 0,
      display: isExpanded ? 'block' : 'none',
      overflow: 'hidden',
      transition: 'opacity 0.3s ease-in-out, height 0.3s ease-in-out',
    };
  
    const handleClick = () => {
      if (hasChildren) {
        toggleNode(node.id!);
      }
      setActiveNode(node.id!); // Marca el nodo como activo al hacer clic
      setTimeout(() => setActiveNode(null), 300); // Limpia el nodo activo después de 300ms
    };
  
    return (
      <div key={node.id} style={containerStyle}>
        <div
          ref={level === 0 ? rootNodeRef : null} // Agrega referencia al nodo raíz
          style={nodeStyle}
          onClick={handleClick}
        >
          {node.name}
        </div>
        {hasChildren && (
          <div style={childrenStyle}>
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

  // Function to adapt zoom to content
  const zoomToFit = useCallback(() => {
    if (!mindMapRef.current || !contentRef.current) {
      return;
    }

    const mindMapWidth = mindMapRef.current.offsetWidth;
    const mindMapHeight = mindMapRef.current.offsetHeight;
    const contentWidth = contentRef.current.offsetWidth;
    const contentHeight = contentRef.current.offsetHeight;

    const scaleX = mindMapWidth / contentWidth;
    const scaleY = mindMapHeight / contentHeight;
    const newScale = Math.min(scaleX, scaleY, 1); // Limit to max scale of 1

    setScale(newScale);

    // Center the content
    const newPositionX = (mindMapWidth - contentWidth * newScale) / 2;
    const newPositionY = (mindMapHeight - contentHeight * newScale) / 2;

    setPosition({x: newPositionX, y: newPositionY});
  }, []);

  // Call zoomToFit on initial load and whenever expandedNodes change
  useEffect(() => {
    zoomToFit();
  }, [zoomToFit, expandedNodes]);

  return (
    <div
      ref={mindMapRef}
      className="mind-map relative overflow-hidden rounded-lg shadow-md"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'hsl(var(--background))',
        userSelect: 'none', // Prevent text selection
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={contentRef}
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
  return (
    <div>
      {data.children?.map((child) => renderNode(child, 0))}
    </div>
  );
};


export default MindMap;
