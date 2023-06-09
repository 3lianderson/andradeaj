var accordion = (function(){
  
    var $accordion = $('.js-accordion');
    var $accordion_header = $accordion.find('.js-accordion-header');
    var $accordion_item = $('.js-accordion-item');
   
    // default settings 
    var settings = {
      // animation speed
      speed: 400,
      
      // close all other accordion items if true
      oneOpen: false
    };
      
    return {
      // pass configurable object literal
      init: function($settings) {
        $accordion_header.on('click', function() {
          accordion.toggle($(this));
        });
        
        $.extend(settings, $settings); 
        
        // ensure only one accordion is active if oneOpen is true
        if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
          $('.js-accordion-item.active:not(:first)').removeClass('active');
        }
        
        // reveal the active accordion bodies
        $('.js-accordion-item.active').find('> .js-accordion-body').show();
      },
      toggle: function($this) {
              
        if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
          $this.closest('.js-accordion')
                 .find('> .js-accordion-item') 
                 .removeClass('active')
                 .find('.js-accordion-body')
                 .slideUp()
        }
        
        // show/hide the clicked accordion item
        $this.closest('.js-accordion-item').toggleClass('active');
        $this.next().stop().slideToggle(settings.speed);
      }
    }
  })();
  
  jQuery(function($){
    var topMenuHeight = $("#desktop-nav").outerHeight();
    $("#desktop-nav").menuScroll(topMenuHeight);
  });
  
  // COPY THE FOLLOWING FUNCTION INTO ANY SCRIPTS
  jQuery.fn.extend({
      menuScroll: function(offset) {
      // Declare all global variables
          var topMenu = this;
      var topOffset = offset ? offset : 0;
          var menuItems = $(topMenu).find("a");
          var lastId;
    
      // Save all menu items into scrollItems array
          var scrollItems = $(menuItems).map(function() {
              var item = $($(this).attr("href"));
              if (item.length) {
                  return item;
              }
          });
  
      // When the menu item is clicked, get the #id from the href value, then scroll to the #id element
          $(topMenu).on("click", "a", function(e){
              var href = $(this).attr("href");
              
              var offsetTop = href === "#" ? 0 : $(href).offset().top-topOffset;
  
              $('html, body').stop().animate({ 
                  scrollTop: offsetTop
              }, 300);
              e.preventDefault();
  
          });
      
      // When page is scrolled
          $(window).scroll(function(){
              var nm = $("html").scrollTop();
              var nw = $("body").scrollTop();
              var fromTop = (nm > nw ? nm : nw)+topOffset;
  
        
        // When the page pass one #id section, return all passed sections to scrollItems and save them into new array current
              var current = $(scrollItems).map(function(){
                  if ($(this).offset().top <= fromTop)
                  return this;
              });
        
        // Get the most recent passed section from current array
              current = current[current.length-1];
              var id = current && current.length ? current[0].id : "";
              if (lastId !== id) {
                  lastId = id;
                  // Set/remove active class
                  $(menuItems)
                  .parent().removeClass("active")
                  .end().filter("[href='#"+id+"']").parent().addClass("active");
              }      
  
          });
      }
  });