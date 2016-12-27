// Data delete from grid view

function DeleteUpojillaInfo(rowId) {

    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Deleteupazilla',
            type: 'POST',
            data: { UpojillaID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblUpojillaInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateUpojillaInfo(rowId) {

    $.ajax({
        url: 'GetUpojillaInfoById',
        type: 'POST',
        data: { UpojillaID: rowId },
        success: function (data) {
            $('#UpojillaID').val(data.UpojillaID);
            $('#DistrictID').val(data.DistrictID);
            $('#UpojillaName').val(data.UpojillaName);
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
                    url: 'Addupazilla',
                    type: 'POST',
                    data: JSON.stringify({
                        upojillaInfo: {
                            DistrictID: $('#DistrictID').val(),
                            UpojillaName: $('#UpojillaName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblUpojillaInfo").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });
            }
        });

        //End Save

        //Update

        $('#btnUpdate').click(function () {
            var retValue = fnValidation();
            if (retValue == true) {
                $.ajax({
                    url: "Updateupazilla",
                    type: 'POST',
                    data: JSON.stringify({
                        upojillaInfo: {
                            UpojillaID: $('#UpojillaID').val(),
                            DistrictID: $('#DistrictID').val(),
                            UpojillaName: $('#UpojillaName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblUpojillaInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblUpojillaInfo").setGridWidth(900);
            }
            else {
                $("#tblUpojillaInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblUpojillaInfo").jqGrid({
            url: 'UpojillaInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'UpojillaID',
                name: 'UpojillaID',
                index: 'UpojillaID',
                width: 200,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'DistrictID',
                name: 'DistrictID',
                index: 'DistrictID',
                width: 410,
                editable: true,
                edittype: 'text'
            }, {
                label: 'UpojillaName',
                name: 'UpojillaName',
                index: 'UpojillaName',
                width: 400,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                name: 'Edit', index: 'Edit', width: 75, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 75, editable: false, align: 'center', sortable: false
            }],


            gridComplete: function () {
                var ids = $("#tblUpojillaInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblUpojillaInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateUpojillaInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblUpojillaInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteUpojillaInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblUpojillaInfo").setRowData(ids[i], { Delete: s });
                }
            },


            pager: $('#UpojillaInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "UpojillaID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Upojilla Info Details',
            editurl: 'Updateupazilla',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblUpojillaInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblUpojillaInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblUpojillaInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblUpojillaInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblUpojillaInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblUpojillaInfo").jqGrid('navGrid', '#UpojillaInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Updateupazilla',
            closeAfterEdit: true
        }, {
            url: '/Setup/Addupazilla',
            closeAfterAdd: true
        }, {
            url: '/Setup/Deleteupazilla',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        // Texbox validation..

        $('#UpojillaName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $("#DistrictID").change(function () {
            $("#DistrictID").css('backgroune-color', 'white');
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

            if ($('#DistrictID').val() == 0) {
                $("#DistrictID").css('background-color', 'red');
                $('#DistrictID').focus();
                return false;
            }

            if ($('#UpojillaName').val() == '') {
                $('#UpojillaName').focus();
                return false;
            }

            return true;
        }

        //End


        //check charcode for UpojillaName

        $('#UpojillaName').bind('keypress', function (evt) {
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

        //end charcode for UpojillaName


    });
})(jQuery);