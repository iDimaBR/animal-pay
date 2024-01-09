import { useForm } from "react-hook-form";
import { useAuth } from '../../contexts/AuthContext';
import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import PetSection from "../../components/PetSection/PetSection";
import ShelterSection from "../../components/ShelterSection/ShelterSection";
import AboutSection from "../../components/About/About";
import WorkSection from "../../components/WorkSection/WorkSection";

export interface LoginData {
    cpf: string;
    password: string;
}

export const HomePage = () => { 
    
    const navigate = useNavigate();

    return (
        <div className="App">
            <Navbar />
            <Banner />
            <PetSection />
            <ShelterSection />
            <AboutSection />
            <WorkSection />
        </div>
      );
}