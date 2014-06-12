//Demo CalendarEvents

(function() {
    var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

    this.CalendarEvent = (function() {

        function CalendarEvent(container, add) {
            var input;
            this.container = container;
            this.makeFullCalendarEventObject = __bind(this.makeFullCalendarEventObject, this);

            this.handleDoubleClick = __bind(this.handleDoubleClick, this);

            this.finalizeEvent = __bind(this.finalizeEvent, this);

            this.handleInputBlur = __bind(this.handleInputBlur, this);

            this.handleInputKeyup = __bind(this.handleInputKeyup, this);

            this.container.bind("dblclick", this.handleDoubleClick);
            if (add != null) {
                input = this.container.find("input");
                input.focus();
                input.bind("keyup", this.handleInputKeyup);
                input.bind("blur", this.handleInputBlur);
            } else {
                this.makeFullCalendarEventObject();
            }
        }

        CalendarEvent.prototype.handleInputKeyup = function(e) {
            var input;
            input = $(e.target);
            if (e.keyCode === 13) {
                if (input.val().length === 0) {
                    return this.container.remove();
                } else {
                    return this.finalizeEvent(input.val());
                }
            }
        };

        CalendarEvent.prototype.handleInputBlur = function(e) {
            var input;
            input = $(e.target);
            if (input.val().length === 0) {
                return this.container.remove();
            } else {
                return this.finalizeEvent(input.val());
            }
        };

        CalendarEvent.prototype.finalizeEvent = function(val) {
            this.container.find("a").html(val);
            return this.makeFullCalendarEventObject();
        };

        CalendarEvent.prototype.handleDoubleClick = function(e) {
            var input, link, oldval,
                _this = this;
            input = $("<input type='text'>");
            link = $(e.target);
            oldval = link.text();
            input.val(oldval);
            link.html(input);
            input.focus();
            input.bind("keyup", function(e) {
                if (e.keyCode === 13) {
                    if (input.val().length > 0) {
                        link.html(input.val());
                        return _this.makeFullCalendarEventObject();
                    } else {
                        return link.html(oldval);
                    }
                }
            });
            return input.bind("blur", function(e) {
                if (input.val().length > 0) {
                    link.html(input.val());
                    return _this.makeFullCalendarEventObject();
                } else {
                    return link.html(oldval);
                }
            });
        };

        CalendarEvent.prototype.makeFullCalendarEventObject = function() {
            var eventObject, link;
            link = $(this.container);
            eventObject = {
                title: $.trim(link.text())
            };
            link.data('eventObject', eventObject);
            return link.draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0
            });
        };

        return CalendarEvent;

    })();

    this.CalendarEvents = (function() {

        function CalendarEvents(container) {
            this.container = container;
            this.handleAddLink = __bind(this.handleAddLink, this);

            this.addLink = this.container.find("#add-event");
            this.container.find("a.external-event").each(function() {
                return new CalendarEvent($(this));
            });
            this.template = "<li><a class='external-event'><input type='text'></a></li>";
            this.addLink.bind("click", this.handleAddLink);
        }

        CalendarEvents.prototype.handleAddLink = function() {
            var view;
            view = $(this.template);
            view.insertBefore(this.addLink.parent());
            return new CalendarEvent(view, true);
        };

        return CalendarEvents;

    })();

}).call(this);


function setServerName(card) {
    var host = $("#new-server-fqdn").val();
    var name = $("#new-server-name").val();
    var displayName = host;

    if (name) {
        displayName = name + " ("+host+")";
    };

    card.wizard.setSubtitle(displayName);
    card.wizard.el.find(".create-server-name").text(displayName);
}

