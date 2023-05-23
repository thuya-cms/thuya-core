type AuthRestriction = {
    id?: string,
    contentDefinitionName: string,
    operations: string[],
    roles: string[]
}

export default AuthRestriction;