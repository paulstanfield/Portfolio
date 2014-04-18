/*Paul Stanfield - B00447788 - Assignment 2 - COM601 */


// help dialog box feature, closed at load

  $(function() {
  $( "#dialog" ).dialog({
  autoOpen: false,
  show: {
  effect: "none",
        
  },
  hide: {
  effect: "none",
        
  }
  });
 
  $( "#help-btn" ).click(function() {
  $( "#dialog" ).dialog( "open" );
  });
  });
 
// load accordion 
     
      $(function() {
      $( "#accordion" ).accordion();
      });


//play information 

          var currentContext;
          var current_play_dom;

          function loadPlay(playName){
           $.ajax({
          type:"GET",
          url: "plays/" + playName,
          dataType: "xml",
          success: displayOverview
          });
           };

          function displayOverview(play_dom){
           current_play_dom = play_dom;
          currentContext = $("PLAY",current_play_dom);
          $("#mainOutput").empty();
		  $("#mainOutput").append('<input type="button" id="overview" class="ui-button ui-corner-all" value="Play Overview">');
          $("#mainOutput").append('<p class="dramatis">' + $("PLAY>PERSONAE>TITLE",current_play_dom).text() + '</p>');
          $("PLAY>ACT",current_play_dom).each(function(actNo_jq){
          var current_act = $(this);
          var actNo_ws = actNo_jq + 1;   //  ws stands for 'William Shakespeare' and jq stands for 'jQuery' ie. 1-based and zero-based
          $("#mainOutput").append('<p class="actTitle "' + 'id="' + actNo_ws + '">' + $("TITLE:first",current_act).text() + "<p>");
          $("SCENE",current_act).each(function(sceneNo_jq){
            var current_scene = $(this);
            var sceneNo_ws = sceneNo_jq + 1;
            $("#mainOutput").append('<p class="sceneTitle"' + 'id="' + actNo_ws + "_" + sceneNo_ws + '">' + $("TITLE:first",current_scene).text() + "<p>");
          });
         });
        contextInfo();
         }

// side column information display information on selected play

             function contextInfo(){
             $('#sideInfo').empty();
             $('#sideInfo').append("<table>");
             $('#sideInfo>table').append("<th><h3>Play Information:</h3></th>");
              var act = $("ACT",currentContext).size();
              if (act > 0){
              $('#sideInfo>table').append("<tr><td>Acts:</td><td>" + act + "</td></tr>");  	
              } 
             var scene = $("SCENE",currentContext).size();
             if (scene > 0){
             $('#sideInfo>table').append("<tr><td>Scenes:</td><td>" + scene + "</td></tr>");  	
             } 
	          $('#sideInfo>table').append("<tr><td>Speeches:</td><td>" + $("SPEECH",currentContext).size() + "</td></tr>");
             $('#sideInfo>table').append("<tr><td>Lines:</td><td>" + $("LINE",currentContext).size() + "</td></tr>");
       

//word count feature
      
                 var currentline;
                 var currentLineArray;
                 var num_words;
                 var total_num_words = 0;
        
                $("LINE",currentContext).each(function(){
                 currentline = $(this).text();               // the split() method splits the string at each space so that
                 currentLineArray = currentline.split(" ");  // currentLineArray has as many elements as there are words in currentLine
                num_words = currentLineArray.length;        // The length property returns the number of array elements
                 total_num_words = total_num_words + num_words;  // This line simply accumulates all the number of words in all lines
         
                 });
        
        
                $("#sideInfo>table").append("<tr><td>Total words:</td><td>" + total_num_words + "</td></tr>");
        

//display selected speaker feature
		
                        var arraySpeakers = new Array($("SPEECH",currentContext).size());
                        $("SPEAKER",currentContext).each(function(count){arraySpeakers[count] = $(this).text();});
                        arraySpeakers = $.uniqueArray(arraySpeakers);
                        var sortedSpeakers = arraySpeakers.sort();
                        $('#sideInfo>table').append("<tr><td>Speakers:</td><td>" + $(arraySpeakers).size() + "</td></tr>");
                         $('#sideInfo').append("<br /><h4>Select A Speaker:</h4>");

                         $('#sideInfo').append("<select class='speaker-selection' />");
                         var max=$(arraySpeakers).size()-1
                         var i=0;
                         for (i=0;i<=max;i++){
                         $('select').append("<option>" + arraySpeakers[i] + "</option>");
                         }
                         $('.speaker-selection').live('change', function() {
                         var speaker = $(".speaker-selection").val();
                         var speakercount=0;
                         $("#mainOutput").empty();
                         $("#mainOutput").append('<input type="button" id="overview" value="Play Overview">');
                         $(current_play_dom).find("SPEECH").each(function(){ //var speaker = $(".selectspeak").val();
                          if($(this).find("SPEAKER").text()==speaker){
                        var line = $(this).find("LINE").text();
                        speakercount++; 

                        $("#mainOutput").append($(this).parent().parent().find("TITLE:first").text()); 
                        $("#mainOutput").append(" - " + $(this).parent().find("TITLE:first").text());
                        $("#mainOutput").append("<div class='speakerClass'>" + "<br />" + "Speaker: " + speaker + "<br />" + " <div class='speakerClassLine'>" + "<br />" + line + "</div>" + "<br />");
                        var arraySpeakers = new Array($("SPEAKERS",currentContext).size());
                        }
                        });

                       $("#mainOutput").append("<br /><p class='speaker'><span class='speakerClass'>Speaker: </span>" + $(this).find("SPEAKER").text() + "</em></strong></p>");
                       $("#mainOutput").prepend("<h5>Result: " + speaker + " has " + speakercount + " part(s)"+"<h5>");
                       });			
                       }
                       
		
