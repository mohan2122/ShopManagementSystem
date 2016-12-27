
// Data delete from grid view

function DeleteCompanyInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'comDelete',
            type: 'POST',
            data: { CompanyID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblCompanyInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateCompanyInfo(rowId) {
    $.ajax({
        url: 'GetCompanyInfoByID',
        type: 'POST',
        data: { CompanyID: rowId },
        success: function (data) {
            $('#CompanyID').val(data.CompanyID);
            $('#CompanyName').val(data.CompanyName);
            $('#Address').val(data.Address);
            $('#DistrictID').val(data.DistrictID);
            $('#PostCode').val(data.PostCode);
            $('#CountryID').val(data.CountryID);
            $('#VATRegNo').val(data.VATRegNo);
            $('#Phone').val(data.Phone);
            $('#Mobile').val(data.Mobile);
            $('#Fax').val(data.Fax);
            $('#eMail').val(data.eMail);
            $('#Note').val(data.Note);
           
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
            //------- this code for Email valition--------------  
                      if (retValue == true) {

            $.ajax({
                url: 'comAdd',
                type: 'POST',
                data: JSON.stringify({
                    companyInfo: {
                        CompanyID: $('#CompanyID').val(),
                        CompanyName: $('#CompanyName').val(),
                        Address: $('#Address').val(),
                        DistrictID: $('#DistrictID').val(),
                        PostCode: $('#PostCode').val(),
                        CountryID: $('#CountryID').val(),
                        VATRegNo: $('#VATRegNo').val(),
                        Phone: $('#Phone').val(),
                        Mobile: $('#Mobile').val(),
                        Fax: $('#Fax').val(),
                        eMail: $('#eMail').val(),
                        Note: ($('#Note').val() == " " ? ' ' : $('#Note').val())
                       
                    }
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblCompanyInfo").trigger("reloadGrid");
                    alert('Data Saved Successfully');
                    ClearAll();
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
                    url: 'comUpdate',
                    type: 'POST',
                    data: JSON.stringify({
                        companyInfo: {
                            CompanyID: $('#CompanyID'),
                            CompanyName: $('#CompanyName').val(),
                            Address: $('#Address').val(),
                            DistrictID: $('#DistrictID').val(),
                            PostCode: $('#PostCode').val(),
                            CountryID: $('#CountryID').val(),
                            VATRegNo: $('#VATRegNo').val(),
                            Phone: $('#Phone').val(),
                            Mobile: $('#Mobile').val(),
                            Fax: $('#Fax').val(),
                            eMail: $('#eMail').val(),
                            Note: $('#Note').val()

                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblCompanyInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                        ClearAll();
                    }
                });
            }
        });

        //End Update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblCompanyInfo").setGridWidth(952);
            }
            else {
                $("#tblCompanyInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblCompanyInfo").jqGrid({
            url: 'CompanyInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'CompanyID',
                name: 'CompanyID',
                index: 'CompanyID',
                width: 50,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'CompanyName',
                name: 'CompanyName',
                index: 'CompanyName',
                width: 75,
                editable: true,
                edittype: 'text'
            }, {
                label: 'Address',
                name: 'Address',
                index: 'Address',
                width: 100,
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
                label: 'PostCode',
                name: 'PostCode',
                index: 'PostCode',
                width: 50,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'Country',
                name: 'Country',
                index: 'Country',
                width: 50,
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
                   label: 'Phone',
                   name: 'Phone',
                   index: 'Phone',
                   width: 75,
                   editable: true,
                   edittype: 'text'
               }, {
                   label: 'Mobile',
                   name: 'Mobile',
                   index: 'Mobile',
                   width: 75,
                   editable: true,
                   edittype: 'text'
               }, {
                   label: 'Fax',
                   name: 'Fax',
                   index: 'Fax',
                   width: 75,
                   editable: true,
                   edittype: 'text'
               },

            {
                label: 'eMail',
                name: 'eMail',
                index: 'eMail',
                width: 125,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'Note',
                name: 'Note',
                index: 'Note',
                width: 90,
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
                var ids = $("#tblCompanyInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblCompanyInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //this onclick id up to dateils ....

                    s = "<div title='edit' onclick='UpdateCompanyInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblCompanyInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='comDelete' onclick='DeleteCompanyInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblCompanyInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#CompanyInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "CompanyID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'CompanyInfo Type Details',
            editurl: 'comUpdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblCompanyInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblCompanyInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblCompanyInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblCompanyInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblCompanyInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblCompanyInfo").jqGrid('navGrid', '#CompanyInfoPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/comUpdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/comAdd',
            closeAfterAdd: true
        }, {
            url: '/Setup/comDelete',
            closeAfterDelete: true
        }, {

        });

        //End jQGrid

        //Textbox Validation


        $('#CompanyID').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#CompanyName').bind('keypress', function (evt) {
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

        $('#PostCode').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#CountryID').change(function () {
            $('#CountryID').css('background-color', '');
        });

        $('#VATRegNo').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
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

        $('#Fax').bind('keypress', function (evt) {
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

        function ClearAll() {
            $('#CompanyName').val(""),
            $('#Address').val(""),
            $('#DistrictID').val(""),
            $('#PostCode').val(""),
            $('#CountryID').val(""),
            $('#VATRegNo').val(""),
            $('#Phone').val(""),
            $('#Mobile').val(""),
            $('#Fax').val(""),
            $('#eMail').val("")
        }

        function fnValidation() {
            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else if ($(this).val() == 0) {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });

            if ($('#CompanyName').val() == '') {
                alert('Please enter company name');
                $('#CompanyName').focus();
                return false;
            }
            if ($('#Address').val() == '') {
                alert('Please enter company address');
                $('#Address').focus();
                return false;
            }

            if ($('#DistrictID').val() == 0) {
                alert('Please select City');
                $('#DistrictID').css('background-color', 'red');
                $('#DistrictID').focus();
                return false;
            }

            if ($('#PostCode').val() == '') {
                alert('Please enter postcode');
                $('#PostCode').focus();
                return false;

            }

            if ($('#CountryID').val() == 0) {
                alert('Please select Country');
                $('#CountryID').css('background-color', 'red');
                $('#CountryID').focus();
                return false;
            }


            if ($('#VATRegNo').val() == '') {
                alert('Please enter vat reg. No.');
                $('#VATRegNo').focus();
                return false;
            }

            if ($('#Phone').val() == '') {
                alert('Please enter phone number');
                $('#Phone').focus();
                return false;

            }
            if ($('#Mobile').val() == '') {
                alert('Please enter mobile number');
                $('#Mobile').focus();
                return false;

            }
            if ($('#Fax').val() == '') {
                alert('Please enter fax number');
                $('#Fax').focus();
                return false;
            }
            if ($('#eMail').val() == '') {
                alert('Please enter email address');
                $('#eMail').focus();
                return false;
            }

            return true;
        }


       //End Textbox validation


        //Charcode validation for phone 

        $('#Phone').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =15');
                    return false;
                }
            }

            //new one (+) COde...

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

        ///one (.)dot use code...

        $('#PostCode').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =15');
                    return false;
                }
            }

            // 1 one decimal number code

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

            if (charcode == 8) {
                return true;
            }
         
            if (charcode == 46) {
                return true;
            }
          
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are allowed')
                return false;
            }
        });


        //end of (.)dot


        $('#Mobile').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 15) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =15');
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


      
    });
})(jQuery);

