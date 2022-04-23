function formatTime(data) {
    data = String(data);
    return data.length <= 1 ? `0${data}` : data;
}

const displayDeadline = {
    toMs: (date) => {
        return Date.parse(date);
    },

    toDate: (ms) => {
        const date = new Date(ms);

        return (
            String(date.getFullYear()) +
            "-" +
            formatTime(date.getMonth() + 1) +
            "-" +
            formatTime(date.getDate()) +
            "T" +
            formatTime(date.getHours()) +
            ":" +
            formatTime(date.getMinutes())
        );
    },

    toDateText: (ms) => {
        const date = new Date(ms);

        return (
            formatTime(date.getDate()) +
            "-" +
            formatTime(date.getMonth() + 1) +
            "-" +
            String(date.getFullYear()) +
            " " +
            formatTime(date.getHours()) +
            ":" +
            formatTime(date.getMinutes())
        );
    },

    displayDate: (ms) => {
        const data = new Date(ms);
        const dataNow = new Date();
        const dataDif = data.getTime() - dataNow.getTime();
        const daysLeft = Math.floor(dataDif / 1000 / 60 / 60);

        if (daysLeft < 24) {
            return { dateStyle: "lastday", clockStyle: "-fill text-danger" };
        } else if (daysLeft < 72) {
            return { dateStyle: "threedays", clockStyle: " text-danger" };
        } else return { dateStyle: "", clockStyle: "" };
    },
};

export default displayDeadline;
