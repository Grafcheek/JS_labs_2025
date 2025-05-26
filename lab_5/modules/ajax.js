class Ajax {
    async get(url) {
        console.log('GET request to:', url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('GET response:', data);
            return { data, status: response.status };
        } catch (error) {
            console.error('GET error:', error);
            throw error;
        }
    }

    async post(url, data) {
        console.log('POST request to:', url);
        console.log('POST data:', data);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log('POST response:', responseData);
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('POST error:', error);
            throw error;
        }
    }

    async put(url, data) {
        console.log('PUT request to:', url);
        console.log('PUT data:', data);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log('PUT response:', responseData);
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('PUT error:', error);
            throw error;
        }
    }

    async delete(url) {
        console.log('DELETE request to:', url);
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log('DELETE response:', data);
            return { data, status: response.status };
        } catch (error) {
            console.error('DELETE error:', error);
            throw error;
        }
    }
}

export const ajax = new Ajax(); 