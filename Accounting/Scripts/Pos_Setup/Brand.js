// Data delete from grid view

function DeleteInvBrand(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteBrand',
            type: 'POST',
            data: { BrandID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblInvBrand").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateInvBrand(rowId) {
    $.ajax({
        url: 'GetInvBrandByID',
        type: 'POST',
        data: { BrandID: rowId },
        success: function (data) {
            $('#BrandID').val(data.BrandID);
            $('#BrandName').val(data.BrandName);
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
                    url: 'AddBrand',
                    type: 'POST',
                    data: JSON.stringify({
                        invbrand: {
                            BrandName: $('#BrandName').val(),
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblInvBrand").trigger("reloadGrid");
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
                    url: "UpdateBrand",
                    type: 'POST',
                    data: JSON.stringify({
                        invbrand: {
                            BrandID: $('#BrandID').val(),
                            BrandName: $('#BrandName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblInvBrand").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblInvBrand").setGridWidth(900);
            }
            else {
                $("#tblInvBrand").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblInvBrand").jqGrid({
            url: 'InvBrandDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'BrandID',
                name: 'BrandID',
                index: 'BrandID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'BrandName',
                name: 'BrandName',
                index: 'BrandName',
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
                var ids = $("#tblInvBrand").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblInvBrand').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateInvBrand(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblInvBrand").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteInvBrand(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblInvBrand").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#InvBrandPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "BrandID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'InvBrand Details',
            editurl: 'UpdateBrand',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblInvBrand").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblInvBrand").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblInvBrand').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblInvBrand').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblInvBrand').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblInvBrand").jqGrid('navGrid', '#InvBrandPager', {
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

        $('#BrandName').bind('keypress', function (evt) {
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

            if ($('#BrandName').val() == '') {
                $('#BrandName').focus();
                return false;
            }


            return true;
        }

        //End


        // Check charcode for Modifier Balance

        $('#BrandName').bind('keypress', function (evt) {
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

        // End  charcode for Modifier Balance

    });
})(jQuery);