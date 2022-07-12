import React from 'react'

import {useOnDraw} from './hooks'

import {color, thickness} from './hooks'

const Canvas = ({
    width,
    height
}) => {

    const setCanvasRef = useOnDraw(onDraw)

    function onDraw(ctx,point,prevPoint) {
        drawLine(prevPoint, point, ctx, color, thickness*2)
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
        if(!start) start = end
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.moveTo(start.x,start.y)
        ctx.lineTo(end.x,end.y)
        ctx.stroke()

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, thickness, 0, 2 * Math.PI);
        ctx.fill();
    }

    return(
        <canvas
            width={width}
            height={height}
            style={canvasStyle}
            ref={setCanvasRef}
        />
    );
}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}