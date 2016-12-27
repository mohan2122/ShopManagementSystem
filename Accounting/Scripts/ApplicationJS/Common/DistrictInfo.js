// Data delete from grid view

function DeleteDistrictInfo(rowId) {

    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DisDelete',
            type: 'POST',
            data: { DistrictID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblDistrict").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateDistrictInfo(rowId) {

    $.ajax({
        url: 'GetDistrictInfoById',
        type: 'POST',
        data: { intDistrictID: rowId },
        success: function (data) {
            $('#DistrictID').val(data.DistrictID);
            $('#DivisionID').val(data.DivisionID);
            $('#DistrictName').val(data.DistrictName);
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
                    url: 'DisAdd',
                    type: 'POST',
                    data: JSON.stringify({
                        districtInfo: {
                            DivisionID: $('#DivisionID').val(),
                            DistrictName: $('#DistrictName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblDistrict").trigger("reloadGrid");
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
                    url: "DisUpdate",
                    type: 'POST',
                    data: JSON.stringify({
                        districtInfo: {
                            DistrictID: $('#DistrictID').val(),
                            DivisionID: $('#DivisionID').val(),
                            DistrictName: $('#DistrictName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblDistrict").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblDistrict").setGridWidth(900);
            }
            else {
                $("#tblDistrict").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblDistrict").jqGrid({
            url: 'DistrictInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'DistrictID',
                name: 'DistrictID',
                index: 'DistrictID',
                width: 200,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'DivisionID',
                name: 'DivisionID',
                index: 'DivisionID',
                width: 410,
                editable: true,
                edittype: 'text'
            }, {
                label: 'DistrictName',
                name: 'DistrictName',
                index: 'DistrictName',
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
                var ids = $("#tblDistrict").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblDistrict').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateDistrictInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblDistrict").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteDistrictInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblDistrict").setRowData(ids[i], { Delete: s });
                }
            },


            pager: $('#DistrictPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "DistrictID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'District Info Details',
            editurl: 'DisUpdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblDistrict").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblDistrict").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblDistrict').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblDistrict').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblDistrict').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblDistrict").jqGrid('navGrid', '#DistrictPager', {
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
        }, {});

        //End jQGrid

        // Texbox validation..

        $('#DistrictName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $("#DivisionID").change(function () {
            $("#DivisionID").css('backgroune-color', '');
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

            if ($('#DivisionID').val() == 0) {
                $("#DivisionID").css('background-color', 'red');
                $('#DivisionID').focus();
                return false;
            }

            if ($('#DistrictName').val() == '') {
                $('#DistrictName').focus();
                return false;
            }

            return true;
        }

        //End Textbox validation


        //check charcode for DistrictName

        $('#DistrictName').bind('keypress', function (evt) {
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

        //end charcode for DistrictName


    });
})(jQuery);