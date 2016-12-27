// Data delete from grid view

function DeleteBranch(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DelectBranch',
            type: 'POST',
            data: { BranchID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblBrain").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateBranch(rowId) {
    $.ajax({
        url: 'GetBranchByID',
        type: 'POST',
        data: { BranchID: rowId },
        success: function (data) {
            $('#BranchID').val(data.BranchID);
            $('#CompanyID').val(data.CompanyID);
            $('#BankID').val(data.BankID);
            $('#BranchName').val(data.BranchName);
            $('#Address').val(data.Address);
            $('#Phone').val(data.Phone);
            $('#Mobile').val(data.Mobile);
            $('#Email').val(data.Email);
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

            // Email valition--------------

            var sEmail = $('#Email').val();
            if ($.trim(sEmail).length == 0) {
                e.preventDefault();
            }
            if (validateEmail(sEmail)) {
                //alert('Email is valid');
                $('#Email').html('Email is valid');
                $('#Email').css('color', '');
            }
            else {
                //alert('Invalid Email Address');
                $('#Email').html('Invalid Email Address');
                $('#Email').css('color', 'red');
                e.preventDefault();
                return false;
            }

            //end  

            if (retval == true) {
                $.ajax({
                    url: 'AddBranch',
                    type: 'POST',
                    data: JSON.stringify({
                        branch: {
                            CompanyID: $('#CompanyID').val(),
                            BankID: $('#BankID').val(),
                            BranchName: $('#BranchName').val(),
                            Address: $('#Address').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            Email: $('#Email').val(),
                            Note: $('#Note').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblBrain").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                        ClearAll();
                    }
                });
            }
        });

        //End


        //Update

        $('#btnUpdate').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: "UpdateBranch",
                    type: 'POST',
                    data: JSON.stringify({
                        branch: {
                            BranchID: $('#BranchID').val(),
                            CompanyID: $('#CompanyID').val(),
                            BankID: $('#BankID').val(),
                            BranchName: $('#BranchName').val(),
                            Address: $('#Address').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            Email: $('#Email').val(),
                            Note: $('#Note').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblBrain").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                        ClearAll();
                    }
                });
            }
        });


        //---------------------End Update--------------------------

        function ClearAll() {
            $('#CompanyID').val(""),
            $('#BankID').val(""),
            $('#BranchName').val(""),
            $('#Address').val(""),
            $('#Phone').val(""),
            $('#Mobile').val(""),
            $('#Email').val(""),
            $('#Note').val("")
        }



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblBrain").setGridWidth(952);
            }
            else {
                $("#tblBrain").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblBrain").jqGrid({
            url: 'BranchDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'BranchID',
                name: 'BranchID',
                index: 'BranchID',
                width: 77,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'CompanyID',
                name: 'CompanyID',
                index: 'CompanyID',
                width: 100,
                editable: true,
                edittype: 'text'
            }, {
                label: 'BankID',
                name: 'BankID',
                index: 'BankID',
                width: 75,
                editable: true,
                edittype: 'text'
            }, {
                label: 'BranchName',
                name: 'BranchName',
                index: 'BranchName',
                width: 100,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Address',
                name: 'Address',
                index: 'Address',
                width: 90,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Phone',
                name: 'Phone',
                index: 'Phone',
                width: 100,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Mobile',
                name: 'Mobile',
                index: 'Mobile',
                width: 100,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Email',
                name: 'Email',
                index: 'Email',
                width: 100,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 120,
                editable: true,
                edittype: 'text'
            }
            , {
                name: 'Edit', index: 'Edit', width: 75, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 75, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblBrain").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblBrain').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateBranch(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblBrain").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteBranch(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblBrain").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#BrainPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "BranchID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: ' Branch Information Details',
            editurl: 'UpdateBranch',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblBrain").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblBrain").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblBrain').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected 
                    if (AdminFunctionsLastSel != 0) $('#tblBrain').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblBrain').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblBrain").jqGrid('navGrid', '#BrainPager', {
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

        $('#CompanyID').change(function () {
            $('#CompanyID').css('background-color', '');
        });

        $('#BankID').change(function () {
            $('#BankID').css('background-color', '');
        });

        $('#BranchName').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#Address').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#Phone').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#Mobile').bind('keypress', function (evt) {
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

            if ($('#CompanyID').val() == '') {
                alert('Please select company');
                $('#CompanyID').css('background-color', 'red');
                $('#CompanyID').focus();
                return false;
            }


            if ($('#BankID').val() == '') {
                alert('Please select Bank');
                $('#BankID').css('background-color', 'red');
                $('#BankID').focus();
                return false;
            }

            if ($('#BranchName').val() == '') {
                $('#BranchName').focus();
                return false;
            }

            if ($('#Address').val() == '') {
                $('#Address').focus();
                return false;
            }

            if ($('#Phone').val() == '') {
                $('#Phone').focus();
                return false;
            }

            if ($('#Mobile').val() == '') {
                $('#Mobile').focus();
                return false;
            }


            return true;
        }


        //End textbox validation

        //-------------------------charcode validation for PhoneNo------------------------------------

        $('#Phone').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 12) {
                if (charcode == 8) {
                    return true;
                }

                else {
                    alert('Max length is = 12');
                    return false;
                }
            }

            //this code for  One  + cheak

            if ($(this).val().indexOf('+') > 1) {
                if (charcode == 8) {
                    return true;
                }
                if (charcode == 43) {
                    alert('Only One + is allowed');
                    return false;
                }
            }

            //End code for  One  "+" cheak

            //this code for  One  "(" cheak

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '(') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 40) {
                            alert('Only One ( is allowed');
                            return false;
                        }
                    }
                }
            }

            //this End code for  One  "(" cheak

            //this code for  One  ")" cheak

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == ')') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 41) {
                            alert('Only One ) is allowed');
                            return false;
                        }
                    }
                }
            }
            //this End code for  One  ")" cheak

            //this code for  One  "-" cheak

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '-') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 45) {
                            alert('Only One - is allowed');
                            return false;
                        }
                    }
                }
            }

            //this End code for  One  "-" cheak


            if (charcode == 8) {
                return true;
            }
            if (charcode == 43) {
                return true;
            }
            if (charcode == 40) {
                return true;
            }
            if (charcode == 41) {
                return true;
            }
            if (charcode == 45) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });


        //----------------------- end this  charcode for PhoneNo---------------------



        //-------------------------charcode for Mobile------------------------------------

        $('#Mobile').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 11) {
                if (charcode == 8) {
                    return true;
                }

                else {
                    alert('Max length is = 11');
                    return false;
                }
            }



            //this code for  One  "+" cheak

            if ($(this).val().indexOf('+') > 1) {
                if (charcode == 8) {
                    return true;
                }
                if (charcode == 43) {
                    alert('Only One + is allowed');
                    return false;
                }
            }

            //this End code for  One  "+" cheak

            //this code for  One  "(" cheak

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '(') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 40) {
                            alert('Only One ( is allowed');
                            return false;
                        }
                    }
                }
            }

            //this End code for  One  "(" cheak


            //this code for  One  ")" cheak

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == ')') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 41) {
                            alert('Only One ) is allowed');
                            return false;
                        }
                    }
                }
            }

            //this End code for  One  ")" cheak



            //this code for  One  "-" cheak

            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '-') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 45) {
                            alert('Only One - is allowed');
                            return false;
                        }
                    }
                }
            }

            //this End code for  One  "-" cheak


            if (charcode == 8) {
                return true;
            }
            if (charcode == 43) {
                return true;
            }
            if (charcode == 40) {
                return true;
            }
            if (charcode == 41) {
                return true;
            }
            if (charcode == 45) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        //----------------------- end this  charcode for Mobile---------------------



        //-------------------------Email Address Validation----------------------------------------

        function validateEmail(sEmail) {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(sEmail)) {
                return true;
            }
            else {
                return false;
            }
        }

        $('#Email').blur(function () {

            var sEmail = $('#Email').val();
            if ($.trim(sEmail).length == 0) {
                alert('Please enter valid email address');
                e.preventDefault();
            }
            if (validateEmail(sEmail)) {
                //alert('Email is valid');
                $('#Email').html('Email is valid');
                $('#Email').css('color', '');
            }
            else {
                //alert('Invalid Email Address');
                $('#Email').html('Invalid Email Address');
                $('#Email').css('color', 'red');
                e.preventDefault();
                return false;
            }
        });

        //---------------------End of Email Address Validation------------------------------------


        //check charcode for BranchName

        $('#BranchName').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 80) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 80');
                    return false;
                }
            }
        });

        //end check



        //check charcode for Address

        $('#Address').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 120) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 120');
                    return false;
                }
            }
        });

        //end check

        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 150) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 150');
                    return false;
                }
            }
        });

        //end charcode for Note

    });
})(jQuery);