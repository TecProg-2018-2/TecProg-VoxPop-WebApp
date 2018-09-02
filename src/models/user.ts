import { SocialInformationModel } from './socialInformation';

export interface UserModel {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    socialInformation: SocialInformationModel;
}
