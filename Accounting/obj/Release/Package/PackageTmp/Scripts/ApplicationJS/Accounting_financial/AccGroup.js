// Data delete from grid view

function DeleteAccGroup(rowId) {

    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'deleteAccGroup',
            type: 'POST',
            data: { accgroupID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblAccGroup").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateAccGroup(rowId) {
    $.ajax({
        url: 'GetAccGroupByID',
        type: 'POST',
        data: { accgroupID: rowId },
        success: function (data) {
            $('#AccGroupID').val(data.AccGroupID);
            $('#CompanyID').val(data.CompanyID);
            $('#AccTypeID').val(data.AccTypeID);
            $('#AccGroupName').val(data.AccGroupName);
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
                var x = confirm("Are you sure you want to save this ?")
                if (x == true) {
                    $.ajax({
                        url: 'addAccGroup',
                        type: 'POST',
                        data: JSON.stringify({
                            accgroup: {
                                CompanyID: $('#CompanyID').val(),
                                AccTypeID: $('#AccTypeID').val(),
                                AccGroupName: $('#AccGroupName').val(),
                                Note: $('#Note').val()
                            }
                        }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Account Group Name can not be duplicated');
                            }
                            else {
                                $("#tblAccGroup").trigger("reloadGrid");
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
            $('#AccGroupID').val(""),
            $('#CompanyID').val(""),
            $('#AccTypeID').val(""),
            $('#AccGroupName').val(""),
            $('#Note').val("")

        }

        //Update

        $('#btnUpdate').click(function () {
            var retValue = fnValidation();
            if (retValue == true) {
                var x = confirm("Are you sure you want to update this ?")
                if (x == true) {
                    $.ajax({
                        url: "updateAccGroup",
                        type: 'POST',
                        data: JSON.stringify({
                            accgroup: {
                                AccGroupID: $('#AccGroupID').val(),
                                CompanyID: $('#CompanyID').val(),
                                AccTypeID: $('#AccTypeID').val(),
                                AccGroupName: $('#AccGroupName').val(),
                                Note: $('#Note').val()
                            }
                        }),
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            //if (data == 1) {
                            //    alert('Payment Type Name can not be duplicate');
                            //}
                            //else {
                                $("#tblAccGroup").trigger("reloadGrid");
                                alert('Data Updated Successfully');
                                ClearAll();
                            //}
                        }
                    });
                }
            }
        });
        //End Update

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblAccGroup").setGridWidth(900);
            }
            else {
                $("#tblAccGroup").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid
        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblAccGroup").jqGrid({
            url: 'AccGroupDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'AccGroupID',
                name: 'AccGroupID',
                index: 'AccGroupID',
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
                label: 'AccTypeID',
                name: 'AccTypeID',
                index: 'AccTypeID',
                width: 200,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'AccGroupName',
                name: 'AccGroupName',
                index: 'AccGroupName',
                width: 220,
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
                 name: 'Edit', index: 'Edit', width: 62, editable: false, align: 'center', sortable: false
             },
             {
                 name: 'Delete', index: 'Delete', width: 70, editable: false, align: 'center', sortable: false
             }],

            gridComplete: function () {
                var ids = $("#tblAccGroup").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblAccGroup').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateAccGroup(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/edit.gif /></div>";
                    $("#tblAccGroup").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteAccGroup(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/delete.gif /></div>";
                    $("#tblAccGroup").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#AccGroupPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "AccGroupID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Acc Group Details',
            editurl: 'updateAccGroup',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblAccGroup").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblAccGroup").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblAccGroup').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblAccGroup').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblAccGroup').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblAccGroup").jqGrid('navGrid', '#AccGroupPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/updateAccGroup',
            closeAfterEdit: true
        }, {
            url: '/Setup/addAccGroup',
            closeAfterAdd: true
        }, {
            url: '/Setup/deleteAccGroup',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        //Textbox Validation

        $('#AccGroupID').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#AccGroupName').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#CompanyID').change(function () {
            $('#CompanyID').css('background-color', '');
        });

        $('#AccTypeID').change(function () {
            $('#AccTypeID').css('background-color', '');
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
            if ($('#AccTypeID').val() == 0) {
                alert('Please select Account Type');
                $('#AccTypeID').css('background-color', 'red');
                $('#AccTypeID').focus();
                return false;
            }
            if ($('#AccGroupName').val() == '') {
                alert('Please enter Account Group name');
                $('#AccGroupName').focus();
                return false;
            }


            return true;

        }

        //End Textbox validation


        //check charcode for AccGroupName

        $('#AccGroupName').bind('keypress', function (evt) {
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

        //end charcode for AccGroupName

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