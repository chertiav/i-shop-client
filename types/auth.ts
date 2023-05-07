import { UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

export interface IInputs {
	name: string;
	email: string;
	password: string;
}

export interface IAuthPageInput {
	register: UseFormRegister<IInputs>;
	errors: FieldErrors<IInputs>;
}

export interface ISignUpFx {
	url: string;
	userName: string;
	password: string;
	email: string;
}

export interface ISignInFx {
	url: string;
	username: string;
	password: string;
}

export interface IUser {
	userName: string;
	userId: number | string;
	email: string;
}
