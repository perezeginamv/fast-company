export function getDate(date) {
    const currentDate = new Date(Date.now());
    const commentDate = new Date(Number(date));
    const timeIntervalMs = currentDate - commentDate;
    if (timeIntervalMs <= 60000) {
        return " 1 минуту назад";
    } else if (timeIntervalMs > 60000 && timeIntervalMs <= 300000) {
        return " 5 минут назад";
    } else if (timeIntervalMs > 300000 && timeIntervalMs <= 600000) {
        return " 10 минут назад";
    } else if (timeIntervalMs > 600000 && timeIntervalMs <= 1800000) {
        return " 30 минут назад";
    } else if (timeIntervalMs > 1800000 && timeIntervalMs <= 86400000) {
        const hours = commentDate.getHours().toString();
        const minutes = commentDate.getMinutes().toString();
        const zeroLength = 2;
        return ` ${hours.padStart(zeroLength, 0)}:${minutes.padStart(
            zeroLength,
            0
        )}`;
    } else if (timeIntervalMs > 86400000 && timeIntervalMs <= 2419200000) {
        const day = commentDate.getDate().toString();
        const month = commentDate.toLocaleString("en-us", {
            month: "long"
        });

        return ` ${day} ${month}`;
    } else {
        const day = commentDate.getDate().toString();
        const year = commentDate.getFullYear().toString();
        const month = commentDate.toLocaleString("en-us", {
            month: "long"
        });
        return ` ${day} ${month} ${year}`;
    }
}
