import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmark', {
      params: bookmark
    })
  },
  post (bookmark) {
    return Api().post('/bookmark', {
      params: bookmark
    })
  },
  delete (bookmarkId) {
    return Api().delete(`bookmark/${bookmarkId}`)
  }
}
