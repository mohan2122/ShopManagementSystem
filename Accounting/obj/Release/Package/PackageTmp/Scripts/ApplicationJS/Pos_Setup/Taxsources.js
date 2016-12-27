
// Data delete from grid view

function DeleteTaxSource(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'deleteTax',
            type: 'POST',
            data: { SourceID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblTaxSource").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

// end data delete from grid view



// Data update from grid view

function UpdateTaxSource(rowId) {
    $.ajax({
        url: 'GetTaxSourceByID',
        type: 'POST',
        data: { SourceID: rowId },
        success: function (data) {
            $('#SourceID').val(data.SourceID);
            $('#SourceCode').val(data.SourceCode);
            $('#SourceName').val(data.SourceName);
            $('#StartAmount').val(data.StartAmount);
            $('#EndAmount').val(data.EndAmount);
            $('#VATPercent').val(data.VATPercent);
            $('#Rebate').val(data.Rebate);
            $('#SourceType').val(data.SourceType);

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
                    url: 'addTax',
                    type: 'POST',
                    data: JSON.stringify({
                        taxsource: {
                            SourceCode: $('#SourceCode').val(),
                            SourceName: $('#SourceName').val(),
                            StartAmount: $('#StartAmount').val(),
                            EndAmount: $('#EndAmount').val(),
                            VATPercent: $('#VATPercent').val(),
                            Rebate: $('#Rebate').val(),
                            SourceType: $('#SourceType').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblTaxSource").trigger("reloadGrid");
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
                    url: "updateTax",
                    type: 'POST',
                    data: JSON.stringify({
                        taxsource: {
                            SourceID: $('#SourceID').val(),
                            SourceCode: $('#SourceCode').val(),
                            SourceName: $('#SourceName').val(),
                            StartAmount: $('#StartAmount').val(),
                            EndAmount: $('#EndAmount').val(),
                            VATPercent: $('#VATPercent').val(),
                            Rebate: $('#Rebate').val(),
                            SourceType: $('#SourceType').val()
                            //Status: $('#Status').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblTaxSource").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblTaxSource").setGridWidth(952);
            }
            else {
                $("#tblTaxSource").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblTaxSource").jqGrid({
            url: 'TaxSourceDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'SourceID',
                name: 'SourceID',
                index: 'SourceID',
                width: 100,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'SourceCode',
                name: 'SourceCode',
                index: 'SourceCode',
                width: 125,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'SourceName',
                name: 'SourceName',
                index: 'SourceName',
                width: 100,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'StartAmount',
                 name: 'StartAmount',
                 index: 'StartAmount',
                 width: 75,
                 editable: true,
                 edittype: 'text'
             },
            {
                label: 'EndAmount',
                name: 'EndAmount',
                index: 'EndAmount',
                width: 85,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'VATPercent',
                 name: 'VATPercent',
                 index: 'VATPercent',
                 width: 100,
                 editable: true,
                 edittype: 'text'
             },
              {
                  label: 'Rebate',
                  name: 'Rebate',
                  index: 'Rebate',
                  width: 100,
                  editable: true,
                  edittype: 'text'
              },
               {
                   label: 'SourceType',
                   name: 'SourceType',
                   index: 'SourceType',
                   width: 200,
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
                var ids = $("#tblTaxSource").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblTaxSource').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateTaxSource(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblTaxSource").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteTaxSource(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblTaxSource").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#TaxSourcePager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "SourceID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Tax Source Details',
            editurl: 'updateTax',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
            { $("#tblTaxSource").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {

                    $("#tblTaxSource").trigger("reloadGrid");

                    //disable edit row on last selection
                    $('#tblTaxSource').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblTaxSource').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblTaxSource').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });


        $("#tblTaxSource").jqGrid('navGrid', '#TaxSourcePager', {
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

        $('#SourceID').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#SourceCode').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#SourceName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#StartAmount').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#EndAmount').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#VATPercent').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#Rebate').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#SourceType').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
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

            if ($('#SourceCode').val() == '') {
                $('#SourceCode').focus();
                return false;
            }
            if ($('#SourceName').val() == '') {
                $('#SourceName').focus();
                return false;
            }
            if ($('#StartAmount').val() == '') {
                $('#StartAmount').focus();
                return false;
            }

            if ($('#EndAmount').val() == '') {
                $('#EndAmount').focus();
                return false;
            }

            if ($('#VATPercent').val() == '') {
                $('#VATPercent').focus();
                return false;
            }
            if ($('#Rebate').val() == '') {
                $('#Rebate').focus();
                return false;
            }
            if ($('#SourceType').val() == '') {
                $('#SourceType').focus();
                return false;
            }

            return true;
        }

        //End

        // Check charcode for StartAmount

        $('#StartAmount').bind('keypress', function (evt) {
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

        // End  charcode for StartAmount


        // Check charcode for EndAmount

        $('#EndAmount').bind('keypress', function (evt) {
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

        // End  charcode for EndAmount


        // Check charcode for VATPercent

        $('#VATPercent').bind('keypress', function (evt) {
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

        // End  charcode for VATPercent


        // Check charcode for Rebate

        $('#Rebate').bind('keypress', function (evt) {
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

        // End  charcode for Rebate

        //MaxLength validation of Source Code

        $('#SourceCode').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 10) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =10');
                    return false;
                }
            }

        });

        // End MaxLength validation of Source Code


        //MaxLength validation of SourceName 

        $('#SourceName').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 150) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =150');
                    return false;
                }
            }

        });

        // End MaxLength validation of SourceName



        //MaxLength validation of SourceType 

        $('#SourceType').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if ($(this).val().length > 3) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is =3');
                    return false;
                }
            }

        });

        // End MaxLength validation of SourceType



    });
})(jQuery);