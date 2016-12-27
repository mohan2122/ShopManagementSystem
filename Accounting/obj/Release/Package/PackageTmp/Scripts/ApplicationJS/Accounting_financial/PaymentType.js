
// Data delete from grid view
function DeletePaymentType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'delete',
            type: 'POST',
            data: { paymentTypeID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblPaymentType").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}
//End

// Data update from grid view
function UpdatePaymentType(rowId) {
    $.ajax({
        url: 'GetPaymentTypeByID',
        type: 'POST',
        data: { paymentTypeID: rowId },
        success: function (data) {
            $('#PaymentTypeID').val(data.PaymentTypeID);
            $('#PaymentTypeName').val(data.PaymentTypeName);
            $('#btnSave').hidden();
        }
    });
}
//End

//jQuery


(function ($) {
    $(document).ready(function () {

        //Save
        $('#btnSave').click(function () {
            var retValue = fnValidation();
            if (retValue == true) {
                var x = confirm("Are you sure you want to save this?")
                if (x == true) {
                    $.ajax({
                        url: 'add',
                        type: 'POST',
                        data: JSON.stringify({
                            paymentType: {
                                PaymentTypeName: $('#PaymentTypeName').val()
                            }
                        }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Payment Type Name can not be duplicate');
                            }
                            else {
                                $("#tblPaymentType").trigger("reloadGrid");
                                alert('Data Saved Successfully');
                                ClearAll();
                            }
                        }
                    });
                }
            }
        });
        //End Save

        //ClearAll
        function ClearAll() {
            $('#PaymentTypeID').val(""),
            $('#PaymentTypeName').val("")
           
        }

        //Update
        $('#btnUpdate').click(function () {
            var retValue = fnValidation();
            if (retValue == true) {
                var x = confirm("Are you sure you want to update this ?")
                if (x == true) {
                    $.ajax({
                        url: "update",
                        type: 'POST',
                        data: JSON.stringify({
                            paymentType: {
                                PaymentTypeID: $('#PaymentTypeID').val(),
                                PaymentTypeName: $('#PaymentTypeName').val()
                            }
                        }),
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Payment Type Name can not be duplicate');
                            }
                            else {
                                $("#tblPaymentType").trigger("reloadGrid");
                                alert('Data Updated Successfully');
                                ClearAll();
                            }
                        }
                    });
                }
            }
        });
        //End Update

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblPaymentType").setGridWidth(900);
            }
            else {
                $("#tblPaymentType").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid
        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblPaymentType").jqGrid({
            url: 'PaymentTypeDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'PaymentTypeID',
                name: 'PaymentTypeID',
                index: 'PaymentTypeID',
                width: 150,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'PaymentTypeName',
                name: 'PaymentTypeName',
                index: 'PaymentTypeName',
                width: 700,
                editable: true,
                edittype: 'text'
            }
            , {
                name: 'Edit', index: 'Edit', width: 130, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 130, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblPaymentType").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblPaymentType').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdatePaymentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/edit.gif /></div>";
                    $("#tblPaymentType").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeletePaymentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/delete.gif /></div>";
                    $("#tblPaymentType").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#PaymentTypePager'),
            rowNum: 10,
            rowList: [10, 20, 30],
            sortname: "PaymentTypeID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Payment Type Details',
            editurl: 'update',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblPaymentType").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblPaymentType").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblPaymentType').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblPaymentType').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblPaymentType').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblPaymentType").jqGrid('navGrid', '#PaymentTypePager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/update',
            closeAfterEdit: true
        }, {
            url: '/Setup/add',
            closeAfterAdd: true
        }, {
            url: '/Setup/delete',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        // Textbox Validation

        
        $('#PaymentTypeName').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });


        function fnValidation() {


            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            if ($('#PaymentTypeName').val() == 0) {
                alert('Please enter payment type'); 
                $('#PaymentTypeName').focus();
                return false;
            }
            return true;
        }

        //End

        //check charcode for PaymentTypeName

        $('#PaymentTypeName').bind('keypress', function (evt) {
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

        //end charcode for PaymentTypeName

    });
})(jQuery);