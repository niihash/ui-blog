const API_BASE = 'http://localhost:8000';

function isServer() {
    return typeof window === 'undefined';
}

function getClientXsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

async function getServerCookies() {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();

    return cookieStore.getAll();
}

async function request(url, options = {}) {
    let headers = {
        'Accept': 'application/json',
        ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
    }

    let config = {
        ...options,
        headers,
    };

    if (isServer()) {
        // SERVER
        const cookieStore = await getServerCookies();

        const cookieHeader = cookieStore
            .map((c) => `${c.name}=${c.value}`)
            .join('; ');

        // get XSRF cookie
        const xsrf = cookieStore.find(c => c.name === 'XSRF-TOKEN')?.value;

        config.headers = {
            ...config.headers,
            cookie: cookieHeader,
            'X-XSRF-TOKEN': xsrf,
            'Origin': 'http://localhost:3000',
            'Referer': 'http://localhost:3000',
        };

        config.cache = 'no-store';

    } else {
        // CLIENT
        const token = getClientXsrfToken();

        config.headers = {
            ...config.headers,
            'X-XSRF-TOKEN': token,
        };

        config.credentials = 'include';
    }

    const res = await fetch(`${API_BASE}${url}`, config);

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        console.log(error);
        throw error;
    }

    return res.json().catch(() => ({}));
}

export async function getCsrfCookie() {
    await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });
}

export async function login({ email, password }) {
    await getCsrfCookie();

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    return request('/api/login', {
        method: 'POST',
        body: formData,
    });
}

export async function register({ name, email, password, password_confirmation }) {
    await getCsrfCookie();

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("password_confirmation", password_confirmation)

    return request('/api/register', {
        method: 'POST',
        body: formData,
    });
}

export async function logout() {
    await getCsrfCookie();

    return request('/api/logout', {
        method: 'POST',
    });
}

// User info

export async function getMe() {
    return request("/api/me", {
        method: "GET",
    });
}

// Public Articles

export async function getArticles() {
    return request('/api/articles', {
        method: 'GET',
    });
}

export async function getArticlesById(article) {
    return request(`/api/articles/${article}`, {
        method: 'GET',
    })
}

// Protected articles

export async function getMeArticles() {
    return request("/api/me/articles", { method: "GET" });
}

export async function getMeArticle(id) {
    return request(`/api/me/articles/${id}`, { method: "GET" });
}

export async function createMeArticle(article) {
    return request("/api/me/articles", {
        method: "POST",
        body: JSON.stringify(article),
    });
}

export async function updateMeArticle(id, article) {
    return request(`/api/me/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(article),
    });
}

export async function deleteMeArticle(id) {
    return request(`/api/me/articles/${id}`, {
        method: "DELETE",
    });
}
