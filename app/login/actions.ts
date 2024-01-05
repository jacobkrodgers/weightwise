'use server';

import { login, logout } from '../../model/sessionManager';
import { LoginInputData } from '../../lib/types';
import { loginSchema, requiredInputSchema } from '../../lib/validation';

export async function loginUser(formData: FormData): Promise<number> {
    
        // Package formData into a LoginData object
        let ld: LoginInputData = {
            emailOrUsername: formData.get('emailOrUsername')?.toString(),
            password: formData.get('password')?.toString(),
        }
        
        // Validate the RegistrationData object
        const { error } = loginSchema.validate(ld);
        if (error) {
            throw error;
        }

        // Log the user in
        const res = await login(ld.emailOrUsername!, ld.password!);
        return (res.status);
}

export async function logoutUser(): Promise<any> {
    try {
        await logout();
    } catch (error) {
        console.log(error);
    }
}

export async function validateInput(input: string): Promise<any> {

    try {
        if (requiredInputSchema.validate({input}).error) {
            return {status: 'is-invalid', message: 'Cannot be empty.'};
        }
        else {
            return {status: 'is-valid', message: 'Looks good!'};
        }

    } catch (error) {
        throw error;
    }
}