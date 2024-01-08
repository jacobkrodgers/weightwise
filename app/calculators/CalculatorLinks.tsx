'use client';

import { usePathname } from 'next/navigation'
import Link from 'next/link'

function checkIfActive(linkUrl: string): string {
    
    const pathname = usePathname();
    if (pathname === linkUrl)
        return "active";
    else
        return "";
}
export default function CalculatorLinks() {
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <Link
                    className={`nav-link ${checkIfActive("/calculators/target-date")}`} 
                    href="/calculators/target-date">Target Date Calculator</Link>
            </li>
            <li className="nav-item">
                <Link 
                    className={`nav-link ${checkIfActive("/calculators/caloric-intake")}`} 
                    href="/calculators/caloric-intake">Caloric Intake Calculator</Link>
            </li>
        </ul>
    )
}