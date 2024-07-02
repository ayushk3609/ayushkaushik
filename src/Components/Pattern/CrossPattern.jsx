import React from 'react'

const CrossPattern = ({w,outline,fill}) => {
    const style = {
        stroke: outline,
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: fill,
        fillOpacity: (fill==='white')?1:0,
        fillRule: "nonzero",
        opacity: 1
      };
    return (
        <div>
            <svg version="1.1" width={w} height="100" viewBox="0 0 640 640">
                <desc>Created with Fabric.js 5.3.0</desc>
                <defs>
                </defs>
                <g transform="matrix(7.5479133377 0 0 7.5267742739 320.0780870741 321.7025751457)" id="zVsIAOrVmNDwTG4GTbFsJ"  >
                    <path style={style} transform=" translate(-40, -40)" d="M 63.366 80 L 40 56.634 L 16.634 80 L 0 63.366 L 23.366 40 L 0 16.634 L 16.634 0 L 40 23.366 L 63.366 0 L 80 16.634 L 56.634 40 L 80 63.366 L 63.366 80 z" stroke-linecap="round" />
                </g>
            </svg>
        </div>
    )
}

export default CrossPattern