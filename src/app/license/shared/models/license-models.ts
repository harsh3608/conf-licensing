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