// play, act, scene function  

                            function displayAct(actNo_ws){
                            var actNo_jq = actNo_ws - 1;
                            $("#mainOutput").empty();
		                    $("#mainOutput").append('<input type="button" id="overview" class="ui-button ui-corner-all" title="View Act Overview" value="Play Overview">');
		                    $("#mainOutput").append('<p class="playOverview">Play</p>');
                            $("#mainOutput").append($("PLAY>ACT",current_play_dom).eq(actNo_jq).find("TITLE:first").text());
                            current_act = $("PLAY>ACT",current_play_dom).eq(actNo_jq);
                            $("SCENE",current_act).each(function(sceneNo_jq){
                            var sceneNo_ws = sceneNo_jq +1;
                            var current_scene = $(this); 
                            $("#mainOutput").append('<p class="sceneTitle"' + 'id="' + actNo_ws +  "_" + sceneNo_ws + '">' + $("TITLE:first",current_scene).text() + "<p>");
                            });
                            currentContext = current_act;
                            contextInfo();
                            }


                            function displayScene(actNo,sceneNo){
	                    	var lineNo = 0;
                            var actNoInSet = actNo - 1;
                            var sceneNoInSet = sceneNo - 1;
                            $("#mainOutput").empty();
	                    	$("#mainOutput").append('<input type="button" id="overview" title="View Act Overview" value="Play Overview">');
                            $("#mainOutput").append('<p class="actTitle "' + 'id="' + actNo + '">' + $("PLAY>ACT",current_play_dom).eq(actNoInSet).find("TITLE:first").text());
		                    $("#mainOutput").append('<p class="actTitle">' + ($("PLAY>ACT",current_play_dom).eq(actNoInSet).find("SCENE").eq(sceneNoInSet).find("TITLE:first").text()));

                            var scene = $("PLAY>ACT",current_play_dom).eq(actNoInSet).find("SCENE").eq(sceneNoInSet);
                            currentContext = scene;
	
		
                            $(scene).find("SPEECH,STAGEDIR,SUBHEAD").each(function(){
                            switch (this.nodeName)
		  
                            { case "SPEECH":	
                            $("#mainOutput").append("<p>" + $(this).find("SPEAKER").text() + "</p>");
                            $(this).find("LINE").each(function(){
                             $("#mainOutput").append("<p class='allLines'>" + $(this).text() + "</p>");
				
				
// displays a note every fifth line telling you what line it is 
         
		                        lineNo++;
			                    if(lineNo % 5 == 0){
			                    $("#mainOutput").append("<span class='lineNo'>" + "Line No: " + lineNo + "</span>");
		                        }
		                        });
	
	
		                       break;
		                       };
	                        	});

		                      contextInfo();
		                       }       
   		      		


