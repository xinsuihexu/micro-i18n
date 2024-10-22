export type IHttpCode = 200 | 400 | 403 | 500

export interface IHttpResponseBase {
    code: IHttpCode
    message: string
    result: boolean
}