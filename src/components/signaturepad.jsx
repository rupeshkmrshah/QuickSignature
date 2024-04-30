import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';

const SignaturePad = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { offsetX, offsetY } = e.nativeEvent;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    html2canvas(canvasRef.current).then((canvas) => {
      const imageURL = canvas.toDataURL(`image/jpg`);
      const a = document.createElement('a');
      a.href = imageURL;
      a.download = `signature.jpg`;
      a.click();
    });

    

  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        width={800}
        height={500}
        style={{ border: '1px solid #ccc', background:'white', cursor:'crosshair'}}
      />
      <br />
      <Button variant="primary" onClick={saveSignature}>
        Save Signature
      </Button>{' '}
      <Button variant="secondary" onClick={clearCanvas}>
        Clear
      </Button>
    </div>
  );
};

export default SignaturePad;
