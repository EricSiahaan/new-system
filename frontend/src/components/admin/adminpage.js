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

export default function Adminpage() {
    const [admins, setAdmins] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getAdmins = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/admin/");
            setAdmins(res.data.sort((a, b) => (a.username > b.username ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getAdmins();
    }, [setAdmins]);

    return (
        <>
            <Container>
                <Title>Daftar admins</Title>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getAdmins={getAdmins} />
                <Grid setOnEdit={setOnEdit} admins={admins} setAdmins={setAdmins} />
            </Container>
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
            <GlobalStyle />
        </>
    );
}