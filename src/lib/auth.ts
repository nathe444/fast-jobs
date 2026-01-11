'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = 'admin123'; // Hardcoded for MVP as requested
const COOKIE_NAME = 'admin_session';

export async function login(formData: FormData) {
    const password = formData.get('password');

    if (password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        redirect('/admin');
    } else {
        return { error: 'Invalid password' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect('/admin/login');
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has(COOKIE_NAME);
}
