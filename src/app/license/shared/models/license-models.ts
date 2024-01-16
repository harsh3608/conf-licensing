export interface LicenseManualRequest {
    artifactId: number;
    productGUID: string;
    requestCreatedOn: string;
    requestGeneratedByArtifactId: string;
    requestGeneratedByName: string;
    requestGeneratedByEmail: string;
    organizationArtifactId: number;
    workspaceArtifactId: number;
    workspaceGUID: string;
    relativityInstanceGUID: string;
    isCompleted: boolean;
}