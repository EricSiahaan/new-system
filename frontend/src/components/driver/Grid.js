import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
width: 100%;
background-color: #fff;
padding: 30px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
max-width: 1120px;
margin: 10px auto;
gap: 10px;
word-break:auto;
`;


export const Thead = styled.thead`
`;

export const Tbody = styled.tbody`
`;

export const Tr = styled.tr`
width: 100%
padding: 30px;
word-break:auto;
`;


export const Th = styled.th`
text-align: start;
border-bottom: inset;
padding-bottom: 20px;
word-break:auto;

@media (max-width: 500px) {
  ${(props) => props.onlyWeb && "display: none"}
}
`;


export const Td = styled.td`
padding-top: 15px;
text-align: ${(props) => (props.alignCenter ? "center" : "start")};
width: ${(props) => (props.width ? props.width : "auto")};

@media (max-width: 500px) {
  ${(props) => props.onlyWeb && "display: none"}
}
`;

const Grid = ({ drivers, setDrivers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:5000/api/v1/driver/" + id)
            .then(({ data }) => {
                const newArray = drivers.filter((driver) => driver.id !== id);

                setDrivers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null)
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Full Name</Th>
                    <Th>KTP</Th>
                    <Th>Phone Number</Th>
                    <Th>Nama Bank</Th>
                    <Th onlyWeb>Nomor Rek Bank</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {drivers.map((item, i) => (
                    <Tr key={i}>
                        <Td width="20%">{item.fullName}</Td>
                        <Td width="20%">{item.ktp}</Td>
                        <Td width="20%">{item.phoneNumber}</Td>
                        <Td width="20%">{item.bankAccountName}</Td>
                        <Td width="20%" onlyWeb>
                            {item.bankAccountNumber}
                        </Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;