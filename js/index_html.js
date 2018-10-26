// this file keeps track of the index of projects on the left side of the page
// after adding a new project to the directory must add 2 lines to update the index (top and bottom paths)

$(document).ready(function(){

	var index_top_html = " <li> <a  href='projects/genlang/genlang_index.html'> Tessler and Goodman (under review) </a></li>"
	index_top_html += " <li> <a  href='projects/negant-cogsci/negant_index.html'> Tessler and Franke (2018) </a></li>"
	index_top_html += " <li> <a href='projects/comparisonclass-cogsci/comparisonclass_index.html'> Tessler, Lopez-Brau, and Goodman (2017) </a></li>"

	$("#index_top").html(index_top_html)
	var index_bottom_html = " <li> <a  href='../genlang/genlang_index.html'> Tessler and Goodman (under review) </a></li>"
	index_bottom_html += " <li> <a  href='../negant-cogsci/negant_index.html'> Tessler and Franke (2018) </a></li>"
	index_bottom_html += " <li> <a href='../comparisonclass-cogsci/comparisonclass_index.html'> Tessler, Lopez-Brau, and Goodman (2017) </a></li>"

	$("#index_bottom").html(index_bottom_html)
})
