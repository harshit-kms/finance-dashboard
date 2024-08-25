import moment from 'moment'


export const dateFormat = (date) => {
    return moment(date).utc().format('MM/DD/YYYY')
}