// Data delete from grid view

function Deleteward(rowId) {

    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Warddelete',
            type: 'POST',
            data: { WardID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblWardInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function Updateward(rowId) {
    $.ajax({
        url: 'GettblWardByID',
        type: 'POST',
        data: { WardID: rowId },
        success: function (data) {
            $('#WardID').val(data.WardID);
            $('#UnionID').val(data.UnionID);
            $('#WardName').val(data.WardName);
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
                    url: 'Wardadd',
                    type: 'POST',
                    data: JSON.stringify({
                        Ward: {
                            UnionID: $('#UnionID').val(),
                            WardName: $('#WardName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblWardInfo").trigger("reloadGrid");
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
                    url: "Wardupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        Ward: {
                            WardID: $('#WardID').val(),
                            UnionID: $('#UnionID').val(),
                            WardName: $('#WardName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblWardInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblWardInfo").setGridWidth(900);
            }
            else {
                $("#tblWardInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblWardInfo").jqGrid({
            url: 'WardInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'WardID',
                name: 'WardID',
                index: 'WardID',
                width: 200,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'UnionID',
                name: 'UnionID',
                index: 'UnionID',
                width: 410,
                editable: true,
                edittype: 'text'
            }, {
                label: 'WardName',
                name: 'WardName',
                index: 'WardName',
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
                var ids = $("#tblWardInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblWardInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='Updateward(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblWardInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='Deleteward(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblWardInfo").setRowData(ids[i], { Delete: s });
                }
            },


            pager: $('#WardInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "WardID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Ward Info Details',
            editurl: 'Wardupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblWardInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblWardInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblWardInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblWardInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblWardInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblWardInfo").jqGrid('navGrid', '#WardInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Wardupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Wardadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Warddelete',
            closeAfterDelete: true
        }, {});ccc

        //End jQGrid

        //Texbox validation..


        $('#WardName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $("#UnionID").change(function () {
            $("#UnionID").css('backgroune-color', '');
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

            if ($('#UnionID').val() == 0) {
                $("#UnionID").css('background-color', 'red');
                $('#UnionID').focus();
                return false;
            }

            if ($('#WardName').val() == '') {
                $('#WardName').focus();
                return false;
            }

            return true;
        }

        //End Textbox validation

        //check charcode for UpojillaName

        $('#WardName').bind('keypress', function (evt) {
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

        //end charcode for UpojillaName


    });
})(jQuery);