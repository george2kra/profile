$( document ).ready(function() {

  $( ".cross" ).hide();
  $( ".linkMenu" ).hide();
  $( ".hamburger" ).click(function() {
      $( ".linkMenu" ).slideToggle( "slow", function() {
        $( ".hamburger" ).hide();
        $( ".cross" ).show();
      });
  });

  $( ".cross" ).click(function() {
    $( ".linkMenu" ).slideToggle( "slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
    });
  });

});
