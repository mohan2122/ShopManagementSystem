//jQuery

(function ($) {
    $(document).ready(function () {

        var today = new Date();
        var accQuarterBudgetDetails1 = [];
        var countBudget = 0;

        $('#accQuarterBudget_StartDate').datepicker({ dateFormat: "dd-mm-yy" });
        $('#accQuarterBudget_EndDate').datepicker({ dateFormat: "dd-mm-yy" });


        $('#btnAdd').click(function () {
            ClickCount = 0;
            var retValue = fnBdgValidation();
            if (retValue == true) {
                countBudget = countBudget + 1;
                var trItem = '<tr><td>' + countBudget + '</td><td>' + $('#accQuarterBudgetDetail_AccHeadID').val()  + '</td><td>' + $('#accQuarterBudgetDetail_Amount').val() + '</td><td>';
                trItem += '</td><td><input type=button id=btnEdit value=Edit></td><td><input type=button id=btnDelete value=Delete></td></tr>';
                $('#tblAccQBudget').append(trItem);
                var params = {
                    BudgetDetailId: countBudget, QBudgetID: 0, AccHeadID: $('#accQuarterBudgetDetail_AccHeadID').val(), Amount: $('#accQuarterBudgetDetail_Amount').val()
                }
                accQuarterBudgetDetails1.push(params);
            }

            $('#tblAccQBudget tbody tr td #btnEdit').click(function () {
                var Row = $(this).parent().parent();
                var Colunm = $(Row).find('td');

                countProduct = parseInt($(Colunm[0]).text()) - 1;
                $('#accQuarterBudgetDetail_AccHeadID').val($(Colunm[1]).text());
                //$('#accBudgetDetail_Description').val($(Colunm[2]).text());
                if (Number($(Colunm[2]).text()) > 0) {
                    $('#accQuarterBudgetDetail_Amount').val($(Colunm[2]).text());
                    accQuarterBudgetDetails1.splice(parseInt($(Colunm[0]).text()) - 1, 1);
                }
                $(Row).remove();
            });
        });

        //Save

        $('#btnSave').click(function () {
            var retValue = fnSaveValidation();
            if (retValue == true) {
                $.ajax({
                    url: 'Save',
                    type: 'POST',
                    data: JSON.stringify({
                        mainQuarterBudget: {
                            accQuarterBudget: {
                                QBudgetID: 0, CompanyID: $('#accQuarterBudget_CompanyID').val(), Quarter: $('#accQuarterBudget_Quarter').val(),
                                BudgetID: $('#accQuarterBudget_BudgetID').val(), StarttDate: $('#accQuarterBudget_StarttDate').val(), EndDate: $('#accQuarterBudget_EndDate').val(), TotalAmount: 0
                            },
                            accQuarterBudgetDetails: accQuarterBudgetDetails1,
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        alert('Data Saved Successfully');
                    }
                });
            }
        });

        //Textbox Validation

        $('#accQuarterBudgetDetail_AccHeadID').change(function () {
            $('#accQuarterBudgetDetail_AccHeadID').css('background-color', '');
        });

        //$('#accQuarterBudgetDetail_Description').bind('keypress', function (evt) {
        //    var chharcode = evt.which;
        //    if (chharcode != '') {
        //        $(this).css('border-color', '');
        //    }
        //});

        $('#accQuarterBudgetDetail_Amount').bind('keypress', function (evt) {
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

            if ($('#accQuarterBudgetDetail_AccHeadID').val() == 0) {
                alert('Please select company');
                $("#accQuarterBudgetDetail_AccHeadID").css('background-color', 'red');
                $('#accQuarterBudgetDetail_AccHeadID').focus();
                return false;
            }

            //if ($('#accBudgetDetail_Description').val() == '') {
            //    $('#accBudgetDetail_Description').focus();
            //    return false;
            //}

            if ($('#accQuarterBudgetDetail_Amount').val() == '') {
                $('#accQuarterBudgetDetail_Amount').focus();
                return false;
            }
            return true;
        }


        $('#accQuarterBudget_CompanyID').change(function () {
            $('#accQuarterBudget_CompanyID').css('background-color', '');
        });

        $('#accQuarterBudget_Quarter').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accQuarterBudget_BudgetID').change(function () {
            $('#accQuarterBudget_BudgetID').css('background-color', '');
        });

        $('#accQuarterBudget_StartDate').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accQuarterBudget_EndDate').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#accBudgetDetail_AccHeadID').change(function () {
            $('#accBudgetDetail_AccHeadID').css('background-color', '');
        });

        //$('#accBudgetDetail_Description').bind('keypress', function (evt) {
        //    var chharcode = evt.which;
        //    if (chharcode != '') {
        //        $(this).css('border-color', '');
        //    }
        //});

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

            if ($('#accQuarterBudget_CompanyID').val() == 0) {
                alert('Please select company');
                $("#accQuarterBudget_CompanyID").css('background-color', 'red');
                $('#accQuarterBudget_CompanyID').focus();
                return false;
            }

            if ($('#accQuarterBudget_Quarter').val() == '') {
                $('#accQuarterBudget_Quarter').focus();
                return false;
            }
            if ($('#accQuarterBudget_BudgetID').val() == 0) {
                alert('Please select BudgetID');
                $("#accQuarterBudget_BudgetID").css('background-color', 'red');
                $('#accQuarterBudget_BudgetID').focus();
                return false;
            }

            if ($('#accQuarterBudget_StartDate').val() == '') {
                $('#accQuarterBudget_StartDate').focus();
                return false;
            }
            if ($('#accQuarterBudget_EndDate').val() == '') {
                $('#accQuarterBudget_EndDate').focus();
                return false;
            }
            if ($('#accQuarterBudgetDetail_AccHeadID').val() == 0) {
                alert('Please select company');
                $("#accQuarterBudgetDetail_AccHeadID").css('background-color', 'red');
                $('#accQuarterBudgetDetail_AccHeadID').focus();
                return false;
            }

            //if ($('#accBudgetDetail_Description').val() == '') {
            //    $('#accBudgetDetail_Description').focus();
            //    return false;
            //}

            if ($('#accQuarterBudgetDetail_Amount').val() == '') {
                $('#accQuarterBudgetDetail_Amount').focus();
                return false;
            }
            return true;
        }


        //End Textbox Validation

    });
})(jQuery);