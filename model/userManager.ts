import { UserProfile } from '../lib/types';
import { cookies } from 'next/headers';
import { validateSession } from './sessionManager';
import { database } from '../lib/databaseClient';

export async function getUserProfile() : Promise<Response> {
    try{
        const cookieStore: any = cookies();

        const sessionId: string = cookieStore.get('sessionId') ? cookieStore.get('sessionId').value : '';
        const sessionData = await validateSession(sessionId);
        if (!sessionData) {
            return new Response('Unauthorized', {status: 401});
        }

        const user: UserProfile = await database.user.findUnique({
            where: {
                id: sessionData.userId
            }
        }) as UserProfile;

        return new Response(JSON.stringify(user), {status: 200});
        
    } catch (error) {
        return new Response('Internal Server Error', {status: 500});
    }

}