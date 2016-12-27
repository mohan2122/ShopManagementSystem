// Data delete from grid view

function DeleteVATType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DelectVat',
            type: 'POST',
            data: { VATTypeID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblVatType").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateVATType(rowId) {
    $.ajax({
        url: 'GetVATTypeByID',
        type: 'POST',
        data: { VATTypeID: rowId },
        success: function (data) {
            $('#VATTypeID').val(data.VATTypeID);
            $('#VATType1').val(data.VATType1);
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
                    url: 'AddVat',
                    type: 'POST',
                    data: JSON.stringify({
                        vatType: {
                            VATType1: $('#VATType1').val(),
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblVatType").trigger("reloadGrid");
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
                    url: "UpdateVat",
                    type: 'POST',
                    data: JSON.stringify({
                        Vattype: {
                            VATTypeID: $('#VATTypeID').val(),
                            VATType1: $('#VATType1').val()

                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblVatType").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblVatType").setGridWidth(900);
            }
            else {
                $("#tblVatType").setGridWidth($(window).width());
            }
        }).trigger('resize');
        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblVatType").jqGrid({
            url: 'VATTYPEDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'VATTypeID',
                name: 'VATTypeID',
                index: 'VATTypeID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'VATType1',
                name: 'VATType1',
                index: 'VATType1',
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
                var ids = $("#tblVatType").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblVatType').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateVATType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblVatType").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteVATType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblVatType").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#VatTypePager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "VATTypeID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'VATType Details',
            editurl: 'UpdateVat',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblVatType").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblVatType").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblVatType').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblVatType').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblVatType').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblVatType").jqGrid('navGrid', '#VatTypePager', {
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

        $('#VATType1').bind('keypress', function (evt) {
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

            if ($('#VATType1').val() == '') {
                $('#VATType1').focus();
                return false;
            }


            return true;
        }

        //End



        // Check charcode for VATType1 Balance

        $('#VATType1').bind('keypress', function (evt) {
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

        //// End  charcode for VATType1 Balance



    });
})(jQuery);