var $j = jQuery.noConflict();

$j(document).ready(function($) {

    var url = 'https://randomuser.me/api/';
    var options = {
        "results": 12
    };

    $.ajax({
        url: url,
        data: options,
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            var results = data.results;
            var resultsHTML = '<ul id="list" class="col-12">';
            var modalHTML = '';
            var itemNum = 1;
            //console.log(results);

            results.forEach(function (employee) {
                //console.log(employee);
                var firstName = employee.name.first.charAt(0).toUpperCase() + employee.name.first.slice(1);
                var lastName = employee.name.last.charAt(0).toUpperCase() + employee.name.last.slice(1);

                resultsHTML += '<li id="employee-' + itemNum + '" class="employee col-4">';
                resultsHTML += '<div class="info-wrap col-12">';
                resultsHTML += '<a class="employee-link" employee-data="' + itemNum + '"><img class="employee-img float-left" src="' + employee.picture.large + '"></a>';
                resultsHTML += '<div class="info float-left">';
                resultsHTML += '<h3 class="name-title">' + firstName + ' ' + lastName + '</h3>';
                resultsHTML += '<div><span class="email">' + employee.email + '</span></div>';
                resultsHTML += '<div><span class="city">' + employee.location.city + '</span></div>';
                resultsHTML += '</div></div>';

                resultsHTML += '</li>';

                modalHTML += '<div id="modal-item-' + itemNum + '" class="modal-item employee col-3">';
                modalHTML += '<div class="close">X</div>';
                modalHTML += '<div class="info-wrap col-12">';
                modalHTML += '<img class="employee-img" src="' + employee.picture.large + '">';
                modalHTML += '<div class="info">';
                modalHTML += '<h3 class="name-title">' + firstName + ' ' + lastName + '</h3>';
                modalHTML += '<div><span class="email">' + employee.email + '</span></div>';
                modalHTML += '<div><span class="cell-num">' + employee.cell + '</span></div>';
                modalHTML += '<div class="seperator"></div>';
                modalHTML += '<div class="address-street"><span>' + employee.location.street + '</span></div>';
                modalHTML += '<div class="address-other"><span>' + employee.location.city + ', ' + employee.location.state + ', ' + employee.location.postcode + '</span></div>';

                modalHTML += '</div></div>';

                modalHTML += '</div>';
                itemNum += 1;

            });
            resultsHTML += '</ul>';
            $('#employee-list').html(resultsHTML);
            $('#modal-list').html(modalHTML);


        }
    });
});
jQuery(function ($) {
    $( document ).ajaxComplete(function() {
        var employees = document.getElementById('employee-list');
        var modals = document.getElementById('modal-list');

        employees.addEventListener('click',function (e) {
            var link = $(e.target).parent();
                console.log(link);
            if(link.hasClass('employee-link')){
                var id = link.attr('employee-data');
                var modalSelect = $('#modal-item-'+id);
                $('#modal-list').show();

                modalSelect.show();
            }

        });

        modals.addEventListener('click',function (e) {
            var link = $(e.target);
            if(link.hasClass('close')) {
                $('#modal-list').hide();
                link.parent().hide();

            }
                console.log(link);

        });

    });

});