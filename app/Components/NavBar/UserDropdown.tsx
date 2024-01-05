'use client';

import { useEffect } from "react";
import { logoutUser } from "./actions";
import { useRouter } from 'next/navigation'

export default function UserDropdown(props:any) {

    const router = useRouter()

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      }, []);

    const logout = async () => {
        try{

            const status = await logoutUser();
            if (status === 200)
                router.replace('/login');

        } catch (err) {
            throw err;
        }
    }

    return(
        <div className="dropdown">
            <button className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {props.username}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                <li><a className="dropdown-item" onClick={logout}>Log Out</a></li>
            </ul>
        </div>
    )
}