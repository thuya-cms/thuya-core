type AuthRestriction = {
    id?: string,
    contentDefinitionName: string,
    operations: string[],
    authorizedRoles: string[]
}

export default AuthRestriction;