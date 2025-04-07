const BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');


export function api(path, options = {}) {
    return fetch(`${BASE}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
    });
}
