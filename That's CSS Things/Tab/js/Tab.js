// JavaScript Document
var h=document.getElementById("tab").getElementsByTagName("h3");
var d=document.getElementById("tab").getElementsByTagName("div");
function Tabchanges(tc){
	for(var i=0;i<h.length;i++){
		if(tc-1==i){
			h[i].className+=" up";
			d[i].className+=" block";
			}
		else{
			h[i].className=" ";
			d[i].className=" ";			
			}
		}	
	}