export function timeStamp(timeStamp: string) {
    const date = new Date(timeStamp);

    // formatting the date option
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    // Format the date
    const formattedDate = date.toLocaleString("en-GB", options);


    const [datePart, timePart] = formattedDate.split(", ");
    const [day, month] = datePart.split(" ");
    const [hour, minute] = timePart.split(":");
    const amPm = timePart.includes("AM") ? "AM" : "";

    return `${day} ${month} ${hour}:${minute} ${amPm}`;
}
