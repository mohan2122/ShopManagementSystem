
function DeleteBankReconcilation(rowId) {
    $.ajax({
        url: 'GetAccChequePayment1ByID',
        type: 'POST',
        data: { ChequePayID: rowId },
        success: function (data) {
            $('#Status').val(data.Status);
            //$('#VoucherTypeName').val(data.VoucherTypeName);
            //$('#Note').val(data.Note);
        }
    });
}


// Data update from grid view

function UpdateBankReconcilation(rowId) {
    $.ajax({
        url: 'GetAccChequePayment1ByID',
        type: 'POST',
        data: { ChequePayID: rowId },
        success: function (data) {
            $('#Status').val(data.Status);
            //$('#VoucherTypeID').val(data.VoucherTypeID);
            //$('#VoucherTypeName').val(data.VoucherTypeName);
            //$('#Note').val(data.Note);
        }
    });
}


//End



(function ($) {
    $(document).ready(function () {

        $('#Issue_Date').datepicker({ dateFormat: "dd-mm-yy" });
        $('#MaturityDate').datepicker({ dateFormat: "dd-mm-yy" });


        //Save
        $('#btnSubmit').click(function () {
            
            var retValue = fnValidaton();
            if (retValue == true) {
                $.ajax({
                    url: 'ACCCHEadd',
                    type: 'POST',
                    data: JSON.stringify({

                        accChequePayment: {
                            Issue_Date: $('#Issue_Date').val(),
                            MaturityDate: $('#MaturityDate').val()
                            //Note: $('#Note').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblChequeRegister").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });
            }
        });

        //End Save

        //Update

        $('#btnUpdate').click(function () {

            var retval = insert_update();
            if (retval == true) {

                $.ajax({
                    url: "Bupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        accChequePayment: {
                            Status: $('#Status').val(1)
                            
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblChequeRegister").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //Update

        $('#btnDelete').click(function () {

            var retval = insert_update();
            if (retval == true) {

                $.ajax({
                    url: "Bupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        accChequePayment: {
                            Status: $('#Status').val(0)

                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblChequeRegister").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //Update






        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblChequeRegister").setGridWidth(900);
            }
            else {
                $("#tblChequeRegister").setGridWidth($(window).width());
            }
        }).trigger('resize');




        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblChequeRegister").jqGrid({
            url: 'ChequeRegisterDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'Date',
                name: 'Issue_Date',
                index: 'Issue_Date',
                width: 100,
                editable: true,
                edittype: 'text',                
            }, {
                label: 'Trn ID',
                name: 'TrnID',
                index: 'TrnID',
                width: 100,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'Bank Name',
                name: 'BankID',
                index: 'BankID',
                width: 150,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'Branch Name',
                 name: 'BranchID',
                 index: 'BranchID',
                 width: 150,
                 editable: true,
                 edittype: 'text'
             },
             {
                 label: 'ChequeNo',
                 name: 'ChequeNo',
                 index: 'ChequeNo',
                 width: 100,
                 editable: true,
                 edittype: 'text'
             },
             {
                 label: 'Amount',
                 name: 'Cheque_Amount',
                 index: 'Cheque_Amount',
                 width: 120,
                 editable: true,
                 edittype: 'text'
             },
             {
                 label: 'Accept', name: 'Edit', index: 'Edit', width: 100, editable: false, align: 'center', sortable: false
             }
            , {
                label: 'Decline', name: 'Delete', index: 'Delete', width: 100, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblChequeRegister").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblChequeRegister').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='Accept' onclick='UpdateBankReconcilation(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Accept</div>";
                    $("#tblChequeRegister").setRowData(ids[i], { Edit: s });

                    s = "<div title='decline' onclick='DeleteBankReconcilation(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Decline</div>";
                    $("#tblChequeRegister").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#ChequeRegisterPager'),
            rowNum: 10,
            rowList: [10, 20, 30],
            sortname: "ChequePayID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Bank Reconcilation',
            editurl: 'update',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblChequeRegister").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblChequeRegister").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblChequeRegister').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblChequeRegister').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblChequeRegister').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblChequeRegister").jqGrid('navGrid', '#ChequeRegisterPager', {
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
        

    });
})(jQuery);



function DeleteBankReconcilation11(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'delete',
            type: 'POST',
            data: { ChequePayID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblChequeRegister111").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}


(function ($) {
    $(document).ready(function () {


 




       
        //$(window).bind('resize', function () {
        //    var vWidth = $(window).width();
        //    if (vWidth > 1000) {
        //        $("#tblChequeRegister111").setGridWidth(900);
        //    }
        //    else {
        //        $("#tblChequeRegister111").setGridWidth($(window).width());
        //    }
        //}).trigger('resize');




        //var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblChequeRegister111").jqGrid({
            url: 'ChequeRegisterDetails111111',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'Date',
                name: 'Issue_Date',
                index: 'Issue_Date',
                width: 100,
                editable: true,
                edittype: 'text',
            },
             {
                 label: 'Trn ID',
                 name: 'TrnID',
                 index: 'TrnID',
                 width: 100,
                 editable: true,
                 edittype: 'text'
             },
            {
                label: 'Bank Name',
                name: 'BankID',
                index: 'BankID',
                width: 150,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'Branch Name',
                 name: 'BranchID',
                 index: 'BranchID',
                 width: 150,
                 editable: true,
                 edittype: 'text'
             },
             {
                 label: 'ChequeNo',
                 name: 'ChequeNo',
                 index: 'ChequeNo',
                 width: 100,
                 editable: true,
                 edittype: 'text'
             },
             {
                 label: 'Amount',
                 name: 'Cheque_Amount',
                 index: 'Cheque_Amount',
                 width: 120,
                 editable: true,
                 edittype: 'text'
             },  {
                 label: 'Accept', name: 'Edit', index: 'Edit', width: 100, editable: false, align: 'center', sortable: false
             }
            , {
                label: 'Dedline', name: 'Delete', index: 'Delete', width: 100, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblChequeRegister111").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblChequeRegister111').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='Edit' onclick='UpdatePaymentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Accept</div>";
                    $("#tblChequeRegister111").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteBankReconcilation11(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Dedline</div>";
                    $("#tblChequeRegister111").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#ChequeRegisterPager11111'),
            rowNum: 10,
            rowList: [10, 20, 30],
            sortname: "ChequePayID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Bank Reconcilation',
            editurl: 'update',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblChequeRegister111").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblChequeRegister111").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblChequeRegister111').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblChequeRegister111').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblChequeRegister111').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblChequeRegister111").jqGrid('navGrid', '#ChequeRegisterPager11111', {
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


        $('#Issue_Date').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        function fnValidaton() {

            $('Input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            if ($('#Issue_Date').val() == '') {
                $('#Issue_Date').focus();
                return false;
            }

            return true;
        }


    });
})(jQuery);
