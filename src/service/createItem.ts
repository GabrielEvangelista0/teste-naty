import axios from "axios"

export default async function createItem(url: string, formData: object) {
    try {
        const res = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        alert('Item criado')
      } catch (error) {
        alert(error)
      }
}