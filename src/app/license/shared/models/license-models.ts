export interface LicenseManualRequest {
    artifactId: number
    instanceGuid: string
    instanceName: string
    instanceNameFriendly: string
    instanceURL: string
    workspaceArtifactID: number
    workspaceGuid: string
    productGuid: string
    productName: string
    productVersion: string
    productSchemaVersion: string
    generatedByArtifactID: number
    generatedByName: string
    generatedByEmail: string
    generatedOnUtc: any
    organizationArtifactId: number
    isCompleted: boolean
    organization: string
}

export interface AllLicensesResponse {
    statusCode: number
    isSuccess: boolean
    response: LicenseManualRequest[]
    message: string
    exceptionMessage: string
}

export interface SingleLicenseResponse {
    statusCode: number
    isSuccess: boolean
    response: LicenseManualRequest
    message: string
    exceptionMessage: string
}

export interface CreateLicenseResponse {
    statusCode: number
    isSuccess: boolean
    response: string
    message: string
    exceptionMessage: string
}


export interface ApproveLicenseModel {
    artifactId: number
    instanceGuid: string
    instanceName: string
    instanceNameFriendly: string
    instanceURL: string
    licenseKey: string
    workspaceArtifactID: number
    workspaceGuid: string
    productGuid: string
    productName: string
    productVersion: string
    productSchemaVersion: string
    generatedByArtifactID: number
    generatedByName: string
    generatedByEmail: string
    generatedOnUtc: any
    organizationArtifactId: number
    startDate: any
    endDate: any
    licenseGeneratedBy: string
    licenseUpdatedBy: string
    status: number
    organization:string
    approvedOnUtc?:string
}

export interface AllApprovedLicensesResponse {
    statusCode: number
    isSuccess: boolean
    response: ApproveLicenseModel[]
    message: string
    exceptionMessage: string
}

export interface UpdateLicenseRequest {
    artifactId: number
    instanceGuid: string
    instanceName: string
    instanceNameFriendly: string
    instanceURL: string
    workspaceArtifactID: number
    workspaceGuid: string
    productGuid: string
    productName: string
    productVersion: string
    productSchemaVersion: string
    generatedByArtifactID: number
    generatedByName: string
    generatedByEmail: string
    generatedOnUtc: string
    organizationArtifactId: number
    isCompleted: boolean
    organization: string
  }

export interface UpdateLicenseResponse {
    statusCode: number
    isSuccess: boolean
    response: any
    message: string
    exceptionMessage: string
}

export interface GenerateLicenseResponse {
    statusCode: number
    isSuccess: boolean
    response: string
    message: string
    exceptionMessage: string
}

export interface SingleApprovedLicenseResponse {
    statusCode: number
    isSuccess: boolean
    response: ApproveLicenseModel
    message: string
    exceptionMessage: string
}





