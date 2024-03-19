export interface OrganizationsResponse {
    statusCode: number
    isSuccess: boolean
    response: Organization[]
    message: string
    exceptionMessage: string
}

export interface Organization {
    artifactId: number
    name: string
    isActive: boolean
}

export interface SingleOrganizationResponse {
    statusCode: number
    isSuccess: boolean
    response: Organization
    message: string
    exceptionMessage: string
}

export interface CreateOrganizationResponse {
    statusCode: number
    isSuccess: boolean
    response: any
    message: string
    exceptionMessage: string
}