function validateIP(ipaddr) {
    //Remember, this function will validate only Class C IP.
    //change to other IP Classes as you need
    ipaddr = ipaddr.replace(/\s/g, "") //remove spaces for checking
    var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; //regex. check for digits and in
    //all 4 quadrants of the IP
    if (re.test(ipaddr)) {
        //split into units with dots "."
        var parts = ipaddr.split(".");
        //if the first unit/quadrant of the IP is zero
        if (parseInt(parseFloat(parts[0])) == 0) {
            return false;
        }
        //if the fourth unit/quadrant of the IP is zero
        if (parseInt(parseFloat(parts[3])) == 0) {
            return false;
        }
        //if any part is greater than 255
        for (var i=0; i<parts.length; i++) {
            if (parseInt(parseFloat(parts[i])) > 255){
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

function validateFQDN(val) {
    return /^[a-z0-9-_]+(\.[a-z0-9-_]+)*\.([a-z]{2,4})$/.test(val);
}

function fqdn_or_ip(el) {
    var val = el.val();
    ret = {
        status: true
    };
    if (!validateFQDN(val)) {
        if (!validateIP(val)) {
            ret.status = false;
            ret.msg = "Invalid IP address or FQDN";
        }
    }
    return ret;
}

//Demo Wizard

$(function() {
    $.fn.wizard.logging = true;



    if ($("#wizard-demo").length > 0) {

        var wizard = $("#wizard-demo").wizard();

        wizard.el.find(".wizard-ns-select").change(function() {
            wizard.el.find(".wizard-ns-detail").show();
        });

        wizard.el.find(".create-server-service-list").change(function() {
            var noOption = $(this).find("option:selected").length == 0;
            wizard.getCard(this).toggleAlert(null, noOption);
        });

        wizard.cards["name"].on("validated", function(card) {
            var hostname = card.el.find("#new-server-fqdn").val();
        });

        wizard.on("submit", function(wizard) {
            var submit = {
                "hostname": $("#new-server-fqdn").val()
            };

            setTimeout(function() {
                wizard.trigger("success");
                wizard.hideButtons();
                wizard._submitting = false;
                wizard.showSubmitCard("success");
                wizard._updateProgressBar(0);
            }, 2000);
        });

        wizard.on("reset", function(wizard) {
            wizard.setSubtitle("");
            wizard.el.find("#new-server-fqdn").val("");
            wizard.el.find("#new-server-name").val("");
        });

        wizard.el.find(".wizard-success .im-done").click(function() {
            wizard.reset().close();
        });

        wizard.el.find(".wizard-success .create-another-server").click(function() {
            wizard.reset();
        });

        $(".wizard-group-list").click(function() {
            alert("Disabled for demo.");
        });

        $("#open-wizard").click(function() {
            wizard.show();
        });

        wizard.show();
    }


});

//Boostrap editable demo

$(function(){

    //defaults
    $.fn.editable.defaults.url = '/';

    //enable / disable
    $('#enable').click(function() {
        $('#user .editable').editable('toggleDisabled');
    });

    //editables
    $('#username').editable({
        type: 'text',
        pk: 1,
        name: 'username',
        title: 'Enter username'
    });

    $('#firstname').editable({
        validate: function(value) {
            if($.trim(value) == '') return 'This field is required';
        }
    });

    $('#sex').editable({
        prepend: "not selected",
        source: [
            {value: 1, text: 'Male'},
            {value: 2, text: 'Female'}
        ],
        display: function(value, sourceData) {
            var colors = {"": "gray", 1: "green", 2: "blue"},
                elem = $.grep(sourceData, function(o){return o.value == value;});

            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });

    $('#status').editable();

    $('#group').editable({
        showbuttons: false
    });

    $('#vacation').editable({
        datepicker: {
            todayBtn: 'linked'
        }
    });

    $('#dob').editable();

    $('#event').editable({
        placement: 'right',
        combodate: {
            firstItem: 'name'
        }
    });

    $('#meeting_start').editable({
        format: 'yyyy-mm-dd hh:ii',
        viewformat: 'dd/mm/yyyy hh:ii',
        validate: function(v) {
            if(v && v.getDate() == 10) return 'Day cant be 10!';
        },
        datetimepicker: {
            todayBtn: 'linked',
            weekStart: 1
        }
    });

    $('#comments').editable({
        showbuttons: 'bottom'
    });

    $('#note').editable();
    $('#pencil').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('#note').editable('toggle');
    });

    $('#state').editable({
        source: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]
    });

    $('#fruits').editable({
        pk: 1,
        limit: 3,
        source: [
            {value: 1, text: 'banana'},
            {value: 2, text: 'peach'},
            {value: 3, text: 'apple'},
            {value: 4, text: 'watermelon'},
            {value: 5, text: 'orange'}
        ]
    });

    $('#tags').editable({
        inputclass: 'input-large',
        select2: {
            tags: ['html', 'javascript', 'css', 'ajax'],
            tokenSeparators: [",", " "]
        }
    });

    var countries = [];
    $.each({"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Bartelemey", "BM": "Bermuda", "BN": "Brunei Darussalam", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "O1": "Other Country", "LV": "Latvia", "RW": "Rwanda", "RS": "Serbia", "TL": "Timor-Leste", "RE": "Reunion", "LU": "Luxembourg", "TJ": "Tajikistan", "RO": "Romania", "PG": "Papua New Guinea", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "BZ": "Belize", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "TM": "Turkmenistan", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "RU": "Russian Federation", "EE": "Estonia", "EG": "Egypt", "TK": "Tokelau", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "EU": "Europe", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova, Republic of", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania, United Republic of", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "FX": "France, Metropolitan", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands (Malvinas)", "FM": "Micronesia, Federated States of", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "CI": "Cote d'Ivoire", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos (Keeling) Islands", "CA": "Canada", "CG": "Congo", "CF": "Central African Republic", "CD": "Congo, The Democratic Republic of the", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syrian Arab Republic", "KG": "Kyrgyzstan", "KE": "Kenya", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "Korea, Republic of", "SI": "Slovenia", "KP": "Korea, Democratic People's Republic of", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "Virgin Islands, British", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Lao People's Democratic Republic", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "A1": "Anonymous Proxy", "TO": "Tonga", "LT": "Lithuania", "A2": "Satellite Provider", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libyan Arab Jamahiriya", "VA": "Holy See (Vatican City State)", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "Virgin Islands, U.S.", "IS": "Iceland", "IR": "Iran, Islamic Republic of", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AN": "Netherlands Antilles", "AQ": "Antarctica", "AP": "Asia/Pacific Region", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}, function(k, v) {
        countries.push({id: k, text: v});
    });
    $('#country').editable({
        source: countries,
        select2: {
            width: 200
        }
    });



    $('#address').editable({
        url: '/post',
        value: {
            city: "Moscow",
            street: "Lenina",
            building: "12"
        },
        validate: function(value) {
            if(value.city == '') return 'city is required!';
        },
        display: function(value) {
            if(!value) {
                $(this).empty();
                return;
            }
            var html = '<b>' + $('<div>').text(value.city).html() + '</b>, ' + $('<div>').text(value.street).html() + ' st., bld. ' + $('<div>').text(value.building).html();
            $(this).html(html);
        }
    });

    $('#user .editable').on('hidden', function(e, reason){
        if(reason === 'save' || reason === 'nochange') {
            var $next = $(this).closest('tr').next().find('.editable');
            if($('#autoopen').is(':checked')) {
                setTimeout(function() {
                    $next.editable('show');
                }, 300);
            } else {
                $next.focus();
            }
        }
    });

});