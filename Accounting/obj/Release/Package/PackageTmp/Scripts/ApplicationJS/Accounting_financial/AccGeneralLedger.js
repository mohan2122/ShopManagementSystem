//jQuery

(function ($) {
    $(document).ready(function () {
        var today = new Date();
        $('#accChequePayment_Issue_Date').datepicker({ dateFormat: "dd-mm-yy" });
        $('#accChequePayment_MaturityDate').datepicker({ dateFormat: "dd-mm-yy" });

        $('#accGeneralLedger_Debit').keyup(function () {
            if ($(this).val() != '') {
                $('#accGeneralLedger_Credit').val(parseFloat(this.value));
            }
        });

        $('#accGeneralLedger_PaymentTypeID').change(function () {
            if ($('#accGeneralLedger_PaymentTypeID').val() == '2') {
                $('#accChequePayment_BankID').attr('disabled', false);
                $('#accChequePayment_BranchID').attr('disabled', false);
                $('#accChequePayment_ChequeNo').attr('disabled', false);
                $('#accChequePayment_Issue_Date').attr('disabled', false);
                $('#accChequePayment_Cheque_Amount').attr('disabled', false);
                $('#accChequePayment_MaturityDate').attr('disabled', false);
                $('#btnAddChequePayment').attr('disabled', false);
            }
            else {
                $('#accChequePayment_BankID').attr('disabled', true);
                $('#accChequePayment_BranchID').attr('disabled', true);
                $('#accChequePayment_ChequeNo').attr('disabled', true);
                $('#accChequePayment_Issue_Date').attr('disabled', true);
                $('#accChequePayment_Cheque_Amount').attr('disabled', true);
                $('#accChequePayment_MaturityDate').attr('disabled', true);
                $('#btnAddChequePayment').attr('disabled', true);

                $('#accChequePayment_BankID').val('');
                $('#accChequePayment_BranchID').val('');
                $('#accChequePayment_ChequeNo').val('');
                $('#accChequePayment_Issue_Date').val('');
                $('#accChequePayment_Cheque_Amount').val('');
                $('#accChequePayment_MaturityDate').val('');
            }
        });


        $('#btnSave').click(function () {
            var retValue = fnSaveValidation();
            if (retValue == true) {
                $.ajax({
                    url: 'Save',
                    type: 'POST',
                    data: JSON.stringify({
                        mainledger: {
                            accGeneralLedger: {
                                LedgerID: '-', TrnID: $('#accGeneralLedger_TrnID').val(), TrnDate: today, VoucherNo: $('#accGeneralLedger_VoucherNo').val(), CompanyID: $('#accGeneralLedger_CompanyID').val(), AccProjectID: $('#accGeneralLedger_AccProjectID').val(), VoucherTypeID: $('#accGeneralLedger_VoucherTypeID').val(),
                                PaymentTypeID: $('#accGeneralLedger_PaymentTypeID').val(), AccountHeadID: $('#accGeneralLedger_AccountHeadID').val(), AccountHeadID1: $('#accGeneralLedger_AccountHeadID1').val(), Description: $('#accGeneralLedger_Description').val(), Debit: $('#accGeneralLedger_Debit').val(), Credit: 0, QuarterID: 0, BudgetID: 0
                            },
                            accChequePayment: {
                                ChequePayID: 0, Issue_Date: $('#accChequePayment_Issue_Date').val(), TrnID:'-', BankID: $('#accChequePayment_BankID').val(), BranchID: $('#accChequePayment_BranchID').val(),
                                ChequeNo: $('#accChequePayment_ChequeNo').val(), Cheque_Amount: $('#accChequePayment_Cheque_Amount').val(),
                                IsVoid: '-', MaturityDate: $('#accChequePayment_MaturityDate').val()
                            }
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        alert('Data Saved Successfully');
                        ClearAll();
                    }
                });
            }
        });
        //End Save
        //ClearAll
        function ClearAll() {
            $('#accGeneralLedger_CompanyID').val(""),
            $('#accGeneralLedger_AccProjectID').val(""),
            $('#accGeneralLedger_VoucherTypeID').val(""),
            $('#accGeneralLedger_PaymentTypeID').val(""),
            $('#accType_AccTypeID').val(""),
            $('#accGroup_AccGroupID').val(""),
            $('#accGeneralLedger_AccHeadID').val(""),
            $('#accType_AccTypeID1').val(""),
            $('#accGroup_AccGroupID1').val(""),
            $('#accGeneralLedger_AccHeadID1').val(""),
            $('#accGeneralLedger_Description').val(""),
            $('#accGeneralLedger_Debit').val(""),
            $('#accGeneralLedger_Credit').val(""),
            $('#accChequePayment_BankID').val(""),
            $('#accChequePayment_BranchID').val(""),
            $('#accChequePayment_ChequeNo').val(""),
            $('#accChequePayment_Cheque_Amount').val(""),
            $('#accChequePayment_Issue_Date').val(""),
            $('#accChequePayment_MaturityDate').val("")

        }

        //Textbox Validation

        $('#accGeneralLedger_CompanyID').change(function () {
            $('#accGeneralLedger_CompanyID').css('background-color', '');
        });

        $('#accGeneralLedger_AccProjectID').change(function () {
            $('#accGeneralLedger_AccProjectID').css('background-color', '');
        });
        $('#accGeneralLedger_VoucherTypeID').change(function () {
            $('#accGeneralLedger_VoucherTypeID').css('background-color', '');
        });
        $('#accGeneralLedger_PaymentTypeID').change(function () {
            $('#accGeneralLedger_PaymentTypeID').css('background-color', '');
        });
        $('#accType_AccTypeID').change(function () {
            $('#accType_AccTypeID').css('background-color', '');
        });
        $('#accGroup_AccGroupID').change(function () {
            $('#accGroup_AccGroupID').css('background-color', '');
        });
        $('#accGeneralLedger_AccHeadID').change(function () {
            $('#accGeneralLedger_AccHeadID').css('background-color', '');
        });
        $('#accType_AccTypeID1').change(function () {
            $('#accType_AccTypeID1').css('background-color', '');
        });
        $('#accGroup_AccGroupID1').change(function () {
            $('#accGroup_AccGroupID1').css('background-color', '');
        });
        $('#accGeneralLedger_AccHeadID1').change(function () {
            $('#accGeneralLedger_AccHeadID1').css('background-color', '');
        });
        $('#accGeneralLedger_Description').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accGeneralLedger_Debit').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accGeneralLedger_Credit').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#accChequePayment_BankID').change(function () {
            $('#accChequePayment_BankID').css('background-color', '');
        });

        $('#accChequePayment_BranchID').change(function () {
            $('#accChequePayment_BranchID').css('background-color', '');
        });

        $('#accChequePayment_ChequeNo').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accChequePayment_Cheque_Amount').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accChequePayment_Issue_Date').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accChequePayment_MaturityDate').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });


        function fnSaveValidation() {

            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            if ($('#accGeneralLedger_CompanyID').val() == 0) {
                alert('Please select company');
                $('#accGeneralLedger_CompanyID').css('background-color', 'red');
                $('#accGeneralLedger_CompanyID').focus();
                return false;
            }
            if ($('#accGeneralLedger_AccProjectID').val() == 0) {
                alert('Please select Project');
                $('#accGeneralLedger_AccProjectID').css('background-color', 'red');
                $('#accGeneralLedger_AccProjectID').focus();
                return false;
            }
            if ($('#accGeneralLedger_VoucherTypeID').val() == 0) {
                alert('Please select VoucherType');
                $('#accGeneralLedger_VoucherTypeID').css('background-color', 'red');
                $('#accGeneralLedger_VoucherTypeID').focus();
                return false;
            }
            if ($('#accGeneralLedger_PaymentTypeID').val() == 0) {
                alert('Please select PaymentType');
                $('#accGeneralLedger_PaymentTypeID').css('background-color', 'red');
                $('#accGeneralLedger_PaymentTypeID').focus();
                return false;
            }
            if ($('#accType_AccTypeID').val() == 0) {
                alert('Please select Account Type');
                $('#accType_AccTypeID').css('background-color', 'red');
                $('#accType_AccTypeID').focus();
                return false;
            }
            if ($('#accGroup_AccGroupID').val() == 0) {
                alert('Please select Account Group');
                $('#accGroup_AccGroupID').css('background-color', 'red');
                $('#accGroup_AccGroupID').focus();
                return false;
            }

            if ($('#accGeneralLedger_AccHeadID').val() == 0) {
                alert('Please select Debit Account');
                $('#accGeneralLedger_AccHeadID').css('background-color', 'red');
                $('#accGeneralLedger_AccHeadID').focus();
                return false;
            }
            if ($('#accType_AccTypeID1').val() == 0) {
                alert('Please select Account Type');
                $('#accType_AccTypeID1').css('background-color', 'red');
                $('#accType_AccTypeID1').focus();
                return false;
            }
            if ($('#accGroup_AccGroupID1').val() == 0) {
                alert('Please select Account Group');
                $('#accGroup_AccGroupID1').css('background-color', 'red');
                $('#accGroup_AccGroupID1').focus();
                return false;
            }
            if ($('#accGeneralLedger_AccHeadID1').val() == 0) {
                alert('Please select Credit Account');
                $('#accGeneralLedger_AccHeadID1').css('background-color', 'red');
                $('#accGeneralLedger_AccHeadID1').focus();
                return false;
            }
            if ($('#accGeneralLedger_Description').val() == '') {
                $('#accGeneralLedger_Description').focus();
                return false;
            }
            if ($('#accGeneralLedger_Debit').val() == '') {
                $('#accGeneralLedger_Debit').focus();
                return false;
            }
            if ($('#accGeneralLedger_Credit').val() == '') {
                $('#accGeneralLedger_Credit').focus();
                return false;
            }
            if ($('#accGeneralLedger_PaymentTypeID').val() == '2') {
                if ($('#accChequePayment_BankID').val() == 0) {
                    alert('Please select Bank Name');
                    $('#accChequePayment_BankID').css('background-color', 'red');
                    $('#accChequePayment_BankID').focus();
                    return false;
                }
                if ($('#accChequePayment_BranchID').val() == 0) {
                    alert('Please select Branch Name');
                    $('#accChequePayment_BranchID').css('background-color', 'red');
                    $('#accChequePayment_BranchID').focus();
                    return false;
                }
                if ($('#accChequePayment_ChequeNo').val() == '') {
                    $('#accChequePayment_ChequeNo').focus();
                    return false;
                }
                if ($('#accChequePayment_Cheque_Amount').val() == '') {
                    $('#accChequePayment_Cheque_Amount').focus();
                    return false;
                }

                if ($('#accChequePayment_Issue_Date').val() == '') {
                    $('#accChequePayment_Issue_Date').focus();
                    return false;
                }
                if ($('#accChequePayment_MaturityDate').val() == '') {
                    $('#accChequePayment_MaturityDate').focus();
                    return false;
                }
            }

            return true;
        }

        //End Textbox Validation


        //  Charcode Validation for Debit Balance

        $('#accGeneralLedger_Debit').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 18) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 18');
                    return false;
                }
            }


            // one decimal Validation

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '.') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 46) {
                            alert('Only One decimal point is allowed');
                            return false;
                        }
                    }
                }
            }

            //end 


            if (charcode == 8) {
                return true;
            }
            if (charcode == 46) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        // End  charcode for Open Debit Balance


        // Check charcode for Open Credit Balance


        $('#accGeneralLedger_Credit').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 18) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 18');
                    return false;
                }
            }


            //check one decimal

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '.') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 46) {
                            alert('Only One decimal point is allowed');
                            return false;
                        }
                    }
                }
            }

            //end of check decimal

            if (charcode == 8) {
                return true;
            }
            if (charcode == 46) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        // End  charcode for Open Credit Balance


        //check charcode for Description

        $('#accGeneralLedger_Description').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 50) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 50');
                    return false;
                }
            }
        });

        //end charcode for Description

    });
})(jQuery);