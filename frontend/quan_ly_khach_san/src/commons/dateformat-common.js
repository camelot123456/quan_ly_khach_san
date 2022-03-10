import dateformat from "dateformat";

export const formatDate = (date, format) => {
    return dateformat(date, format);
};
