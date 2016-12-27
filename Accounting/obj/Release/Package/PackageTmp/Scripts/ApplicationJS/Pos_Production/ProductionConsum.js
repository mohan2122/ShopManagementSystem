
// Data delete from grid view

function DeleteProductionConsum(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DelectProCon',
            type: 'POST',
            data: { ProductionID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblProductionCon").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

// end data delete from grid view




// Data update from grid view

function UpdateProductionConsum(rowId) {
    $.ajax({
        url: 'GetProConByID',
        type: 'POST',
        data: { ProductionID: rowId },
        success: function (data) {
            $('#ProductionID').val(data.ProductionID);
            $('#ProductCode').val(data.ProductCode);
            $('#ConsumQty').val(data.ConsumQty);
            $('#RatePerUnit').val(data.RatePerUnit);
            $('#UOM').val(data.UOM);
        }
    });
}


//End

//Jquery

(function ($) {
    $(document).ready(function () {

        //--------------------Save------------------------------  

        $('#btnSave').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: 'AddProCon',
                    type: 'POST',
                    data: JSON.stringify({
                        productionConsum: {
                            ProductionID: $('#ProductionID').val(),
                            ProductCode: $('#ProductCode').val(),
                            ConsumQty: $('#ConsumQty').val(),
                            RatePerUnit: $('#RatePerUnit').val(),
                            UOM: $('#UOM').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblProductionCon").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });
            }
        });


        //--------------------End Save------------------------------ 

        //--------------------Update------------------------------


        $('#btnUpdate').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: "UpdateProCon",
                    type: 'POST',
                    data: JSON.stringify({
                        productionConsum: {
                            ProductionID: $('#ProductionID').val(),
                            ProductCode: $('#ProductCode').val(),
                            ConsumQty: $('#ConsumQty').val(),
                            RatePerUnit: $('#RatePerUnit').val(),
                            UOM: $('#UOM').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblProductionCon").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblProductionCon").setGridWidth(900);
            }
            else {
                $("#tblProductionCon").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblProductionCon").jqGrid({
            url: 'ProductionConsumDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ProductionID',
                name: 'ProductionID',
                index: 'ProductionID',
                width: 150,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'ProductCode',
                name: 'ProductCode',
                index: 'ProductCode',
                width: 250,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'ConsumQty',
                name: 'ConsumQty',
                index: 'ConsumQty',
                width: 140,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'RatePerUnit',
                name: 'RatePerUnit',
                index: 'RatePerUnit',
                width: 203,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'UOM',
                 name: 'UOM',
                 index: 'UOM',
                 width: 205,
                 editable: true,
                 edittype: 'text'
             }
            ,
            {
                name: 'Edit', index: 'Edit', width: 75, editable: false, align: 'center', sortable: false
            },
               {
                   name: 'Delete', index: 'Delete', width: 75, editable: false, align: 'center', sortable: false
               }],


            gridComplete: function () {
                var ids = $("#tblProductionCon").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblProductionCon').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    s = "<div title='edit' onclick='UpdateProductionConsum(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblProductionCon").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteProductionConsum(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblProductionCon").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#ProductionConPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "BankID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'BankDetails',
            editurl: 'UpdateProCon',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
            { $("#tblProductionCon").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblProductionCon").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblProductionCon').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblProductionCon').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblProductionCon').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblProductionCon").jqGrid('navGrid', '#ProductionConPager', {
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

        $('#ProductCode').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#ConsumQty').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#RatePerUnit').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });

        $('#UOM').bind('keypress', function (evt) {
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

            if ($('#ProductCode').val() == '') {
                $('#ProductCode').focus();
                return false;
            }

            if ($('#ConsumQty').val() == '') {
                $('#ConsumQty').focus();
                return false;
            }
            if ($('#RatePerUnit').val() == '') {
                $('#RatePerUnit').focus();
                return false;
            }
            if ($('#UOM').val() == '') {
                $('#UOM').focus();
                return false;
            }

            return true;
        }

        //End


        //check charcode for ProductCode

        $('#ProductCode').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 14) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 14');
                    return false;
                }
            }
        });

        //end charcode for ProductCode

        // Check charcode for ConsumQty Balance

        $('#ConsumQty').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 20) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 20');
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

        // End  charcode for ConsumQty Balance



        // Check charcode for RatePerUnit Balance

        $('#RatePerUnit').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 20) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 20');
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

        // End  charcode for RatePerUnit Balance

    });
})(jQuery);