// Data delete from grid view

function DeleteColorInfo(rowId) {

    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteColor',
            type: 'POST',
            data: { ColorID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblColorInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateColorInfo(rowId) {

    $.ajax({
        url: 'GetInv_ColorInfoByID',
        type: 'POST',
        data: { ColorID: rowId },
        success: function (data) {
            $('#ColorID').val(data.ColorID);
            $('#ColorName').val(data.ColorName);
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
                    url: 'AddColor',
                    type: 'POST',
                    data: JSON.stringify({

                        inv_ColorInfo: {
                            ColorName: $('#ColorName').val(),
                            Note: $('#Note').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblColorInfo").trigger("reloadGrid");
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
                    url: 'UpdateColor',
                    type: 'POST',
                    data: JSON.stringify({
                        inv_ColorInfo: {
                            ColorID: $('#ColorID').val(),
                            ColorName: $('#ColorName').val(),
                            Note: $('#Note').val()

                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblColorInfo").trigger("reloadGrid");
                        alert('Data Updated successsfully');
                    }

                });
            }
        });

        //end Data update;


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblColorInfo").setGridWidth(900);
            }
            else {
                $("#tblColorInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblColorInfo").jqGrid({
            url: 'Inv_ColorInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ColorID',
                name: 'ColorID',
                index: 'ColorID',
                width: 150,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'ColorName',
                name: 'ColorName',
                index: 'ColorName',
                width: 215,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 540,
                editable: true,
                edittype: 'text'
            }, {
                name: 'Edit', index: 'Edit', width: 100, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 100, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblColorInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblColorInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //this onclick id up to dateils ....

                    s = "<div title='edit' onclick='UpdateColorInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblColorInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='Delete' onclick='DeleteColorInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblColorInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#ColorInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "ColorID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Color Info Details',
            editurl: 'UpdateColor',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblColorInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblColorInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblColorInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblColorInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblColorInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblColorInfo").jqGrid('navGrid', '#ColorInfoPager', {
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

        $('#ColorID').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        $('#ColorName').bind('keypress', function (evt) {
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

            if ($('#ColorName').val() == '') {
                $('#ColorName').focus();
                return false;
            }

            return true;
        }


        //End Textbox validation


        //check charcode for ColorName

        $('#ColorName').bind('keypress', function (evt) {
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

        //end charcode for ColorName
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