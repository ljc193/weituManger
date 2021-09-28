/* 根据key设置sessionStorage */
export function setByKey(key,data) {
    return sessionStorage.setItem(key, data)
}
/* 根据key获取sessionStorage */
export function getByKey(key) {
    return sessionStorage.getItem(key)
}