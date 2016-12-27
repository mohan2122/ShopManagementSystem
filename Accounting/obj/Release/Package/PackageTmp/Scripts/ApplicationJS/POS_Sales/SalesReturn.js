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
                        mainSaleReturn: {
                            salesReturn: {
                                SalesReturnID: 0, SalesID: $('#sale_SalesID'), SalesReturnInvoice: $('#salesReturn_SalesReturnInvoice'), VATNo:'_', OrderNo: '-',
                                CustomerID: '0', InvoiceDate: $('#salesReturn_InvoiceDate'), DeliveryDate: today, CurrentTime: today.getTime().toString(), Deliime: '-', Destination: 'Destination', VehicleInfo: 'VehicleInfo', Remarks: '-'
                            },
                            salesReturnDetail: salesReturnDetails,
                            accCustomerPayment: {
                                Sys_PaymentID: $('#customer_CustomerID').val(), Sys_Payment_Date: today, Payment_Date: today,
                                CustomerID: $('#customer_CustomerID').val(), DrAmount: $('#AmountPaid').val(), CrAmount: $('#SubTotal').val()
                            },
                            accGeneralLedger: {
                                LedgerID: 0, TrnID: '-', TrnDate: today, VoucherNo: '-', CompanyID: 0, AccProjectID: 0, VoucherTypeID: 0,
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

        $('#salesReturn_InvoiceDate').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#sale_SalesID').change(function () {
            $('#sale_SalesID').css('background-color', '');
        });

        $('#Description').bind('keypress', function (event) {
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
        $('#Discount').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#TotalDiscount').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#Amount').bind('keypress', function (event) {
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

            if ($('#salesReturn_InvoiceDate').val() == '') {
                $('#salesReturn_InvoiceDate').focus();
                return false;
            }

            if ($('#sale_SalesID').val() == 0) {
                alert('Please select SalesID');
                $('#sale_SalesID').css('background-color', 'red');
                $('#sale_SalesID').focus();
                return false;
            }
            if ($('#Description').val() == '') {
                $('#Description').focus();
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
            if ($('#Discount').val() == '') {
                $('#Discount').focus();
                return false;
            }
            if ($('#TotalDiscount').val() == '') {
                $('#TotalDiscount').focus();
                return false;
            }
            if ($('#Amount').val() == '') {
                $('#Amount').focus();
                return false;
            }

            return true;
        }

        //End Textbox Validation


        //check charcode for SalesReturnInvoice

        $('#salesReturn_SalesReturnInvoice').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 20) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 20');
                    return false;
                }
            }
        });

        //end charcode for SalesReturnInvoice

    });
})(jQuery);