export interface LicenseManualRequest {
    artifactId: number;
    productGUID: string;
    requestCreatedOn: any;
    requestGeneratedByArtifactId: number;
    requestGeneratedByName: string;
    requestGeneratedByEmail: string;
    organizationArtifactId: number;
    workspaceArtifactId: number;
    workspaceGUID: string;
    relativityInstanceGUID: string;
    isCompleted: boolean;
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




