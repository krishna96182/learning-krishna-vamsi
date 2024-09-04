import React from "react";
import { useParams } from "react-router-dom";
import './ParamExample.css';

const ParamExample: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="param-example">
      <h1>Param Example</h1>
      <p>Param ID: {id}</p>
    </div>
  );
};

export default ParamExample;
