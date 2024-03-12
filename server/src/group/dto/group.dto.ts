export class GroupDto {
    name: string
    password: string
}

export class Token {

    id: number
    name: string
    iat: number
    exp: number

}

export class ParamDto {
    groupName: string
}

export class MembersData {
    name: string
    deaths: number
}