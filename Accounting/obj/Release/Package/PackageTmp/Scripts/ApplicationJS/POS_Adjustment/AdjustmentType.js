// Data delete from grid view

function DeleteAdjustmentType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteAdjust',
            type: 'POST',
            data: { AdjustmentTypeID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblAdjustmentType").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateAdjustmentType(rowId) {
    $.ajax({
        url: 'GetAdjustmentTypeByID',
        type: 'POST',
        data: { AdjustmentTypeID: rowId },
        success: function (data) {
            $('#AdjustmentTypeID').val(data.AdjustmentTypeID);
            $('#AdjustmentTypeName').val(data.AdjustmentTypeName);
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
                    url: 'AddAdjust',
                    type: 'POST',
                    data: JSON.stringify({

                        adjustmentType: {
                            AdjustmentTypeName: $('#AdjustmentTypeName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblAdjustmentType").trigger("reloadGrid");
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
                    url: 'UpdateAdjust',
                    type: 'POST',
                    data: JSON.stringify({
                        adjustmentType: {
                            AdjustmentTypeID: $('#AdjustmentTypeID').val(),
                            AdjustmentTypeName: $('#AdjustmentTypeName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblAdjustmentType").trigger("reloadGrid");
                        alert('Data Updated successsfully');
                    }

                });
            }
        });

        //end Data update;


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblAdjustmentType").setGridWidth(900);
            }
            else {
                $("#tblAdjustmentType").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblAdjustmentType").jqGrid({
            url: 'AdjustmentTypeDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'AdjustmentTypeID',
                name: 'AdjustmentTypeID',
                index: 'AdjustmentTypeID',
                width: 150,
                editable: true,
                edittype: 'text',
                hidden:true
            },
            {
                label: 'AdjustmentTypeName',
                name: 'AdjustmentTypeName',
                index: 'AdjustmentTypeName',
                width: 700,
                editable: true,
                edittype: 'text'
            },
            
            {
                name: 'Edit', index: 'Edit', width: 135, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 125, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblAdjustmentType").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblAdjustmentType').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //this onclick id up to dateils ....

                    s = "<div title='edit' onclick='UpdateAdjustmentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblAdjustmentType").setRowData(ids[i], { Edit: s });

                    s = "<div title='Delete' onclick='DeleteAdjustmentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblAdjustmentType").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#AdjustmentTypePager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "AdjustmentTypeID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'AdjustmentType Details',
            editurl: 'UpdateAdjust',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblAdjustmentType").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblAdjustmentType").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblAdjustmentType').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblAdjustmentType').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblAdjustmentType').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblAdjustmentType").jqGrid('navGrid', '#AdjustmentTypePager', {
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

       
        $('#AdjustmentTypeName').bind('keypress', function (evt) {
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

            if ($('#AdjustmentTypeName').val() == '') {
                $('#AdjustmentTypeName').focus();
                return false;
            }

            return true;
        }

        //End textbox validation


        //check charcode for VoucherTypeName

        $('#AdjustmentTypeName').bind('keypress', function (evt) {
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

        //end charcode for VoucherTypeName
       
    });
})(jQuery);