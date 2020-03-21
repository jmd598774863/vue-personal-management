import request from '@/utils/request';
import {url} from '@/const/constant';
export function fetchList(query) {
  return request({
    baseURL: url,
    url: '/tasks/tasks',
    method: 'get',
    params: query
  })
}