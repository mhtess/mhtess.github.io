// creates all possible unique target-context pairs and shuffles them before returning
function getTrials(examples) {
	var trials = [];
	for (var i = 0; i < examples.length; i++) {
    for (var j = 0; j < Object.keys(examples[i].target).length; j++) {
		  for (var k = 0; k < examples[i].context.length; k++) {
        trials.push({
          target: examples[i].target[Object.keys(examples[i].target)[j]],
  				context: examples[i].context[k],
          contextWithSuper: examples[i].contextWithSuper[k],
          action: examples[i].action[k],
          prompt: examples[i].prompt[k],
          degree: examples[i].degree,
          unit: examples[i].unit,
  				form: Object.keys(examples[i].target)[j],
          subunit: examples[i].subunit,
  				sub_singular: examples[i].sub.singular[k],
  				sub_plural: examples[i].sub.plural[k],
          super: examples[i].super[k],
  				strength: examples[i].strength[k]
			 });
		  }
    }
	}
	return _.shuffle(trials);
}

// creates a randomized sequence of trials with unique subcategories
function getUniqueTrials(examples) {
  var trials = [], form;
  for (var i = 0; i < examples.length; i++) {
    for (var j = 0; j < examples[i].context.length; j++) {
      form = _.sample(["positive", "negative"]);
      trials.push({
        target: examples[i].target[form],
        form: form,
        context: examples[i].context[j],
        contextWithSuper: examples[i].contextWithSuper[j],
        action: examples[i].action[j],
        prompt: examples[i].prompt[j],
        sub_singular: examples[i].sub.singular[j],
        sub_plural: examples[i].sub.plural[j],
        super: examples[i].super[j],
        strength: examples[i].strength[j],
        degree: examples[i].degree,
        unit: examples[i].unit,
        subunit: examples[i].subunit
      });
    }
  }

  // loops until a suitable trials array is found
  while(1) {
    for (var i = 0; i < trials.length-1; i++) {
      if (trials[i]["degree"] == trials[i+1]["degree"]) {
        trials = _.shuffle(trials);
        break;
      }

      // return once we have reached the end of the trials array without finding adjacent degrees
      if (i == trials.length-2) { return trials; }
    }
  }
}


// samples without replacement from a list of names for all of our trial slides
// NOTE: 30 NAMES MAX
var sampleNames = function(characters) {
	var names = _.pluck(characters, "name");
	return _.shuffle(names);
}

// get the gender assigned to a particular name
var getGender = function(name){
	return (_.find(characters, function(person) {
		return person.name == name;
	})).gender;
}

// swaps out singular "they" for gendered pronoun given a name
var getPronoun = function(context, name) {
	var gender = getGender(name);
	if (context.search("them") != -1) { context = context.split("them").join(_.sample(["him", "her"])); }
  if (gender == "male") { return context.split("their").join("his").split("they").join("his").split("They").join("He"); }
	else if (gender == "female") { return context.split("their").join("her").split("they").join("her").split("They").join("She"); }
}

// retrieves the correct pronoun for the target-context pair
var getPronoun2 = function(context, target) {
  var pronoun = "";
  if ((target.search("tall") != -1) || (target.search("short") != -1)) {
    if (context.search("tower") == -1) { pronoun = "He"; }
    else { pronoun = "That"; }
  }
  else {
    pronoun = "This";
  }
  return pronoun;
}

// retrieve a pronoun based on a name
var getPronoun3 = function(name){
	var gender = getGender(name);
	if (gender == "male") { return "his"; }
  else { return "her"; }
}

// sample a condition, where a condition is the use of the "for a" or "relative to"
var sampleCondition = function() {
  return _.sample(["context", "contextWithSuper"]);
	// return "contextWithSuper";
}

// isAlpha function implemented using regex
function isLetter(str) {
  return str.match(/[a-z]/i);
}

// embeds the trial slides that were generated in the experiment file into the html file
function embedSlides(trials) {
  var slides = "";
  for (var i = 1; i <= trials; i++) {
    slides = slides +
      "<div class=\"slide\" id=\"trial" + i + "\">" +
    	"<p class=\"display_context\"></p>" +
  		"<p class=\"display_target\"></p>" +
  		"<p class=\"display_question\"></p>" +
  		"<span class=\"display_prompt\"></span><input type=\"text\" id=\"text_response" + i + "\" maxlength=\"2\" style=\"width:50px;\"></input> " +
      "<span class=\"display_noun\"></span><p></p>" +
  		"<button onclick=\"_s.button()\">Continue</button>" +
  		"<p class=\"err\">Please type a number between 0-10.</p>" +
  		"</div>";
  	$(".trial_slides").html(slides);
  }
}

// embeds the trial slides for vague-prior-elicitation
function embedVPESlides(trials) {
  var slides = "";
  for (var i = 1; i <= trials; i++) {
    slides = slides +
		"<div class=\"slide\" id=\"trial" + i + "\">" +
    	"<p class=\"display_context\"></p>" +
  		"<p class=\"display_target\"></p>" +
			"<table id=\"multi_slider_table" + i + "\"" + "class=\"slider_table\">" +
			"<tr><td></td>" +
			"<td class=\"left\">very unlikely</td>"+
			"<td class=\"right\">very likely</td>" +
			"</tr></table>" +
  		"<span class=\"display_prompt\"></span>" +
  		"<button onclick=\"_s.button()\">Continue</button>" +
  		"<p class=\"err\">Please adjust the slider before continuing.</p>" +
  		"</div>";
  	$(".trial_slides").html(slides);
  }
}

