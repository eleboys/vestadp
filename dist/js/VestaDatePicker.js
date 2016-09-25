
(function () {

    String.zeroPad = function (num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    };
})();
 

/* Vesta Date Picker */
(function () {
    var vestaDatePicker;
    vestaDatePicker = function (container, element, options) {
        if (typeof (container) == "undefined")
            return;
        var settings = options; //$.extend(vestaDatePicker.defaultSettings, options);
        var calendar = new window[settings.calendar + 'Calendar' ]();
        var dateFormat = settings.dateFormat ? settings.dateFormat : calendar.defaultDateFormat;
        var selectedJulianDay = 0;
        var currentView = 0; // 0 = dayView; 1 = month view; 2 = year view
        var startYear, endYear;
        mouseWheelBinder(container);

        this.display = function (strDate) {
            if (typeof (strDate) === "undefined" || strDate == "") {
                var today = new Date();
                var todayJd = gregorianToJd(today.getFullYear(), today.getMonth() + 1, today.getDate());
                calendar.setJulianDay(todayJd);
                selectedJulianDay = todayJd;
                renderDayView(settings);
                return;
            }

            try {
                var date = parseDate(dateFormat, strDate);
            } catch(ex){
                // do nothing when datestring cant be parsed
                return;
            }
            calendar.day = date.day > 0 ? date.day : this.day;
            calendar.month = date.month > 0 ? date.month : this.month;
            calendar.year = date.year > 0 ? date.year : this.year;
            selectedJulianDay = calendar.getJulianDay();
            renderDayView(settings);
            return;
        };

        this.getCalendar = function () {
            return calendar;
        };

        this.getDate = function (cultured, dateF) {
            if (cultured) {
                dateF = typeof(dateF) !== "undefined" ? dateF : dateFormat;
                return calendar.toString(dateF);
            } else {
                var date = jdToGregorian(calendar.getJulianDay());
                return new Date(date.year, date.month - 1, date.day);
            }
        };

        this.setDate = function (date, cultured) {
            if (typeof (date) === "undefined" || (!date.hasOwnProperty("year") && !date.hasOwnProperty("month") && !date.hasOwnProperty("day")))
                throw "argument exception, date";
            date.month = typeof (date.month) === "undefined" || isNaN(date.month.toString()) ? calendar.month : date.month;
            date.day = typeof (date.day) === "undefined" || isNaN(date.day.toString()) ? calendar.day : date.day;
            cultured = typeof(cultured) === "undefined" ? false : cultured;;
            if (cultured) {
                calendar.setDate(date.year, date.month, date.day);
                selectedJulianDay = calendar.getJulianDay();
            } else {
                selectedJulianDay = gregorianToJd(date.year, date.month, date.day);
                calendar.setJulianDay(selectedJulianDay);
            }
            var dateStr = calendar.toString(dateFormat);
            settings.dateChanged(element, dateStr, calendar);
            if (typeof (element) !== "undefined") {
                element.val(dateStr);
            }
            renderDayView(settings);
        };

        function displaywheel(e) {
            //equalize event object
            var evt = window.event || e;
            //check for detail first so Opera uses that instead of wheelDelta
            var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
            if (delta > 0) {
                switch (currentView) {
                    case 0:
                        calendar.addMonth(1);
                        renderDayView(settings);
                        break;
                    case 1:
                        calendar.addYear(1);
                        renderMonth(settings);
                        break;
                    case 2:
                        renderYear(settings, endYear + 4);
                        break;
                }
            } else {
                switch (currentView) {
                    case 0:
                        calendar.addMonth(-1);
                        renderDayView(settings);
                        break;
                    case 1:
                        calendar.addYear(-1);
                        renderMonth(settings);
                        break;
                    case 2:
                        renderYear(settings, startYear - 7);
                        break;
                }
            }
            //disable default wheel action of scrolling page
            if (evt.preventDefault)
                evt.preventDefault();
            else
                return false;
        }

        function mouseWheelBinder(elm) {
            //FF doesn't recognize mousewheel as of FF3.x
            var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
            elm = $(elm).get(0);
            if (elm.attachEvent) //if IE (and Opera depending on user setting)
                elm.attachEvent("on" + mousewheelevt, displaywheel);
            else if (elm.addEventListener) //WC3 browsers
                elm.addEventListener(mousewheelevt, displaywheel, false);
        }

        function renderDayView(opts) {
            currentView = 0;
            $(container).empty().addClass("ui-vestadp-container");
            $(container).append(renderHeader(calendar.getMonthList()[calendar.month - 1] + " " + getNumber(calendar.year, opts.persianNumbers), 'view:month', opts));
            var calTable = $("<div></div>").addClass("ui-vestadp-calendar").css("direction", opts.direction).hide();
            var weekHeader = $("<div></div>").addClass('ui-vestadp-weekheader');
            var weekdays = calendar.getWeekdayList(true);
            for (var i = 0; i < weekdays.length; i++) {
                weekHeader.append($("<div></div>").addClass("ui-vestadp-weekday").text(weekdays[i]));
            }
            calTable.append(weekHeader);
            var jd = calendar.getJulianDay();
            calendar.goFirstOfMonth();
            var currentMonth = calendar.month;
            var firstdow = calendar.getWeekday();
            calendar.addDay(-1 * firstdow);
            for (i = 0; i < 6; i++) {
                var wrow = $("<div></div>");
                for (var j = 0; j < 7; j++) {
                    var wday = $("<div data-event='click' data-handler='date' data-args='day:" + calendar.day + ",month:" + calendar.month + "'></div>").addClass("ui-vestadp-day").text(getNumber(calendar.day, opts.persianNumbers));
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
                        if (typeof (element) !== "undefined" && !opts.showInline) {
                            element.val(dateStr);
                            container.slideUp("fast");
                        } else if (typeof (element) !== "undefined" && opts.showInline) {
                            $(".ui-vestadp-selected", calTable).removeClass("ui-vestadp-selected");
                            $(this).addClass("ui-vestadp-selected");
                        }
                        return;
                }
                calTable.fadeOut("fast", function () {
                    renderDayView(opts);
                });
            });
        }

        function renderHeader(title, args, opts) {
            var header = $('<div></div>').addClass('ui-vestadp-header');
            header.append($("<div data-event='click' data-handler='prev'></div>").addClass("ui-vestadp-prev").attr("title", opts.regional[opts.language].previous).text("«"));
            header.append($("<div data-event='click' data-handler='view' data-args='" + args + "'></div>").addClass("ui-vestadp-title").text(title));
            header.append($("<div data-event='click' data-handler='next'></div>").addClass("ui-vestadp-next").attr("title", opts.regional[opts.language].next).text("»"));
            return header;
        }

        function renderFooter(elm, opts) {
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
            currentView = 1;
            $(container).empty().addClass("ui-vestadp-container");
            $(container).append(renderHeader(getNumber(calendar.year, opts.persianNumbers), 'view:year', opts));
            var calTable = $("<table cellspacing='1'></table>").addClass("ui-vestadp-calendar").css("direction", opts.direction).hide();
            var mIndex = 0;
            var months = calendar.getMonthList(true);
            for (var i = 0; i < 3; i++) {
                var mrow = $("<tr></tr>").addClass("ui-vestadp-monthlist");
                for (var j = 0; j < 4; j++) {
                    var mcell = $("<td data-event='click' data-handler='view' data-args='view:cal,month:" + (mIndex + 1) + "'></td>").text(months[mIndex]);
                    if (calendar.month == mIndex + 1)
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
                calTable.fadeOut("fast", function () {
                    renderMonth(opts);
                });
            });
        }

        function renderYear(opts, year) {
            currentView = 2;
            $(container).empty().addClass("ui-vestadp-container");

            var calTable = $("<table cellspacing='1'></table>").addClass("ui-vestadp-calendar").css("direction", "ltr").hide();

            startYear = year - 4;
            endYear = year + 7;
            year = startYear;
            $(container).append(renderHeader(getNumber(startYear, opts.persianNumbers) + " - " + getNumber(endYear, opts.persianNumbers), '', opts));

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
                        calTable.fadeOut("fast", function () {
                            renderYear(opts, endYear + 4);
                        });
                        return;
                    case "prev":
                        calTable.fadeOut("fast", function () {
                            renderYear(opts, startYear - 7);
                        });
                        return;
                    case "view":
                        if (args["view"] == "month") {
                            calendar.setYear(parseInt(args["year"]));
                            calTable.fadeOut("fast", function () {
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

        function jdToGregorian(jd) {
            var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
                yindex, month, day, year, yearday, leapadj;

            var GREGORIAN_EPOCH = 1721425.5;
            wjd = Math.floor(jd - 0.5) + 0.5;
            depoch = wjd - GREGORIAN_EPOCH;
            quadricent = Math.floor(depoch / 146097);
            dqc = mod(depoch, 146097);
            cent = Math.floor(dqc / 36524);
            dcent = mod(dqc, 36524);
            quad = Math.floor(dcent / 1461);
            dquad = mod(dcent, 1461);
            yindex = Math.floor(dquad / 365);
            year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
            if (!((cent == 4) || (yindex == 4))) {
                year++;
            }
            var isLeap = ((year % 4) == 0) && (!(((year % 100) == 0) && ((year % 400) != 0)));
            yearday = wjd - gregorianToJd(year, 1, 1);
            leapadj = ((wjd < gregorianToJd(year, 3, 1)) ? 0 : (isLeap ? 1 : 2));
            month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
            day = (wjd - gregorianToJd(year, month, 1)) + 1;

            return { year: year, month: month, day: day };
        }

        function mod(a, b) {
            return a - (b * Math.floor(a / b));
        };

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
                lookAhead = function (match) {
                    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                    if (matches) {
                        iFormat++;
                    }
                    return matches;
                },
                // Extract a number from the string value
                getNumber = function (match) {
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
                getName = function (match, shortNames, longNames) {
                    var index = -1,
                        names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                            return [[k, v]];
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
                checkLiteral = function () {
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
                            if (lookAhead("'")) {
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

            if (iValue < value.length) {
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
        regional: {
            "fa": {
                today: "امروز",
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
        calendar: "persian", // [gregorian & persian] are available.
        dateChanged: function () { },
        showInline: false
    };

    window.VestaDatePicker = vestaDatePicker;
})();


(function ($) {
    $.fn.vestadp = function (method) {
        var methods = {
            init: function (options) {
                var opts = $.extend({}, VestaDatePicker.defaultSettings, options);
                return this.each(function (index, element) {
                    if ($(element).is(":text"))
                        methods._renderTextbox(element, opts);
                    else
                        methods._renderInline(element, opts);
                });
            },
            /*
                Selected date of date picker, 
                (1)cultured: if cultured is true it returns selected date 
                in according to selected calendar and dateFormat, if not it returns a normal
                javascript Date object which is gregorian in default system culture
                (2)dateFormat: if cultured is set this will be used as formatting string
            */
            getDate: function (cultured,dateFormat) {
                var vdp = methods._checkThrow(this);
                return vdp.getDate(cultured, dateFormat);
            },
            /*
                Set selected date of the date picker
                (1)date: is an object consisting a least one of the "year","month","day" properties for selected date
                (2)cultured: defines if entered date is in cultured system or default gregorian system
            */
            setDate: function (date, cultured) {
                var vdp = methods._checkThrow(this);
                return vdp.setDate(date, cultured);
            },
            /// checks whethear this element is already datepickerized or not
            _check: function (elm) {
                return $(elm).data("vestadp");
            },
            /// first does _check, if false, throws an exception
            _checkThrow: function (elm) {
                var vdp = methods._check(elm);
                if (typeof (vdp) === "undefined")
                    throw "Not vesta datepickerized yet!";
                return vdp;
            },
            _renderInline: function (element, opts) {
                if (methods._check())
                    return;
                // if user wants to run it over a DOM other than textbox showInline must be enabled
                opts.showInline = true;
                var divContainer = $("<div />").attr("data-rel", "vestadatepicker-inline");
                divContainer.appendTo("body");
                var vdp = new VestaDatePicker(divContainer, $(element), opts);
                $(element).data("vestadp", vdp);
                vdp.display();

                $(element).append(divContainer);
            },
            _renderTextbox: function (element, opts) {
                if (methods._check())
                    return;
                // if user wants to run it over a textbox showInline must be disabled
                opts.showInline = false;
                var divContainer = $("<div />").attr("data-rel", "vestadatepicker").css("position", "absolute");
                divContainer.appendTo("body");
                var vdp = new VestaDatePicker(divContainer, $(element), opts);
                $(element).data("vestadp", vdp);
                divContainer.hide();
                vdp.display($(element).val());

                $(element).focus(function () {
                    vdp.display($(this).val());
                    $("div[data-rel='vestadatepicker']").slideUp("fast");
                    var offset = $(this).offset();      
                    var elmWidth = $(this).outerWidth();
                    if (opts.direction=="rtl")
                        left = offset.left - (divContainer.outerWidth() - $(this).outerWidth()) +"px"
                    else
                        left = offset.left + "px";
                    divContainer.slideDown("fast");
                    divContainer.css({
                        position: "absolute",
                        top: offset.top+$(this).outerHeight()+"px",
                        left: left
                    });
                    
                })
                .on('input propertychange paste',function(){
                    vdp.display($(this).val());
                })
                .click(function (ev) {
                    ev.stopPropagation();
                });

                divContainer.click(function (ev) {
                    ev.stopPropagation();
                });

                $(document).click(function () {
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