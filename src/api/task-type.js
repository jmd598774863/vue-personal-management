import request from '@/utils/request'

export function fetchList(query) {
  return request({
    baseURL: 'http://localhost:9003',
    url: '/tasks/tasks',
    method: 'get',
    params: query
  })
}