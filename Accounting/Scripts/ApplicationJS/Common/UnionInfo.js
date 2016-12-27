﻿// Data delete from grid view

function DeleteUnionInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Uniondelete',
            type: 'POST',
            data: { UnionID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                //--------------------------Relodegride---------------------//
                $("#tblUnionInfo").trigger("reloadGrid");
                //--------------------------Relodegride---------------------//
                alert('Data Deleted Successfully');
            }
        });
    }
}

// end data delete from grid view


// Data update from grid view

function UpdateUnionInfo(rowId) {
    $.ajax({
        url: 'GetUnionInfoByID',
        type: 'POST',
        data: { UnionID: rowId },
        success: function (data) {
            $('#UnionID').val(data.UnionID);
            $('#UpojillaID').val(data.UpojillaID);
            $('#UnionName').val(data.UnionName);

        }
    });
}

//End


//jQuery

(function ($) {
    $(document).ready(function () {

        //Save 

        $('#btnSave').click(function () {
            var retval = fnValidation();
            if (retval == true) {
                $.ajax({
                    url: 'Unionadd',
                    type: 'POST',
                    data: JSON.stringify({
                        Union: {
                            UnionID: $('#UnionID').val(),
                            UpojillaID: $('#UpojillaID').val(),
                            UnionName: $('#UnionName').val()

                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblUnionInfo").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });
            }

        });
        //End Save

        //Update

        $('#btnUpdate').click(function () {
            var retval = fnValidation();
            if (retval == true) {
                $.ajax({
                    url: "Unionupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        Union: {
                            UnionID: $('#UnionID').val(),
                            UpojillaID: $('#UpojillaID').val(),
                            UnionName: $("#UnionName").val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblUnionInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblUnionInfo").setGridWidth(900);
            }
            else {
                $("#tblUnionInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblUnionInfo").jqGrid({
            url: 'UnionInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'UnionID',
                name: 'UnionID',
                index: 'UnionID',
                width: 200,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'UpojillaID',
                name: 'UpojillaID',
                index: 'UpojillaID',
                width: 410,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'UnionName',
                name: 'UnionName',
                index: 'UnionName',
                width: 400,
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
                var ids = $("#tblUnionInfo").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblUnionInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateUnionInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblUnionInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteUnionInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblUnionInfo").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#UnionInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "UnionID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'UnionInfoDetails',
            editurl: 'Unionupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#tblUnionInfo").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#tblUnionInfo").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#tblUnionInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblUnionInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblUnionInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });


        $("#tblUnionInfo").jqGrid('navGrid', '#UnionInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Unionupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Unionadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Uniondelete',
            closeAfterDelete: true
        }, {});


        //End jQGrid

        // Texbox validation..

        $('#UnionName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        $("#UpojillaID").change(function () {
            $("#UpojillaID").css('backgroune-color', '');
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

            if ($('#UpojillaID').val() == 0) {
                $("#UpojillaID").css('background-color', 'red');
                $('#UpojillaID').focus();
                return false;
            }

            if ($('#UnionName').val() == '') {
                $('#UnionName').focus();
                return false;
            }

            return true;
        }

        //End


        //check charcode for UnionName

        $('#UnionName').bind('keypress', function (evt) {
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

        //end charcode for UnionName

    });

})(jQuery);