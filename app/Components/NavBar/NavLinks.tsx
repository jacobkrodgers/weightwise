'use client';

import { useEffect } from "react";

export default function NavLinks() {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      }, []);

    return(
        <div className="dropdown">
            <button className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Calculators
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Target Date</a></li>
                <li><a className="dropdown-item" href="#">Calorie Intake</a></li>
            </ul>
        </div>
    )
}