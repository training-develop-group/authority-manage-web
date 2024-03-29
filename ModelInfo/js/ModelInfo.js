var modelId = 0;
var modelName = '';
$(function() {
	selectAllModelInfoList();
	$('.leftMenu .BottomMag .FunctionMenu').off('click').on('click', function() {
		$('.leftMenu .BottomMag .MenuList').slideToggle();
	});
	$('#fontChoice').text("当前选择:");
	$('.add').click(function() {
		layer.open({
			type: 2,
			shadeClose: true,
			title: false,
			closeBtn: 0,
			skin: 'mylayer',
			area: ['500px', '400px'],
			content: ['AddModelInfo.html?value=' + modelId, 'no'], //这里content是一个普通的String
			// end: function() {
			// 	location.reload();
			// }
		});
	});
	$('.update').click(function() {
		if (modelId != ''){
			layer.open({
				type: 2,
				shadeClose: true,
				title: false,
				closeBtn: 0,
				skin: 'mylayer',
				area: ['500px', '400px'],
				content: ['UpdateModelInfo.html?value=' + modelId, 'no'], //这里content是一个普通的String
				// end: function() {
				// 	location.reload();
				// }
			});
		} else {
			alert("请选择一个功能模块");
		}
	});
	$('.delete').click(function() {
		if (modelId == 0) {
			alert('请选择一个功能模块');
		} else {
			deleteModelInfo();
		}
	});
	$('.mail').click(function() {
		alert('暂无功能，待实现');
	})
	$('#logInAndOut').click(function() {
		var out = confirm('是否确认注销？');
		if (out) {
			window.location.href = "../registerPage.html";
			alert('注销成功！');
		}
	})
	
	$('#EmpInfoManagement').click(function() {
		window.location.href = "../EmpinfoManagement/EmpinfoManagement.html";
	});
	$('#departmentInfoManagement').click(function() {
		window.location.href = "../DepartmentInfoManagement/departmentMainPage.html";
	});
	$('#login').click(function() {
		window.location.href = "../OperatorLogManagement/login.html";
	});
	$("#Operator").click(function() {
		window.location.href = "../OperatorManagement/OperatorManagement.html";
	});
	
	$('#Model').off('click').on('click', function() {
		window.location.href = '../ModelInfo/ModelInfo.html'
	});
	$('#Role').off('click').on('click', function() {
		window.location.href = '../roleInfoManagement/rolePrivileges.html'
	});
	$('#Managements').off('click').on('click', function() {
		window.location.href = '../ManagementPrivilegeAuthorityManagement/ManagementPrivilegeAuthorityManagement.html'
	});
	$('#Operators').off('click').on('click', function() {
		window.location.href = '../OperatorRightsManagement/OperatorRightsManagement.html'
	});
	
});
var deleteModelInfo = function() {
	var Reconfirm = confirm("是否删除");
	if (Reconfirm == true){
		$.ajax({
			url: 'http://'+ip+':8888/manage_system/modelInfo/deleteModelInfo',
			data: {
				'modelId': modelId
			},
			dataType: 'json',
			type: "POST",
			success(res) {
				alert('删除成功！');
				window.location.reload();
			}
		});
	}
}
var selectAllModelInfoList = function() {

	$.ajax({
		url: 'http://'+ip+':8888/manage_system/modelInfo/selectAllModelInfoList',
		data: '',
		dataType: 'json',
		type: 'GET',
		success(res) {
			treeList(res.data, 0, 1);
			$('.modelListClick').click(function() {
				// modelId = $(this).find('.modelList').val();
				// $('#fontChoice').text("当前选择:" + $(this).text());
				
				// modelId = $(this).find('.modelList').val();
				modelId = $(this).val();
				$(this).addClass("selected").siblings().removeClass("selected");	// 选中变色
				$('#fontChoice').text("当前选择:" + $(this).text());
			})
		}
	});
}
var Html = [];
var treeList = function(data, father, index) {
	index++;
	data.forEach(function(param) {
		if (father == param.parentId) {
			if (father == '0') {
				// Html.push('<b><li class="modelListClick" style="margin-top:10px;">' + param.modelName +
				// 	'<input type="hidden" name="modelList" class="modelList" value =' + param.modelId + '>' + '</li></b>');
					Html.push('<li class="modelListClick" style="margin-top:10px; font-weight: bold;" value="' + param.modelId + '">' + param.modelName + '</li>');
			} else {
				// Html.push('<li class="modelListClick" style="margin-left:' + index * 7 + 'px;">' + param.modelName +
				// 	'<input type="hidden" name="modelList" class="modelList" value =' + param.modelId + '>' + '</li>');
				Html.push('<li class="modelListClick" style="margin-left:' + index * 7 + 'px;" value="' + param.modelId + '">' + param.modelName + '</li>');
			}
			treeList(data, param.modelId, index);
		}
	});
	$('#showModelList').html(Html.join(''));
}
