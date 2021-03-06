﻿
//jQuery

(function ($) {
    $(document).ready(function () {

        var today = new Date();
        var accChequePaymentDetails = [];
        var purchaseDetails = [];
        var countProduct = 0, countCheque = 0;
       
        $('#purchase_PurchaseDate').datepicker({ dateFormat: "dd-mm-yy" });      
        $('#accChequePayment_Issue_Date').datepicker({ dateFormat: "dd-mm-yy" });
        $('#accChequePayment_MaturityDate').datepicker({ dateFormat: "dd-mm-yy" });

        $('#btnAdd').click(function () {
            ClickCount = 0;
            var retValue = fnProdValidation();
            if (retValue == true) {
                countProduct = countProduct + 1;
                var trItem = '<tr><td>' + countProduct + '</td><td>' + $('#productInfo_ProductName').val() + '</td><td>' + $('#productInfo_CostPrice').val() + '</td><td>' + $('#Quantity').val() + '</td><td>';
                trItem += $('#Total').val() + '</td><td><input type=button id=btnEdit value=Edit></td><td><input type=button id=btnDelete value=Delete></td></tr>';
                $('#tblProduct').append(trItem);
                var params = {
                    SD: countProduct, PID: 0, ProductID: $('#productInfo_ProductName').val(), PurchaseQty: $('#Quantity').val(),
                    UseQty: 0.0, RatePerUnit: $('#productInfo_CostPrice').val(), CD: 0, RD: 0, AMTExamVAT: 0, AIT: 0, ATV: 0, CFDuties: 0, PSI: 0
                }
                purchaseDetails.push(params);

                var resSupTotal = Number($('#SubTotal').val()) + Number($('#Total').val());
                $('#SubTotal').val(resSupTotal);
                var resAmount = Number($('#AmountPayable').val()) + Number($('#Total').val());
                $('#AmountPayable').val(resAmount);
                var resDue = Number($('#BalanceDue').val()) + Number($('#Total').val());
                $('#BalanceDue').val(resDue);

                $('#tblProduct tbody tr td #btnEdit').click(function () {
                    var Row = $(this).parent().parent();
                    var Colunm = $(Row).find('td');

                    countProduct = parseInt($(Colunm[0]).text()) - 1;
                    $('#productInfo_ProductName').val($(Colunm[1]).text());
                    $('#productInfo_CostPrice').val($(Colunm[2]).text());
                    $('#Quantity').val($(Colunm[3]).text());
                    if (Number($(Colunm[4]).text()) > 0) {
                        $('#Total').val($(Colunm[4]).text());
                        purchaseDetails.splice(parseInt($(Colunm[0]).text()) - 1, 1);
                    }
                    $(Row).remove();

                    var remSupTotal = parseFloat($('#SubTotal').val()) - parseFloat($(Colunm[4]).text());
                    $('#SubTotal').val(remSupTotal);
                    var remAmount = parseFloat($('#AmountPayable').val()) - parseFloat($(Colunm[4]).text());
                    $('#AmountPayable').val(remAmount);
                    var remDue = parseFloat($('#BalanceDue').val()) - parseFloat($(Colunm[4]).text());
                    $('#BalanceDue').val(remDue);
                    $(Colunm[4]).text('00.00');
                });
            }
        });


        //('#tblProduct tbody tr td#btnDelete').click(function () {
        //    var Row = $(this).parent().parent();
        //    var Colunm = $(Row).find('td');
        //    purchaseDetails.splice(parseInt($(Colunm[0]).text()) - 1, 1);
        //});

        $('#btnAddChequePayment').click(function () {
            countCheque = countCheque + 1;
            var retValue = fnBankValidation();
            if (retValue == true) {
                var trItem = '<tr><td>' + countCheque + '</td><td>' + $('#accChequePayment_BankID').val() + '</td><td>' + $('#accChequePayment_BranchID').val() + '</td><td>' + $('#accChequePayment_ChequeNo').val() + '</td><td>';
                trItem += $('#accChequePayment_Cheque_Amount').val() + '</td><td><input type=button id=btnEdit value=Edit></td><td><input type=button id=btnDelete value=Delete></td></tr>';
                $('#tblAccChequePayment').append(trItem);
                var paramsCheque = {
                    ChequePayID: countCheque, Issue_Date: $('#accChequePayment_Issue_Date').val(), TrnID: '-', BankID: $('#accChequePayment_BankID').val(), BranchID: $('#accChequePayment_BranchID').val(),
                    ChequeNo: $('#accChequePayment_ChequeNo').val(), Cheque_Amount: $('#accChequePayment_Cheque_Amount').val(),
                    IsVoid: '-', MaturityDate: $('#accChequePayment_MaturityDate').val()
                }
                accChequePaymentDetails.push(paramsCheque);

                $('#tblAccChequePayment tbody tr td #btnEdit').click(function () {
                    var Row = $(this).parent().parent();
                    var Colunm = $(Row).find('td');

                    countProduct = parseInt($(Colunm[0]).text()) - 1;
                    $('#accChequePayment_BankID').val($(Colunm[1]).text());
                    $('#accChequePayment_BranchID').val($(Colunm[2]).text());
                    $('#accChequePayment_ChequeNo').val($(Colunm[3]).text());
                    if (Number($(Colunm[4]).text()) > 0) {
                        $('#accChequePayment_Cheque_Amount').val($(Colunm[4]).text());
                        accChequePaymentDetails.splice(parseInt($(Colunm[0]).text()) - 1, 1);
                    }
                    $(Row).remove();

                    var remPaidByCheque = parseFloat($('#PaidByCheque').val()) - parseFloat($(Colunm[4]).text());
                    $('#PaidByCheque').val(remPaidByCheque);
                    var remAmtPaid = parseFloat($('#AmountPaid').val()) - parseFloat($(Colunm[4]).text());
                    $('#AmountPaid').val(remAmtPaid);
                    var remBalDue = parseFloat($('#BalanceDue').val()) + parseFloat($(Colunm[4]).text());
                    $('#BalanceDue').val(remBalDue);
                    $(Colunm[4]).text('00.00');
                });

                var resPaidByCheque = parseFloat($('#PaidByCheque').val()) + parseFloat($('#accChequePayment_Cheque_Amount').val());
                $('#PaidByCheque').val(resPaidByCheque);
                var resAmtPaid = parseFloat($('#PaidByCash').val()) + parseFloat($('#PaidByCheque').val());
                $('#AmountPaid').val(resAmtPaid);
                var resBalDue = parseFloat($('#AmountPayable').val()) - parseFloat($('#AmountPaid').val());
                $('#BalanceDue').val(resBalDue);
            }
        });

        //('#tblProduct tbody tr td#btnDelete').click(function () {
        //    var Row = $(this).parent().parent();
        //    var Colunm = $(Row).find('td');
        //    accChequePaymentDetails.splice(parseInt($(Colunm[0]).text()) - 1, 1);
        //});

        $("#supplier_SupplierName").change(function () {
            $.ajax({
                url: 'GetSuppierById',
                type: 'POST',
                data: {
                    intSupplierId: $('#supplier_SupplierName').val()
                },
                success: function (data) {
                    $('#supplier_ContactPerson').val(data.ContactPerson);
                    $('#supplier_Address').val(data.Address);
                    $('#PreviousDue').val(data.VATRegNo);
                    $('#AmountPayable').val(data.VATRegNo);
                    $('#BalanceDue').val(data.VATRegNo);
                },
                error: function () {
                    alert("error");
                }
            });
        });

        $("#productInfo_ProductName").change(function () {
            $.ajax({
                url: 'GetProductById',
                type: 'POST',
                data: {
                    intProductValue: $('#productInfo_ProductName').val()
                },
                success: function (data) {
                    $('#productInfo_ProductCode').val(data.ProductCode);
                    $('#productInfo_CostPrice').val(data.CostPrice);
                    $('#productInfo_RegularMRP').val(data.RegularMRP);
                    $('#Quantity').val('');
                    $('#Total').val('');
                },
                error: function () {
                    alert("error");
                }
            });
        });

        $("#Quantity").keyup(function () {
            if ($(this).val() != '') {
                var num1 = parseFloat(this.value);
                var num2 = $('#productInfo_CostPrice').val();
                var res = num1 * num2;
                $('#Total').val(res);
            }
            else {
                $('#Total').val('00.00');
            }
        });

        $('#paymentType_PaymentTypeID').change(function () {
            if ($('#paymentType_PaymentTypeID').val() == '2') {
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

        $('#PaidByCash').keyup(function () {
            if ($(this).val() != '') {
                var resAmtPaid = parseFloat($('#PaidByCash').val()) + parseFloat($('#PaidByCheque').val());
                $('#AmountPaid').val(resAmtPaid);

                if (parseFloat($('#AmountPayable').val()) > parseFloat($('#AmountPaid').val())) {
                    var resBalDue = parseFloat($('#AmountPayable').val()) - parseFloat($('#AmountPaid').val());
                    $('#BalanceDue').val(resBalDue);
                }
                if (parseFloat($('#AmountPayable').val()) < parseFloat($('#AmountPaid').val())) {
                    {
                        $('#BalanceDue').val('00.00');
                    }
                }
            }
            else {
                $('#AmountPaid').val($('#PaidByCheque').val());
            }
        });

        //Save
        $('#btnSave').click(function () {
            var retValue = fnSaveValidation();
            if (retValue == true) {
                $.ajax({
                    url: 'Save',
                    type: 'POST',
                    data: JSON.stringify({
                        mainPurchase: {                           
                            purchase: {
                                PID: '-', PurchaseID: $('#purchase_PurchaseID').val(), PurchaseDate: $('#purchase_PurchaseDate').val(), GRNNo: '-', SupplierID: $('#supplier_SupplierName').val(),
                                InvoiceNo: $('#purchase_InvoiceNo').val(), InvoiceDate: $('#purchase_InvoiceDate').val(), ChallanBENo: '-', ChallanDate: $('#purchase_InvoiceDate').val(),
                                LCNo: $('#purchase_InvoiceNo').val(), LCDate: $('#purchase_InvoiceDate').val(), PONo: '-', PODate: $('#purchase_InvoiceDate').val(),
                                IsVoid: '0', Note: '-'
                            },
                            purchaseDetail: purchaseDetails,
                            accSupplierPayment: {
                                Sys_PaymentID: $('#supplier_SupplierName').val(), Sys_Payment_Date: today, Payment_Date: $('#purchase_PurchaseDate').val(),
                                SupplierID: $('#supplier_SupplierName').val(), DrAmount: $('#AmountPaid').val(), CrAmount: $('#SubTotal').val()
                            },
                            accChequePaymentDetail: accChequePaymentDetails,
                            accGeneralLedger: {
                                LedgerID: 0, TrnID: '-', TrnDate: $('#purchase_PurchaseDate').val(), VoucherNo: '-', CompanyID: 0, AccProjectID: 0, VoucherTypeID: 0,
                                PaymentTypeID: 0, AccountID: '-', Description: '-', Debit: $('#AmountPaid').val(), Credit: 0, Note: '-', QuarterID: 0, BudgetID: 0
                            },
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        alert('Data Saved Successfully');
                    }
                });
            }
        });
        //End Save

        //Textbox validation

        $('#supplier_SupplierName').change(function () {
            $('#supplier_SupplierName').css('background-color', '');
        });

        $('#productInfo_ProductName').change(function () {
            $('#product_ProductName').css('background-color', '');
        });

        $('#Quantity').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        function fnProdValidation() {
            //make all the input field empty
            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            //for filling out mandatory field

            if ($('#supplier_SupplierName').val() == 0) {
                alert('Please select  Suplier Name');
                $('#supplier_SupplierName').css('background-color', 'red');
                $('#supplier_SupplierName').focus();
                return false;
            }

            if ($('#productInfo_ProductName').val() == 0) {
                alert('Please select Product Customer Name');
                $('#product_ProductName').css('background-color', 'red');
                $('#product_ProductName').focus();
                return false;
            }
            if ($('#Quantity').val() == '') {
                $('#Quantity').focus();
                return false;
            }
            return true;
        }

        // Check charcode for  Quantity


        $('#Quantity').bind('keypress', function (evt) {
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

        // End  charcode for Quantity

        $('#supplier_SupplierName').change(function () {
            $('#supplier_SupplierName').css('background-color', '');
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



        function fnBankValidation() {
            //make all the input field empty
            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            //for filling out mandatory field
            if ($('#supplier_SupplierName').val() == 0) {
                alert('Please select  Suplier Name');
                $('#supplier_SupplierName').css('background-color', 'red');
                $('#supplier_SupplierName').focus();
                return false;
            }
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
            return true;
        }

        $('#supplier_SupplierName').change(function () {
            $('#supplier_SupplierName').css('background-color', '');
        });

        $('#purchase_InvoiceNo').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        function fnSaveValidation() {
            //make all the input field empty
            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            //for filling out mandatory field
            if ($('#supplier_SupplierName').val() == 0) {
                alert('Please select  Suplier Name');
                $('#supplier_SupplierName').css('background-color', 'red');
                $('#supplier_SupplierName').focus();
                return false;
            }
            if ($('#purchase_InvoiceNo').val() == '') {
                $('#purchase_InvoiceNo').focus();
                return false;
            }
            return true;
        }

        //End Textbox validation


        //check charcode for Cheque_Amount

        $('#accChequePayment_Cheque_Amount').bind('keypress', function (evt) {
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

            if (charcode == 8) {
                return true;
            }

            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        //end check charcode for Cheque_Amount

    });
})(jQuery);