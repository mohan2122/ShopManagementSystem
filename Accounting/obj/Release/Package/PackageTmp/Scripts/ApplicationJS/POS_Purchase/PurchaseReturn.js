//jQuery

(function ($) {
    $(document).ready(function () {
        var today = new Date();
        $('#btnSave').click(function () {
            var retValue = fnSaveValidation();
            if (retValue == true) {
                $.ajax({
                    url: 'Save',
                    type: 'POST',
                    data: JSON.stringify({
                        mainPurchaseReturn: {                           
                            purchaseReturn: {
                                PriID: '_', PurchaseReturnDate: $('#purchaseReturn_PurchaseReturnDate').val(), PurchaseReturnID: '-', 
                                IsVoid: '0', Note: '-'
                            },
                            purchaseReturnDetail: purchaseReturnDetails,
                            accSupplierPayment: {
                                Sys_PaymentID: $('#supplier_SupplierName').val(), Sys_Payment_Date: today, Payment_Date: $('#purchase_PurchaseDate').val(),
                                SupplierID: $('#supplier_SupplierName').val(), DrAmount: $('#AmountPaid').val(), CrAmount: $('#SubTotal').val()
                            },
                            accGeneralLedger: {
                                LedgerID: 0, TrnID:'-', TrnDate: today, VoucherNo: '-', CompanyID: 0, AccProjectID: 0, VoucherTypeID: 0,
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

        //Textbox Validation

        $('#purchaseReturn_PurchaseReturnDate').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#supplier_SupplierName').change(function () {
            $('#supplier_SupplierName').css('background-color', '');
        });

        $('#purchase_PurchaseID').change(function () {
            $('#purchase_PurchaseID').css('background-color', '');
        });
       
        $('#purchase_PurchaseDate').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#purchase_PurchaseDetails').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#productInfo_ProductName').change(function () {
            $('#productInfo_ProductName').css('background-color', '');
        });


        $('#Price').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Quantity').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Total').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Reason').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });


        function fnSaveValidation() {

            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', 'white');
                }
            });

            if ($('#purchaseReturn_PurchaseReturnDate').val() == '') {
                $('#purchaseReturn_PurchaseReturnDate').focus();
                return false;
            }

            if ($('#supplier_SupplierName').val() == 0) {
                alert('Please select SupplierName');
                $('#supplier_SupplierName').css('background-color', 'red');
                $('#supplier_SupplierName').focus();
                return false;
            }
            if ($('#purchase_PurchaseID').val() == 0) {
                alert('Please select PurchaseID');
                $('#purchase_PurchaseID').css('background-color', 'red');
                $('#purchase_PurchaseID').focus();
                return false;
            }
            if ($('#purchase_PurchaseDate').val() == '') {
                $('#purchase_PurchaseDate').focus();
                return false;
            }
            if ($('#purchase_PurchaseDetails').val() == '') {
                $('#purchase_PurchaseDetails').focus();
                return false;
            }
            if ($('#productInfo_ProductName').val() == 0) {
                alert('Please select ProductName');
                $('#productInfo_ProductName').css('background-color', 'red');
                $('#productInfo_ProductName').focus();
                return false;
            }
            
            if ($('#Price').val() == '') {
                $('#Price').focus();
                return false;
            }

            if ($('#Quantity').val() == '') {
                $('#Quantity').focus();
                return false;
            }
            if ($('#Total').val() == '') {
                $('#Total').focus();
                return false;
            }
            if ($('#Reason').val() == '') {
                $('#Reason').focus();
                return false;
            }

            return true;
        }

        //End Textbox Validation

        //check charcode for PurchaseReturnID

        $('#purchaseReturn_PurchaseReturnID').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 25) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 25');
                    return false;
                }
            }
        });

        //end charcode for PurchaseReturnID


        //check charcode for IsVoid

        $('#IsVoid').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 5) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 5');
                    return false;
                }
            }
        });

        //end charcode for IsVoid


        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
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

        //end charcode for Note



    });
})(jQuery);