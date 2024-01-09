'use client';

import Link from 'next/link';

export default function LoginLinks() 
{
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link text-white" href="/login">Log In</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-white" href="/register">Register</Link>
            </li>
        </ul>
    );
}