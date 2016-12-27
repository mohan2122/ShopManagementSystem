﻿
// Data delete from grid view

function DeleteCustomerInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'CusDelete',
            type: 'POST',
            data: { CustomerID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblCustomerInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateCustomerInfo(rowId) {
    $.ajax({
        url: 'GetCustomerInfoByID',
        type: 'POST',
        data: { CustomerID: rowId },
        success: function (data) {
            $('#CustomerID').val(data.CustomerID);
            $('#CustomerCode').val(data.CustomerCode);
            $('#CustomerName').val(data.CustomerName);
            $('#CustomerType').val(data.CustomerType);
            $('#Propietor').val(data.Propietor);
            $('#ContactPerson').val(data.ContactPerson);
            $('#Address').val(data.Address);
            $('#DistrictID').val(data.DistrictID);
            $('#CountryID').val(data.CountryID);
            $('#Phone').val(data.Phone);
            $('#Mobile').val(data.Mobile);
            $('#eMail').val(data.eMail);
            $('#VATRegNo').val(data.VATRegNo);
            $('#DiscountPercent').val(data.DiscountPercent);
            $('#DistributorPoint').val(data.DistributorPoint);
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
                    url: 'CusAdd',
                    type: 'POST',
                    data: JSON.stringify({
                        Customer: {
                            CustomerCode: $('#CustomerCode').val(),
                            CustomerName: $('#CustomerName').val(),
                            CustomerType: $('#CustomerType').val(),
                            Propietor: $('#Propietor').val(),
                            ContactPerson: $('#ContactPerson').val(),
                            Address: $('#Address').val(),
                            DistrictID: $('#DistrictID').val(),
                            CountryID: $('#CountryID').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            eMail: $('#eMail').val(),
                            VATRegNo: $('#VATRegNo').val(),
                            DiscountPercent: $('#DiscountPercent').val(),
                            DistributorPoint: $('#DistributorPoint').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblCustomerInfo").trigger("reloadGrid");
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
                    url: 'CusUpdate',
                    type: 'POST',
                    data: JSON.stringify({
                        Customer: {
                            CustomerID: $('#CustomerID').val(),
                            CustomerCode: $('#CustomerCode').val(),
                            CustomerName: $('#CustomerName').val(),
                            CustomerType: $('#CustomerType').val(),
                            Propietor: $('#Propietor').val(),
                            ContactPerson: $('#ContactPerson').val(),
                            Address: $('#Address').val(),
                            DistrictID: $('#DistrictID').val(),
                            CountryID: $('#CountryID').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            eMail: $('#eMail').val(),
                            VATRegNo: $('#VATRegNo').val(),
                            DiscountPercent: $('#DiscountPercent').val(),
                            DistributorPoint: $('#DistributorPoint').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblCustomerInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update



        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblCustomerInfo").setGridWidth(952);
            }
            else {
                $("#tblCustomerInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblCustomerInfo").jqGrid({
            url: 'CustomerInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'CustomerID',
                name: 'CustomerID',
                index: 'CustomerID',
                width: 50,
                editable: true,
                edittype: 'text',
                hidden:true
            },
            {
                label: 'CustomerCode',
                name: 'CustomerCode',
                index: 'CustomerCode',
                width: 50,
                editable: true,
                edittype: 'text'
            },

            {
                label: 'CustomerName',
                name: 'CustomerName',
                index: 'CustomerName',
                width: 75,
                editable: true,
                edittype: 'text'
            },

             {
                 label: 'CustomerType',
                 name: 'CustomerType',
                 index: 'CustomerType',
                 width: 50,
                 editable: true,
                 edittype: 'text'
             },
              {
                  label: 'Propietor',
                  name: 'Propietor',
                  index: 'Propietor',
                  width: 50,
                  editable: true,
                  edittype: 'text'
              },
               {
                   label: 'ContactPerson',
                   name: 'ContactPerson',
                   index: 'ContactPerson',
                   width: 50,
                   editable: true,
                   edittype: 'text'
               },
            {
                label: 'Address',
                name: 'Address',
                index: 'Address',
                width: 50,
                editable: true,
                edittype: 'text'
            }, {
                label: 'City',
                name: 'City',
                index: 'City',
                width: 50,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Country',
                name: 'Country',
                index: 'Country',
                width: 50,
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
                label: 'VATRegNo',
                name: 'VATRegNo',
                index: 'VATRegNo',
                width: 50,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'DiscountPercent',
                 name: 'DiscountPercent',
                 index: 'DiscountPercent',
                 width: 50,
                 editable: true,
                 edittype: 'text'
             },
              {
                  label: 'DistributorPoint',
                  name: 'DistributorPoint',
                  index: 'DistributorPoint',
                  width: 50,
                  editable: true,
                  edittype: 'text'
              },

            {
                name: 'Edit', index: 'Edit', width: 50, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 50, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblCustomerInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblCustomerInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //this onclick id up to dateils ....

                    s = "<div title='Edit' onclick='UpdateCustomerInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblCustomerInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='Delete' onclick='DeleteCustomerInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblCustomerInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#divCustomerInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "CustomerID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'CustomerInfo Type Details',
            editurl: 'CusUpdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
                //--Relode gride--//
            { $("#tblCustomerInfo").trigger("reloadGrid"); },
            //------Relode gride end---------//

            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {

                    //----------Relode grid--------//
                    $("#tblCustomerInfo").trigger("reloadGrid");
                    //------Relode gride end---------//

                    //disable edit row on last selection

                    $('#tblCustomerInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblCustomerInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblCustomerInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblCustomerInfo").jqGrid('navGrid', '#divCustomerInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/CusUpdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/CusAdd',
            closeAfterAdd: true
        }, {
            url: '/Setup/CusDelete',
            closeAfterDelete: true
        }, {

        });

        //End jQGrid

        //Textbox Validation

        $('#CustomerCode').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#CustomerName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#CustomerType').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });



        $('#Propietor').bind('keypress', function (evt) {
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

        $('#DistrictID').change(function () {
            $('#DistrictID').css('background-color', '');
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

        $('#VATRegNo').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#DiscountPercent').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        $('#DistributorPoint').bind('keypress', function (evt) {
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

            if ($('#CustomerCode').val() == '') {
                $('#CustomerCode').focus();
                return false;
            }
            if ($('#CustomerName').val() == '') {
                $('#CustomerName').focus();
                return false;
            }

            if ($('#CustomerType').val() == '') {
                $('#CustomerType').focus();
                return false;

            } if ($('#Propietor').val() == '') {
                $('#Propietor').focus();
                return false;

            } if ($('#ContactPerson').val() == '') {
                $('#ContactPerson').focus();
                return false;

            } if ($('#Address').val() == '') {
                $('#Address').focus();
                return false;

            }
            if ($('#DistrictID').val() == 0) {
                alert('Please select City');
                $('#DistrictID').css('background-color', 'red');
                $('#DistrictID').focus();
                return false;
            }

            if ($('#CountryID').val() == 0) {
                alert('Please select Country');
                $('#CountryID').css('background-color', 'red');
                $('#CountryID').focus();
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

            if ($('#VATRegNo').val() == '') {
                $('#VATRegNo').focus();
                return false;
            }

            if ($('#DiscountPercent').val() == '') {
                $('#DiscountPercent').focus();
                return false;
            }

            if ($('#DistributorPoint').val() == '') {
                $('#DistributorPoint').focus();
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

        //check charcode for CustomerName 

        $('#CustomerName').bind('keypress', function (evt) {
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

        //End charcode for CustomerName 

        //check charcode for CustomerCode 

        $('#CustomerCode').bind('keypress', function (evt) {
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

        //check charcode for CustomerType 
        $('#CustomerType').bind('keypress', function (evt) {
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

        //end check charcode for CustomerType 




        //check charcode for Propietor 

        $('#Propietor').bind('keypress', function (evt) {
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

        //End charcode for Propietor 


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



        //check charcode for DiscountPercent

        $('#DiscountPercent').bind('keypress', function (evt) {
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

        //End charcode for DiscountPercent 



        //check charcode for DistributorPoint

        $('#DistributorPoint').bind('keypress', function (evt) {
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

        //End charcode for DistributorPoint 

    });
})(jQuery);
