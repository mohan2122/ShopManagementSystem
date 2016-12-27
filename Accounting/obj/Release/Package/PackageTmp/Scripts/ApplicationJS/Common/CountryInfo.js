// Data delete from grid view

function DeleteCountry(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DelectCountry',
            type: 'POST',
            data: { CountryID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblCountryInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateCountry(rowId) {
    $.ajax({
        url: 'GetCountryByID',
        type: 'POST',
        data: { CountryID: rowId },
        success: function (data) {
            $('#CountryID').val(data.CountryID);
            $('#CountryCode').val(data.CountryCode);
            $('#CountryName').val(data.CountryName);     
       
        }
    });
}

//End


//jQuery

(function ($) {
    $(document).ready(function () {  
        $('#btnSave').click(function () {
            var retval = insert_update();
            if (retval == true) {
            $.ajax({
                url: 'AddCountry',
                type: 'POST',
                data: JSON.stringify({
                    countryinfo: {
                        CountryCode: $('#CountryCode').val(),
                        CountryName: $('#CountryName').val()                       
                    }
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblCountryInfo").trigger("reloadGrid");
                    alert('Data Saved Successfully');
                }
            });
        }
    });

        //End--------------------------End Save--------------------------------------


        //--------------------Update------------------------------

        $('#btnUpdate').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: "Updatecountry",
                    type: 'POST',
                    data: JSON.stringify({
                        countryinfo: {
                            CountryID: $('#CountryID').val(),
                            CountryCode: $('#CountryCode').val(),
                            CountryName: $('#CountryName').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblCountryInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblCountryInfo").setGridWidth(900);
            }
            else {
                $("#tblCountryInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblCountryInfo").jqGrid({
            url: 'CountryDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ID',
                name: 'ID',
                index: 'ID',
                width: 200,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'CountryCode',
                name: 'CountryCode',
                index: 'CountryCode',
                width: 450,
                editable: true,
                edittype: 'text'
            }, {
                label: 'CountryName',
                name: 'CountryName',
                index: 'CountryName',
                width: 360,
                editable: true,
                edittype: 'text'
            }, {
                name: 'Edit', index: 'Edit', width: 75, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 75, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblCountryInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblCountryInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateCountry(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblCountryInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteCountry(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblCountryInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#CountryInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "ID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: ' Branch Information Details',
            editurl: 'Updatecountry',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblCountryInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblCountryInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblCountryInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected 
                    if (AdminFunctionsLastSel != 0) $('#tblCountryInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblCountryInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblCountryInfo").jqGrid('navGrid', '#CountryInfoPager', {
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

        $('#CountryCode').bind('keypress', function (evt) {
            var chharcode = evt.which;
            if (chharcode != '') {
                $(this).css('border-color', '');
            }
        });


        $('#CountryName').bind('keypress', function (evt) {
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

            if ($('#CountryCode').val() == '') {
                $('#CountryCode').focus();
                return false;
            }

            if ($('#CountryName').val() == '') {
                $('#CountryName').focus();
                return false;
            }


            return true;
        }

        //End Textbox Validation


        //check charcode for CountryCode

        $('#CountryCode').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 10) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 10');
                    return false;
                }
            }
        });

        //end charcode for CountryCode

        //check charcode for CountryName

        $('#CountryName').bind('keypress', function (evt) {
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

        //end charcode for CountryName



    });
})(jQuery);