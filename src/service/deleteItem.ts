import axios from "axios";

export default async function deleteItem(id: number) {
    console.log(id);
    try {
        await axios.delete(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`, {data: {id: id}});
        alert('Delete successful');
    } catch (error) {
        console.log(error);
    }
}