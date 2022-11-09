import GlobalStyle from "../../styles/global";
import styled from "styled-components";
import Form from "./Form.js";
import Grid from "./Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;


const Title = styled.h2``;

export default function Driverpage() {
    const [drivers, setDrivers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getDrivers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/driver/");
            setDrivers(res.data.sort((a, b) => (a.fullName > b.fullName ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getDrivers();
    }, [setDrivers]);

    return (
        <>
            <Container>
                <Title>Daftar Driver</Title>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getDrivers={getDrivers} />
                <Grid setOnEdit={setOnEdit} drivers={drivers} setDrivers={setDrivers} />
            </Container>
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
            <GlobalStyle />
        </>
    );
}