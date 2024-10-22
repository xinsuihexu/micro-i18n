import http from '@admin/_share/services/http'
import type { IDemoParams, IDemoResult } from './type'

// 接口1
export function postTest(id: number, data: IDemoParams): Promise<IDemoResult> {
  return http.post(`/test/${id}`, data)
}

export function fetchTest(id: number) {
  return http.get('/test', { params: { id } })
}