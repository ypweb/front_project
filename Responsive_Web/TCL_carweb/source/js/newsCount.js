$(function() {
	var url = $("#deskpath").val() + "/news/doupdateNews?callBack=?&pk="+ new Date().getTime();// ��ȡ����ǰ�˵�·��
	var data = {
		seqid : $("#seqid").val()
	};
	$.getJSON(url, data, function(json) {
		if(json.success){
			$("#readtimes").text(json.num);
		};
	});

});