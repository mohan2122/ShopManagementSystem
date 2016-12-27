// Data delete from grid view

function DeleteProductInfo(rowId) {
    var x = confirm("Are you sure you want to delete this?")
    if (x == true) {
        $.ajax({
            url: 'DeleteProductInfo',
            type: 'POST',
            data: { ProductID: rowId },
            async: false,
            cache: false,
            success: function (data) {
                $("#tblProductInfo").trigger("reloadGrid");
                alert('Data Deleted Successfully');
            }
        });
    }
}

//End

// Data update from grid view

function UpdateProductInfo(rowId) {
    $.ajax({
        url: 'GetProductInfoByID',
        type: 'POST',
        data: { ProductID: rowId },
        success: function (data) {
            $('#ProductID').val(data.ProductID);
            $('#ProductCode').val(data.ProductCode);
            $('#ProductName').val(data.ProductName);
            $('#ProductType').val(data.ProductType);
            $('#ProductCategoryID').val(data.ProductCategoryID);
            $('#BrandID').val(data.BrandID);
            $('#ColorID').val(data.ColorID);
            $('#SizeID').val(data.SizeID);
            $('#TarrifTypeID').val(data.TarrifTypeID);
            $('#UnitID').val(data.UnitID);
            $('#UnitIDOut').val(data.UnitIDOut);
            $('#ConversionRate').val(data.ConversionRate);
            $('#VATTypeID').val(data.VATTypeID);
            $('#WeightPerUnit').val(data.WeightPerUnit);
            $('#RatePerUnit').val(data.RatePerUnit);
            $('#VATableRate').val(data.VATableRate);
            $('#VATPercent').val(data.VATPercent);
            $('#RebatePercent').val(data.RebatePercent);
            $('#SDPercent').val(data.SDPercent);
            $('#SupTaxPercent').val(data.SupTaxPercent);
            $('#ApprovedPrice').val(data.ApprovedPrice);
            $('#ReorderLevel').val(data.ReorderLevel);
            $('#ProductImage').val(data.ProductImage);
            $('#Note').val(data.Note);
            $('#EffectiveDate').val(data.EffectiveDate);
        }
    });
}

//End



//jQuery

