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

const Grid = ({ admins, setAdmins, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:5000/api/v1/admin/" + id)
            .then(({ data }) => {
                const newArray = admins.filter((admin) => admin.id !== id);

                setAdmins(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null)
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>User Name</Th>
                    <Th onlyWeb>Password</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {admins.map((item, i) => (
                    <Tr key={i}>
                        <Td width="20%">{item.username}</Td>
                        <Td width="20%" onlyWeb>
                            {item.password}
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