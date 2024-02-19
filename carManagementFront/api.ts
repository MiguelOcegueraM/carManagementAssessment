import axios from 'axios';

const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/car');
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

const addData = async (newData: any) => {
    try {
        const response = await axios.post('http://localhost:3000/car', newData);
        return response.data
    } catch (error) {
        console.log('Error adding data:', error);
        throw error;
    }
}

const fetchItem = async (id: string | number) => {
    try {
        const response = await axios.get(`http://localhost:3000/car/${id}`);
        const item = await response.data;
        return item;
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error;
    }
}

const updateItem = async (newData: any, id: string | number) => {
    try {
        const response = await axios.put(`http://localhost:3000/car/${id}`, newData);
        return response.data
    } catch (error) {
        console.log('Error adding data:', error);
        throw error;
    }
}

const deleteData = async (id: string | number) => {
    await axios.delete(`http://localhost:3000/car/${id}`);
}
  
export { fetchData, deleteData, addData, fetchItem, updateItem };