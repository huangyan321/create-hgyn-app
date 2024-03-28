/**
 *
 * @param v pacakge下的完整版本号
 * @returns 末尾自增后的版本号 1.0.0.1
 */
export const versionHandle = (v: string) => {
    const ov = v.substring(14, v.length).split('_')[0];
    const arr: any[] = ov.split('.');
    arr[arr.length - 1] = Number(arr[arr.length - 1]) + 1;
    return arr.join('.');
};

export const useTime = (type: string) => {
    const dateOne = {
        year: 0, // 年份
        month: 0, // 月份
        week: '', // 星期几
        day: 0, // 天数
        hour: '', // 小时
        minute: '', // 分钟
        second: '', // 秒
        nowTime: '', // 当前时间
        nowMonth: '', // 当前年月日
    };

    // 更新时间
    const updateTime = () => {
        const date = new Date();
        dateOne.year = date.getFullYear();
        dateOne.month = date.getMonth() + 1;
        dateOne.week = '日一二三四五六'.charAt(date.getDay());
        dateOne.day = date.getDate();
        dateOne.hour =
            (date.getHours() + '')?.padStart(2, '0') ||
            new Intl.NumberFormat(undefined, {
                minimumIntegerDigits: 2,
            }).format(date.getHours());
        dateOne.minute =
            (date.getMinutes() + '')?.padStart(2, '0') ||
            new Intl.NumberFormat(undefined, {
                minimumIntegerDigits: 2,
            }).format(date.getMinutes());
        dateOne.second =
            (date.getSeconds() + '')?.padStart(2, '0') ||
            new Intl.NumberFormat(undefined, {
                minimumIntegerDigits: 2,
            }).format(date.getSeconds());
        dateOne.nowTime = `${dateOne.year}年${dateOne.month}月${dateOne.day} ${dateOne.hour}:${dateOne.minute}:${dateOne.second}`;
        dateOne.nowMonth = `${dateOne.year}${
            dateOne.month.toString().length === 1
                ? '0' + dateOne.month
                : dateOne.month
        }${
            dateOne.day.toString().length === 1
                ? '0' + dateOne.day
                : dateOne.day
        }`;
    };

    updateTime();

    return dateOne[type];
};
// 转换时间中一位至两位
const coverEachUnit = (val: number) => {
    return val < 10 ? '0' + val : val;
};
// 获取当前时间
export const getCurrentTime = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const MM = coverEachUnit(date.getMonth() + 1);
    const dd = coverEachUnit(date.getDate());
    const HH = coverEachUnit(date.getHours());
    const mm = coverEachUnit(date.getMinutes());
    const ss = coverEachUnit(date.getSeconds());
    return `${yyyy}-${MM}-${dd}_${HH}:${mm}:${ss}`;
};
