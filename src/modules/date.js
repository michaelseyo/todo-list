import { isBefore, isToday, isTomorrow, differenceInWeeks, differenceInCalendarWeeks, 
        addWeeks, endOfDay, getDay, format } from 'date-fns';

const formatDate = function(input) {
    const date = new Date(input);
    if (isToday(date)) {
        return 'Today ' + format(date, 'h:mm aaa');
    } else if (isTomorrow(date)) { 
        return 'Tomorrow ' + format(date, 'h:mm aaa');
    } else if (inAWeek(date)) {
        return evaluateDay(date) + format(date, 'h:mm aaa');
    } else {
        return format(date, 'd MMM yyyy h:mm aaa');
    }
};

const inAWeek = function(inputDate) {
    const currentDate = new Date();
    const limitDate = endOfDay(addWeeks(currentDate, 1)); 

    if (isBefore(inputDate, limitDate)) {
        return differenceInWeeks(limitDate, inputDate) === 0;
    } 

    return false;
};

const evaluateDay = function(inputDate) {
    const today = new Date();
    const endOfToday = endOfDay(today);
    
    let base = '';
    
    if (differenceInCalendarWeeks(inputDate, endOfToday, { weekStartsOn: 1 }) === 1) {
        base = 'Next ';
    }

    switch (getDay(inputDate)) {
        case 0: 
            return base + 'Sunday ';
        case 1: 
            return base + 'Monday ';
        case 2:
            return base + 'Tuesday ';
        case 3:
            return base + 'Wednesday ';
        case 4:
            return base + 'Thursday ';
        case 5:
            return base + 'Friday ';
        case 6:
            return base + 'Saturday ';
    }
};

export { formatDate, inAWeek }

