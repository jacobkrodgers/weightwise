'use server';
import { UserProfile } from '../../../lib/types';
import { getUserProfile } from '../../../model/userManager';
import { logout } from '../../../model/sessionManager';

export async function getUser() : Promise<Response> {
    try{
        const userProfile = await getUserProfile();
        return userProfile;

    } catch (error) {
        return new Response('Internal Server Error', {status: 500});
    }

}

export async function logoutUser(): Promise<number> {
    try{
        const res = await logout();
        return res.status;
    }
    catch(error){
        return 500;
    }
}