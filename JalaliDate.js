/* Hadi Lashkari G. */

// The detail of important functions of this object can be found in en.wikibook.com
function JalaliDate(input1, input2, input3, input4, input5, input6, input7, input8) {
    //
    // private variables
    //

    // The days between 1970, 1, 1 of Gregorian calendar and Farvardin 1, 0001 of Jalali Calendar.
    // 1970, 1, 1 of Gregorian calendar is 1348, 9, 11 with this fixedDate: EPOCH_OFFSET
    var EPOCH_OFFSET = 492268,
        BASE_YEAR = 1349,
        FIXED_DATES = [
            492347 , // False   ,  1349
            492712 , // True   ,  1350
            493078 , // False   ,  1351
            493443 , // False   ,  1352
            493808 , // False   ,  1353
            494173 , // True   ,  1354
            494539 , // False   ,  1355
            494904 , // False   ,  1356
            495269 , // False   ,  1357
            495634 , // True   ,  1358
            496000 , // False   ,  1359
            496365 , // False   ,  1360
            496730 , // False   ,  1361
            497095 , // True   ,  1362
            497461 , // False   ,  1363
            497826 , // False   ,  1364
            498191 , // False   ,  1365
            498556 , // True   ,  1366
            498922 , // False   ,  1367
            499287 , // False   ,  1368
            499652 , // False   ,  1369
            500017 , // True   ,  1370
            500383 , // False   ,  1371
            500748 , // False   ,  1372
            501113 , // False   ,  1373
            501478 , // False   ,  1374
            501843 , // True   ,  1375
            502209 , // False   ,  1376
            502574 , // False   ,  1377
            502939 , // False   ,  1378
            503304 , // True   ,  1379
            503670 , // False   ,  1380
            504035 , // False   ,  1381
            504400 , // False   ,  1382
            504765 , // True   ,  1383
            505131 , // False   ,  1384
            505496 , // False   ,  1385
            505861 , // False   ,  1386
            506226 , // True   ,  1387
            506592 , // False   ,  1388
            506957 , // False   ,  1389
            507322 , // False   ,  1390
            507687 , // True   ,  1391
            508053 , // False   ,  1392
            508418 , // False   ,  1393
            508783 , // False   ,  1394
            509148 , // True   ,  1395
            509514 , // False   ,  1396
            509879 , // False   ,  1397
            510244 , // False   ,  1398
            510609 , // True   ,  1399
            510975 , // False   ,  1400
            511340 , // False   ,  1401
            511705 , // False   ,  1402
            512070 , // False   ,  1403
            512435 , // True   ,  1404
            512801 , // False   ,  1405
            513166 , // False   ,  1406
            513531 , // False   ,  1407
            513896 , // True   ,  1408
            514262 , // False   ,  1409
            514627 , // False   ,  1410
            514992 , // False   ,  1411
            515357 , // True   ,  1412
            515723 , // False   ,  1413
            516088 , // False   ,  1414
            516453 , // False   ,  1415
            516818 , // True   ,  1416
            517184 , // False   ,  1417
        ],
        ACCUMULATED_DAYS_IN_MONTH = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336],
        oneSecondInMillis = 1000,
        oneMinuteInMillis = 60 * oneSecondInMillis,
        oneHourInMillis = 60 * oneMinuteInMillis,
        oneDayInMillis = 24 * oneHourInMillis,
        fixedDate = EPOCH_OFFSET,
        year = 0,
        daysOfYear = 0,
        month = 0,
        day = 0,      // day of month
        hour = 0,
        minute = 0,
        second = 0,
        milli = 0, // milliseconds
        micro = 0, //microseconds
        time = 0, // in milliseconds
        timezoneOffset; // in minutes


    /* To initiate with the details of calendar. */
    var JalaliDateByDetails = function(Year, Month, Day, Hour, Minute, Second, Milli, Micro) {
        if (Year == 0) {
            delete this;
            return;
        }
        Year += Math.floor(Month / 12);
        Month %= 12; // months of a year is a fixed number (12)
        if (Month < 0) Month += 12; // month range is 0-11
        var far1 = getFixedDateFar1(Year),
            fixedDate = far1 + ACCUMULATED_DAYS_IN_MONTH[Month] + Day - 1;
        //console.log("year: "+Year);
        //console.log("fixedDate: "+fixedDate);
        micro = Micro;
        timezoneOffset = (new Date()).getTimezoneOffset();
        time = (fixedDate - EPOCH_OFFSET) * oneDayInMillis +
            Hour * oneHourInMillis +
            (Minute + timezoneOffset) * oneMinuteInMillis +
            Second * oneSecondInMillis + Milli;
        completeByTime();
    }

    /* To initiate by time in milliseconds. */
    var JalaliDateByTime = function(millis) {
        time = millis;
        timezoneOffset = (new Date()).getTimezoneOffset();
        completeByTime();
    }

    /* To initiate now. */
    var JalaliDateNow = function(){
        JalaliDateByTime((new Date()).getTime());
    }

    /* To complete the calculation and fill up calendar details. */
    var completeByTime = function() {
        //console.log("time: "+time);
        var timeInZone = time  - timezoneOffset * oneMinuteInMillis;
        fixedDate = Math.floor(timeInZone / oneDayInMillis) + EPOCH_OFFSET;
        //console.log("fixedDate: "+fixedDate);
        year = getYearFromFixedDate(fixedDate);
        //console.log("year: "+year);
        var far1 = getFixedDateFar1(year);
        //console.log("far1: "+far1);
        daysOfYear = fixedDate - far1 + 1;
        if (daysOfYear < ACCUMULATED_DAYS_IN_MONTH[6]) {
            month = Math.floor((daysOfYear - 1) / 31); // month range is 0-11
        } else {
            month = Math.floor( (daysOfYear - 1 - ACCUMULATED_DAYS_IN_MONTH[6]) / 30) + 6;
        }
        //console.log("daysOfYear: "+daysOfYear);
        //console.log("ACCUMULATED_DAYS_IN_MONTH: "+ACCUMULATED_DAYS_IN_MONTH[month]);
        day = daysOfYear - ACCUMULATED_DAYS_IN_MONTH[month];
        var extra = timeInZone - (fixedDate - EPOCH_OFFSET) * oneDayInMillis;
        hour = Math.floor(extra / oneHourInMillis);
        extra -= hour * oneHourInMillis;
        minute = Math.floor(extra / oneMinuteInMillis);
        extra -= minute * oneMinuteInMillis;
        second = Math.floor(extra / oneSecondInMillis);
        milli -= second * oneSecondInMillis;
    }

    /* To find the fixedDate of first day of year. Farvardin 1, 1 must have fixedDate of one. */
    var getFixedDateFar1 = function(Year){
        // check the catch ficedDates
        if (Year >= BASE_YEAR && Year < BASE_YEAR + FIXED_DATES.length - 1)
            return FIXED_DATES[Year - BASE_YEAR];
        // The detail can be found in en.wikibook.com
        //console.log("year: "+year);
        if (Year > 0)
            var realYear = Year - 1;
        else if (Year < 0)
            var realYear = Year;
        else
            return null;
        //console.log("realYear: "+ realYear);
        var days = 1029983 * Math.floor( (realYear + 38) / 2820 ),
            cycle = (realYear + 38) % 2820;
        if (cycle < 0) cycle += 2820;
        days += getIntegerPart((cycle - 38) * 365.24219) + 1;
        if (cycle - 38 < 0) days--;

        var extra = cycle * 0.24219,
            frac = getIntegerPart((extra - Math.floor(extra))*1000);
        if (isLeapYear(Year - 1) && frac <= 202) days++;
        //console.log("days: "+days);
        return days;
    }

    /* To get integer part of a float */
    var getIntegerPart = function(i){
        if (i >= 0) return Math.floor(i);
        else        return Math.floor(i) + 1;
    }

    /* To determine which year is a leap year. */
    var isLeapYear = function(Year) {
        // The detail can be found in en.wikibook.com
        if (Year > 0) {
            var realYear0 = (Year + 38) % 2820,
                realYear1 = (Year + 39) % 2820;
        } else if (year < 0) {
            var realYear0 = (Year + 39) % 2820,
                realYear1 = (Year + 40) % 2820;
            if (realYear0 < 0) realYear0 += 2820;
            if (realYear1 < 0) realYear1 += 2820;
        } else
            // In case of using isLeapYear(year - 1) as last year. Look getFixedDateFar1 function
            return true;
        var leapDays0 = realYear0*0.24219 + 0.025,  // 0.24219 ~ extra days of one year
            leapDays1 = realYear1*0.24219 + 0.025,
            frac0 = Math.floor((leapDays0 - Math.floor(leapDays0))*1000),
            frac1 = Math.floor((leapDays1 - Math.floor(leapDays1))*1000);
        if (frac0 <= 266 && frac1 > 266)
            return true;
        else
            return false;
    }

    /* To find the year that associated with fixedDat. */
    var getYearFromFixedDate = function(fd) {
        if (fd > 0)
            var testYear = Math.floor(Math.round((fd - 1) / 365.24219)) + 1;
        else
            var testYear = Math.floor(Math.round(fd / 365.24219));
        //console.log("testYear: "+testYear);
        var far1 = getFixedDateFar1(testYear);
        //console.log("far1: "+far1);
        if (far1 <= fd)
            return testYear;
        else
            return testYear - 1;
    }

    //
    // public variables
    //

    this.getFixedDateFar1 = function() {
        return getFixedDateFar1(year);
    }

    this.isLeapYear = function() {
        return isLeapYear(year);
    }

    /* The same as Date object */
    this.getFullYear = function(){
        return year;
    }

    /* The same as Date object */
    this.getMonth = function(){
        return month;
    }

    /* The same as Date object */
    this.getDate = function(){
        return day;
    }

    /* The same as Date object */
    this.getHours = function(){
        return hour;
    }

    /* The same as Date object */
    this.getMinutes = function(){
        return minute;
    }

    /* The same as Date object */
    this.getSeconds = function(){
        return second;
    }

    /* The same as Date object */
    this.getMilliseconds = function(){
        return milli;
    }

    /* The same as Date object */
    this.getMicroseconds = function(){
        return micro;
    }

    /* The same as Date object */
    this.getTime = function(){
        return time;
    }


    /* The same as Date object */
    this.getDay = function(){
        // The fixed date 1 (Farvardin 1, 1 Jalali) is JOME.
        var fd = fixedDate;
        var dow = (fd - 3) % 7;
        if (dow < 0) dow += 7; // day of week range is 0-6
        return dow;
    }

    /* The same as Date object */
    this.setFullYear = function(Year){
        JalaliDateByDetails(Year, month, day, hour, minute, second, milli);
    }

    /* The same as Date object */
    this.setMonth = function(Month){
        JalaliDateByDetails(year, Month, day, hour, minute, second, milli);
    }

    /* The same as Date object */
    this.setDate = function(Day){
        time += (Day - day) * oneDayInMillis;
        completeByTime();
    }

    /* The same as Date object */
    this.setHours = function(Hour) {
        time += (Hour - Hour) * oneHourInMillis;
        completeByTime();
    }

    /* The same as Date object */
    this.setMinutes = function(Minute) {
        time += (Minute - Minute) * oneMinuteInMillis;
        completeByTime();
    }

    /* The same as Date object */
    this.setSeconds = function(Second) {
        time += (Second - second) * oneSecondInMillis;
        completeByTime();
    }

    /* The same as Date object */
    this.setMilliseconds = function(Milli) {
        time += Milli - milli;
        completeByTime();
    }

    this.getMicroseconds = function(Micro){
        micro = Micro;
    }

    /* The constructor of this object. */
    if (input1 != null && input2 != null && input3 != null
        && input4 != null && input5 != null && input6 != null && input7 != null && input8 != null)
        // input1, input2, input3 are Year, Month, Day
        // input4, input5, input6, input7, input8 are Hours, Minutes, Seconds, Milliseconds, MicroSeconds
        JalaliDateByDetails(input1, input2, input3, input4, input5, input6, input7, input8);
    else if (input1 != null && input2 != null && input3 != null
        && input4 != null && input5 != null && input6 != null && input7 != null)
        // input1, input2, input3 are Year, Month, Day
        // input4, input5, input6, input7 are Hours, Minutes, Seconds, Milliseconds
        JalaliDateByDetails(input1, input2, input3, input4, input5, input6, input7);
    else if (input1 != null && input2 != null && input3 != null
        && input4 != null && input5 != null && input6 != null)
        JalaliDateByDetails(input1, input2, input3, input4, input5, input6, 0, 0);
    else  if (input1 != null && input2 != null && input3 != null
        && input4 != null && input5 != null)
        JalaliDateByDetails(input1, input2, input3, input4, input5, 0, 0, 0);
    else  if (input1 != null && input2 != null && input3 != null
        && input4 != null)
        JalaliDateByDetails(input1, input2, input3, input4, 0, 0, 0, 0);
    else if (input1 != null && input2 != null && input3 != null)
        JalaliDateByDetails(input1, input2, input3, 0, 0, 0, 0, 0);
    else if (input1 != null)
        JalaliDateByTime(input1); // input1 is milliseconds
    else
        JalaliDateNow();
}

module.exports = JalaliDate;
