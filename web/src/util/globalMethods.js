/*
 * @Author: fanjf
 * @Date: 2022-08-03 15:38:21
 * @LastEditTime: 2022-12-26 15:54:02
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\util\globalMethods.js
 * @Description: 🎉🎉🎉
 */
export const formatDate = (date, format) => {
    if (!date) return
    if (!format) format = 'yyyy-MM-dd'
    switch (typeof date) {
        case 'string':
            // date = new Date(date.replace(/-/, '/'))
            date = new Date(date)
            break
        case 'number':
            date = new Date(date)
            break
    }
    if (!(date instanceof Date)) return false
    let dict = {
        'yyyy': date.getFullYear(),
        'M': date.getMonth() + 1,
        'd': date.getDate(),
        'H': date.getHours(),
        'm': date.getMinutes(),
        's': date.getSeconds(),
        'MM': ('' + (date.getMonth() + 101)).substr(1),
        'dd': ('' + (date.getDate() + 100)).substr(1),
        'HH': ('' + (date.getHours() + 100)).substr(1),
        'mm': ('' + (date.getMinutes() + 100)).substr(1),
        'ss': ('' + (date.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]]
    })
}

export const checkRule = async ({ rule, message }, value, callback) => {
    const reg = new RegExp(rule);
    if (!reg.test(value)) {
        return Promise.reject(message)
        //   callback(new Error(message));
    } else {
        return Promise.resolve();
    }
};