// Data delete from grid view

function DeleteAccProject(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {

        $.ajax({
            url: 'accpDelete',
            type: 'POST',
            data: { AccProjectID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblAccProject").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//end

// Data update from grid view

function UpdateAccProject(rowId) {
    $.ajax({
        url: 'GetAccProjectByID',
        type: 'POST',
        data: { AccProjectID: rowId },
        success: function (data) {
            $('#AccProjectID').val(data.AccProjectID);
            $('#CompanyID').val(data.CompanyID);
            $('#ProjectName').val(data.ProjectName);
        }
    });
}

//End


//jQuery


(function ($) {
    $(document).ready(function () {

        //  Save

        $('#btnSave').click(function () {

            var retValue = fnValidaton();
            if (retValue == true) {
                var x = confirm("Are you sure you want to save this ?")
                if (x == true) {
                    $.ajax({
                        url: 'accpAdd',
                        type: 'POST',
                        data: JSON.stringify({
                            accProject: {
                                CompanyID: $('#CompanyID').val(),
                                ProjectName: $('#ProjectName').val()
                            }
                        }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Project Name can not be duplicate');
                            }
                            else {
                                $("#tblAccProject").trigger("reloadGrid");
                                alert('Data Saved successfully');
                                ClearAll();
                            }
                        }
                    });
                }
            }
        });

        //end 
        //ClearAll
        function ClearAll() {
            $('#AccProjectID').val(""),
            $('#CompanyID').val(""),
            $('#ProjectName').val("")
        }


        // update

        $('#btnUpdate').click(function () {
            var retValue = fnValidaton();
            if (retValue == true) {
                var x = confirm("Are you sure you want to update this ?")
                if (x == true) {
                    $.ajax({
                        url: "accpUpdate",
                        type: 'POST',
                        data: JSON.stringify({
                            accProject: {
                                AccProjectID: $('#AccProjectID').val(),
                                CompanyID: $('#CompanyID').val(),
                                ProjectName: $('#ProjectName').val()
                            }
                        }),
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            if (data == 1) {
                                alert('Project Name can not be duplicate');
                            }
                            else {
                                $("#tblAccProject").trigger("reloadGrid");
                                alert('Data Updated Successfully');
                                ClearAll();
                            }
                        }
                    });
                }
            }
        });

        //end update


        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblAccProject").setGridWidth(900);
            }
            else {
                $("#tblAccProject").setGridWidth($(window).width());
            }
        }).trigger('resize');


        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblAccProject").jqGrid({
            url: 'AccProjectDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'AccProjectID',
                name: 'AccProjectID',
                index: 'AccProjectID',
                width: 200,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'CompanyID',
                name: 'CompanyID',
                index: 'CompanyID',
                width: 430,
                editable: true,
                edittype: 'text'
            }, {
                label: 'ProjectName',
                name: 'ProjectName',
                index: 'ProjectName',
                width: 400,
                editable: true,
                edittype: 'text'
            }, {
                name: 'Edit', index: 'Edit', width: 65, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 65, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblAccProject").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblAccProject').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateAccProject(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/edit.gif /></div>";
                    $("#tblAccProject").setRowData(ids[i], { Edit: s });

                    s = "<div title='accpDelete' onclick='DeleteAccProject(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'><img src=../Images/delete.gif /></div>";
                    $("#tblAccProject").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#AccProjectPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "AccProjectID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'AccProject Details',
            editurl: 'accpUpdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblAccProject").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblAccProject").trigger("reloadGrid");

                    //disable edit row on last selection
                    $('#tblAccProject').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblAccProject').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblAccProject').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblAccProject").jqGrid('navGrid', '#AccProjectPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/accpUpdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/accpAdd',
            closeAfterAdd: true
        }, {
            url: '/Setup/accpDelete',
            closeAfterDelete: true
        }, {

        });

        //End jQGrid

        //Textbox Validation

        $('#AccProjectID').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        $('#ProjectName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        $('#CompanyID').change(function () {
            $('#CompanyID').css('background-color', '');

        });



        function fnValidaton() {
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
                $(CompanyID).css('background-color', 'red');

                $('#CompanyID').focus();
                return false;
            }
            if ($('#ProjectName').val() == '') {
                alert('Please enter project name');
                $('#ProjectName').focus();
                return false;
            }

            return true;
        }

        //End Textbox validation


        // Check charcode for ProjectName

        $('#ProjectName').bind('keypress', function (evt) {
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

        // End  charcode for ProjectName





    });
})(jQuery);