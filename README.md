# VestaDatePicker

VestaDatePicker is a multi-culture javascript date picker in form of a plain javascript class (vanilla) that can be feed with your own custom calendar algorithms, as it is already included with some of the most known calendars such as "Gregorian", "Persian" and "Hijri".

What makes this datepicker so different from other libraries is that you can have all cultures and all different datepicker algorithm at the same time in a page or hot switch the culture of an input without any js refresh/cleanup or page postback. this is mostly useful when you are using modern SPA frameworks and you may change the app culture/language just from client side.

![alt text](http://uupload.ir/files/o7p3_datepicker.jpg)

you can see the [demo from here](https://vestadp-fe09a.web.app/)


## Features

1. Multi-culture calendars
2. Themable and Sass support
3. Gregorian and Persian and Hijri is available
4. Can support every custom calendar you need (calendar interface must be implemented)
5. No need to change js file for different calendars
6. Multiple calendar algorithms can be used in a page at same time
7. Inline and Input Datepicker
8. LTR and RTL support
9. Different design for small screens
10. No dependency to other JS library (Vanilla JS)
11. Light weight (~15k gzipped)
12. Hot switch between calenders using API

## Installation

```
> npm install
> npm run build
> npm run serve
```

**Usage:**

```html

    <link href="VestaDatePicker.css" type="text/css" rel="stylesheet" />
    <script src="vesta-date-picker.js"></script>
    <script src="vesta-date-picker.persian.js"></script>
    <script src="vesta-date-picker.gregorian.js"></script>
    <script src="vesta-date-picker.hijri.js"></script>
```

```javascript
    var dp1 = new VestaDatePicker(document.getElementById("input1"), {
        dateFormat : "D dd M yy",
        direction: "ltr",
        showFooter: false,
        persianNumbers: false,
        language: 'en',
        calendar: "gregorian"
    });

    var dp2 = new VestaDatePicker(document.getElementById("input2"), {
        dateChanged: function (elm, dateStr) {
            $("#pdate").text(dateStr);  // formatted date
        }
    });
    
    // automatic inline calendar
    var dp2 = new VestaDatePicker(document.getElementById("div1"), {                
        dateFormat : "DD dd MM yy" ,
        dateChanged: function(elm, dateStr, calendar){
            var date = dp2.getDate(); // original javascript date object
            alert(date);
        }
    });
```

## Default Options

```javascript
{
    direction: "rtl",
    dateFormat: "", // default dateFormat of each calendar
    showFooter: true,
    persianNumbers: true,
    regional: {
        "fa": {
            today: "امروز",
            clear: "پاکن",
            previous: "قبلی",
            next: "بعدی",
            previousBtn: "«",
            nextBtn: "»"
        },
        "en": {
            today: "Today",
            clear: "Clear",
            previous: "Previous",
            next: "Next",
            previousBtn: "«",
            nextBtn: "»"
        },
        "ar": {
            today: "الیوم",
            clear: "واضح",
            previous: "سابق",
            next: "التالی",
            previousBtn: "«",
            nextBtn: "»"
        }
    },
    language: 'fa',
    calendar: null, // eg: VestaDatePicker.calendars.persian|hijri|gregorian
    dateChanged: function () { },
    minDate: null,
    maxDate: null
}
```

Links
-------

Angular directive is also provided: ([Look here for the source](https://github.com/eleboys/ng-vestadp))
