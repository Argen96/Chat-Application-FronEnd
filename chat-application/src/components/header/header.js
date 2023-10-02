import './style.css'
import { useNavigate } from "react-router-dom";

function Header (){
    const navigate = useNavigate();
    
    const goToHomePage = () => {
        navigate('/welcome');
    };

    return (
        <>
        <header className="custom-header">
            <h1 className="text-center custom-header-text" onClick={goToHomePage}>
                Argen Chat-App
            </h1>
        </header>
        </>
    );
}

export default Header;
