// Data delete from grid view

function DeleteTarrifType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteTarrif',
            type: 'POST',
            data: { TarrifTypeID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblTarrifType").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateTarrifType(rowId) {
    $.ajax({
        url: 'GetTarrifTypeByID',
        type: 'POST',
        data: { TarrifTypeID: rowId },
        success: function (data) {
            $('#TarrifTypeID').val(data.TarrifTypeID);
            $('#TarrifType1').val(data.TarrifType1);
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
                    url: 'AddTarrif',
                    type: 'POST',
                    data: JSON.stringify({
                        tarriftype: {
                            TarrifType1: $('#TarrifType1').val(),
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblTarrifType").trigger("reloadGrid");
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
                    url: "UpdateTarrif",
                    type: 'POST',
                    data: JSON.stringify({
                        tarriftype: {
                            TarrifTypeID: $('#TarrifTypeID').val(),
                            TarrifType1: $('#TarrifType1').val()

                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblTarrifType").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblTarrifType").setGridWidth(900);
            }
            else {
                $("#tblTarrifType").setGridWidth($(window).width());
            }
        }).trigger('resize');
        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblTarrifType").jqGrid({
            url: 'TarrifTypeDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'TarrifTypeID',
                name: 'TarrifTypeID',
                index: 'TarrifTypeID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'TarrifType1',
                name: 'TarrifType1',
                index: 'TarrifType1',
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
                var ids = $("#tblTarrifType").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblTarrifType').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateTarrifType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblTarrifType").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteTarrifType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblTarrifType").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#TarrifTypePager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "TarrifTypeID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'TarrifType Details',
            editurl: 'UpdateTarrif',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblTarrifType").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblTarrifType").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblTarrifType').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblTarrifType').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblTarrifType').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblTarrifType").jqGrid('navGrid', '#TarrifTypePager', {
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

        $('#TarrifType1').bind('keypress', function (evt) {
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

            if ($('#TarrifType1').val() == '') {
                $('#TarrifType1').focus();
                return false;
            }

            return true;
        }


        //End

        // Check charcode for TarrifType1 Balance

        $('#TarrifType1').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 10) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 10');
                    return false;
                }
            }

        });

        //// End  charcode for TarrifType1 Balance

    });
})(jQuery);