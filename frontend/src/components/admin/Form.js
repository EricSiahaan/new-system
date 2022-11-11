import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";
import axios from 'axios';


const FormContainer = styled.form`
width: auto;
height: auto;
display: flex;
align-items: flex-end;
gap: 10px;
flex-wrap: wrap;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
`;


const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 150px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getAdmins, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const admin = ref.current;

            admin.username.value = onEdit.username;
            admin.password.value = onEdit.password;

            // admin.username.value = onEdit.username;
            // admin.password = onEdit.password;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const admin = ref.current;

        if (
            !admin.username.value ||
            !admin.password.value
        ) {
            return toast.warn("Tidak Berhasil")
        }

        if (onEdit) {
            await axios
                .put("http://localhost:5000/api/v1/admin/" + onEdit.id, {
                    username: admin.username.value,
                    password: admin.password.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:5000/api/v1/admin/register", {
                    username: admin.username.value,
                    password: admin.password.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data))
        }

        admin.username.value = "";
        admin.password.value = "";

        setOnEdit(null);
        getAdmins();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>User Name</Label>
                <Input name="username" />
            </InputArea>
            <InputArea>
                <Label>Password</Label>
                <Input name="password" />
            </InputArea>

            <Button type="submit">SAVE</Button>
        </FormContainer>
    )
}

export default Form