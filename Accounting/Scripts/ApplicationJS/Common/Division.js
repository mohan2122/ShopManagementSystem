// Data update from grid view

function DeleteDivision(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'divDelete',
            type: 'POST',
            data: { DivisionID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblTblDivision").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateDivision(rowId) {
    $.ajax({
        url: 'GetTblDivisitionById',
        type: 'POST',
        data: { DivisionID: rowId },
        success: function (data) {
            $('#DivisionID').val(data.DivisionID);
            $('#DivisionName').val(data.DivisionName);
        }
    });
}

//End


//jQuery

(function ($) {
    $(document).ready(function () {

        //Save

        $('#btnSave').click(function () {
            var retValue = fnValidaton();
            if (retValue == true) {
                $.ajax({
                    url: 'divAdd',
                    type: 'POST',
                    data: JSON.stringify({
                        tblDivision: {
                            DivisionName: $('#DivisionName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblTblDivision").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });
            }
        });

        //End Save

        //Update

        $('#btnUpdate').click(function () {
            var retValue = fnValidaton();
            if (retValue == true) {
                $.ajax({
                    url: "divUpDate",
                    type: 'POST',
                    data: JSON.stringify({
                        tblDivision: {

                            DivisionID: $('#DivisionID').val(),
                            DivisionName: $('#DivisionName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblTblDivision").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblTblDivision").setGridWidth(900);
            }
            else {
                $("#tblTblDivision").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblTblDivision").jqGrid({
            url: 'DivisionDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'DivisionID',
                name: 'DivisionID',
                index: 'DivisionID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'DivisionName',
                name: 'DivisionName',
                index: 'DivisionName',
                width: 705,
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
                var ids = $("#tblTblDivision").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblTblDivision').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateDivision(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblTblDivision").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteDivision(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblTblDivision").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#TblDivisionPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "DivisionID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Division Details',
            editurl: 'divUpDate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblTblDivision").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblTblDivision").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblTblDivision').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblTblDivision').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblTblDivision').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblTblDivision").jqGrid('navGrid', '#TblDivisionPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/divUpDate',
            closeAfterEdit: true
        }, {
            url: '/Setup/divAdd',
            closeAfterAdd: true
        }, {
            url: '/Setup/divDelete',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        // Texbox validation


        $('#DivisionName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        function fnValidaton() {

            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            if ($('#DivisionName').val() == '') {
                $('#DivisionName').focus();
                return false;
            }
            return true;
        }

        //End

        //check charcode for DivisionName

        $('#DivisionName').bind('keypress', function (evt) {
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

        //end charcode for DivisionName




    });
})(jQuery);