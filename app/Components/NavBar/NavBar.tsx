'use server';

import Image from 'next/image'
import LoginLinks from './LoginLinks';
import { getUser } from './actions';
import NavLinks from './NavLinks';
import UserDropdown from './UserDropdown';
import { logoutUser } from './actions';

export default async function NavBar() 
{   
    const userResponse = await getUser();
    let userProfile = null;

    if (userResponse.status === 200) {
        userProfile = await userResponse.json();
    }

    return (
        <nav className="navbar bg-dark text-white" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <Image 
                        className="d-inline-block align-text-top"
                        src="/logo.png" 
                        alt="site logo"
                        width="24"
                        height="24"/>
                    <span className="text-white"> WeightWise</span>
                </a>
                <NavLinks />
                {userProfile ? <UserDropdown username={userProfile.username} /> : <LoginLinks />}
            </div>
        </nav> 
    );
}