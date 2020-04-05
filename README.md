About VestaDatePicker?
------------------------

VestaDatePicker is a multi-culture javascript date picker in form of JQuery plugin that can be feed with your own custom calendar algorithms, as it is already included with some of the most known calendars such as "Gregorian", "Persian" and "Hijri".

What makes this datepicker so different from other libraries is that you can have all cultures and all different datepicker allgoritm at the same time in a page or hot switch the culture of an input without any js referesh/cleanup or page postback. this is mostly usefull when you are using modern SPA frameworks and you may change the app culture/language just from client side.

![alt text](http://uupload.ir/files/o7p3_datepicker.jpg)

you can see the [demo from here](https://vestadp-fe09a.web.app/)


Features
--------
1. Multiculture callendars
2. Themable and Sass support
3. Gregorian and Persian and Hijri is available
4. Can support every custom callendar you need (callendar interface must be implemented)
5. No need to change js file for different callendars
6. Multiple calendar algoritms can be used in a page at same time
7. Inline and Input Datepicker
8. LTR and RTL support
9. Diffrent design for small screens

Installation
---------------

```
> npm install
> npm run bower
> npm run start
```

**Usage:**

```html

    <link href="VestaDatePicker.css" type="text/css" rel="stylesheet" />
    <script src="jquery.min.js"></script>
    <script src="VestaDatePicker.gregorian.js"></script>
    <script src="VestaDatePicker.persian.js"></script>
    <script src="VestaDatePicker.js"></script>
```

```javascript
    $("#input1").vestadp({
        dateFormat : "D dd M yy",
        direction: "ltr",
        showFooter: false,
        persianNumbers: false,
        language: 'en',
        calendar: "gregorian"
    });

    $("#input2").vestadp({
        dateChanged: function (elm, dateStr) {
            $("#pdate").text(dateStr);  // formated date
        }
    });
    
    $("#input3").vestadp({                
        dateFormat : "DD dd MM yy" ,
        dateChanged: function(elm, dateStr, calendar){
            var date = elm.vestadp('getDate'); // original javascript date object
            alert(date);
        }
    });
```

Default Options
-------------
```javascript
{
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
        },
        "ar": {
            today: "الیوم",
            clear: "واضح",
            previous: "سابق",
            next: "التالی"
        }
    },
    language: 'fa',
    calendar: "persian", // [gregorian & persian & hijri] are available.
    dateChanged: function () { },
    minDate: null,
    maxDate: null,
    animation: 'fade',
    showInline: false
}
```

Links
-------

Angular directive is also provided: ([Look here for the source](https://github.com/eleboys/ng-vestadp))
