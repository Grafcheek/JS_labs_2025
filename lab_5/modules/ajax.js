class Ajax {
    get(url, callback) {
        console.log('GET request to:', url)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            console.log('GET readyState:', xhr.readyState)
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    post(url, data, callback) {
        console.log('POST request to:', url)
        console.log('POST data:', data)
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            console.log('POST readyState:', xhr.readyState)
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    put(url, data, callback) {
        console.log('PUT request to:', url)
        console.log('PUT data:', data)
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            console.log('PUT readyState:', xhr.readyState)
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    delete(url, callback) {
        console.log('DELETE request to:', url)
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            console.log('DELETE readyState:', xhr.readyState)
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    _handleResponse(xhr, callback) {
        try {
            console.log('Response status:', xhr.status)
            console.log('Response text:', xhr.responseText)
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax(); 