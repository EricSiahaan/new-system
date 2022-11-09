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

const Form = ({ getDrivers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const driver = ref.current;

            driver.fullName.value = onEdit.fullName;
            driver.ktp.value = onEdit.ktp;
            driver.phoneNumber.value = onEdit.phoneNumber;
            driver.bankAccountName.value = onEdit.bankAccountName;
            driver.bankAccountNumber.value = onEdit.bankAccountNumber;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const driver = ref.current;

        if (
            !driver.fullName.value ||
            !driver.ktp.value ||
            !driver.phoneNumber.value ||
            !driver.bankAccountName.value ||
            !driver.bankAccountNumber.value
        ) {
            return toast.warn("Tidak Berhasil")
        }

        if (onEdit) {
            await axios
                .put("http://localhost:5000/api/v1/driver/update/" + onEdit.id, {
                    fullName: driver.fullName.value,
                    ktp: driver.ktp.value,
                    phoneNumber: driver.phoneNumber.value,
                    bankAccountName: driver.bankAccountName.value,
                    bankAccountNumber: driver.bankAccountNumber.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:5000/api/v1/driver/new", {
                    fullName: driver.fullName.value,
                    ktp: driver.ktp.value,
                    phoneNumber: driver.phoneNumber.value,
                    bankAccountName: driver.bankAccountName.value,
                    bankAccountNumber: driver.bankAccountNumber.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        driver.fullName.value = "";
        driver.ktp.value = "";
        driver.phoneNumber.value = "";
        driver.bankAccountName.value = "";
        driver.bankAccountNumber.value = "";

        setOnEdit(null);
        getDrivers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Full Name</Label>
                <Input name="fullName" />
            </InputArea>
            <InputArea>
                <Label>KTP</Label>
                <Input name="ktp" />
            </InputArea>
            <InputArea>
                <Label>Nomor Telephone</Label>
                <Input name="phoneNumber" />
            </InputArea>
            <InputArea>
                <Label>Nama Bank</Label>
                <Input name="bankAccountName" />
            </InputArea>
            <InputArea>
                <Label>Nomor Rekening</Label>
                <Input name="bankAccountNumber" />
            </InputArea>


            <Button type="submit">SAVE</Button>
        </FormContainer>
    )
}

export default Form