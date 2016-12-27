// Data delete from grid view

function DeleteVoucherType(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'vouchDelete',
            type: 'POST',
            data: { VoucherTypeID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblVoucherType").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateVoucherType(rowId) {
    $.ajax({
        url: 'GetVoucherTypeByID',
        type: 'POST',
        data: { VoucherTypeID: rowId },
        success: function (data) {
            $('#VoucherTypeID').val(data.VoucherTypeID);
            $('#VoucherTypeName').val(data.VoucherTypeName);
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
                                url: 'VouchAdd',
                                type: 'POST',
                                data: JSON.stringify({

                                    voucherType: {
                                        VoucherTypeName: $('#VoucherTypeName').val(),
                                        Note: $('#Note').val()
                                    }
                                }),
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {
                                    if (data == 1) {
                                        alert('Voucher Type Name can not be duplicate');
                                    }
                                    else {
                                        $("#tblVoucherType").trigger("reloadGrid");
                                        alert('Data Saved Successfully');
                                        ClearAll();
                                    }
                                }
                            });
                        }           
        });

        //End Save
        //ClearAll
        function ClearAll() {
            $('#VoucherTypeID').val(""),
            $('#VoucherTypeName').val(""),
            $('#Note').val("")

        }


        //Update

        $('#btnUpdate').click(function () {
            var retValue = fnValidaton();
            if (retValue == true) {
                $.ajax({
                    url: 'VouchUpdate',
                    type: 'POST',
                    data: JSON.stringify({
                        voucherType: {
                            VoucherTypeID: $('#VoucherTypeID').val(),
                            VoucherTypeName: $('#VoucherTypeName').val(),
                            Note: $('#Note').val()

                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data == 1) {
                            alert('Voucher Type Name can not be duplicate');
                        }
                        else {
                            $("#tblVoucherType").trigger("reloadGrid");
                            alert('Data Updated successsfully');
                        }
                    }

                });
            }
        });

        
        //end Data update;

        //$('#btnRefresh').click(function(){
        //$('input[type=text]').each(function() {
        //            $(this).val('');
        //    	    });
        //});​



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblVoucherType").setGridWidth(900);
            }
            else {
                $("#tblVoucherType").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblVoucherType").jqGrid({
            url: 'VoucherTypeDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'VoucherTypeID',
                name: 'VoucherTypeID',
                index: 'VoucherTypeID',
                width: 150,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'VoucherTypeName',
                name: 'VoucherTypeName',
                index: 'VoucherTypeName',
                width: 250,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 545,
                editable: true,
                edittype: 'text'
            }, {
                name: 'Edit', index: 'Edit', width: 80, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 80, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblVoucherType").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblVoucherType').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //this onclick id up to dateils ....

                    s = "<div title='edit' onclick='UpdateVoucherType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/edit.gif /></div>";
                    $("#tblVoucherType").setRowData(ids[i], { Edit: s });

                    s = "<div title='Delete' onclick='DeleteVoucherType(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/delete.gif /></div>";
                    $("#tblVoucherType").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#VoucherTypePager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "VoucherTypeID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'VoucherType Details',
            editurl: 'VouchUpdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblVoucherType").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblVoucherType").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblVoucherType').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblVoucherType').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblVoucherType').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblVoucherType").jqGrid('navGrid', '#VoucherTypePager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/VouchUpdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/VouchAdd',
            closeAfterAdd: true
        }, {
            url: '/Setup/vouchDelete',
            closeAfterDelete: true
        }, {

        });

        //End jQGrid

        //Textbox Validation

        $('#VoucherTypeID').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        $('#VoucherTypeName').bind('keypress', function (evt) {
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

            if ($('#VoucherTypeName').val() == '') {
                $('#VoucherTypeName').focus();
                return false;
            }

            return true;
        }

        //End textbox validation


        //check charcode for VoucherTypeName

        $('#VoucherTypeName').bind('keypress', function (evt) {
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

        //end charcode for VoucherTypeName
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