// embeds the trial slides for class-elicitation
function embedCESlides(trials) {
  var slides = "";
  for (var i = 1; i <= trials; i++) {
    slides = slides +
    "<div class=\"slide\" id=\"trial" + i + "\">" +
      "<p class=\"display_context\"></p>" +
      "<p class=\"display_target\"></p>" +
      "<p class=\"display_question\"></p>" +
      "<table id=\"multi_slider_table" + i + "\"" + "class=\"slider_table\">" +
      "<tr><td></td>" +
      "<td class=\"left\">very unlikely</td>"+
      "<td class=\"right\">very likely</td>" +
      "</tr></table><p></p>" +
      // '<textarea id="text_response' + i + '" rows="1" cols="50"></textarea>."<br>' +
      // "<input type=\"text\" class='textbox' id=\"text_response" + i + "\"></input>.\"<p></p>" +
      "<button onclick=\"_s.button()\">Continue</button>" +
      "<p class=\"err\">Please adjust both sliders before continuing.</p>" +
      "</div>";
    $(".trial_slides").html(slides);
  }
}

// embeds the trial slides that were generated in the experiment file into the html file for the listener experiment
function embedListenerSlides(examples, trials) {
  // get the units and subunits
  var unit = _.pluck(examples, "unit");
  var subunit = _.pluck(examples, "subunit");

  // stores the html for the slides
  var slides = "";
  for (var i = 1; i <= trials; i++) {

    // stores the html script for the units dropdown menu
    var u = "";

    // stores the html script for the subunits dropdown menu
    var su = "";

    // generate the script for the units
    for (var j = 0; j < unit[i-1].length; j++) {
      u = u + "<label><option value=\"" + unit[i-1][j] + "\">" + unit[i-1][j] + "</option></label>";
    }

    // if there are subunits, generate scripts for them
    if (subunit[i-1][0] != "none") {
      var temp = "<input type=\"text\" id=\"measure2" + i + "\" maxlength=\"5\" size =\"5\" tabindex=\"1\"></input>" +
        "<select id=\"subunit" + i + "\">" +
        "<option selected disabled hidden style='display: none' value=''></option>";
      for (var k = 0; k < subunit[i-1].length; k++) {
        su = su + "<label><option value=\"" + subunit[i-1][k] + "\">" + subunit[i-1][k] + "</option></label>";
      }
      su = temp + su + "</select>";
    }

    // finally, combine everything to generate the script for the trial slides
    slides = slides +
		"<div class=\"slide\" id=\"trial" + i + "\">" +
    	"<p class=\"display_context\"></p>" +
  		"<p class=\"display_target\"></p>" +
			"<p class=\"display_question\"></p>" +
			"<div id=\"text_prompt" + i + "\"><span class=\"display_prompt\"></span><input type=\"text\" id=\"text_response" + i + "\"></input>.\"</div><p></p>" +
  		"<p class=\"display_question2\"></p>" +
      "<div id=\"estimation_prompt" + i + "\"><input type=\"text\" id=\"measure1" + i + "\" maxlength=\"6\" size =\"7\" tabindex=\"1\"></input>" +
      "<select id=\"unit" + i + "\">" +
      "<option selected disabled hidden style='display: none' value=''></option>" + u + "</select>" + su +
      "</div><br><br>" +
  		"<button onclick=\"_s.button()\">Continue</button>" +
      "<p class=\"err\">Please type something and select a unit and subunit.</p>" +
      "<p class=\"numErr\">Please use whole numbers only.</p>" +
			"<p class=\"textErr\">Please write something.</p>" +
  		"</div>";
  	$(".trial_slides").html(slides);
  }
}

// embed the trial slides for vague-prior-elicitation-2afc
function embedVPE2AFCSlides(trials) {
  var slides = "";
  for (var i = 1; i <= trials; i++) {
    slides = slides +
		"<div class=\"slide\" id=\"trial" + i + "\">" +
    	"<p class=\"display_context\"></p>" +
  		"<p class=\"display_question\"></p>" +
			"<div class=\"radioLeft\">" +
      "<input type=\"radio\" name=\"paraphrase\" value=\"0\"/><label for=\"0\"></label>" +
			"<input type=\"radio\" name=\"paraphrase\" value=\"1\"/><label for=\"1\"></label><br><br></div>" +
  		"<button onclick=\"_s.button()\">Continue</button>" +
			"<p class=\"err\">Please select an option before continuing.</p>" +
  		"</div>";
  	$(".trial_slides").html(slides);
  }
}

// embed the trial slides for class-elicitation-2afc
function embedCE2AFCSlides(trials) {
  var slides = "";
  for (var i = 1; i <= trials; i++) {
    slides = slides +
    "<div class=\"slide\" id=\"trial" + i + "\">" +
      "<p class=\"display_context\"></p>" +
      "<p class=\"display_target\"></p>" +
      "<p class=\"display_question\"></p>" +
      "<div class=\"radioLeft\">" +
      "<div align=\"left\"><input type=\"radio\" name=\"paraphrase\" value=\"0\"/><label for=\"0\"></label></div><br>" +
      "<div align=\"left\"><input type=\"radio\" name=\"paraphrase\" value=\"1\"/><label for=\"1\"></label></div><br></div>" +
      "<button onclick=\"_s.button()\">Continue</button>" +
      "<p class=\"err\">Please select an option before continuing.</p>" +
      "</div>";
    $(".trial_slides").html(slides);
  }
}
