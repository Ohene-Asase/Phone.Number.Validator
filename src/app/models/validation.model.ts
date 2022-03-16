export interface ValidationResponse{
    info:object;
    valid: string,
    number: string,
    local_format: string,
    international_format: string,
    country_prefix: string,
    country_code: string,
    country_name: string,
    location: string,
    carrier: string,
    line_type: string,
    error: Error,
    
}

export interface Error{
    code: number,
    type: string,
    info: string
}

export interface ValidationRequest{
   number: string,
   country_code: string 
}

export interface flags {
    svg: string;
    png: string
}

export interface Country {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    region: string;
    nativeName: string;
    numericCode: string;
    flag: string;
    flags: flags

}