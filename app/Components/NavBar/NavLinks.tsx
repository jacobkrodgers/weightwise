'use client';

import { useEffect } from "react";
import Link from 'next/link';

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
                <li><Link className="dropdown-item" href="/calculators/target-date">Target Date</Link></li>
                <li><Link className="dropdown-item" href="/calculators/caloric-intake">Caloric Intake</Link></li>
            </ul>
        </div>
    )
}