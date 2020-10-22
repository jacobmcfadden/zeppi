import * as React from "react";
import './LoadingPlanes.scss';

function LoadingPlanes(props) {
    const isLoading = true;
    const [currentPlane, setCurrentPlane] = React.useState(1);
    
    React.useEffect(() => {
      let interval = null;
    if (isLoading && currentPlane < 5) {
      interval = setInterval(() => {
        setCurrentPlane(currentPlane => currentPlane + 1);
      }, 800);
    } else if (isLoading && currentPlane > 4) {
      setCurrentPlane(1);
    } else if (!isLoading && currentPlane !== 1) {
      setCurrentPlane(1);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading, currentPlane, setCurrentPlane]);

    return (
        <svg 
            x="0px" 
            y="0px" 
            viewBox="0 0 399.9 222.2" 
            className={'bobble'}
            {...props}
        >
        <style />
        <defs>
        </defs>
        <g className={isLoading === true ? "showAll" : ""}>
            {/* Main Red Large Front Plane */}
            <g className={currentPlane ? "showAll" : ""}>
                <path id="plane1" className={currentPlane === 1 ? "red-secondary" : "red-secondary"} d="M210.1,80.5c0,0-10.8,39.7-8.9,53.4L399.9,0L392,2.8L210.1,80.5z"/>
                <polygon id="plane1" className={currentPlane === 1 ? "red-primary" : "red-primary"} points="161.2,50.5 399.9,0 210.3,83.7 		"/>
                <path id="plane1" className={currentPlane === 1 ? "red-dark" : "red-dark"} d="M231.1,98.6c-3,8.5-29.9,35.4-29.9,35.4l54.4-26.4C255.6,107.6,237,95.8,231.1,98.6z"/>
                <polygon id="plane1" className={currentPlane === 1 ? "red-primary" : "red-primary"} points="231.1,98.6 399.9,0 286.1,138.7 		"/>
            </g>
            {/* Front Right White Plane */}
            {/* Middle Left White Plane */}
            <g className={currentPlane ? "showAll" : ""}>
                <path id="plane4" className={currentPlane === 4 ? "red-secondary" : "white-secondary"} d="M47.8,111c0,0-3.2,13.7-2.4,18.4l66.3-48.2l-2.7,1.1L47.8,111z"/>
                <polygon id="plane4" className={currentPlane === 4 ? "red-primary" : "white-primary"} points="30.8,101.3 111.7,81.1 48,112 		"/>
                <path id="plane4" className={currentPlane === 4 ? "red-dark" : "white-dark"} d="M55.2,116.9c-0.9,3-9.8,12.5-9.8,12.5l18.3-9.7C63.7,119.6,57.2,115.8,55.2,116.9z"/>
                <polygon id="plane4" className={currentPlane === 4 ? "red-primary" : "white-primary"} points="55.2,116.9 111.7,81.1 74.5,129.9 		"/>
            </g>
            {/* Middle Right White Plane */}
            <g className={currentPlane ? "showAll" : ""}>
                <path id="plane2" className={currentPlane === 2 ? "red-secondary" : "white-secondary"} d="M157.2,197.8c0,0-4.7,16.3-4,22l82.6-54.1l-3.3,1.1L157.2,197.8z"/>
                <polygon id="plane2" className={currentPlane === 2 ? "red-primary" : "white-primary"} points="137.2,185.1 235.9,165.6 157.3,199.1 		"/>
                <path id="plane2" className={currentPlane === 2 ? "red-dark" : "white-dark"} d="M165.8,205.3c-1.3,3.5-12.5,14.4-12.5,14.4l22.6-10.6C175.8,209.2,168.2,204.2,165.8,205.3z"/>
                <polygon id="plane2" className={currentPlane === 2 ? "red-primary" : "white-primary"} points="165.8,205.3 235.9,165.6 188.2,222.2 		"/>
            </g>
            {/* Plane at the Very Back Small White */}
            <g className={currentPlane ? "showAll" : ""}>
                <path id="plane3" className={currentPlane === 3 ? "red-secondary" : "white-secondary"} d="M19.5,189.8c0,0-4,15.7-3.2,21.1l77.5-54.2l-3.1,1.2L19.5,189.8z"/>
                <polygon id="plane3" className={currentPlane === 3 ? "red-primary" : "white-primary"} points="0,178.3 93.9,156.7 19.6,191 		"/>
                <path id="plane3" className={currentPlane === 3 ? "red-dark" : "white-dark"} d="M27.9,196.8c-1.1,3.4-11.6,14.2-11.6,14.2l21.3-10.8C37.6,200.2,30.2,195.6,27.9,196.8z"/>
                <polygon id="plane3" className={currentPlane === 3 ? "red-primary" : "white-primary"} points="27.9,196.8 93.9,156.7 49.9,212.3 		"/>
            </g>
        </g>
        </svg>
    );
}

export default LoadingPlanes;