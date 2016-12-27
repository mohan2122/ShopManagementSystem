// Data delete from grid view

function DeleteAccType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'deleteAccType',
            type: 'POST',
            data: { acctypeID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblAccType").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateAccType(rowId) {
    $.ajax({
        url: 'GetAccTypeByID',
        type: 'POST',
        data: { acctypeID: rowId },
        success: function (data) {
            $('#AccTypeID').val(data.AccTypeID);
            $('#CompanyID').val(data.CompanyID);

            $('#AccTypeName').val(data.AccTypeName);
            $('#Note').val(data.Note);
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
                    url: 'addAccType',
                    type: 'POST',
                    data: JSON.stringify({
                        acctype: {

                            CompanyID: $('#CompanyID').val(),

                            AccTypeName: $('#AccTypeName').val(),
                            Note: $('#Note').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data == 1) {
                            alert('Account Type Name can not be duplicate');
                        }
                        else {
                            $("#tblAccType").trigger("reloadGrid");
                            alert('Data Saved Successfully');
                            ClearAll();
                        }
                    }
                });
            }
        });

        //End Save
        //ClearAll
        function ClearAll() {
            $('#AccTypeID').val(""),
            $('#CompanyID').val(""),
            $('#AccTypeName').val(""),
            $('#Note').val("")

        }
        //Update

        $('#btnUpdate').click(function () {
            var retValue = fnValidation();
            if (retValue == true) {
                var x = confirm("Are you sure you want to update this ?")
                if (x == true) {
                    $.ajax({
                        url: "updateAccType",
                        type: 'POST',
                        data: JSON.stringify({
                            acctype: {
                                AccTypeID: $('#AccTypeID').val(),
                                CompanyID: $('#CompanyID').val(),

                                AccTypeName: $('#AccTypeName').val(),
                                Note: $('#Note').val()
                            }
                        }),
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Account Type Name can not be duplicate');
                            }
                            else {
                                $("#tblAccType").trigger("reloadGrid");
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
                $("#tblAccType").setGridWidth(900);
            }
            else {
                $("#tblAccType").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblAccType").jqGrid({
            url: 'AccTypeDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'AccTypeID',
                name: 'AccTypeID',
                index: 'AccTypeID',
                width: 100,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'CompanyID',
                name: 'CompanyID',
                index: 'CompanyID',
                width: 200,
                editable: true,
                edittype: 'text'
            },

            {
                label: 'AccTypeName',
                name: 'AccTypeName',
                index: 'AccTypeName',
                width: 400,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 200,
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
                var ids = $("#tblAccType").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblAccType').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateAccType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/edit.gif /></div>";
                    $("#tblAccType").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteAccType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/delete.gif /></div>";
                    $("#tblAccType").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#AccTypePager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "AccTypeID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Acc Type Details',
            editurl: 'updateAccType',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblAccType").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblAccType").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblAccType').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblAccType').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblAccType').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblAccType").jqGrid('navGrid', '#AccTypePager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/updateAccType',
            closeAfterEdit: true
        }, {
            url: '/Setup/addAccType',
            closeAfterAdd: true
        }, {
            url: '/Setup/deleteAccType',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        //Textbox Validation

        $('#AccTypeID').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#AccTypeName').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#CompanyID').change(function () {
            $('#CompanyID').css('background-color', 'white');
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


            if ($('#CompanyID').val() == 0) {
                alert('Please select company');
                $('#CompanyID').css('background-color', 'red');
                $('#CompanyID').focus();
                return false;
            }

            if ($('#AccTypeName').val() == '') {
                $('#AccTypeName').focus();
                return false;
            }

            return true;
        }

        //End Textbox validation


        //check charcode for AccTypeName

        $('#AccTypeName').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 100) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 100');
                    return false;
                }
            }
        });

        //end charcode for AccTypeName

        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 300) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 300');
                    return false;
                }
            }
        });

        //end charcode for Note



    });
})(jQuery);