'use server';

import { database } from '../../lib/databaseClient';
import { login } from '../../model/sessionManager';
import { RegistrationData } from '../../lib/types';
import { registrationSchema, 
    emailSchema, 
    usernameSchema, 
    nameSchema, 
    passwordSchema 
} from '../../lib/validation';
import { profanityFilter } from '../../lib/profanityFilter';
import argon2 from 'argon2';

export async function registerUser(formData: FormData): Promise<boolean> {
    try {
        // Package formData into a RegistrationData object
        let rd: RegistrationData = {
            email: formData.get('email')?.toString(),
            username: formData.get('username')?.toString(),
            firstName: formData.get('firstName')?.toString(),
            lastName: formData.get('lastName')?.toString(),
            password: formData.get('password')?.toString(),
        }
        
        // Validate the RegistrationData object
        const { error } = registrationSchema.validate(rd);
        if (error) {
            throw error;
        }

        // Hash the password
        rd.password = await argon2.hash(rd.password!);

        // Save the user to the database
        await database.user.create({
            data: {
                email: rd.email!,
                username: rd.username!,
                firstName: rd.firstName!,
                lastName: rd.lastName!,
                passwordHash: rd.password!,
            }
        });

        // Log the user in
        await login(rd.email!, rd.password!);
        return true;
        
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function validateEmail(email: string): Promise<any> {

    try {
        const emailExists = await database.user.findUnique({
            where: {
                email: email,
            }
        });

        if (emailExists) {
            return {status: 'is-invalid', message: 'Email already in use.'};
        } 
        else if (emailSchema.validate({email}).error) {
            return {status: 'is-invalid', message: 'Invalid email.'};
        }
        else {
            return {status: 'is-valid', message: 'Looks good!'};
        }

    } catch (error) {
        throw error;
    }
}

export async function validateUsername(username: string): Promise<any> {

    try {
        const userExists = await database.user.findUnique({
            where: {
                username: username,
            }
        });

        let validation = usernameSchema.validate({username});
        if (userExists) {
            return {status: 'is-invalid', message: 'Username already in use.'};
        }
        else if (profanityFilter.hasMatch(username)) {
            return {status: 'is-invalid', message: 'Username contains profanity.'};
        }
        else if (validation.error) {
            return {status: 'is-invalid', message: `${validation.error.message}`};
        }
        else {
            return {status: 'is-valid', message: 'Looks good!'};
        }

    } catch (error) {
        throw error;
    }
}

export async function validateName(name: string): Promise<any> {

    try {
        let validation = nameSchema.validate({name: name});
        if (validation.error) {
            return {status: 'is-invalid', message: `${validation.error.message}`};
        }
        else if (profanityFilter.hasMatch(name)) {
            return {status: 'is-invalid', message: 'Name contains profanity.'};
        }
        else {
            return {status: 'is-valid', message: 'Looks good!'};
        }

    } catch (error) {
        throw error;
    }
}

export async function validatePassword(password: string): Promise<any> {

    try {
        let validation = passwordSchema.validate({password: password});
        if (validation.error) {
            return {status: 'is-invalid', message: `${validation.error.message}`};
        }
        else {
            return {status: 'is-valid', message: 'Looks good!'};
        }

    } catch (error) {
        throw error;
    }
}