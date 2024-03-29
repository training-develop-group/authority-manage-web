//接收参数
var url = decodeURI(location.href);
let signIndex = url.search("departmentId=");
let departmentId = url.substring(signIndex + 13);
console.log(departmentId);


$(document).ready(function(){
	departmentNameByParentId();
	
	//点击事件确认
	$('#add').click(function(){
		custom_close();
	})
	
	//点击事件取消
	$('#cancel').click(function(){
		custom_close();
	})
		
});

//通过userId查找userInfo所有数据
var viewDepartmentInfoByDepartmentId = function(){
	$.ajax({
		url:'http://'+ip+':8888/manage_system/department/selectByDepartmentId',
		data :{
			'departmentId' : departmentId
		},
		dataType: 'json',
		type: 'GET',
		success(res){
		var Html = [];
			if (res) {
				res.data.forEach(function(item,index){
					console.log(item);
					$("#hiddenSuperiorDepartment option[value='"+item.parentId+"']").attr("selected" , "selected")
					var parentId = $("#hiddenSuperiorDepartment option:selected").text();
					$("#superiorDepartment").val(parentId);
					$("#departmentName").val(item.departmentName);
					$("#empName").val(item.empName);
					$("#tel").val(item.tel);
					$("#address").val(item.address);
					$("#remark").val(item.remark);
					$("#cUser").val(item.cUser);
					$("#mUser").val(item.empName);
					$("#cTime").val(dateFormat(item.cTime));
					$("#mTime").val(dateFormat(item.mTime));
				});
			}
		}
	});
}

//下拉菜单上级部门的值
var departmentNameByParentId = function(){
	$.ajax({
		url : 'http://'+ip+':8888/manage_system/department/selectAll',
		data : {},
		dataType : 'json',
		type : 'GET',
		success(res) {
			console.log(res);
			var Html = [];
			if(res){
				Html.push('<option value="0">无父ID</option>');
				res.data.forEach(function(item,index){
					Html.push('<option value="'+item.departmentId+'">'+item.departmentName+'</option>');
				});
			}
			$('#hiddenSuperiorDepartment').html(Html.join(''));
			//防止ready内不运行而导致不显示值所以直接方法里调用方法可以解决
			viewDepartmentInfoByDepartmentId();	
		},
	});
}

//关闭当前页
function custom_close(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);//关闭当前页
};


//格式化日期
var dateFormat =function(time) {
	var date=new Date(time);
	var year=date.getFullYear();
	/* 在日期格式中，月份是从0开始的，因此要加0
	* 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	* */
	var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
	var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();	
	var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
	var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
	// 拼接
	return year+"-"+month+"-"+day;
}