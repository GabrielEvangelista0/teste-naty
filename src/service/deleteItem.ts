import axios from "axios";

export default async function deleteItem(id: number, path: string) {
    console.log(id);
    try {
        await axios.delete(`https://api-deslocamento.herokuapp.com/api/v1/${path}/${id}`, {data: {id: id}});
        alert('Delete successful');
        location.reload()
    } catch (error) {
        console.log(error);
    }
}