import React, { Component, useEffect, useState } from 'react'

import {useOnDraw} from './hooks'

const Canvas = ({
    width,
    height
}) => {

    const setCanvasRef = useOnDraw(onDraw)

    function onDraw(ctx,point,prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5)
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