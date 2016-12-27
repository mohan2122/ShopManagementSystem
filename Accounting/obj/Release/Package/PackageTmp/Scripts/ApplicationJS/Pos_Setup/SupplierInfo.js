
// Data delete from grid view

function DeleteSupplierInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteSup',
            type: 'POST',
            data: { SupplierID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblSupplierInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateSupplierInfo(rowId) {
    $.ajax({
        url: 'GetSupplierInfoByID',
        type: 'POST',
        data: { SupplierID: rowId },
        success: function (data) {
            $('#SupplierID').val(data.SupplierID);
            $('#SupplierCode').val(data.SupplierCode);
            $('#SupplierName').val(data.SupplierName);
            $('#ContactPerson').val(data.ContactPerson);
            $('#Address').val(data.Address);
            $('#SupplierType').val(data.SupplierType);
            $('#VATRegNo').val(data.VATRegNo);
            $('#Country').val(data.Country);
            $('#Phone').val(data.Phone);
            $('#Mobile').val(data.Mobile);
            $('#eMail').val(data.eMail);     
        }
    });
}


// end 


//jQuery


(function ($) {
    $(document).ready(function () {

        // Save

        $('#btnSave').click(function () {
            var retValue = fnValidation();

            //------- this code for Email valition--------------

            var sEmail = $('#eMail').val();
            if ($.trim(sEmail).length == 0) {
                e.preventDefault();
            }
            if (validateEmail(sEmail)) {
                //alert('Email is valid');
                $('#eMail').html('Email is valid');
                $('#eMail').css('color', '');
            }
            else {
                //alert('Invalid Email Address');
                $('#eMail').html('Invalid Email Address');
                $('#eMail').css('color', 'red');
                e.preventDefault();
                return false;
            }

            //end

            if (retValue == true) {
                $.ajax({
                    url: 'AddSup',
                    type: 'POST',
                    data: JSON.stringify({
                        supplierInfo: {
                            SupplierCode: $('#SupplierCode').val(),
                            SupplierName: $('#SupplierName').val(),
                            ContactPerson: $('#ContactPerson').val(),
                            Address: $('#Address').val(),
                            SupplierType: $('#SupplierType').val(),
                            VATRegNo: $('#VATRegNo').val(),
                            Country: $('#Country').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            eMail: $('#eMail').val()       
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblSupplierInfo").trigger("reloadGrid");
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
                    url: 'UpdateSup',
                    type: 'POST',
                    data: JSON.stringify({
                        supplierInfo: {
                            SupplierID: $('#SupplierID').val(),
                            SupplierCode: $('#SupplierCode').val(),
                            SupplierName: $('#SupplierName').val(),
                            ContactPerson: $('#ContactPerson').val(),
                            Address: $('#Address').val(),
                            SupplierType: $('#SupplierType').val(),
                            VATRegNo: $('#VATRegNo').val(),
                            Country: $('#Country').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            eMail: $('#eMail').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblSupplierInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblSupplierInfo").setGridWidth(952);
            }
            else {
                $("#tblSupplierInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblSupplierInfo").jqGrid({
            url: 'SupplierInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'SupplierID',
                name: 'SupplierID',
                index: 'SupplierID',
                width: 50,
                editable: true,
                edittype: 'text',
                hidden:true
            },
            {
                label: 'SupplierCode',
                name: 'SupplierCode',
                index: 'SupplierCode',
                width: 75,
                editable: true,
                edittype: 'text'
            },

            {
                label: 'SupplierName',
                name: 'SupplierName',
                index: 'SupplierName',
                width: 100,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'ContactPerson',
                 name: 'ContactPerson',
                 index: 'ContactPerson',
                 width: 75,
                 editable: true,
                 edittype: 'text'
             },
            {
                label: 'Address',
                name: 'Address',
                index: 'Address',
                width: 100,
                editable: true,
                edittype: 'text'
            },

             {
                 label: 'SupplierType',
                 name: 'SupplierType',
                 index: 'SupplierType',
                 width: 75,
                 editable: true,
                 edittype: 'text'
             },

              {
                  label: 'VATRegNo',
                  name: 'VATRegNo',
                  index: 'VATRegNo',
                  width: 60,
                  editable: true,
                  edittype: 'text'
              },
                                      
            {
                label: 'Country',
                name: 'Country',
                index: 'Country',
                width: 60,
                editable: true,
                edittype: 'text'
            },

            {
                label: 'Phone',
                name: 'Phone',
                index: 'Phone',
                width: 75,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'Mobile',
                name: 'Mobile',
                index: 'Mobile',
                width: 75,
                editable: true,
                edittype: 'text'
            }, {
                label: 'eMail',
                name: 'eMail',
                index: 'eMail',
                width: 78,
                editable: true,
                edittype: 'text'
            },
           
            {
                name: 'Edit', index: 'Edit', width: 75, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 75, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblSupplierInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblSupplierInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //this onclick id up to dateils ....

                    s = "<div title='Edit' onclick='UpdateSupplierInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblSupplierInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='Delete' onclick='DeleteSupplierInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblSupplierInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#SupplierInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "SupplierID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'SupplierInfo Type Details',
            editurl: 'UpdateSup',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode grid--//
            { $("#tblSupplierInfo").trigger("reloadGrid"); },
            //------Relode grid end---------//

            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {

                    //----------Relode grid--------//
                    $("#tblSupplierInfo").trigger("reloadGrid");
                    //------Relode grid end---------//

                    //disable edit row on last selection

                    $('#tblSupplierInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblSupplierInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblSupplierInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblSupplierInfo").jqGrid('navGrid', '#SupplierInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/UpdateSup',
            closeAfterEdit: true
        }, {
            url: '/Setup/AddSup',
            closeAfterAdd: true
        }, {
            url: '/Setup/DeleteSup',
            closeAfterDelete: true
        }, {

        });

        //End jQGrid

        //Textbox Validation

        $('#SupplierCode').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#SupplierName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

       
        $('#ContactPerson').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#Address').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#SupplierType').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#VATRegNo').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#CountryID').change(function () {
            $('#CountryID').css('background-color', '');
        });


        $('#Phone').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#Mobile').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });
        $('#eMail').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
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

            if ($('#SupplierCode').val() == '') {
                $('#SupplierCode').focus();
                return false;
            }
            if ($('#Suppliername').val() == '') {
                $('#Suppliername').focus();
                return false;
            }
            if ($('#ContactPerson').val() == '') {
                $('#ContactPerson').focus();
                return false;

            } if ($('#Address').val() == '') {
                $('#Address').focus();
                return false;
            }

            if ($('#SupplierType').val() == '') {
                $('#SupplierType').focus();
                return false;
            }
            if ($('#VATRegNo').val() == '') {
                $('#VATRegNo').focus();
                return false;
            }
            
            if ($('#Country').val() == 0) {
                alert('Please select Country');
                $('#Country').css('background-color', 'red');
                $('#Country').focus();
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
            if ($('#eMail').val() == '') {
                $('#eMail').focus();
                return false;
            }

            return true;
        }

        //End


        // Check Charcode for phone 

        $('#Phone').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 12) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =12');
                    return false;
                }
            }

            //new one (+)  use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '+') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 43) {
                            alert('Only One + point is allowed');
                            return false;
                        }
                    }
                }
            }



            //End one {+} number use( biltinnnnn)COde...



            //new one {(} number use( biltinnnnn)COde...


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
                            alert('Only One First {(} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {(}  number use( biltinnnnn)COde...


            //new one {)} BRACATE use( biltinnnnn)COde...


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
                            alert('Only One Colse {)} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {)}  BRACATE use( biltinnnnn)COde...



            //new one {-} HIPAN use( biltinnnnn)COde...


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
                            alert('Only One hipan is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {-} HIPAN use( biltinnnnn)COde...

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
            //48 or 57 this means o to 9...
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are allowed')
                return false;
            }


        });

        //Phone end


        //Start code of Mobile Code valudation

        $('#Mobile').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 11) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =11');
                    return false;
                }
            }



            //new one (+)  use( biltinnnnn)COde...


            var fieldValue = $(this).val().split('');
            var countdecimal = 0;
            for (var i = 0; i < fieldValue.length; i++) {
                if (fieldValue[i] == '+') {
                    countdecimal++;
                    if (countdecimal > 0) {
                        if (charcode == 8) {
                            return true;
                        }
                        if (charcode == 43) {
                            alert('Only One + point is allowed');
                            return false;
                        }
                    }
                }
            }



            //End one {+} number use( biltinnnnn)COde...



            //new one {(} number use( biltinnnnn)COde...


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
                            alert('Only One First {(} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {(}  number use( biltinnnnn)COde...


            //new one {)} BRACATE use( biltinnnnn)COde...


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
                            alert('Only One Colse {)} is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {)}  BRACATE use( biltinnnnn)COde...



            //new one {-} HIPAN use( biltinnnnn)COde...


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
                            alert('Only One hipan is allowed');
                            return false;
                        }
                    }
                }
            }

            //End one {-} HIPAN use( biltinnnnn)COde...


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
                alert('only numbers are allowed')
                return false;
            }


        });


        // End code of Mobile Code valudation



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

        $('#eMail').blur(function () {

            var sEmail = $('#eMail').val();
            if ($.trim(sEmail).length == 0) {
                alert('Please enter valid email address');
                e.preventDefault();
            }
            if (validateEmail(sEmail)) {
                //alert('Email is valid');
                $('#eMail').html('Email is valid');
                $('#eMail').css('color', '');
            }
            else {
                //alert('Invalid Email Address');
                $('#eMail').html('Invalid Email Address');
                $('#eMail').css('color', 'red');
                e.preventDefault();
                return false;
            }
        });

        //---------------------End of Email Address Validation------------------------------------

        //check charcode for SupplierName 

        $('#SupplierName').bind('keypress', function (evt) {
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

        //End charcode for SupplierName 


        //check charcode for SupplierCode 

        $('#SupplierCode').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 15');
                    return false;
                }
            }
        });

        //end check charcode for Customer Code


       
        //check charcode for SupplierType

        $('#SupplierType').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 7) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 7');
                    return false;
                }
            }
        });

        //end check charcode for SupplierType 

        //check charcode for ContactPerson 

        $('#ContactPerson').bind('keypress', function (evt) {
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

        //End charcode for ContactPerson 


        //check charcode for Address 

        $('#Address').bind('keypress', function (evt) {
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

        //End charcode for Address 



        //check charcode for VATRegNo

        $('#VATRegNo').bind('keypress', function (evt) {
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

        //End charcode for VATRegNo 
    });
})(jQuery);
