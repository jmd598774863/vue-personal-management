import request from '@/utils/request'

export function deleteTaskById(id) {
    return request({
      baseURL: 'http://localhost:9003',
      url: '/tasks/delete/'+id,
      method: 'post',
    })
}

export function listTask() {
    return request({
      baseURL: 'http://localhost:9003',
      url: '/tasks/list',
      method: 'get',
    })
}

export function addTask(task) {
  return request({
    baseURL: 'http://localhost:9003',
    url: '/tasks/add',
    method: 'post',
    headers:{'Content-Type':'application/json'},
    data:task
  })
}