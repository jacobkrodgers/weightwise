'use client';

import { useEffect } from "react";
import { logoutUser } from "./actions";
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function UserDropdown(props:any) {

    const router = useRouter()

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      }, []);

    const logout = async () => {
        await logoutUser();
    }

    return(
        <div className="dropdown">
            <button className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {props.username}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" href="/login" onClick={logout}>Log Out</Link></li>
            </ul>
        </div>
    )
}