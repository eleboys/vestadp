(function () {
    /*  MOD  --  Modulus function which works for non-integers.  */
    Math.mod = function (a, b) {
        return a - (b * Math.floor(a / b));
    };
    String.zeroPad = function(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    };
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
            'use strict';
            if (this == null) {
                throw new TypeError();
            }
            var n, k, t = Object(this),
                len = t.length >>> 0;

            if (len === 0) {
                return -1;
            }
            n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0) ; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }
})();


/* Vesta Date Picker */
(function () {
    var vestaDatePicker;
    vestaDatePicker = function (container,element, options) {
        if (typeof (container) == "undefined")
            return;
        var settings = options; //$.extend(vestaDatePicker.defaultSettings, options);
        var calendar = settings.calendar;
        var dateFormat = settings.dateFormat ? settings.dateFormat : calendar.defaultDateFormat;
        var selectedJulianDay = 0;
        
        this.display = function (strDate) {
            if (typeof(strDate) === "undefined" || strDate=="") {
                var today = new Date();
                var todayJd = gregorianToJd(today.getFullYear(), today.getMonth() + 1, today.getDate());
                calendar.setJulianDay(todayJd);
                selectedJulianDay = todayJd;
                renderDayView(settings);
                return;
            }

            var date = parseDate(dateFormat, strDate);
            calendar.day = date.day > 0 ? date.day : this.day;
            calendar.month = date.month > 0 ? date.month : this.month;
            calendar.year = date.year > 0 ? date.year : this.year;
            selectedJulianDay = calendar.getJulianDay();
            renderDayView(settings);
            return;
        };
     
        function renderDayView(opts) {
            console.log(settings.showInline);
            console.log(opts.showInline);
            $(container).empty().addClass("ui-vestadp-container");
            $(container).append(renderHeader(calendar.getMonthList()[calendar.month - 1] + " " + getNumber(calendar.year, opts.persianNumbers), 'view:month',opts));
            var calTable = $("<table cellspacing='0'></table>").addClass("ui-vestadp-calendar").css("direction", opts.direction).hide();
            var weekHeader = $("<tr class='ui-vestadp-weekheader'></tr>");
            var weekdays = calendar.getWeekdayList(true);
            for (var i = 0; i < weekdays.length; i++) {
                weekHeader.append($("<td></td>").addClass("ui-vestadp-weekday").text(weekdays[i]));
            }
            calTable.append(weekHeader);
            calendar.goFirstOfMonth();
            var jd = calendar.getJulianDay();
            var currentMonth = calendar.month;
            var firstdow = calendar.getWeekday();
            calendar.addDay(-1 * firstdow);
            for (i = 0; i < 6; i++) {
                var wrow = $("<tr></tr>");
                for (var j = 0; j < 7; j++) {
                    var wday = $("<td data-event='click' data-handler='date' data-args='day:"+calendar.day+",month:"+calendar.month+"'></td>").addClass("ui-vestadp-day").text(getNumber(calendar.day, opts.persianNumbers));
                    if (calendar.month != currentMonth)
                        wday.addClass("ui-vestadp-inactive");
                    if (calendar.getJulianDay() == selectedJulianDay)
                        wday.addClass("ui-vestadp-selected");
                    wrow.append(wday);
                    calendar.addDay(1);
                }
                calTable.append(wrow);
            }
            calendar.setJulianDay(jd);
            $(container).append(calTable);
            if (opts.showFooter && !opts.showInline)
                $(container).append(renderFooter(element, opts));
            calTable.fadeIn();
            $('[data-event="click"]', container).click(function () {
                var handler = $(this).attr("data-handler");
                var args = parseArgs($(this).attr("data-args"));
                switch (handler) {
                    case "next":
                        calendar.addMonth(1);
                        break;
                    case "prev":
                        calendar.addMonth(-1);
                        break;
                    case "view":
                        renderMonth(opts);
                        return;
                    case "date":
                        calendar.setMonth(parseInt(args["month"]));
                        calendar.setDay(parseInt(args["day"]));
                        var dateStr = calendar.toString(dateFormat);
                        opts.dateChanged(element, dateStr, calendar);
                        if (typeof(element) !== "undefined" && !opts.showInline) {
                            element.val(dateStr);
                            container.slideUp("fast");
                        }else if (typeof(element) !== "undefined" && opts.showInline){
                            $(".ui-vestadp-selected",calTable).removeClass("ui-vestadp-selected");
                            $(this).addClass("ui-vestadp-selected");
                        }
                        return;
                }
                calTable.fadeOut("fast",function(){
                    renderDayView(opts);
                });
            });
        }
     
        function renderHeader(title, args,opts) {
            var header = $('<div></div>').addClass('ui-vestadp-header');
            header.append($("<div data-event='click' data-handler='prev'></div>").addClass("ui-vestadp-prev").attr("title",opts.regional[opts.language].previous).text("«"));
            header.append($("<div data-event='click' data-handler='view' data-args='" + args + "'></div>").addClass("ui-vestadp-title").text(title));
            header.append($("<div data-event='click' data-handler='next'></div>").addClass("ui-vestadp-next").attr("title", opts.regional[opts.language].next).text("»"));
            return header;
        }

        function renderFooter(elm,opts) {
            var footer = $('<div></div>').addClass('ui-vestadp-footer');
            footer.append($("<div></div>").addClass("ui-vestadp-today").text(opts.regional[opts.language].today).click(function () {
                var today = new Date();
                var todayJd = gregorianToJd(today.getFullYear(), today.getMonth() + 1, today.getDate());
                calendar.setJulianDay(todayJd);
                elm.val(calendar.toString(dateFormat));
                container.slideUp("fast");
            }));
            footer.append($("<div></div>").addClass("ui-vestadp-clear").text(opts.regional[opts.language].clear).click(function () {
                elm.val("");
                container.slideUp("fast");
            }));
            return footer;
        }

        function renderMonth(opts) {
            $(container).empty().addClass("ui-vestadp-container");
            $(container).append(renderHeader(getNumber(calendar.year, opts.persianNumbers), 'view:year',opts));
            var calTable = $("<table cellspacing='0'></table>").addClass("ui-vestadp-calendar").css("direction", opts.direction).hide();
            var mIndex = 0;
            var months = calendar.getMonthList(true);
            for (var i = 0; i < 3; i++) {
                var mrow = $("<tr></tr>").addClass("ui-vestadp-monthlist");
                for (var j = 0; j < 4; j++) {
                    var mcell = $("<td data-event='click' data-handler='view' data-args='view:cal,month:" + (mIndex + 1) + "'></td>").text(months[mIndex]);
                    if (calendar.month==mIndex+1)
                        mcell.addClass("ui-vestadp-selected");
                    mrow.append(mcell);
                    mIndex++;
                }
                calTable.append(mrow);
            }
            $(container).append(calTable);
            if (opts.showFooter && !opts.showInline)
                $(container).append(renderFooter(element, opts));
            calTable.fadeIn();
            $('[data-event="click"]', container).click(function () {
                var handler = $(this).attr("data-handler");
                var args = parseArgs($(this).attr("data-args"));
                switch (handler) {
                    case "next":
                        calendar.addYear(1);
                        break;
                    case "prev":
                        calendar.addYear(-1);
                        break;
                    case "view":
                        if (args["view"] == "cal") {
                            calendar.setMonth(parseInt(args["month"]));
                            renderDayView(opts);
                            return;
                        } else if (args["view"] == "year")
                            renderYear(opts, calendar.year);
                        return;
                }
                calTable.fadeOut("fast",function(){
                   renderMonth(opts);
                });
            });
        }

        function renderYear(opts, year) {
            $(container).empty().addClass("ui-vestadp-container");

            var calTable = $("<table cellspacing='0'></table>").addClass("ui-vestadp-calendar").css("direction", "ltr").hide();

            var startYear = year - 4;
            var endYear = year + 7;
            year = startYear;
            $(container).append(renderHeader(getNumber(startYear, opts.persianNumbers) + " - " + getNumber(endYear, opts.persianNumbers), '',opts));

            for (var i = 0; i < 3; i++) {
                var yrow = $("<tr></tr>").addClass("ui-vestadp-yearlist");
                for (var j = 0; j < 4; j++) {
                    var ycell = $("<td data-event='click' data-handler='view' data-args='view:month,year:" + year + "'></td>").text(getNumber(year, opts.persianNumbers));
                    if (calendar.year == year)
                        ycell.addClass("ui-vestadp-selected");
                    yrow.append(ycell);
                    year++;
                }
                calTable.append(yrow);
            }
            $(container).append(calTable);
            if (opts.showFooter && !opts.showInline)
                $(container).append(renderFooter(element, opts));
            calTable.fadeIn();
            $('[data-event="click"]', container).click(function () {
                var handler = $(this).attr("data-handler");
                var args = parseArgs($(this).attr("data-args"));
                switch (handler) {
                    case "next":
                        calTable.fadeOut("fast",function(){
                            renderYear(opts, endYear + 4);
                        });
                        return;
                    case "prev":
                        calTable.fadeOut("fast",function(){
                            renderYear(opts, startYear - 7);
                        });
                        return;
                    case "view":
                        if (args["view"] == "month") {
                            calendar.setYear(parseInt(args["year"]));
                            calTable.fadeOut("fast",function(){
                                renderMonth(opts);
                            });
                            return;
                        }
                }
            });
        }

        // to parse argument lists passed to clickable objects
        function parseArgs(args) {
            if (typeof (args) === "undefined")
                return undefined;
            args = args.split(',');
            var argsArray = new Array();
            for (var i = 0; i < args.length; i++) {
                var argsParts = args[i].split(':');
                argsArray[argsParts[0]] = argsParts[1];
            }
            return argsArray;
        }

        /* converts a number to its persian form if needed (unicode=true) */
        function getNumber(num, unicode) {
            if (!unicode || parseInt(num) < 0 || typeof (num) === "undefined")
                return num;
            if (parseInt(num) < 10)
                return String.fromCharCode(1632 + parseInt(num));
            var numStr = "";
            for (var i = 0; i < num.toString().length; i++) {
                numStr += getNumber(num.toString().charAt(i), true);
            }
            return numStr;
        }

        function gregorianToJd(year, month, day) {
            var GREGORIAN_EPOCH = 1721425.5;
            return (GREGORIAN_EPOCH - 1) +
                   (365 * (year - 1)) +
                   Math.floor((year - 1) / 4) +
                   (-Math.floor((year - 1) / 100)) +
                   Math.floor((year - 1) / 400) +
                   Math.floor((((367 * month) - 362) / 12) +
                   ((month <= 2) ? 0 : ((((year % 4) == 0) && (!(((year % 100) == 0) && ((year % 400) != 0)))) ? -1 : -2)) + day);
        }

        function parseDate(format, value) {
            if (format == null || value == null) {
                throw "Invalid arguments";
            }

            value = (typeof value === "object" ? value.toString() : value + "");
            if (value === "") {
                return null;
            }

            var iFormat, dim, extra,
                iValue = 0,
			    shortYearCutoff = 10,
                dayNamesShort = calendar.getWeekdayList(true),
                dayNames = calendar.getWeekdayList(false),
                monthNamesShort = calendar.getMonthList(true),
                monthNames = calendar.getMonthList(false),
                year = -1,
                month = -1,
                day = -1,
                doy = -1,
                literal = false,
                date,
                // Check whether a format character is doubled
                lookAhead = function(match) {
                    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                    if (matches) {
                        iFormat++;
                    }
                    return matches;
                },
                // Extract a number from the string value
                getNumber = function(match) {
                    var isDoubled = lookAhead(match),
                        size = (match === "@" ? 14 : (match === "!" ? 20 :
                        (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
                        digits = new RegExp("^\\d{1," + size + "}"),
                        num = value.substring(iValue).match(digits);
                    if (!num) {
                        throw "Missing number at position " + iValue;
                    }
                    iValue += num[0].length;
                    return parseInt(num[0], 10);
                },
                // Extract a name from the string value and convert to an index
                getName = function(match, shortNames, longNames) {
                    var index = -1,
                        names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                            return [ [k, v] ];
                        }).sort(function (a, b) {
                            return -(a[1].length - b[1].length);
                        });

                    $.each(names, function (i, pair) {
                        var name = pair[1];
                        if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                            index = pair[0];
                            iValue += name.length;
                            return false;
                        }
                    });
                    if (index !== -1) {
                        return index + 1;
                    } else {
                        throw "Unknown name at position " + iValue;
                    }
                },
                // Confirm that a literal character matches the string value
                checkLiteral = function() {
                    if (value.charAt(iValue) !== format.charAt(iFormat)) {
                        throw "Unexpected literal at position " + iValue;
                    }
                    iValue++;
                };

            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        checkLiteral();
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "'":
                            if (lookAhead("'")){
                                checkLiteral();
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }

            if (iValue < value.length){
                extra = value.substr(iValue);
                if (!/^\s+/.test(extra)) {
                    throw "Extra/unparsed characters found in date: " + extra;
                }
            }

            if (year === -1) {
                year = this.year;
            } else if (year < 100) {
                year += this.year - this.year % 100 +
                    (year <= shortYearCutoff ? 0 : -100);
            }

            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    dim = calendar.getDaysInMonth(year, month);
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }

            return { year: year, month: month, day: day };
        }
    };

    vestaDatePicker.defaultSettings = {
        direction: "rtl",
        dateFormat: "", // default dateFromat of each calendar
        showFooter: true,
        persianNumbers: true,
        regional : {
            "fa" : {
                today : "امروز",
                clear: "پاکن",
                previous: "قبلی",
                next: "بعدی"
            },
            "en": {
                today: "Today",
                clear: "Clear",
                previous: "Previous",
                next: "Next"
            }
        },
        language: 'fa',
        calendar: new window.persianCalendar(),
        dateChanged: function () { },
        showInline : false
    };

    //vestaDatePicker.defaultSettings = {
    //        direction: "ltr",
    //        dateFormat: "", // default dateFromat of each calendar
    //        calendar: new window.gregorianCalendar()
    //};

    window.VestaDatePicker = vestaDatePicker;
})();


