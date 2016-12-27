// Data delete from grid view

function DeleteBank(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'Bankdelete',
            type: 'POST',
            data: { BankID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblBank").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

// end data delete from grid view

// Data update from grid view

function UpdateBank(rowId) {
    $.ajax({
        url: 'GetBankByID',
        type: 'POST',
        data: { BankID: rowId },
        success: function (data) {
            $('#BankID').val(data.BankID);
            $('#CompanyID').val(data.CompanyID);
            $('#BankName').val(data.BankName);
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
            var retval = insert_update();
            if (retval == true) {
                var x = confirm("Are you sure you want to save this?")
                if (x == true) {
                    $.ajax({
                        url: 'Bankadd',
                        type: 'POST',
                        data: JSON.stringify({
                            bank: {
                                BankID: $('#BankID').val(),
                                CompanyID: $('#CompanyID').val(),
                                BankName: $('#BankName').val(),
                                Note: $('#Note').val()
                            }
                        }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            $("#tblBank").trigger("reloadGrid");
                            alert('Data Saved Successfully');
                            ClearAll();
                        }
                    });
                }
            }

        });

        //End Save

        //Update

        $('#btnUpdate').click(function () {
            var retval = insert_update();
            if (retval == true) {
                var x = confirm("Are you sure you want to update this?")
                if (x == true) {
                    $.ajax({
                        url: "Bankupdate",
                        type: 'POST',
                        data: JSON.stringify({
                            bank: {
                                BankID: $('#BankID').val(),
                                CompanyID: $('#CompanyID').val(),
                                BankName: $("#BankName").val(),
                                Note: $("#Note").val()
                            }
                        }),
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            $("#tblBank").trigger("reloadGrid");
                            alert('Data Updated Successfully');
                            ClearAll();
                        }
                    });
                }
            }
        });

        //End Update



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblBank").setGridWidth(900);
            }
            else {
                $("#tblBank").setGridWidth($(window).width());
            }
        }).trigger('resize');

        function ClearAll() {
            $('#CompanyID').val(""),
            $('#BankName').val(""),
            $('#Note').val("")
        }

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblBank").jqGrid({
            url: 'BankDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'BankID',
                name: 'BankID',
                index: 'BankID',
                width: 100,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'CompanyID',
                name: 'CompanyID',
                index: 'CompanyID',
                width: 250,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'BankName',
                name: 'BankName',
                index: 'BankName',
                width: 175,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 400,
                editable: true,
                edittype: 'text'
            }
            ,
            {
                name: 'Edit', index: 'Edit', width: 65, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 70, editable: false, align: 'center', sortable: false
               }],

            gridComplete: function () {
                var ids = $("#tblBank").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblBank').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateBank(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblBank").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteBank(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblBank").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#BankPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "BankID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'BankDetails',
            editurl: 'Bankupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#tblBank").trigger("reloadGrid"); },
            //------Relode gride end---------//
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    //----------Relode grid--------//
                    $("#tblBank").trigger("reloadGrid");
                    //......Relode gride  End...........//
                    //disable edit row on last selection
                    $('#tblBank').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblBank').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblBank').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblBank").jqGrid('navGrid', '#BankPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Bankupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Bankadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Bankdelete',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        //Textbox Validation

        $('#BankID').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-colour', '');
            }
        });

        $('#BankName').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $("#CompanyID").change(function () {
            $("#CompanyID").css('backgroune-color', '');
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


            if ($('#BankName').val() == '') {
                alert('Please enter bank name');
                $('#BankName').focus();
                return false;
            }

            return true;
        }

        //End



        //check charcode for BankName

        $('#BankName').bind('keypress', function (evt) {
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

        //end check charcode for BankName


        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
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

        //end charcode for Note


    });

})(jQuery);