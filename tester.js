#!/usr/bin/env nodejs

var JalaliDate = require('./JalaliDate');


var days = 1;                                    // The first day of calendar, FARVARDIN 1, 1
for(var year = 1; year < 2850; year++) {
    d = new JalaliDate(year, 0, 1);
    // check if the estimated function is the same as the real one
    if (d.getFixedDateFar1() != days)
        console.log("wrong!!");

    if (d.isLeapYear())                          // add 366 days for leap years
        days += 366;
    else
        days += 365;
}

days = 1;                                        // The first day of calendar, FARVARDIN 1, 1
for(var year = -1; year > -2850; year--) {         // do the same for negative years
    d = new JalaliDate(year, 0, 1);
    if (d.isLeapYear())
        days -= 366;
    else
        days -= 365;

    var days1 = d.getFixedDateFar1();

    if ( days1 != days)
        console.log("wrong!! "+year);
}

