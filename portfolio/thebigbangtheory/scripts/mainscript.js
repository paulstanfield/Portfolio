/* Initially hide demo divs and let user know that demo type is undefined */
    
      $(document).ready(function() {
        $("#hide_show_div, #events_1_div, #animation_div, #other_feature_div").hide();
        $("#output_checked_radio_val").append("<span>Selected demo type is: undefined</span>" );
      });


/*Click handling function for all radio buttons in nav element  */

      $(document).ready(function() {
        $("nav input[name='demo_type']" ).click(function(){
          var demo_type_checked = $("nav input[name='demo_type']:checked").val();
          $("#output_checked_radio_val").empty();
          $("#output_checked_radio_val").append("<span>Selected demo type is: " + demo_type_checked + "</span>" );
          $("#empty_div, #hide_show_div, #events_1_div, #animation_div, #other_feature_div").hide();
          switch(demo_type_checked)
          {
            case "hide_show":
              $("#hide_show_div").show();
            break;
            case "events_1":
              $("#events_1_div").show();
            break;
            case "animation":
              $("#animation_div").show();
            break;
            case "other_feature":
              $("#other_feature_div").show();
            break;
          }
        });
      });
 





/*tooltip
  ================================================== */
 
  $(function() {
    $( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
  });
  

/*accordion
  ================================================== */


$(function() {
    $( "#accordion" ).accordion({
      heightStyle: "fill"
    });
  });
  $(function() {
    $( "#accordion-resizer" ).resizable({
      minHeight: 140,
      minWidth: 200,
      resize: function() {
        $( "#accordion" ).accordion( "refresh" );
      }
    });
  });
  
    /* #imageslider
================================================== */

$(window).load(function() {
	$('.blueberry').blueberry();
	});
	
	   /* #tabs
================================================== */

	
	 $(function() {
$( "#tabs" ).tabs({
event: "mouseover"
});
});






	   /* #hide and show
================================================== */
$(document).ready(function(){
  $("#hide").click(function(){
    $("h4").hide();
  });
  $("#show").click(function(){
    $("h4").show();
  });
});



   /* #adding to elements to DOM
================================================== */
$(document).ready(function(){
  $("#btn1").click(function(){
    $("h5").append(" <em><strong>wicked awesome!<strong></em>");
  });

});


   /* #adding CSS
   ================================================== */
   
$(document).ready(function(){
 $("#btn3").click(function(){
    $("body").css("background-color","white");
  });
});

$(document).ready(function(){
 $("#btn4").click(function(){
    $("body").css("background-color","grey");
  });
});

   /* #eventhandling
   ================================================== */
$(document).ready(function(){
  $("#didyouknow").hover(function(){
    alert("Congrats! You are currently visiting a responsive webpage!");
    },
    function(){
    alert("Hope you enjoy it! See ya!");
  }); 
});

  /* #image animation
   ================================================== */


$(function(){
        $('#changewidth').click(function(){
                    $('#image').animate({ width: '200px' });
        });
    });

    $(function(){
        $('#changeheight').click(function(){
                    $('#image').animate({ height: '200px' });
                    
        });
        
        
      
        
    });
    
    
      /* #add and remove classes
   ================================================== */

	$(document).ready(function(){	
		
		/**
		 * Add attribute 
		 */
		$("#add").click(function(){
			$("#myLink").css({"font-weight":"bold", "color":"red", "text-decoration":"line-through"});
			$("#myLink").attr("title","My Link Title");
		});
		
		/**
		 * Remove attribute 
		 */
		$("#remove").click(function(){
			$("#myLink").removeAttr("style");
			$("#myLink").removeAttr("title");
		});		
		
	});




   	  /* populating element
================================================== */
   

      $(document).ready(function(){
        $('#element_this').click(function(){  
          $('#content').append('<select />');
          $('#selectElement>span').each(function(){
            $('select').append('<option value="' + $(this).text() +   '">' + $(this).text() + '</option>' );
          }); 
        });
      });
      
      
      
      

   	  /* populating list
================================================== */
$(document).ready(function(){
$('#try_this').click(function(){ 
$('#content2').append('<ul />');
$('#textHolder>span').each(function(){
$('#content2 ul').append('<li>' + $(this).text() + '</li>' );
}); 
});
});
      
   	  /* populating table
================================================== */
$(document).ready(function(){
$('#try_this2').click(function(){ 
$('#content3').append('<table border="1" class="tableclass"/>');
$('table').append('<tr><th>Directors</th></tr>' );
$('span[class="title"]').each(function(){
$('#content3 table').append('<tr><td>' + $(this).text() + '</td></tr>' );
}); 
});
});
     