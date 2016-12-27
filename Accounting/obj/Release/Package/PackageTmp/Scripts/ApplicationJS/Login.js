

$(document).ready(function () {

    $('#btnLogin').click(function () {
        if ($('#UserID').val() == "") {
            alert('User ID can not be blank');
            $('#UserID').focus();
            return false;
        }
        if ($('#Password').val() == "") {
            alert('Password can not be blank');
            $('#Password').focus();
            return false;
        }
        $.ajax({
            url: 'LoginTest',
            type: 'POST',
            data: { UserID: $('#UserID').val(), Password: $('#Password').val() },
            success: function (data) {
                if (data == 1) {
                    location.href = '/Accounting_Financial/PaymentType'
                }
                else {
                    alert('UserID or Password are not valid');
                }
            }
        });
    });
    $('#btnCancel').click(function () {
        $('#UserID').val("");
        $('#Password').val("");
    });

});