// Data delete from grid view

function DeleteUnit(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteUnit',
            type: 'POST',
            data: { UnitID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblUnit").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateUnit(rowId) {
    $.ajax({
        url: 'GetUnitByID',
        type: 'POST',
        data: { UnitID: rowId },
        success: function (data) {
            $('#UnitID').val(data.UnitID);
            $('#UnitName').val(data.UnitName);
        }
    });
}

//End

//jQuery

(function ($) {
    $(document).ready(function () {

        //--------------Save--------------

        $('#btnSave').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: 'AddUnit',
                    type: 'POST',
                    data: JSON.stringify({
                        unit: {
                            UnitName: $('#UnitName').val(),
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblUnit").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });

            }
        });

        //------------------End Save------------------------------


        //--------------------Update------------------------------

        $('#btnUpdate').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: "UpdateUnit",
                    type: 'POST',
                    data: JSON.stringify({
                        unit: {
                            UnitID: $('#UnitID').val(),
                            UnitName: $('#UnitName').val()

                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblUnit").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------
        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblUnit").setGridWidth(900);
            }
            else {
                $("#tblUnit").setGridWidth($(window).width());
            }
        }).trigger('resize');
        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblUnit").jqGrid({
            url: 'UnitDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'UnitID',
                name: 'UnitID',
                index: 'UnitID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'UnitName',
                name: 'UnitName',
                index: 'UnitName',
                width: 700,
                editable: true,
                edittype: 'text'
            }
            , {
                name: 'Edit', index: 'Edit', width: 135, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 125, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblUnit").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblUnit').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateUnit(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblUnit").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteUnit(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblUnit").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#UnitPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "UnitID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Unit Details',
            editurl: 'UpdateUnit',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblUnit").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblUnit").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblUnit').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblUnit').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblUnit').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblUnit").jqGrid('navGrid', '#UnitPager', {
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

$('#UnitName').bind('keypress', function (evt) {
    var chharcode = evt.which;
    if (chharcode != '') {
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

    if ($('#UnitName').val() == '') {
        $('#UnitName').focus();
        return false;
    }

    return true;
}

//End

        //check charcode for UnitName

        $('#UnitName').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 50) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =50');
                    return false;
                }
            }


        });


        //end check charcode for UnitName


    });
})(jQuery);