var $j = jQuery.noConflict();

$j(document).ready(function($) {
    //ajax params
    var url = 'https://randomuser.me/api/';
    var options = {
        "results": 12,
        "nat": "gb,us"
    };

    $.ajax({
        url: url,
        data: options,
        dataType: 'json',
        success: function (data) {
            //Initiate vars
            var results = data.results;
            var resultsHTML = '<ul id="list" class="col-12">';
            var modalHTML = '';
            var itemNum = 1;

            results.forEach(function (employee) {
                //capitalize name
                var firstName = employee.name.first.charAt(0).toUpperCase() + employee.name.first.slice(1);
                var lastName = employee.name.last.charAt(0).toUpperCase() + employee.name.last.slice(1);

                //generate directory
                resultsHTML += '<li id="employee-' + itemNum + '" class="employee col-md-4">';
                resultsHTML += '<div class="info-wrap">';
                resultsHTML += '<a class="employee-link" employee-data="' + itemNum + '"><img class="employee-img " src="' + employee.picture.large + '"></a>';
                resultsHTML += '<div class="info">';
                resultsHTML += '<h4 class="name-title">' + firstName + ' ' + lastName + '</h4>';
                resultsHTML += '<div class="user-name"><span>' + employee.login.username + '</span></div>';

                resultsHTML += '<div><span class="email">' + employee.email + '</span></div>';
                resultsHTML += '<div><span class="city">' + employee.location.city + '</span></div>';
                resultsHTML += '</div></div>';

                resultsHTML += '</li>';

                //generate modal content
                modalHTML += '<div id="modal-item-' + itemNum + '" class="modal-item employee col-md-6">';
                modalHTML += '<div class="close">X</div>';
                modalHTML += '<div class="info-wrap">';
                modalHTML += '<img class="employee-img" src="' + employee.picture.large + '">';
                modalHTML += '<div class="info">';
                modalHTML += '<h3 class="name-title">' + firstName + ' ' + lastName + '</h3>';
                modalHTML += '<div class="user-name"><span>' + employee.login.username + '</span></div>';
                modalHTML += '<div><span class="email">' + employee.email + '</span></div>';
                modalHTML += '<div><span class="cell-num">' + employee.cell + '</span></div>';
                modalHTML += '<div class="seperator"></div>';
                modalHTML += '<div class="address-street"><span>' + employee.location.street + '</span></div>';
                modalHTML += '<div class="address-other"><span>' + employee.location.city + ', ' + employee.location.state + ', ' + employee.location.postcode + '</span></div>';
                modalHTML += '<div class="dob"><span>'+employee.dob.slice(0,10)+'</span></div>';
                modalHTML += '</div></div>';

                modalHTML += '</div>';
                itemNum += 1;

            });
            resultsHTML += '</ul>';
            //add content
            $('#employee-list').html(resultsHTML);
            $('#modal-list').html(modalHTML);


        }
    });
});
jQuery(function ($) {
    $( document ).ajaxComplete(function() {
        var modals = document.getElementById('modal-list');

        //open modal
       $('.info-wrap').click(function () {
           var link = $(this).find('.employee-link');
           var id = link.attr('employee-data');
           var modalSelect = $('#modal-item-'+id);
           $('#modal-list').show();

           modalSelect.show();
           console.log(this);

       });
        //close modal
        modals.addEventListener('click',function (e) {
            var link = $(e.target);
            if(link.hasClass('close')) {
                $('#modal-list').hide();
                link.parent().hide();

            }

        });
        //modal navigation
        $('<div class="navi left-arrow"><<</div>').insertBefore('#modal-list .info-wrap');
        $('<div class="navi right-arrow">>></div>').insertAfter('#modal-list .info-wrap');

        //navigate left
        $('.left-arrow').click(function () {

            var employee = $(this).parent();

            var prevEmployee = employee.prevAll('.employee').not('.hide-employee').first();//exclude filtered employee


            if(prevEmployee.length>0) {//trigger
                employee.hide();
                prevEmployee.show();

            }

        });
        $('.right-arrow').click(function () {

            var employee = $(this).parent();

            var nextEmployee = employee.nextAll('.employee').not('.hide-employee').first();//exclude filtered employee


            if(nextEmployee.length>0) {//trigger
                employee.hide();
                nextEmployee.show();

            }


        });

        //search
        $('#employee-search .search').click(function () {


            var name = $('#employee-search input').val();
            if(name.length>0){

                $('.employee').addClass('hide-employee');
                searchEmployee(name);

            }
        });
        //reset search
        $('#employee-search .reset').click(function () {
            $('.employee').removeClass('hide-employee');

        });
        function searchEmployee(name) {
            $('#employee-list .info-wrap').each(function () {
               var title = $(this).find('.name-title').text();
               var user = $(this).find('.user-name').text();
               var id = $(this).find('.employee-link').attr('employee-data');

               //match name or user name
               if(title.toLowerCase().indexOf(name.toLowerCase())>-1||user.toLowerCase().indexOf(name.toLowerCase())>-1){
                   $('#modal-item-'+id).removeClass('hide-employee') ;
                   $(this).parent().removeClass('hide-employee');
                   $('#employee-search input').val("");

               }

            });
        }

    });

});