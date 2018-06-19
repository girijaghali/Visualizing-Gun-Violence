$(document).ready(function () {
     $('.nav-link[href^="#"]').on('click', function (e) {
         e.preventDefault();

         var target = this.hash,
             $target = $(target);

         $('html, body').stop().animate({
             'scrollTop': $target.offset().top - 115
         }, 900, 'swing');
     });
 });