(function ($) {
    $(document).ready(function () {

        //<img id="emimage" src="" height="100" width="100"/>
        //For Image showing
        $("#btngetemp").click(function () {
            //var EmpNo = $("#txteno").val();
            $("#emimage").attr("src", "http://localhost:6701/api/Employee/" + 2);
        });
        //End Image Show

        $('#EffectiveDate').datepicker({ dateFormat: "dd-mm-yy" });


        //--------------Save--------------

        $('#btnSave').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: 'AddProductInfo',
                    type: 'POST',
                    data: JSON.stringify({
                        productinfo: {
                            ProductID: $('#ProductID').val(),
                            ProductCode: $('#ProductCode').val(),
                            ProductName: $('#ProductName').val(),
                            ProductType: $('#ProductType').val(),
                            ProductCategoryID: $('#ProductCategoryID').val(),
                            BrandID: $('#BrandID').val(),
                            ColorID: $('#ColorID').val(),
                            SizeID: $('#SizeID').val(),
                            TarrifTypeID: $('#TarrifTypeID').val(),
                            UnitID: $('#UnitID').val(),
                            UnitIDOut: $('#UnitIDOut').val(),
                            ConversionRate: $('#ConversionRate').val(),
                            VATTypeID: $('#VATTypeID').val(),
                            WeightPerUnit: $('#WeightPerUnit').val(),
                            RatePerUnit: $('#RatePerUnit').val(),
                            VATableRate: $('#VATableRate').val(),
                            VATPercent: $('#VATPercent').val(),
                            RebatePercent: $('#RebatePercent').val(),
                            SDPercent: $('#SDPercent').val(),
                            SupTaxPercent: $('#SupTaxPercent').val(),
                            ApprovedPrice: $('#ApprovedPrice').val(),
                            ReorderLevel: $('#ReorderLevel').val(),
                            ProductImage: $('#ProductImage').val(),
                            Note: $('#Note').val(),
                            EffectiveDate: $('#EffectiveDate').val()
                        }
                    }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#tblProductInfo").trigger("reloadGrid");
                        alert('Data Saved Successfully');
                    }
                });

            }
        });

        //------------------End Save------------------------------


        //--------------------Update------------------------------

        $('#btnUpdate').click(function () {
            var retval = insert_update();
            if (retval == true) {
                $.ajax({
                    url: "UpdateProductInfo",
                    type: 'POST',
                    data: JSON.stringify({
                        tarriftype: {
                            ProductID: $('#ProductID').val(),
                            ProductCode: $('#ProductCode').val(),
                            ProductName: $('#ProductName').val(),
                            ProductType: $('#ProductType').val(),
                            ProductCategoryID: $('#ProductCategoryID').val(),
                            BrandID: $('#BrandID').val(),
                            ColorID: $('#ColorID').val(),
                            SizeID: $('#SizeID').val(),
                            TarrifTypeID: $('#TarrifTypeID').val(),
                            UnitID: $('#UnitID').val(),
                            UnitIDOut: $('#UnitIDOut').val(),
                            ConversionRate: $('#ConversionRate').val(),
                            VATTypeID: $('#VATTypeID').val(),
                            WeightPerUnit: $('#WeightPerUnit').val(),
                            RatePerUnit: $('#RatePerUnit').val(),
                            VATableRate: $('#VATableRate').val(),
                            VATPercent: $('#VATPercent').val(),
                            RebatePercent: $('#RebatePercent').val(),
                            SDPercent: $('#SDPercent').val(),
                            SupTaxPercent: $('#SupTaxPercent').val(),
                            ApprovedPrice: $('#ApprovedPrice').val(),
                            ReorderLevel: $('#ReorderLevel').val(),
                            ProductImage: $('#ProductImage').val(),
                            Note: $('#Note').val(),
                            EffectiveDate: $('#EffectiveDate').val()
                        }
                    }),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        $("#tblProductInfo").trigger("reloadGrid");
                        alert('Data Updated Successfully');
                    }
                });
            }
        });

        //---------------------End Update--------------------------




        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblProductInfo").setGridWidth(952);
            }
            else {
                $("#tblProductInfo").setGridWidth($(window).width());
            }
        }).trigger('resize');

        //jQGrid
        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblProductInfo").jqGrid({
            url: 'ProductInfoDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ProductID',
                name: 'ProductID',
                index: 'ProductID',
                width: 40,
                editable: true,
                edittype: 'text',
                hidden:true
            },
             {
                 label: 'ProductCode',
                 name: 'ProductCode',
                 index: 'ProductCode',
                 width: 25,
                 editable: true,
                 edittype: 'text'
             },
              {
                  label: 'ProductName',
                  name: 'ProductName',
                  index: 'ProductName',
                  width: 45,
                  editable: true,
                  edittype: 'text'
              },
               {
                   label: 'ProductType',
                   name: 'ProductType',
                   index: 'ProductType',
                   width: 40,
                   editable: true,
                   edittype: 'text'
               },
                {
                    label: 'ProductCategoryID',
                    name: 'ProductCategoryID',
                    index: 'ProductCategoryID',
                    width: 30,
                    editable: true,
                    edittype: 'text'
                },
                 {
                     label: 'BrandID',
                     name: 'BrandID',
                     index: 'BrandID',
                     width: 30,
                     editable: true,
                     edittype: 'text'
                 },
                 {
                     label: 'ColorID',
                     name: 'ColorID',
                     index: 'ColorID',
                     width: 30,
                     editable: true,
                     edittype: 'text'
                 },
                 {
                     label: 'SizeID',
                     name: 'SizeID',
                     index: 'SizeID',
                     width: 30,
                     editable: true,
                     edittype: 'text'
                 },
                  {
                      label: 'TarrifTypeID',
                      name: 'TarrifTypeID',
                      index: 'TarrifTypeID',
                      width: 30,
                      editable: true,
                      edittype: 'text'
                  },
                   {
                       label: 'UnitID',
                       name: 'UnitID',
                       index: 'UnitID',
                       width: 30,
                       editable: true,
                       edittype: 'text'
                   },
                    {
                        label: 'UnitIDOut',
                        name: 'UnitIDOut',
                        index: 'UnitIDOut',
                        width: 30,
                        editable: true,
                        edittype: 'text'
                    },
                     {
                         label: 'ConversionRate',
                         name: 'ConversionRate',
                         index: 'ConversionRate',
                         width: 25,
                         editable: true,
                         edittype: 'text'
                     },
                      {
                          label: 'VATTypeID',
                          name: 'VATTypeID',
                          index: 'VATTypeID',
                          width: 30,
                          editable: true,
                          edittype: 'text'
                      },
                       {
                           label: 'WeightPerUnit',
                           name: 'WeightPerUnit',
                           index: 'WeightPerUnit',
                           width: 25,
                           editable: true,
                           edittype: 'text'
                       },
                        {
                            label: 'RatePerUnit',
                            name: 'RatePerUnit',
                            index: 'RatePerUnit',
                            width: 25,
                            editable: true,
                            edittype: 'text'
                        },
                         {
                             label: 'VATableRate',
                             name: 'VATableRate',
                             index: 'VATableRate',
                             width: 25,
                             editable: true,
                             edittype: 'text'
                         },
                          {
                              label: 'VATPercent',
                              name: 'VATPercent',
                              index: 'VATPercent',
                              width: 25,
                              editable: true,
                              edittype: 'text'
                          },
                           {
                               label: 'RebatePercent',
                               name: 'RebatePercent',
                               index: 'RebatePercent',
                               width: 25,
                               editable: true,
                               edittype: 'text'
                           },
                        {
                            label: 'SDPercent',
                            name: 'SDPercent',
                            index: 'SDPercent',
                            width: 25,
                            editable: true,
                            edittype: 'text'
                        },
                         {
                             label: 'SupTaxPercent',
                             name: 'SupTaxPercent',
                             index: 'SupTaxPercent',
                             width: 25,
                             editable: true,
                             edittype: 'text'
                         },
                          {
                              label: 'ApprovedPrice',
                              name: 'ApprovedPrice',
                              index: 'ApprovedPrice',
                              width: 50,
                              editable: true,
                              edittype: 'text'
                          },
                           {
                               label: 'ReorderLevel',
                               name: 'ReorderLevel',
                               index: 'ReorderLevel',
                               width: 30,
                               editable: true,
                               edittype: 'text'
                           },
                            {
                                label: 'ProductImage',
                                name: 'ProductImage',
                                index: 'ProductImage',
                                width: 50,
                                editable: true,
                                edittype: 'text'
                            },
                             {
                                 label: 'Note',
                                 name: 'Note',
                                 index: 'Note',
                                 width: 50,
                                 editable: true,
                                 edittype: 'text'
                             },

                                 {
                                     label: 'EffectiveDate',
                                     name: 'EffectiveDate',
                                     index: 'EffectiveDate',
                                     width: 40,
                                     editable: true,
                                     edittype: 'text'
                                 },


            {
                name: 'Edit', index: 'Edit', width: 35, editable: false, align: 'center', sortable: false
            }
            , {
                name: 'Delete', index: 'Delete', width: 40, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblProductInfo").jqGrid('getDataIDs');
                //loop through all rows in the table and set required column data
                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblProductInfo').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];
                    s = "<div title='edit' onclick='UpdateProductInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    $("#tblProductInfo").setRowData(ids[i], { Edit: s });

                    s = "<div title='delete' onclick='DeleteProductInfo(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    $("#tblProductInfo").setRowData(ids[i], { Delete: s });
                }
            },
            pager: $('#ProductInfoPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "ProductID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'ProductInfo Details',
            editurl: 'UpdateProductInfo',
            loadError: function (xhr, st, err) { },
            loadComplete: function () { $("#tblProductInfo").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {
                    $("#tblProductInfo").trigger("reloadGrid");
                    //disable edit row on last selection
                    $('#tblProductInfo').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblProductInfo').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                    $('#tblProductInfo').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblProductInfo").jqGrid('navGrid', '#ProductInfoPager', {
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

        $('#ProductCode').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#ProductName').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });



        $('#ProductType').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        $('#ProductCategoryID').change(function () {
            $('#ProductCategoryID').css('background-color', '');
        });

        $('#BrandID').change(function () {
            $('#BrandID').css('background-color', '');
        });

        $('#ColorID').change(function () {
            $('#ColorID').css('background-color', '');
        });

        $('#SizeID').change(function () {
            $('#SizeID').css('background-color', '');
        });

        $('#TarrifTypeID').change(function () {
            $('#TarrifTypeID').css('background-color', '');
        });

        $('#UnitID').change(function () {
            $('#UnitID').css('background-color', '');
        });

        $('#VATTypeID').change(function () {
            $('#VATTypeID').css('background-color', '');
        });

        $('#UnitIDOut').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#ConversionRate').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#WeightPerUnit').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#RatePerUnit').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#VATableRate').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#VATPercent').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#RebatePercent').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });
        $('#SDPercent').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });
        $('#SupTaxPercent').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#ApprovedPrice').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });
        $('#ReorderLevel').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });

        $('#ProductImage').change(function () {
            $('#ProductImage').css('background-color', '');
        });

        $('#EffectiveDate').bind('keypress', function (evt) {
            var charcode = evt.which;
            if (charcode != '') {
                $(this).css('border-color', '')
            }
        });


        // Text boox faka thakle border red coloe dekhabe tar methode
        function insert_update() {

            $('input.required').each(function () {
                if ($(this).val() == '') {
                    $(this).css('border-color', 'red');
                }
                else {
                    $(this).css('border-color', '');
                }
            });
            //End Text boox faka thakle border red coloe dekhabe

            if ($('#ProductCode').val() == '') {
                $('#ProductCode').focus();
                return false;
            }
            if ($('#ProductName').val() == '') {
                $('#ProductName').focus();
                return false;
            }

            if ($('#ProductType').val() == '') {
                $('#ProductType').focus();
                return false;
            }
            if ($('#ProductCategoryID').val() == 0) {
                alert('Please select Product Category');
                $('#ProductCategoryID').css('background-color', 'red');
                $('#ProductCategoryID').focus();
                return false;
            }

            if ($('#BrandID').val() == 0) {
                alert('Please select Product Brand');
                $('#BrandID').css('background-color', 'red');
                $('#BrandID').focus();
                return false;
            }

            if ($('#ColorID').val() == 0) {
                alert('Please select Product Color');
                $('#ColorID').css('background-color', 'red');
                $('#ColorID').focus();
                return false;
            }

            if ($('#SizeID').val() == 0) {
                alert('Please select Product Size');
                $('#SizeID').css('background-color', 'red');
                $('#SizeID').focus();
                return false;
            }

            if ($('#TarrifTypeID').val() == 0) {
                alert('Please select Tarrif Type');
                $('#TarrifTypeID').css('background-color', 'red');
                $('#TarrifTypeID').focus();
                return false;
            }

            if ($('#UnitID').val() == 0) {
                alert('Please select Unit');
                $('#UnitID').css('background-color', 'red');
                $('#UnitID').focus();
                return false;
            }

            if ($('#VATTypeID').val() == 0) {
                alert('Please select VatType');
                $('#VATTypeID').css('background-color', 'red');
                $('#VATTypeID').focus();
                return false;
            }

            if ($('#UnitIDOut').val() == '') {
                $('#UnitIDOut').focus();
                return false;
            } if ($('#ConversionRate').val() == '') {
                $('#ConversionRate').focus();
                return false;
            } if ($('#WeightPerUnit').val() == '') {
                $('#WeightPerUnit').focus();
                return false;
            } if ($('#RatePerUnit').val() == '') {
                $('#RatePerUnit').focus();
                return false;
            } if ($('#VATableRate').val() == '') {
                $('#VATableRate').focus();
                return false;
            } if ($('#VATPercent').val() == '') {
                $('#VATPercent').focus();
                return false;
            }
            if ($('#RebatePercent').val() == '') {
                $('#RebatePercent').focus();
                return false;
            }
            if ($('#SDPercent').val() == '') {
                $('#SDPercent').focus();
                return false;
            }
            if ($('#SupTaxPercent').val() == '') {
                $('#SupTaxPercent').focus();
                return false;
            }
            if ($('#ApprovedPrice').val() == '') {
                $('#ApprovedPrice').focus();
                return false;
            }
            if ($('#ReorderLevel').val() == '') {
                $('#ReorderLevel').focus();
                return false;
            }
            if ($('#ProductImage').val() == 0) {
                alert('Please select Image');
                $('#ProductImage').css('background-color', 'red');
                $('#ProductImage').focus();
                return false;
            }

            if ($('#EffectiveDate').val() == '') {
                $('#EffectiveDate').focus();
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

        //check charcode for ProductName

        $('#ProductName').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 250) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 250');
                    return false;
                }
            }
        });

        //end charcode for ProductName

        //check charcode for ProductType

        $('#ProductType').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 5) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 5');
                    return false;
                }
            }
        });

        //end charcode for ProductType

        //check charcode for UnitIDOut

        $('#UnitIDOut').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if (charcode == 8) {
                return true;
            }

            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        //end check charcode for UnitIDOut

        //check charcode for ConversionRate

        $('#ConversionRate').bind('keypress', function (evt) {
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

            if (charcode == 8) {
                return true;
            }

            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        //end check charcode for ConversionRate

        //check charcode for WeightPerUnit

        $('#WeightPerUnit').bind('keypress', function (evt) {
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

            if (charcode == 8) {
                return true;
            }

            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        //end check charcode for WeightPerUnit

        // Check charcode for  VATableRate

        $('#VATableRate').bind('keypress', function (evt) {
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

        // End  charcode for VATableRate

        // Check charcode for VATPercent

        $('#VATPercent').bind('keypress', function (evt) {
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

        // End  charcode for VATPercent

        // Check charcode for  RebatePercent

        $('#RebatePercent').bind('keypress', function (evt) {
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

        // End  charcode for RebatePercent

        // Check charcode for SDPercent

        $('#SDPercent').bind('keypress', function (evt) {
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

        // End  charcode for SDPercent

        // Check charcode for  SupTaxPercent

        $('#SupTaxPercent').bind('keypress', function (evt) {
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

        // End  charcode for SupTaxPercent

        // Check charcode for  ApprovedPrice

        $('#ApprovedPrice').bind('keypress', function (evt) {
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

        // End  charcode for ApprovedPrice

        //check charcode for ReorderLevel

        $('#ReorderLevel').bind('keypress', function (evt) {
            var charcode = (evt.which);

            if (charcode == 8) {
                return true;
            }
            if (charcode < 48 || charcode > 57) {
                alert('only numbers are Allowed')
                return false;
            }

        });

        //end check charcode for ReorderLevel

        //check charcode for Note

        $('#Note').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > 200) {
                if (charcode == 8) {
                    return true;
                }
                else {
                    alert('Max length is = 200');
                    return false;
                }
            }
        });

        //end charcode for Note

    });
})(jQuery);