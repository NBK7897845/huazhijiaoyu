import request from '@/common/request.js'
// import { formatGetUri } from '@/common/util.js'

const api = {}
const PORT1 = 'baseinfo'
// 注册获取验证码
api.register = params => request.globalRequest(params, 'post', 1, 1)

export default api