import request from '@/utils/request'
import {url} from '@/const/constant';
export function deleteTaskById(id) {
    return request({
      baseURL: url,
      url: '/tasks/delete/'+id,
      method: 'post',
    })
}

export function listTask() {
    return request({
      baseURL: url,
      url: '/tasks/list',
      method: 'get',
    })
}

export function addTask(task) {
  return request({
    baseURL: url,
    url: '/tasks/add',
    method: 'post',
    headers:{'Content-Type':'application/json'},
    data:task
  })
}
export function doing(id) {
  return request({
    baseURL: url,
    url: '/tasks/doing/'+id,
    method: 'post',
  })
}
export function finished(id) {
  return request({
    baseURL: url,
    url: '/tasks/finished/'+id,
    method: 'post',
  })
}