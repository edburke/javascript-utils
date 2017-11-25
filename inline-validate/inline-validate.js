/*
 * Validate
 * Simple inline form validation
 */
(function($) {
    $.fn.validate = function(options) {
        opts = $.extend({}, $.fn.validate.defaults, options);
        var utils = {
            log: function log(s) {
                console.log(s);
            },
            validate: function validate(e, type) {
                if (utils.check(e.val(), type)) {
                    utils.valid(e);
                }
                else {
                    utils.invalid(e);
                }
            },
            check: function check(v, type) {
                if (type === 'email') {
                    return utils.checkNotEmpty(v) && utils.checkEmail(v);
                }
                else if (type === 'number') {
                    return utils.checkNotEmpty(v) && utils.checkNumber(v);
                }
                return utils.checkNotEmpty(v);
            },
            checkNotEmpty: function checkNotEmpty(v) {
                var regex = /^\s*$/;
                return (!v || regex.test(v)) ? false : true;
            },
            checkEmail: function checkEmail(v) {
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(v);
            },
            checkNumber: function checkNumber(v) {
                var regex = /^[0-9]+$/;
                return regex.test(v);
            },
            invalid: function invalid(e) {
                e.prev('.form-validation-msg').remove();
                e.before('<span class="form-validation-msg">'  + utils.createMsg(e) + '</span>');
            },
            valid: function valid(e) {
                e.prev('.form-validation-msg').remove();
            },
            createMsg: function createMsg(e) {
                if (typeof e.data('validation-msg') === "undefined") {
                    return opts.msg;
                }
                else {
                    return e.data('validation-msg');
                }
            }
        }
        this.each(function() {
            $(this).find('input,select').each(function() {
                $(this).blur(function() {
                    $(this).data('checked', 'checked');
                    utils.validate($(this), $(this).data('validation-type'));
                });
                $(this).data('oldVal', $(this).val());
                $(this).bind("propertychange change click keyup input paste", function(event){
                    if ($(this).data('checked') && $(this).data('oldVal') != $(this).val()) {
                        $(this).data('oldVal', $(this).val());
                        utils.validate($(this), $(this).data('validation-type'));
                    }
                });
            });
        });
        return this;
    };
    $.fn.validate.defaults = {
        msg: 'Please fill in this field'
    };
    $(function() {
        $('form[data-validate]').validate();
    });
})(jQuery);