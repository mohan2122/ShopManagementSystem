// Data delete from grid view

function DeletePaymentType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Delectdesignation',
            type: 'POST',
            data: { DesignationID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblDesignation").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdatePaymentType(rowId) {
    $.ajax({
        url: 'GetdesignationByID',
        type: 'POST',
        data: { DesignationID: rowId },
        success: function (data) {
            $('#DesignationID').val(data.DesignationID);
            $('#DesignationName').val(data.DesignationName);
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
                    url: 'Adddesignation',
                    type: 'POST',
                    data: JSON.stringify({
                        tblDesignation: {
                            DesignationName: $('#DesignationName').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblDesignation").trigger("reloadGrid");
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
                    url: "Updatedesignation",
                    type: 'POST',
                    data: JSON.stringify({
                        tblDesignation: {
                            DesignationID: $('#DesignationID').val(),
                            DesignationName: $('#DesignationName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblDesignation").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update

        //Start Show
        $('#btnShow').click(function () {
            window.location.href = 'Show';
            //$.ajax({
            //    url:'Show',
            //    type: 'POST',
            //    contentType:'application/json; charset=utf-8'
            //});
        });
        //End Show


      

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblDesignation").setGridWidth(900);
            }
            else {
                $("#tblDesignation").setGridWidth($(window).width());
            }
        }).trigger('resize');
        

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblDesignation").jqGrid({
            url: 'DesignationDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'DesignationID',
                name: 'DesignationID',
                index: 'DesignationID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'DesignationName',
                name: 'DesignationName',
                index: 'DesignationName',
                width: 700,
                editable: true,
                edittype: 'text'
            }
            , {
                name: 'Edit', index: 'Edit', width: 125, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 135, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblDesignation").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblDesignation').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdatePaymentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblDesignation").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeletePaymentType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblDesignation").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#tblDesignationPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "DesignationID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Designation Details',
            editurl: 'UpdateDesignation',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblDesignation").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblDesignation").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblDesignation').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblDesignation').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblDesignation').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblDesignation").jqGrid('navGrid', '#tblDesignationPager', {
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

        // Textbox Validation

        $('#DesignationID').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#DesignationName').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
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

            if ($('#DesignationName').val() == '') {
                $('#DesignationName').focus();
                return false;
            }
            return true;
        }

        //End Textbox validation

        //check charcode for DesignationName

        $('#DesignationName').bind('keypress', function (evt) {
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

        //end charcode for DesignationName

    });
})(jQuery);