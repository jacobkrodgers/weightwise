import { cookies } from 'next/headers';
import { database } from '../lib/databaseClient';
import argon2 from 'argon2';
import { LoginDatabaseData } from '../lib/types';
import { redirect } from 'next/navigation';

/**
 * @name login
 * @description - Validates user credentials
 *              - Creates new session entry in the database and sets a sessionId cookie.
 * @param {string} emailOrUsername - email or username of the user
 * @param {string} password - password of the user
 */
export async function login(emailOrUsername: string, password: string): Promise<Response> {
    try {
        const cookieStore: any = cookies();

        // Get the current session id
        const currentSessionId: string = cookieStore.get('sessionId') ? cookieStore.get('sessionId').value : '';

        // Check if the user is already logged in
        if (await validateSession(currentSessionId)){
            await logout();
        };

        // Get the user's password hash
        const logoutData: LoginDatabaseData | null = await database.user.findFirst({
            where: {
                OR: [
                {email: emailOrUsername},
                {username: emailOrUsername}
                ]
            },
            select: {
                id: true,
                passwordHash: true
            }
        }) as LoginDatabaseData | null;

        // Check if the user exists
        if (logoutData === null) {
            return new Response('Invalid username or password', {status: 401});
        }

        // Check if the password is correct
        if (!await argon2.verify(logoutData.passwordHash, password)) {
            return new Response('Invalid username or password', {status: 401});
        }

        // Create a new session
        const sessionId = await database.session.create({
            data: {
                userId: logoutData.id,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 8) // 8 hours
            }
        });

        // Log the user in
        cookieStore.set('sessionId', sessionId.id);
        return new Response('Logged in successfully', {status: 200});

    } catch (error) {
        console.log(error)
        return new Response('Internal Server Error', {status: 500});
    }
}

/**
 * @name logout
 * @description - Deletes session entry from the database and removes the sessionId cookie.
 * @param {string} sessionId - Session Id to pull from the database.
 * @returns {void}
 */
export async function logout() : Promise<Response> {
    try {
        
        const cookieStore: any = cookies();
        const sessionId = cookieStore.get('sessionId') ? cookieStore.get('sessionId').value : '';
        await deleteExpiredSession(sessionId);
        cookieStore.set('sessionId', '');
        return new Response('Logged out successfully', {status: 200});
    } catch (error) {
        return new Response('Internal Server Error', {status: 500});
    }
}

/**
 * @name validateSession
 * @description - Checks if the session is 1) in the database and 2) not expired.
 *              - If the session is expired, user is logged out.
 * @param {string} sessionId - Session Id to pull from the database.
 * @returns {boolean}
 */
export async function validateSession(sessionId: string) {
    try {
        const session = await database.session.findFirst({
            where: {
                id: sessionId
            },
        });

        if (!session) {
            return false;
        }

        if (session.expires < new Date(Date.now())) {
            await logout();
            return false;
        }

        return session;

    } catch (error) {
        console.log(error)
    }
}

/**
 * @name deleteExpiredSession
 * @description - Deletes session entry from the database.
 * @param {string} sessionId - Session Id to pull from the database.
 * @returns {void}
 */
export async function deleteExpiredSession(sessionId: string) {
    try {
        await database.session.delete({
            where: {
                id: sessionId
            }
        });
    } catch (error) {
        console.log(error)
    }
}

/**
 * @name expireAllSessions
 * @description - Deletes all expired sessions from the database.
 * @returns {void}
 */
export async function expireAllSessions() {
    try{
        await database.session.deleteMany({
            where: {
                expires: {
                    lte: new Date(Date.now())
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

