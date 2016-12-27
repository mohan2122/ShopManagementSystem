//jQuery

(function ($) {
    $(document).ready(function () {

        var today = new Date();
        var accBudgetDetails1 = [];
        var countBudget = 0;

        $('#accBudget_BudgetDate').datepicker({ dateFormat: "dd-mm-yy" });
        //$('#tblAccBudget').append(localStorage.Name);
        //accBudgetDetails1.push(localStorage.Name);

        $('#btnAdd').click(function () {
            ClickCount = 0;
            var retValue = fnBdgValidation();
            if (retValue == true) {
                countBudget = countBudget + 1;
                var trItem = '<tr><td>' + countBudget + '</td><td>' + $('#accBudgetDetail_AccHeadID').val() + '</td><td>' + $('#accBudgetDetail_Description').val() + '</td><td>' + $('#accBudgetDetail_Amount').val() + '</td><td>';
                trItem += '</td><td><input type=button id=btnEdit value=Edit></td><td><input type=button id=btnDelete value=Delete></td></tr>';
               // localStorage.Name += trItem;
                $('#tblAccBudget').append(trItem);
                var params = {
                    BudgetDetailId: countBudget, BudgetID: 0, AccHeadID: $('#accBudgetDetail_AccHeadID').val(), Description: $('#accBudgetDetail_Description').val(), Amount: $('#accBudgetDetail_Amount').val()
                }
                accBudgetDetails1.push(params);
                //ClearAll();
            }

            $('#tblAccBudget tbody tr td #btnEdit').click(function () {
                var Row = $(this).parent().parent();
                var Colunm = $(Row).find('td');

                countProduct = parseInt($(Colunm[0]).text()) - 1;
                //$('#accBudget_BudgetID').val($(Colunm[1]).text());
                $('#accBudgetDetail_AccHeadID').val($(Colunm[1]).text());
                $('#accBudgetDetail_Description').val($(Colunm[2]).text());
                if (Number($(Colunm[3]).text()) > 0) {
                    $('#accBudgetDetail_Amount').val($(Colunm[3]).text());
                    accBudgetDetails1.splice(parseInt($(Colunm[0]).text()) - 1, 1);
                }
                $(Row).remove();
            });
            $('#tblAccBudget tbody tr td #btnDelete').click(function () {
                var Row = $(this).parent().parent();
                var Colunm = $(Row).find('td');
                accBudgetDetails1.splice(parseInt($(Colunm[0]).text()) - 1, 1);
                $(Row).remove();
            });
        });

        

        //Save

        $('#btnSave').click(function () {
            //var retValue = fnSaveValidation();
            //if (retValue == true) {
            var x = confirm("Are you sure you want to save this?")
            if (x == true) {
                $.ajax({
                    url: 'Save',
                    type: 'POST',
                    data: JSON.stringify({
                        mainBudget: {
                            accBudget: {
                                BudgetID: '-', CompanyID: $('#accBudget_CompanyID').val(), BudgetFor: $('#accBudget_BudgetFor').val(),
                                BudgetDate: $('#accBudget_BudgetDate').val(), TotalAmount: 0
                            },
                            accBudgetDetails: accBudgetDetails1,
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        alert('Data Saved Successfully');
                        ClearAll();
                    }
                });
            }
            //}
        });

        //Textbox Validation

        $('#accBudgetDetail_AccHeadID').change(function () {
            $('#accBudgetDetail_AccHeadID').css('background-color', '');
        });

        $('#accBudgetDetail_Description').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#accBudgetDetail_Amount').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        function fnBdgValidation() {

            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });
            if ($('#accBudget_CompanyID').val() == 0) {
                alert('Please select company');
                $("#accBudget_CompanyID").css('background-color', 'red');
                $('#accBudget_CompanyID').focus();
                return false;
            }
            if ($('#accBudget_BudgetFor').val() == '') {
                alert('Please enter budget purpose');
               // $("#accBudget_BudgetFor").css('background-color', 'red');
                $('#accBudget_BudgetFor').focus();
                return false;
            }
            if ($('#accBudget_BudgetDate').val() == '') {
                alert('Please enter budget date');
                //$("#accBudget_BudgetDate").css('background-color', 'red');
                $('#accBudget_BudgetDate').focus();
                return false;
            }
            if ($('#accBudgetDetail_AccHeadID').val() == 0) {
                alert('Please select account type');
                $("#accBudgetDetail_AccHeadID").css('background-color', 'red');
                $('#accBudgetDetail_AccHeadID').focus();
                return false;
            }
    /*
            if ($('#accBudgetDetail_Description').val() == '') {
                $('#accBudgetDetail_Description').focus();
                return false;
            }
    */
            if ($('#accBudgetDetail_Amount').val() == '') {
                alert('Please enter budget amount');
                //$("#accBudgetDetail_Amount").css('background-color', 'red');
                $('#accBudgetDetail_Amount').focus();
                return false;
            }
            return true;
        }


        $('#accBudget_CompanyID').change(function () {
            $('#accBudget_CompanyID').css('background-color', '');
        });

        $('#accBudget_BudgetFor').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#accBudget_BudgetDate').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accBudgetDetail_AccHeadID').change(function () {
            $('#accBudgetDetail_AccHeadID').css('background-color', '');
        });

        $('#accBudgetDetail_Description').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#accBudgetDetail_Amount').bind('keypress', function (evt) {
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

            if ($('#accBudget_CompanyID').val() == 0) {
                alert('Please select company');
                $("#accBudget_CompanyID").css('background-color', 'red');
                $('#accBudget_CompanyID').focus();
                return false;
            }

            if ($('#accBudget_BudgetFor').val() == '') {
                $('#accBudget_BudgetFor').focus();
                return false;
            }

            if ($('#accBudget_BudgetDate').val() == '') {
                $('#accBudget_BudgetDate').focus();
                return false;
            }
            if ($('#accBudgetDetail_AccHeadID').val() == 0) {
                alert('Please select AccountHeadID');
                $("#accBudgetDetail_AccHeadID").css('background-color', 'red');
                $('#accBudgetDetail_AccHeadID').focus();
                return false;
            }

            if ($('#accBudgetDetail_Description').val() == '') {
                $('#accBudgetDetail_Description').focus();
                return false;
            }

            if ($('#accBudgetDetail_Amount').val() == '') {
                $('#accBudgetDetail_Amount').focus();
                return false;
            }
            return true;
        }


        //End Textbox Validation


        function ClearAll() {
            $('#accBudget_CompanyID').val(""),
            $('#accBudget_BudgetFor').val(""),
            $('#accBudget_BudgetDate').val(""),
            $('#accBudgetDetail_AccHeadID').val(""),
            $('#accBudgetDetail_Description').val(""),
            $('#accBudgetDetail_Amount').val("")
        }

        //  Charcode Validation for accBudgetDetail_Amount

        $('#accBudgetDetail_Amount').bind('keypress', function (evt) {
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

        // End  charcode for accBudgetDetail_Amount

    });
})(jQuery);