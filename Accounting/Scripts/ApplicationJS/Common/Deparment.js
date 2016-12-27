
// Data delete from grid view

function DeleteDepartment(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {

        $.ajax({
            url: 'dpdelete',
            type: 'POST',
            data: { DepartmentID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblDepartment").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateDepartment(rowId) {
    $.ajax({
        url: 'GetDepartmentByID',
        type: 'POST',
        data: { DepartmentID: rowId },
        success: function (data) {
            $('#DepartmentID').val(data.DepartmentID);
            $('#DepartmentName').val(data.DepartmentName);
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
                $.ajax({
                    url: 'Dpadd',
                    type: 'POST',
                    data: JSON.stringify({
                        department: {
                            DepartmentName: $('#DepartmentName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblDepartment").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });
            }
        });

        //End

        //Update

        $('#btnUpdate').click(function () {
            var retValue = fnValidation();
            if (retValue == true) {
                $.ajax({
                    url: "Dpupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        department: {
                            DepartmentID: $('#DepartmentID').val(),
                            DepartmentName: $('#DepartmentName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblDepartment").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblDepartment").setGridWidth(900);
            }
            else {
                $("#tblDepartment").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblDepartment").jqGrid({
            url: 'DepartmentDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'DepartmentID',
                name: 'DepartmentID',
                index: 'DepartmentID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'DepartmentName',
                name: 'DepartmentName',
                index: 'DepartmentName',
                width: 700,
                editable: true,
                edittype: 'text'
            }
            , {
                name: 'Edit', index: 'Edit', width: 125, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 135, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblDepartment").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblDepartment').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateDepartment(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblDepartment").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteDepartment(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblDepartment").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#DepartmentPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "DepartmentID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Payment Type Details',
            editurl: 'Dpupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblDepartment").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblDepartment").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblDepartment').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblDepartment').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblDepartment').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblDepartment").jqGrid('navGrid', '#DepartmentPager', {
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

        //Textbox Validation

        $('#DepartmentName').bind('keypress', function (event) {
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

            if ($('#DepartmentName').val() == '') {
                $('#DepartmentName').focus();
                return false;
            }
            return true;
        }


        //End validation



        //check charcode for DepartmentName

        $('#DepartmentName').bind('keypress', function (evt) {
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

        //end charcode for DepartmentName



    });
})(jQuery);