//search bar feature that displays results in the form of a sentence with the sentence being populated based on what you search for 

                                   function searchResults(query){              
                                   var temp = "\\b" + query + "\\b";        
                                   var regex_query = new RegExp(temp,"gi"); 
                                   var currentline;
                                   var matchingLines = 0;
		                           var currentWord;
		                           var currentWordArray;
		                           var matching_words;
		                           var totalMatching = 0;
		
		
                                   $("#mainOutput").empty();
		                           $("#mainOutput").append('<input type="button" id="overview" class="ui-button ui-corner-all" value="Play Overview">');
                                   $("LINE",current_play_dom).each(function(){
                                   currentline = $(this).text();           // replace() method in next line is standard JavaScript for Regular Expressions
                                   matchesLine = currentline.replace(regex_query, '<span class="query_match">' + query + '</span>'); 
                                                                                // search() : returns count or if none, -1
                                  if ( currentline.search(regex_query) > 0 ) {
		                    	   matchingLines++ ;     //  ++ simply means 'add 1 to variable' 

	                           	$("#mainOutput").append("<h1 class='actTitledisplay'>" + $(this).parent().parent().parent().find("TITLE:first").text() + "</h1>");
	                        	 // plays and acts will be displayed
		
	                           	$("#mainOutput").append("<h4 class='sceneTitledisplay'> - " + $(this).parent().parent().find("TITLE:first").text() + "</h4>");
	                          	 // act and scenes will be displayed
		
		                         $("#mainOutput").append("<h4 class='sceneTitledisplay'> - " + $(this).parent().find("SPEAKER:first").text() + "</h4>"); 
	                        	// scenes and speakers will be displayed
		  

		  
                                 $("#mainOutput").append("<p>" + matchesLine + "</p>"); }
                                 });
       

		                         $("LINE",currentContext).each(function(){
		                       	var query = $("#term_search").val();
		                     	currentWord = $(this).text();                // split() method will split the string at each space
		                     	currentWordArray = currentWord.split(query);
		                    	matching_words = currentWordArray.length;    // The length shows the number of elements
		                     	totalMatching = totalMatching + matching_words;
		                         });
		
		
		

                                 $("#mainOutput").prepend("<h5> Result: Found '" + query + "' appearing " + matchingLines + " time(s)</h5>");



		                         } 
	  


                                 $(document).ready(function(){

                                 $("#term_search").focus(function(event) {
  	                           	$(this).val("");
                                });

                               $("#term_search").keypress(function(event) {
                              if(event.keyCode == 13 ) searchResults($("#term_search").val());      // 13 is the 'Enter' or 'Return' key
                              });

                              $('#term-search-btn').click(function() {
                              searchResults($("#term_search").val());
                              });

                            	});
	     

	  
	   /* Play features */


                                 $(document).ready(function(){   /* The code here can be modified to allow for any means of obtaining playName */
                                 $('li').click(function(event) {
  	                             var playName = $(this).attr("id");
                                 $("header>span").text($(this).text());
                                 loadPlay(playName);
                                 });
            
                                $("#mainOutput").on("click","p.actTitle",function(){displayAct($(this).attr("id"));       
                                });
		 
                                $("#mainOutput").on("click","#overview",function(){displayOverview(current_play_dom); 
		                        });
		
		                       $("#mainOutput").on("click","#overview",function(){displayOverview(current_play_dom);
		                       });

                               $("#mainOutput").on("click","p.sceneTitle",function(){
                               var act_scene_ref = ($(this).attr("id")).split("_");
                               actNo_ws = act_scene_ref[0];
                               sceneNo_ws = act_scene_ref[1];
                               displayScene(actNo_ws,sceneNo_ws); 
                               });        
		
	                           $("#mainOutput").on("click", "p.playOverview", function(){
	                           displayOverview(current_play_dom);
                        	   });
                               });