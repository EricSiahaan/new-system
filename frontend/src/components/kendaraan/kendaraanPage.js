import GlobalStyle from "../../styles/global"
import styled from "styled-components";
import Form from "./Form.js"
import Grid from "./Grid";
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

export default function Kendaraanpage() {
    const [kendaraans, setKendaraans] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getKendaraans = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/kendaraan/");
            setKendaraans(res.data.sort((a, b) => (a.carType > b.carType ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getKendaraans();
    }, [setKendaraans]);

    return (
        <>
            <Container>
                <Title>Daftar Kendaraan</Title>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getKendaraans={getKendaraans} />
                <Grid setOnEdit={setOnEdit} kendaraans={kendaraans} setKendaraans={setKendaraans} />
            </Container>
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
            <GlobalStyle />
        </>
    );
}