// JavaScript Document
$(document).ready(
				  function(){
		
var map=new BMap.Map("maps");
var point=new BMap.Point(112.94,28.22);
map.centerAndZoom(point,16);//��ʼ��
map.enableScrollWheelZoom();
map.enableKeyboard();
map.enableInertialDragging();
map.enableContinuousZoom();
map.addControl(new BMap.NavigationControl());//��Ӳ����ؼ�
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());
var scalecs={offset:new BMap.Size(10,50)};
map.addControl(new BMap.ScaleControl(scalecs));
//map.addContextMenu(menu:ContextMenu); 
var local=new BMap.LocalSearch(map,{renderOptions:{map:map}});
local.searchInBounds("��",map.getBounds());
var xdzc=new BMap.Geocoder();
xdzc.getPoint("��ɳ����´������·",function(point){
if(point){
map.addOverlay(new BMap.Marker(point));}
},"��ɳ��");					  
					  
					  
					  
					  }

				  );