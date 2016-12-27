
// Data delete from grid view

function DeleteAccHead(rowId) {

    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Headdelete',
            type: 'POST',
            data: { AccHeadID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblAccHead").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

// end data delete from grid view


// Data update from grid view

function UpdateAccHead(rowId) {
    $.ajax({
        url: 'GetAccHeadByID',
        type: 'POST',
        data: { AccHeadID: rowId },
        success: function (data) {
            $('#AccHeadID').val(data.AccHeadID);
            $('#CompanyID').val(data.CompanyID);
            $('#AccGroupID').val(data.AccGroupID);
            $('#AccountName').val(data.AccountName);
            $('#OpenDebitBalance').val(data.OpenDebitBalance);
            $('#OpenCreditBalance').val(data.OpenCreditBalance);
            $('#Active').val(data.Active);
            $('#Note').val(data.Note);

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
                var x = confirm("Are you sure you want to save this ?")
                if (x == true) {

                    $.ajax({
                        url: 'Headadd',
                        type: 'POST',
                        data: JSON.stringify({
                            accHead: {
                                AccHeadID: $('#AccHeadID').val(),
                                CompanyID: $('#CompanyID').val(),
                                AccGroupID: $('#AccGroupID').val(),
                                AccountName: $('#AccountName').val(),
                                OpenDebitBalance: $('#OpenDebitBalance').val(),
                                OpenCreditBalance: $('#OpenCreditBalance').val(),
                                Active: $('#Active').val(),
                                Note: $('#Note').val()
                            }
                        }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Account Name can not be duplicate');
                            }
                            else {
                                $("#tblAccHead").trigger("reloadGrid");
                                alert('Data Saved Successfully');
                                ClearAll();
                            }
                        }
                    });
                }
            }
        });
        //End Save

        //ClearAll
        function ClearAll() {
            $('#AccHeadID').val(""),
            $('#CompanyID').val(""),
            $('#AccGroupID').val(""),
            $('#AccountName').val(""),
            $('#OpenDebitBalance').val(""),
            $('#OpenCreditBalance').val(""),
            $('#Active').val(""),
            $('#Note').val("")
        }

        //Update
        $('#btnUpdate').click(function () {

            var retval = insert_update();
            if (retval == true) {
                var x = confirm("Are you sure you want to update this ?")
                if (x == true) {

                    $.ajax({
                        url: "Headupdate",
                        type: 'POST',
                        data: JSON.stringify({
                            accHead: {
                                AccHeadID: $('#AccHeadID').val(),
                                CompanyID: $('#CompanyID').val(),
                                AccGroupID: $('#AccGroupID').val(),
                                AccountName: $('#AccountName').val(),
                                OpenDebitBalance: $('#OpenDebitBalance').val(),
                                OpenCreditBalance: $('#OpenCreditBalance').val(),
                                Active: $('#Active').val(),
                                Note: $('#Note').val()

                            }
                        }),
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Account Name can not be duplicate');
                            }
                            else {
                                $("#tblAccHead").trigger("reloadGrid");
                                alert('Data Updated Successfully');
                                ClearAll();
                            }
                        }
                    });
                }
            }
        });

        //End Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblAccHead").setGridWidth(952);
            }
            else {
                $("#tblAccHead").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblAccHead").jqGrid({
            url: 'AccHeadDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'AccHeadID',
                name: 'AccHeadID',
                index: 'AccHeadID',
                width: 75,
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
                label: 'AccGroupID',
                name: 'AccGroupID',
                index: 'AccGroupID',
                width: 100,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'AccountName',
                 name: 'AccountName',
                 index: 'AccountName',
                 width: 100,
                 editable: true,
                 edittype: 'text'
             },
            {
                label: 'OpenDebitBalance',
                name: 'OpenDebitBalance',
                index: 'OpenDebitBalance',
                width: 100,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'OpenCreditBalance',
                 name: 'OpenCreditBalance',
                 index: 'OpenCreditBalance',
                 width: 100,
                 editable: true,
                 edittype: 'text'
             },
              {
                  label: 'Active',
                  name: 'Active',
                  index: 'Active',
                  width: 40,
                  editable: true,
                  edittype: 'text'
              },
               {
                   label: 'Note',
                   name: 'Note',
                   index: 'Note',
                   width: 200,
                   editable: true,
                   edittype: 'text'
               },

            {
                name: 'Edit', index: 'Edit', width: 50, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 50, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#tblAccHead").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblAccHead').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateAccHead(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/edit.gif /></div>";
                    $("#tblAccHead").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteAccHead(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/delete.gif /></div>";
                    $("#tblAccHead").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#DivAccHeadPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "AccHeadID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Acc Head Details',
            editurl: 'Headupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
            { $("#tblAccHead").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {

                    //-----------------------Relode grid------------------------//
                    $("#tblAccHead").trigger("reloadGrid");
                    //......................Relode gride  End............................//

                    //disable edit row on last selection
                    $('#tblAccHead').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblAccHead').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblAccHead').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblAccHead").jqGrid('navGrid', '#DivAccHeadPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Headupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Headadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Headdelete',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        //Textbox Validation

        $('#CompanyID').change(function () {
            $('#CompanyID').css('background-color', '');
        });


        $('#AccGroupID').change(function () {
            $('#AccGroupID').css('background-color', '');
        });


        $('#AccountName').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#OpenDebitBalance').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#OpenCreditBalance').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#Active').bind('keypress', function (evt) {
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

            if ($('#AccGroupID').val() == 0) {
                alert('Please select Account Group');
                $("#AccGroupID").css('background-color', 'red');
                $('#AccGroupID').focus();
                return false;
            }

            if ($('#AccountName').val() == '') {
                $('#AccountName').focus();
                return false;
            }

            if ($('#OpenDebitBalance').val() == '') {
                $('#OpenDebitBalance').focus();
                return false;
            }
            if ($('#OpenCreditBalance').val() == '') {
                $('#OpenCreditBalance').focus();
                return false;
            }
            if ($('#Active').val() == '') {
                $('#Active').focus();
                return false;
            }

            return true;
        }

          //End textbox validation

        // Check charcode for Open Debit Balance

        $('#OpenDebitBalance').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 18) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 18');
                    return false;
                }
            }

            //check one decimal

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '.') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 46) {
                            alert('Only One decimal point is allowed');
                            return false;
                        }
                    }
                }
            }

            //end of check decimal

            if (charcode == 8) {
                return true;
            }
            if (charcode == 46) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        // End  charcode for Open Debit Balance

        // Check charcode for Open Credit Balance

        $('#OpenCreditBalance').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 18) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 18');
                    return false;
                }
            }

            //check one decimal
            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '.') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 46) {
                            alert('Only One decimal point is allowed');
                            return false;
                        }
                    }
                }
            }

            //end of check decimal

            if (charcode == 8) {
                return true;
            }
            if (charcode == 46) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        // End  charcode for Open Credit Balance
        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 300) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 300');
                    return false;
                }
            }
        });

        //end charcode for Note


    });
})(jQuery);