import '../cssDirectory/mainPage.css'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom'
import JoinCreateRoom from "./join_createRoom.jsx";


function MainPage(){

    return (  <div className="mainPageMainContainer">
            <VolumeUpIcon className="soundButtonHomePage"/>
            <MenuIcon className="reorderButtonHomePage" to="/" />

            <div className="mainPageButtonContainer">
                <Link to="/gameFlow" className="buttonHomePage">Let's get started</Link>
                <Link to="/playersName">Add Players</Link>
            </div>
            <div className="footerLinks">
                <InstagramIcon className="footerIcon instagram"/>
                <FacebookIcon className="footerIcon facebook"/>
                <LinkedInIcon className="footerIcon linkden"/>
                <XIcon className="footerIcon x"/>

            </div>
    </div>

    )

}

export default MainPage;