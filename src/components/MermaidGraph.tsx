import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidGraph = ({ generateGraph, treeProductComps, components, treeCompsDetail, product }) => {
    const graphCode = generateGraph({ treeProductComps, components, treeCompsDetail, product });

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false, 
            theme: 'default',  
            logLevel: 'info', 
            securityLevel: 'strict', 
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'linear'
            }
        });
        mermaid.init(undefined, ".mermaid");
    }, []); 

    return (
        <div className="mermaid">
            {graphCode}
        </div>
    );
};

export default MermaidGraph;
