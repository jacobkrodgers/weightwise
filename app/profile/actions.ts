'use server';

import { redirect } from 'next/navigation';
import { UserProfile } from '../../lib/types';
import { getUserProfile } from '../../model/userManager';

export async function getUser() : Promise<Response> {
    try{
        const userProfile = await getUserProfile();
        
        if (userProfile.status === 401) {
            redirect('/login');
        }
        else if (userProfile.status === 500) {
            throw new Error('Internal Server Error');
        }

        return userProfile;

    } catch (error) {
        redirect('/login');
    }

}