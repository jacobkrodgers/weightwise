'use client';

export default function LoginLinks() 
{
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link text-white" href="/login">Log In</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-white" href="/register">Register</a>
            </li>
        </ul>
    );
}