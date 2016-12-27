
// Data delete from grid view

function DeleteExpenseInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Expensedelete',
            type: 'POST',
            data: { ExpenseID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblExpenseInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

// end data delete from grid view




// Data update from grid view

function UpdateExpenseInfo(rowId) {
    $.ajax({
        url: 'GetExpenseInfoByID',
        type: 'POST',
        data: { ExpenseID: rowId },
        success: function (data) {
            $('#ExpenseID').val(data.ExpenseID);
            $('#ExpenseCode').val(data.ExpenseCode);
            $('#ExpenseName').val(data.ExpenseName);
            $('#Remarks').val(data.Remarks);
        }
    });
}

//End



//jQuery

(function ($) {
    $(document).ready(function () {

        //Save

        $('#btnSave').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: 'Expenseadd',
                    type: 'POST',
                    data: JSON.stringify({
                        Expense: {
                            ExpenseID: $('#ExpenseID').val(),
                            ExpenseCode: $('#ExpenseCode').val(),
                            ExpenseName: $('#ExpenseName').val(),
                            Remarks: $('#Remarks').val(),
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblExpenseInfo").trigger("reloadGrid");
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
                    url: "Expenseupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        Expense: {
                            ExpenseID: $('#ExpenseID').val(),
                            ExpenseCode: $('#ExpenseCode').val(),
                            ExpenseName: $('#ExpenseName').val(),
                            Remarks: $('#Remarks').val(),
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblExpenseInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //Update

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblExpenseInfo").setGridWidth(900);
            }
            else {
                $("#tblExpenseInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblExpenseInfo").jqGrid({
            url: 'ExpenseInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ExpenseID',
                name: 'ExpenseID',
                index: 'ExpenseID',
                width: 100,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'ExpenseCode',
                name: 'ExpenseCode',
                index: 'ExpenseCode',
                width: 285,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'ExpenseName',
                name: 'ExpenseName',
                index: 'ExpenseName',
                width: 282,
                editable: true,
                edittype: 'text'
            },

            {
                label: 'Remarks',
                name: 'Remarks',
                index: 'Remarks',
                width: 240,
                editable: true,
                edittype: 'text'
            },

            {
                name: 'Edit', index: 'Edit', width: 75, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 75, editable: false, align: 'center', sortable: false
               }],


            gridComplete: function () {
                var ids = $("#tblExpenseInfo").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblExpenseInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateExpenseInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblExpenseInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteExpenseInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblExpenseInfo").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#divExpenseInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "ExpenseID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'ExpenseInfoDetails',
            editurl: 'Expenseupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#tblExpenseInfo").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#tblExpenseInfo").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#tblExpenseInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblExpenseInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblExpenseInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });




        $("#tblExpenseInfo").jqGrid('navGrid', '#divExpenseInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Expenseupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Expenseadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Expensedelete',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        //Textbox Validation

        $('#ExpenseCode').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#ExpenseName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#Remarks').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });


        function insert_update() {


            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            if ($('#ExpenseCode').val() == '') {
                $('#ExpenseCode').focus();
                return false;
            }
            if ($('#ExpenseName').val() == '') {
                $('#ExpenseName').focus();
                return false;
            }
            if ($('#Remarks').val() == '') {
                $('#Remarks').focus();
                return false;
            }


            return true;
        }

        //End



        //MaxLength validation of ExpenseCode 

        $('#ExpenseCode').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =15');
                    return false;
                }
            }

        });

        // End MaxLength validation of ExpenseCode 



        //MaxLength validation of ExpenseName 

        $('#ExpenseName').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 250) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =250');
                    return false;
                }
            }

        });

        // End MaxLength validation of ExpenseName 


        //MaxLength validation of Remarks

        $('#Remarks').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 250) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =250');
                    return false;
                }
            }

        });

        // End MaxLength validation of Remarks 



    });

})(jQuery);