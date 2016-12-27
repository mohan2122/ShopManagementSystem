// Data delete from grid view

function DeleteVillage(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Villagedelete',
            type: 'POST',
            data: { VillageID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblvillageInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function Updatevillage(rowId) {
    $.ajax({
        url: 'GetVillageInfoByID',
        type: 'POST',
        data: { VillageID: rowId },
        success: function (data) {
            $('#VillageID').val(data.VillageID);
            $('#UnionID').val(data.UnionID);
            $('#VillageName').val(data.VillageName);
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
                    url: 'Villageadd',
                    type: 'POST',
                    data: JSON.stringify({
                        villageinfo: {
                            WardID: $('#WardID').val(),
                            VillageName: $('#VillageName').val(),
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblvillageInfo").trigger("reloadGrid");
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
                    url: "Villageupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        villageinfo: {
                            VillageID: $('#VillageID').val(),
                            UnionID: $('#UnionID').val(),
                            VillageName: $('#VillageName').val()

                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblvillageInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblvillageInfo").setGridWidth(900);
            }
            else {
                $("#tblvillageInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblvillageInfo").jqGrid({
            url: 'VillageDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'VillageID',
                name: 'VillageID',
                index: 'VillageID',
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
                label: 'VillageName',
                name: 'VillageName',
                index: 'VillageName',
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
                var ids = $("#tblvillageInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblvillageInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='Updatevillage(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblvillageInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteVillage(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblvillageInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#villageInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "VillageID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: ' Village Information Details',
            editurl: 'Villageupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblvillageInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblvillageInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblvillageInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected 
                    if (AdminFunctionsLastSel != 0) $('#tblvillageInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblvillageInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblvillageInfo").jqGrid('navGrid', '#villageInfoPager', {
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

        $('#WardID').change(function () {
            $('#WardID').css('background-color', '');
        });


        $('#VillageName').bind('keypress', function (evt) {
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

            if ($('#WardID').val() == '') {
                $('#WardID').css('background-color', 'red');
                $('#WardID').focus();
                return false;
            }


            if ($('#VillageName').val() == '') {
                $('#VillageName').focus();
                return false;
            }


            return true;
        }

        //End

        //check charcode for VillageName

        $('#VillageName').bind('keypress', function (evt) {
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

        //end charcode for VillageName

    });
})(jQuery);