
export interface IMarcas {
    _id        : string;
    name       : string;
    logo       : {
        url: string,
        public_id: string,
    };
    image      : {
        url: string,
        public_id: string,
    };
    categories : string[];
}