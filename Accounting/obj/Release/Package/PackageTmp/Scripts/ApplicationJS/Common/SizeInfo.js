// Data delete from grid view

function DeleteSizeInfo(rowId) {

    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteSize',
            type: 'POST',
            data: { SizeID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblSizeInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateSizeInfo(rowId) {
    $.ajax({
        url: 'GetInv_SizeInfoByID',
        type: 'POST',
        data: { SizeID: rowId },
        success: function (data) {
            $('#SizeID').val(data.SizeID);
            $('#SizeName').val(data.SizeName);
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
            var retValue = fnValidaton();
            if (retValue == true) {
                $.ajax({
                    url: 'AddSize',
                    type: 'POST',
                    data: JSON.stringify({

                        inv_SizeInfo: {
                            SizeName: $('#SizeName').val(),
                            Note: $('#Note').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblSizeInfo").trigger("reloadGrid");
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
                    url: 'UpdateSize',
                    type: 'POST',
                    data: JSON.stringify({
                        inv_SizeInfo: {
                            SizeID: $('#SizeID').val(),
                            SizeName: $('#SizeName').val(),
                            Note: $('#Note').val()

                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblSizeInfo").trigger("reloadGrid");
                        alert('Data Updated successsfully');
                    }

                });
            }
        });

        //end Data update;


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblSizeInfo").setGridWidth(900);
            }
            else {
                $("#tblSizeInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblSizeInfo").jqGrid({
            url: 'Inv_SizeInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'SizeID',
                name: 'SizeID',
                index: 'SizeID',
                width: 150,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'SizeName',
                name: 'SizeName',
                index: 'SizeName',
                width: 410,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 400,
                editable: true,
                edittype: 'text'
            }, {
                name: 'Edit', index: 'Edit', width: 75, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 75, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblSizeInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblSizeInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //this onclick id up to dateils ....

                    s = "<div title='edit' onclick='UpdateSizeInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblSizeInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='Delete' onclick='DeleteSizeInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblSizeInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#SizeInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "SizeID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Size Info Details',
            editurl: 'UpdateSize',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblSizeInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblSizeInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblSizeInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblSizeInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblSizeInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblSizeInfo").jqGrid('navGrid', '#SizeInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Update',
            closeAfterEdit: true
        }, {
            url: '/Setup/Add',
            closeAfterAdd: true
        }, {
            url: '/Setup/Delete',
            closeAfterDelete: true
        }, {

        });

        //End jQGrid

        //Textbox Validation

        $('#SizeName').bind('keypress', function (evt) {
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

            if ($('#SizeName').val() == '') {
                $('#SizeName').focus();
                return false;
            }

            return true;
        }

        //End Textbox validation


        //check charcode for SizeName

        $('#SizeName').bind('keypress', function (evt) {
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

        //end charcode for SizeName
        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
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

        //end charcode for Note

    });
})(jQuery);