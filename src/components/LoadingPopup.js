import React from 'react';
import LoadingPlanes from '../assets/Planes/LoadingPlanes/LoadingPlanes';


function LoadingPopup(props) {
    const {messageFound} = props;
    // const [messageFound, setMessageFound] = useState(false);
    return (
        <div className="LoadingPopup">
            <div className="popup-container">
                <div className="flex justify-center">
                    <LoadingPlanes width="15rem" height="15rem"/>
                </div>
                <div className="flex justify-center">
                    {messageFound ? 
                        <p className="phrase-white m-v-2 m-r-1">Checking your location...</p>
                    :   <p className="phrase-white m-v-2 m-r-1">Rerouting!</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoadingPopup;