
//Data delete from grid view

function DeleteCheckInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Checkdelete',
            type: 'POST',
            data: { CheckID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblCheckInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

// end data delete from grid view


// Data update from grid view

function UpdateCheckInfo(rowId) {
    $.ajax({
        url: 'GetCheckInfoByID',
        type: 'POST',
        data: { CheckID: rowId },
        success: function (data) {
            $('#CheckID').val(data.CheckID);
            $('#CompanyID').val(data.CompanyID);
            $('#BankID').val(data.BankID);
            $('#ChequeStart').val(data.ChequeStart);
            $('#ChequeEnd').val(data.ChequeEnd);
            $('#TotalPage').val(data.TotalPage);
        }
    });
}

//end data update from grid view

//jQuery

(function ($) {
    $(document).ready(function () {

        //Save 

        $('#btnSave').click(function () {

            var retval = insert_update();
            if (retval == true) {

                $.ajax({
                    url: 'Checkadd',
                    type: 'POST',
                    data: JSON.stringify({
                        checkInfo: {
                            CompanyID: $('#CompanyID').val(),
                            BankID: $('#BankID').val(),
                            ChequeStart: $('#ChequeStart').val(),
                            ChequeEnd: $('#ChequeEnd').val(),
                            //TakenDate: $('#TakenDate').val(),
                            TotalPage: $('#TotalPage').val()


                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblCheckInfo").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });
            }

        });

        //End Save


        //Update

        $('#btnUpdate').click(function () {

            var retval = insert_update();
            if (retval == true) {

                $.ajax({
                    url: "Checkupdate",
                    type: 'POST',
                    data: JSON.stringify({
                        checkInfo: {
                            CheckID: $('#CheckID').val(),
                            CompanyID: $('#CompanyID').val(),
                            BankID: $('#BankID').val(),
                            ChequeStart: $('#ChequeStart').val(),
                            ChequeEnd: $('#ChequeEnd').val(),
                            //TakenDate: $('#TakenDate').val(),
                            TotalPage: $('#TotalPage').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblCheckInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblCheckInfo").setGridWidth(952);
            }
            else {
                $("#tblCheckInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');



        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblCheckInfo").jqGrid({
            url: 'CheckInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'CheckID',
                name: 'CheckID',
                index: 'CheckID',
                width: 100,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'CompanyID',
                name: 'CompanyID',
                index: 'CompanyID',
                width: 200,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'BankID',
                name: 'BankID',
                index: 'BankID',
                width: 200,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'ChequeStart',
                name: 'ChequeStart',
                index: 'ChequeStart',
                width: 150,
                editable: true,
                edittype: 'text'
            },

            {
                label: 'ChequeEnd',
                name: 'ChequeEnd',
                index: 'ChequeEnd',
                width: 150,
                editable: true,
                edittype: 'text'
            },

            {
                label: 'TotalPage',
                name: 'TotalPage',
                index: 'TotalPage',
                width: 100,
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
                var ids = $("#tblCheckInfo").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblCheckInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateCheckInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblCheckInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteCheckInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblCheckInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#divCheckInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "CheckID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'CheckInfoDetails',
            editurl: 'Checkupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //------------Relodegride---------//
            { $("#tblCheckInfo").trigger("reloadGrid"); },
            //------Relodegride----------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //-----------------Relodegride-------//
                    $("#tblCheckInfo").trigger("reloadGrid");
                    //-------------Relodegride-------//
                    //disable edit row on last selection
                    $('#tblCheckInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblCheckInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblCheckInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblCheckInfo").jqGrid('navGrid', '#divCheckInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Checkupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Checkadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Checkdelete',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        //Textbox Validation

        $('#CompanyID').change(function () {
            $('#CompanyID').css('background-color', '');
        });



        $('#BankID').change(function () {
            $('#BankID').css('background-color', '');
        });

        $('#ChequeStart').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#ChequeEnd').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#TotalPage').bind('keypress', function (evt) {
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


            if ($('#CompanyID').val() == 0) {
                alert('Please select company');
                $("#CompanyID").css('background-color', 'red');
                $('#CompanyID').focus();
                return false;
            }


            if ($('#BankID').val() == 0) {
                alert('Please select Bank');
                $("#BankID").css('background-color', 'red');
                $('#BankID').focus();
                return false;
            }

            if ($('#ChequeStart').val() == '') {
                $('#ChequeStart').focus();
                return false;
            }
            if ($('#ChequeEnd').val() == '') {
                $('#ChequeEnd').focus();
                return false;
            }


            if ($('#TotalPage').val() == '') {
                $('#TotalPage').focus();
                return false;
            }

            return true;
        }

        //End 



        //check charcode for ChequeStart

        $('#ChequeStart').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 30) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 30');
                    return false;
                }
            }
        });

        //end check charcode for ChequeStart


        //check charcode for ChequeEnd

        $('#ChequeEnd').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 30) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 30');
                    return false;
                }
            }

        });

        //end check charcode for ChequeEnd


        //check charcode for TotalPage

        $('#TotalPage').bind('keypress', function (evt) {
            var charcode = (evt.which);


            if (charcode == 8) {
                return true;
            }

            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        //end check charcode for TotalPage

    });

})(jQuery);