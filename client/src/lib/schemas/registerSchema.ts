import { requiredString } from '../util/util';
import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    displayName: requiredString('displayName'),
    password: requiredString('password')
})

export type RegisterSchema = z.infer<typeof registerSchema>;