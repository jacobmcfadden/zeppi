import React, {useEffect, useState, useRef} from 'react';
import '../styling/components/Welcome.scss';
import {Link} from 'react-router-dom'
import CloudSpan from '../assets/Clouds/CloudSpan/CloudSpan';
import BottomCloudSpan from '../assets/Clouds/BottomCloudSpan/BottomCloudSpan';
import LoadingPlanes from '../assets/Planes/LoadingPlanes/LoadingPlanes';
import CaretDownIcon from '../assets/icons/systemIcons/CaretDownIcon';
import CaretUpIcon from '../assets/icons/systemIcons/CaretUpIcon';
import ZeppiCloud from '../assets/ZeppiLogo/ZeppiCloud/ZeppiCloud';
import Zeppi from '../assets/ZeppiLogo/Zeppi/Zeppi';
import MapArt from '../assets/MapArt/MapArt';
import SingleCloud from '../assets/Clouds/SingleCloud/SingleCloud';
import DropIcon from '../assets/DropIcon/DropIcon';
import LootIcon from '../assets/LootIcon/LootIcon';
import CloseIcon from '../assets/icons/systemIcons/CloseIcon';
import CurrentLocation from '../assets/CurrentLocation/CurrentLocation';
import AddDropIcon from '../assets/AddDropIcon/AddDropIcon';
import ExpandAltIcon from '../assets/icons/systemIcons/ExpandAltIcon';
import AccountIcon from '../assets/icons/systemIcons/AccountIcon'
import AddFriendIcon from '../assets/AddFriendIcon/AddFriendIcon';
import ZeppiMap from "../assets/maps/ZeppiMapExample.png";
import BorderRadius from '../assets/BorderRadius/BorderRadius';
import Envelope from '../assets/Envelope/Envelope';
import CSSIcon from '../assets/Technologies/CSSIcon';
import ExpressIcon from '../assets/Technologies/ExpressIcon';
import GitHubIcon from '../assets/Technologies/GitHubIcon';
import HerokuIcon from '../assets/Technologies/HerokuIcon';
import HTMLIcon from '../assets/Technologies/HTMLIcon';
import JavascriptIcon from '../assets/Technologies/JavascriptIcon';
import NodeJSIcon from '../assets/Technologies/NodeJSIcon';
import NPMIcon from '../assets/Technologies/NPMIcon';
import PostgreSQLIcon from '../assets/Technologies/PostgreSQLIcon';
import ReactJSIcon from '../assets/Technologies/ReactJSIcon';
import ReduxIcon from '../assets/Technologies/ReduxIcon';
import SassIcon from '../assets/Technologies/SassIcon';
import SidePlane from '../assets/SidePlane/SidePlane';


function useWidth() {
  const [width, setWidth] = useState(0);

  
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWidth(window.innerWidth);
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return width;
}

