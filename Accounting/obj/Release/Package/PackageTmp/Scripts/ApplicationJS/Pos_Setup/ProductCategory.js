// Data delete from grid view

function DeleteProductCategory(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'deleteProductCategory',
            type: 'POST',
            data: { ProductcategoryID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblProductCategory").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

function UpdateProductCategory(rowId) {
    $.ajax({
        url: 'GetProductCategoryByID',
        type: 'POST',
        data: { ProductcategoryID: rowId },
        success: function (data) {
            $('#ProductCategoryID').val(data.ProductCategoryID);
            $('#ProductCategory1').val(data.ProductCategory1);
          
        }
    });
}

//End


//jQuery

(function ($) {
    $(document).ready(function () {
       
        //Save

        $('#btnSave').click(function () {
            var retValue = fnValidation();
            if (retValue == true) {
                $.ajax({
                    url: 'addProductCategory',
                    type: 'POST',
                    data: JSON.stringify({
                        productcategory: {
                            ProductCategory1: $('#ProductCategory1').val()                           
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblProductCategory").trigger("reloadGrid");
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
                    url: "updateProductCategory",
                    type: 'POST',
                    data: JSON.stringify({
                        productcategory: {
                            ProductCategoryID: $('#ProductCategoryID').val(),
                            ProductCategory1: $('#ProductCategory1').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblProductCategory").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //End Update

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblProductCategory").setGridWidth(900);
            }
            else {
                $("#tblProductCategory").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid

        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblProductCategory").jqGrid({
            url: 'ProductCategoryDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ProductCategoryID',
                name: 'ProductCategoryID',
                index: 'ProductCategoryID',
                width: 250,
                editable: true,
                edittype: 'text',
                hidden:true
            }, {
                label: 'ProductCategory1',
                name: 'ProductCategory1',
                index: 'ProductCategory1',
                width: 675,
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
                var ids = $("#tblProductCategory").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblProductCategory').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateProductCategory(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblProductCategory").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteProductCategory(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblProductCategory").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#ProductCategoryPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "ProductCategoryID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Product Category Details',
            editurl: 'updateProductCategory',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblProductCategory").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblProductCategory").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblProductCategory').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblProductCategory').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblProductCategory').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblProductCategory").jqGrid('navGrid', '#ProductCategoryPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/updateProductCategory',
            closeAfterEdit: true
        }, {
            url: '/Setup/addProductCategory',
            closeAfterAdd: true
        }, {
            url: '/Setup/deleteProductCategory',
            closeAfterDelete: true
        }, {});

        //End jQGrid

        //Textbox Validation

        $('#ProductCategoryID').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });
        $('#ProductCategory1').bind('keypress', function (event) {
            var charCode = event.which;
            if (charCode != '') {
                $(this).css('border-color', '');
            }
        });


        function fnValidation() {


            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', 'white');
                }
            });

            if ($('#ProductCategory1').val() == '') {
                $('#ProductCategory1').focus();
                return false;
            }

            return true;
        }

        //End Textbox validation

        // Check charcode for ProductCategory1 Balance

        $('#ProductCategory1').bind('keypress', function (evt) {
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

        });

        // End  charcode for ProductCategory1 Balance

    }); 
})(jQuery);