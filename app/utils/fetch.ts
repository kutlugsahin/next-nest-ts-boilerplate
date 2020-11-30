const API_BASE = '/api';
import Router from 'next/router';

function getUrl(url: string) {
    return `${API_BASE}${url}`;
}

async function doPost(url: string, body: any) {
    return fetch(getUrl(url), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
}

async function doGet(url: string) {
    return fetch(getUrl(url), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


const handleResponse = async <T>(request: () => Promise<Response>) => {
    const response = await request();

    if (response.status >= 200 && response.status < 300) {
        const repsonseType = response.headers.get('Content-Type');

        if (repsonseType.indexOf('application/json') > -1) {
            return await response.json() as T;
        }

        return await response.text();
    }

    if (response.status === 401) {
        try {
            const errResponse = await response.json();

            console.log(errResponse);

            if (errResponse.message === 'TokenExpiredError') {
                const token = localStorage.getItem('refreshToken');

                if (token) {
                    const { refreshToken } = await doPost('/auth/refreshToken', {
                        token,
                    }).then(p => p.json() as Promise<{ refreshToken: string }>);

                    if (refreshToken) {
                        localStorage.setItem('refreshToken', refreshToken);
                        return handleResponse(request);
                    }

                }
            }
        } catch (error) {
            
        }
    }

    Router.replace('/login');
    // location.href = '/login';
}

export const get = async <T>(url: string) => {
    const request = () => doGet(url);
    return handleResponse<T>(request);
}

export const post = async <T>(url: string, body: any) => {
    const request = () => doPost(url, body);
    return handleResponse<T>(request);
}