const Welcome = () => {
    const width = useWidth();
    const animatedSection = useRef(null);
    const bannerSection = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [navBtnColor, setNavBtnColor] = useState('btn-lg-white');
    const [navLogoColor, setNavLogoColor] = useState('color-white');
    const [isHidden, setIsHidden] = useState(true);
    const [currentLoot, setCurrentLoot] = useState(1);
    const [currentDrops, setCurrentDrops] = useState(1);
    
    useEffect(() => {
      let interval = null;
    if (currentLoot < 9) {
      interval = setInterval(() => {
        setCurrentLoot(currentLoot => currentLoot + 1);
      }, 1600);
    } else {
      setCurrentLoot(1);
    }
    return () => clearInterval(interval);
  }, [currentLoot, setCurrentLoot]);

    useEffect(() => {
        let interval = null;
        if (currentDrops < 9) {
        interval = setInterval(() => {
            setCurrentDrops(currentDrops => currentDrops + 1);
        }, 2600);
        } else {
        setCurrentDrops(1);
        }
        return () => clearInterval(interval);
    }, [currentDrops, setCurrentDrops]);

    const listenScrollEvent = e => {
        if(animatedSection.current) {
            if (window.scrollY > (bannerSection.current.offsetTop + bannerSection.current.offsetHeight) && window.scrollY < animatedSection.current.offsetTop) {
                setIsHidden(true);
                setNavBtnColor('btn-lg-blue')
                setNavLogoColor('color-blue')
            } else if(window.scrollY > animatedSection.current.offsetTop && (window.scrollY + window.innerHeight) <= (animatedSection.current.offsetTop + animatedSection.current.offsetHeight)) {
                setIsHidden(false);
                setNavBtnColor('btn-lg-red')
                setNavLogoColor('color-white')
            } else if(window.scrollY > (animatedSection.current.offsetTop + animatedSection.current.offsetHeight)) {
                setIsHidden(true);
                setNavBtnColor('btn-lg-red')
                setNavLogoColor('color-blue')
            } else {
                setIsHidden(true)
                setNavBtnColor('btn-lg-red')
                setNavLogoColor('color-white')
            }
        }
      }
    
      useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
      }, [])

      return (
        <div className="Welcome">
            <div className="nav-container">
                <div className="nav-bar">
                {(width > 767) ? <Zeppi className={`welcome-logo ${navLogoColor}`}/> : null}
                    <div className={`header-buttons ${!isOpen ? 'hidden-md-down' : ''}`}>
                        <div className="container__row justify-end">
                        {(width > 767) ? <Link to="/login" className={`login-button ${navBtnColor}`}>LOGIN</Link> : <Link to="/login" className={`login-button btn-lg-white`}>LOGIN</Link>}
                        {(width > 767) ? <Link to="/signup" className={`signup-button ${navBtnColor}`}>SIGNUP</Link> : <Link to="/signup" className={`signup-button btn-lg-white`}>SIGNUP</Link>}
                        </div>
                    </div>
                </div>
                <div className="welcome-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <CaretDownIcon className="welcome-toggle-icon"/> : <CaretUpIcon className="welcome-toggle-icon"/>}
                </div>
            </div>
            {/* TOP BANNER */}
            <div className="preview-container">
                <div className="container__row">
                   {(width > 767) ? null : <ZeppiCloud className="welcome-logo"/>}
                </div>
                <div className="GraphicBanner" ref={bannerSection}>
                    <div className="container__row ">
                    {(width > 767) ? <LoadingPlanes className="paper-planes"/> : null}
                    </div>
                </div>
            </div>
            {/* INTRO SECTION */}
            <div className="preview-container">
                <CloudSpan className="CloudSpan"/>
                <div className="introSection">
                    <div className="container">
                        <div className="mainFeature m-h-1">
                            <div className="mainFeatureImage">
                                <MapArt width="100%"/>
                            </div>
                            <div className="mainFeatureHeadline">
                                <h1 className="align-text m-b-1">Location Based Messaging</h1>
                            </div>
                            <div className="mainFeatureParagraph">
                                <p className="align-text m-b-3">
                                    Welcome to Zeppi — a location based messaging app, conceived to help promote 
                                    community interactivity. We’ve combined messaging and Geolocation technologies 
                                    so you and your friends can explore nearby neighborhoods and have a little friendly 
                                    competition while you’re at it.
                                </p>
                            </div>
                        </div>
                        <div className="mainFeature m-v-3 m-h-1">
                            <div className="mainFeatureImage m-b-2">
                                <Envelope  width="75%" className="m-h-1"/>
                            </div>
                            <div className="mainFeatureHeadline">
                                <h1 className="align-text m-b-1">How does it work?</h1>
                            </div>
                            <div className="mainFeatureParagraph">
                                <p className="align-text m-b-3">
                                You can send a message to your friends by pinning that  
                                message (drop) to a specific location anywhere in the world. Friends will see messages 
                                that they have received (loot) within the app. They can then go retreave those messages but 
                                only when they are within 40 meters of the message’s location. 
                                Pick a favorite restaurant, or a new coffee shop you would like to try!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomCloudSpan className="CloudSpan"/>
            </div>
            {/* FEATURES HOW TO SECTION */}
            <div className="preview-container">
                <div className="CloudBreak" ref={animatedSection}>
                    <div className="fullPageAnimation">
                        <div className="sectionTitle">
                            <h1 className="headline-white align-text">Prepare for takeoff!</h1>
                        </div>
                        <div className={isHidden ? `movingClouds hidden` : `movingClouds show`}>
                            <div className="moveCloud-1">
                                <SingleCloud/>
                            </div>
                            <div className="moveCloud-2">
                                <SingleCloud/>
                            </div>
                            <div className="moveCloud-4">
                                <SingleCloud/>
                            </div> 
                            <div className="moveCloud-7">
                                <SingleCloud/>
                            </div>
                            <div id="trigger-drop" className="flyingPlane">
                                <SidePlane width="100%"/>
                            </div>
                            <div className="moveCloud-10">
                                <SingleCloud/>
                            </div>
                        </div>
                    </div> 
                    <div className="messageBoxContainer">
                        <div data-aos="fade-right" data-aos-anchor="#trigger-drop" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="flip-left" id="card1" data-aos-anchor="#trigger-drop" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                            <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">USER LOCATION</h3>
                                            <p className="messageBoxText">Select the user location icon to see where you are in real time!</p>
                                        </div>
                                        <CurrentLocation style={{marginTop: "1rem"}} height="38%" width="38%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-anchor="#card1" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="zooom-in" id="card2" data-aos-anchor="#card1" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                                <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">LOOT RADIUS</h3>
                                            <p className="messageBoxText">The blue halo around your location is the pickup radius, or the zone where you can collect available loot!</p>
                                        </div>
                                        <BorderRadius style={{marginTop: "1rem"}} color={"#ffffff"} width="40%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-right" data-aos-anchor="#card2" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="flip-left" id="card3" data-aos-anchor="#card2" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                            <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">MESSAGE DROPS</h3>
                                            <p className="messageBoxText">Red paper planes represent the drops you have made for your friends, which are waiting to be collected.</p>
                                        </div>
                                        <DropIcon style={{marginTop: "1rem"}} width="33%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-anchor="#card3" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="flip-right" id="card4" data-aos-anchor="#card3" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                            <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">ADD DROPS</h3>
                                            <p className="messageBoxText">You can send drops to friends easily directly from the map or the "My Drops" dashboard.</p>
                                        </div>
                                        <AddDropIcon style={{marginTop: "1rem"}} color="#ff3c3c" height="40%" width="40%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-right" data-aos-anchor="#card4" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="zoom-out" id="card5" data-aos-anchor="#card4" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                            <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">LOOT MESSAGES</h3>
                                            <p className="messageBoxText">Gold balloons represent the loot your friends have left for you.</p>
                                        </div>
                                        <LootIcon style={{marginTop: "1rem"}} width="40%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-anchor="#card5" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="flip-left" id="card6" data-aos-anchor="#card5" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                            <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">CLAIM LOOT</h3>
                                            <p className="messageBoxText">You can claim loot on the map by clicking the claim loot button inside the loot info popup or the "My Loot" dashboard.</p>
                                        </div>
                                        <ExpandAltIcon style={{marginTop: "1rem"}} color="#FF3C3C" height="40%" width="40%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-right" data-aos-anchor="#card6" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="flip-right" id="card7" data-aos-anchor="#card6" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                            <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">THE MAP</h3>
                                            <p className="messageBoxText">Use the map to pick your next drop coordinates and see the loot waiting for you around town!</p>
                                        </div>
                                        <div>
                                            <img className="zeppiMapExample" src={ZeppiMap} alt="ZeppiMapExample"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-anchor="#card7" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="zoom-in" id="card8" data-aos-anchor="#card7" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                            <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">HIGH SCORE!</h3>
                                            <p className="messageBoxText">The more drops you make for friends and loot you collect around town, the higher your score! Compete with friends as you run errands and explore your community.</p>
                                        </div>
                                        <div className="m-t-1">
                                            <div className="container__row justify-between">
                                                <div className="half-box">
                                                    <div className="highlight-container">
                                                        <div className="highlight-type">Active</div>
                                                        <div className="highlight-count highlight-red">{14 - currentDrops}</div>
                                                        <div className="highlight-focus">Drops</div>
                                                    </div>
                                                </div>
                                                <div className="half-box">
                                                    <div className="highlight-container">
                                                        <div className="highlight-type">Total</div>
                                                        <div className="highlight-count highlight">{103 + currentDrops}</div>
                                                        <div className="highlight-focus">Drops</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="m-t-2">
                                            <div className="container__row justify-between">
                                                <div className="half-box">
                                                    <div className="highlight-container">
                                                        <div className="highlight-type">Pending</div>
                                                        <div className="highlight-count highlight-warning">{24 - currentLoot}</div>
                                                        <div className="highlight-focus">Loot</div>
                                                    </div>
                                                </div>
                                                <div className="half-box">
                                                    <div className="highlight-container">
                                                        <div className="highlight-type">Claimed</div>
                                                        <div className="highlight-count highlight">{56 + currentLoot}</div>
                                                        <div className="highlight-focus">Loot</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-right" data-aos-anchor="#card8" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="flip-left" id="card9" data-aos-anchor="#card8" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                                <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">FRIENDS</h3>
                                            <p className="messageBoxText">First things first: Add your friends by searching for their username and sending a request. The more, the merrier!</p>
                                        </div>
                                        <div className="accountIcon" fill="#FFFFFF">
                                            <AccountIcon className="m-h-auto" color="#FFFFFF"  height="65%" width="65%"/>
                                        </div>
                                    </div>
                                </div>                        
                            </div> 
                        </div>
                        <div data-aos="fade-left" data-aos-anchor="#card9" data-aos-anchor-placement="bottom-top">
                            <div className="container__row justify-center">
                                <div className="item" data-aos="zoom-out" id="card10" data-aos-anchor="#card9" data-aos-anchor-placement="bottom-top">
                                    <div className="messageFocus">
                                        <div className="messageBox">
                                            <div className="messageBoxClose">
                                                <CloseIcon width="2.5rem" height="2.5rem"/>
                                            </div>
                                            <h3 className="messageBoxTitle">ADD FRIENDS</h3>
                                            <p className="messageBoxText">Add your friends simply by clicking the add friend button and searching their username.</p>
                                        </div>
                                        <AddFriendIcon style={{marginTop: "1rem"}} color="#FF3C3C" height="40%" width="40%"/>
                                    </div>
                                </div>                        
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
            {/* FOOTER */}
            <div className="preview-container">
            <CloudSpan className="CloudSpan"/>
                <div className="techUsed">
                    <div className="container">
                        <div className="container__col-24">
                            <div className="container__row">
                                <div className="techTitleContainer">
                                    <h1 className="techTitle subtitle-red align-text">Technologies Used</h1>
                                </div>
                                <div className="techIconContainer">
                                    <CSSIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <ExpressIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <GitHubIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <HerokuIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <HTMLIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <JavascriptIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <NodeJSIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <NPMIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <PostgreSQLIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <ReactJSIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <ReduxIcon className="techIcon"/>
                                </div>
                                <div className="techIconContainer">
                                    <SassIcon className="techIcon"/>
                                </div>
                                <div className="techTitleContainer">
                                    <ZeppiCloud className="footerLogo"/>
                                </div>
                                <div className="footerCaptionContainer">
                                <h1 className="footerCaption body-red align-text m-b-3">Copyright 2020. All rights reserved.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;