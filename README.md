What is VestaDatePicker?
------------------------

VestaDatePicker is a multi-culture date picker in form of JQuery plugin that can be feed with your own custom calendar algorithms, as it is already included with some of the most known calendars such as "Gregorian", "Persian" and "Hijri".

![alt text](http://uupload.ir/files/o7p3_datepicker.jpg)

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
**Bower:**

```
bower install vestadp --save
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

Links
-------

Angular directive is also provided: ([Look here for the source](https://github.com/eleboys/ng-vestadp))

```
bower install ng-vestadp --save
```