(function ($) {
    $.fn.vestadp = function(method) {

        var methods = {
            init: function(options) {
                var opts = $.extend({}, VestaDatePicker.defaultSettings, options);
                return this.each(function(index, element) {
                    if ($(element).is(":text"))
                        methods._renderTextbox(element, opts);
                    else
                        methods._renderInline(element, opts);
                });
            },
            date: function() {
            },
            _renderInline: function(element, opts) {
                if ($(element).data("vestadp"))
                    return;
                // if user wants to run it over a DOM other than textbox showInline must be enabled
                opts.showInline = true;
                var divContainer = $("<div />").attr("data-rel", "vestadatepicker-inline");
                divContainer.appendTo("body");
                var vdp = new VestaDatePicker(divContainer, $(element), opts);
                $(element).data("vestadp", true);
                vdp.display();
                $(element).append(divContainer);
            },
            _renderTextbox: function(element, opts) {
                if ($(element).data("vestadp"))
                    return;
                // if user wants to run it over a textbox showInline must be disabled
                opts.showInline = false;
                var divContainer = $("<div />").attr("data-rel", "vestadatepicker").css("position", "absolute");
                divContainer.appendTo("body");
                var vdp = new VestaDatePicker(divContainer, $(element), opts);
                $(element).data("vestadp", true);
                divContainer.hide();
                vdp.display($(element).val());

                $(element).focus(function() {
                    vdp.display($(this).val());
                    $("div[data-rel='vestadatepicker']").slideUp("fast");
                    divContainer.slideDown("fast").position({
                        of: $(this),
                        my: "right top",
                        at: "right bottom"
                    });
                }).click(function(ev) {
                    ev.stopPropagation();
                });

                divContainer.click(function(ev) {
                    ev.stopPropagation();
                });

                $(document).click(function() {
                    divContainer.slideUp("fast");
                });
            }
        };

        // Method calling logic
        if (methods[method] && method.charAt(0) != '_') {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.vestadp');
        }
    };

})(jQuery);