(function ($) {
    $(document).ready(function () {

        //jQGrid

        //End Update

        $(window).bind('resize', function () {
            var vWidth = $(window).width();
            if (vWidth > 1000) {
                $("#tblAccChequePayment").setGridWidth(900);
            }
            else {
                $("#tblAccChequePayment").setGridWidth($(window).width());
            }
        }).trigger('resize');




        var AdminFunctionsLastSel = 1;
        //setup function table
        $("#tblAccChequePayment").jqGrid({
            url: 'AccChequePaymentDetails',
            datatype: 'json',
            mtype: 'GET',
            width: 'auto',
            height: 'auto',
            colModel: [{
                label: 'ChequePayID',
                name: 'ChequePayID',
                index: 'ChequePayID',
                width: 75,
                editable: true,
                edittype: 'text',
                hidden: true
            }, {
                label: 'Issue_Date',
                name: 'Issue_Date',
                index: 'Issue_Date',
                width: 100,
                editable: true,
                edittype: 'text'
            },
            {
                label: 'TrnID',
                name: 'TrnID',
                index: 'TrnID',
                width: 100,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'BankID',
                 name: 'BankID',
                 index: 'BankID',
                 width: 50,
                 editable: true,
                 edittype: 'text'
             },
            {
                label: 'BranchID',
                name: 'BranchID',
                index: 'BranchID',
                width: 50,
                editable: true,
                edittype: 'text'
            },
             {
                 label: 'ChequeNo',
                 name: 'ChequeNo',
                 index: 'ChequeNo',
                 width: 100,
                 editable: true,
                 edittype: 'text'
             },
              {
                  label: 'Cheque_Amount',
                  name: 'Cheque_Amount',
                  index: 'Cheque_Amount',
                  width: 40,
                  editable: true,
                  edittype: 'text'
              },
               {
                   label: 'IsVoid',
                   name: 'IsVoid',
                   index: 'IsVoid',
                   width: 100,
                   editable: true,
                   edittype: 'text'
               },
               {
                   label: 'MaturityDate',
                   name: 'MaturityDate',
                   index: 'MaturityDate',
                   width: 100,
                   editable: true,
                   edittype: 'text'
               },

            {
                //    name: 'Edit', index: 'Edit', width: 50, editable: false, align: 'center', sortable: false
                //},
                //   {
                //       name: 'Delete', index: 'Delete', width: 50, editable: false, align: 'center', sortable: false
            }],

            gridComplete: function () {
                var ids = $("#tblAccChequePayment").jqGrid('getDataIDs');
                //   loop through all rows in the table and set required column data

                for (var i = 0; i < ids.length; i++) {
                    var rowdata = $('#tblAccChequePayment').jqGrid('getRowData', ids[i]);
                    var cl = ids[i];

                    //s = "<div title='edit' onclick='UpdateAccHead(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Edit</div>";
                    //$("#tblAccChequePayment").setRowData(ids[i], { Edit: s });

                    //s = "<div title='delete' onclick='DeleteAccHead(" + ids[i] + ");' onmouseover=$(this).addClass('ui-state-hover'); onmouseout=$(this).removeClass('ui-state-hover'); class='ac-person'>Delete</div>";
                    //$("#tblAccChequePayment").setRowData(ids[i], { Delete: s });
                }
            },

            pager: $('#AccChequePaymentPager'),
            rowNum: 18,
            rowList: [10, 20, 30],
            sortname: "ChequePayID",
            sortorder: "desc",
            viewrecords: true,
            imgpath: '/Content/custom-theme/images',
            caption: 'Acc Cheque Payment',
            editurl: 'Headupdate',
            loadError: function (xhr, st, err) { },
            loadComplete: function ()
            { $("#tblAccChequePayment").trigger("reloadGrid"); },
            onCellSelect: function (rowID, iCol, cellContent) {
                if (rowID && (rowID !== AdminFunctionsLastSel)) {

                    //-----------------------Relode grid------------------------//
                    //$("#tblAccChequePayment").trigger("reloadGrid");
                    //......................Relode gride  End............................//

                    //disable edit row on last selection
                    //$('#tblAccChequePayment').editRow(AdminFunctionsLastSel, false);
                    //save the last row selected
                    if (AdminFunctionsLastSel != 0) $('#tblAccChequePayment').saveRow(AdminFunctionsLastSel, false);
                    //enable row edit on current row
                   // $('#tblAccChequePayment').editRow(rowID, true);
                    AdminFunctionsLastSel = rowID;
                }
            }
        });

        $("#tblAccChequePayment").jqGrid('navGrid', '#AccChequePaymentPager', {
            search: false,
            edit: false,
            add: false,
            del: false
        }, {
            url: '/Setup/Headupdate',
            closeAfterEdit: true
        }, {
            url: '/Setup/Headadd',
            closeAfterAdd: true
        }, {
            url: '/Setup/Headdelete',
            closeAfterDelete: true
        }, {});

        //End jQGrid

    });
})(jQuery);