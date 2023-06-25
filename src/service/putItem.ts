import axios from "axios"

export default async function putItem(url: string, formData: object){
    try {
        await axios.put(url, formData)
        alert("Item editado")
    } catch (error) {
        alert(error)
    }
}