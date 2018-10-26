export interface ParlimentarianModel {
    name: string;
    gender: string;
    political_party: string;
    federal_unit: string;
    photo: string;
    birth_date: string;
    education: string;
    email: string;
}

export class ParlimentarianCompModel  {
    constructor(
        public id: number = 0,
        public name: string = '',
        public gender: string = '',
        public political_party: string = '',
        public federal_unit: string = '',
        public photo: string = '',
        public birth_date: string = '',
        public education: string = '',
        public email: string = '',
        public compatibility: string = '',
        ) {}

}

