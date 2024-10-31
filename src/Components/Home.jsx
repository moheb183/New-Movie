import { Container, } from 'react-bootstrap';
import "../Css/Home.css"
import Background from "../Components/Background"
import Slider from "../Components/Slider"




export default function Home() {
    return (

        <main>

            <Container className=" main-con  rounded-2 " container-fluid >
                <Background />
                <Slider/>
            </Container>
        </main>

    )
}