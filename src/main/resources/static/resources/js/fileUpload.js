var index;
var operateMode;
var form;
var table;
var fileId="";
var oldfileId="";
var FdemoListView = $('#demoList');
oldfileId = $('#noticeForm #fileId').val();
if(oldfileId==''){
	fileId = getUuid();
	$('#noticeForm #fileId').val(fileId);
}else{
	fileId = oldfileId;
}
var bt = $('.layui-layer-title').html();
init();
function init(){
	$.ajax({
        url:"../notice/getFilelist",
        type:"post",
        dataType:"json",
        data:{fileid:fileId},
        success:function(data){
        	var orderList = data.rows;
        	if(orderList.length > 0){     
                for(var i = 0;i<orderList.length;i++){
                	var fileName = orderList[i].orignalName;
                	var id=orderList[i].id;
                	var tr="";
                	if(bt=='查看窗口'){
                		tr = $(['<tr id="upload-'+ i +'">'
              		          ,'<td>'+ fileName +'</td>'
              		          ,'<td style="color: #5FB878;">上传成功</td>'
              		          ,'<td>'	            
              		          ,'<a href="../wtgl/download?fileId='+id+'" class="oc" download="">下载</a>'
              		          ,'</td>'
              		        ,'</tr>'].join(''));
                	}else{
                		tr = $(['<tr id="upload-'+ i +'">'
              		          ,'<td>'+ fileName +'</td>'
              		          ,'<td style="color: #5FB878;">上传成功</td>'
              		          ,'<td>'	            
              		          ,'<a href="javascript:void(0);" class="oc" onclick=wtgl_info.del_uploadfile(\''+id+'\',this)>删除</a>'
              		          ,'</td>'
              		        ,'</tr>'].join(''));
                	}
                	
                	FdemoListView.append(tr);
                }
        	}
        },
        error:function(){

        }       
	});
}

window.app.notice_info = function() {
	this.backToList = function() {
		location.hash = "/notice_info";
	}
	
    var operateColumn = function(id) {
        var row = '';
        row += '<a href="javascript:void(0);" class="oc" onclick=notice_info.del_entity(\''+id+'\')>删除</a>';
        return row;
    }
    

    
  //删除
    this.del_uploadfile = function(id,obj) {
    	layui.use('layer',function(){
    		layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
    			$.ajax({
    				url:"../notice/deluploadFile?id="+id,
    				type:"get",
    				success:function(data){
    				   if(data.status=='success'){
    					    var tr=obj.parentNode.parentNode;
    			            var tbody=tr.parentNode;
    			            tbody.removeChild(tr);
    					   MSG("删除成功");
    				   }else{
    					   MSG("删除失败")
    				   }
    				},
    				error:function(){
    				   MSG("异常");
    				}       
    			});
    		});
    	});
    }
    
    return this;
};
var notice_info = window.app.notice_info();

layui.use(['form','layedit'], function() {
    form = layui.form;
    var layedit = layui.layedit;
    //构建一个默认的编辑器
    layedit.set({
        uploadImage: {
            url:"../notice/layuiuploadImg?fileId="+fileId
            ,type: 'post' //默认post
        }
    });
    var editIndex = layedit.build('content',{
            height:400
        }
    );
    form.on('submit(notice_infoFilter)',function(data){
        var data = data.field;
           data.content= layedit.getContent(editIndex);
        layer.load(1);
       $.ajax({
               url:"../notice/noticeSave",
               type:"post",
               dataType:"json",
               data:data,
               success:function(data){
                   if(data.status=="success"){
                       layer.close(index); 
                       MSG("保存成功");
                       table.reload('noticeTable')
                   }else{
                       MSG("异常 "+data.msg)
                   }
                   layer.closeAll('loading');
               },
               error:function(){
                   MSG("异常");
                   layer.closeAll('loading');
               }       
        });
        return false;
    });
});


function submitggfbForm(i,operM) {
    index = i;
    operateMode = operM;
    $("#wtgl_infoBtn").click();
}
function uploadggfbForm(i,operM) {
    index = i;
    operateMode = operM;
    $("#testList").click();
}

layui.use('upload', function(){
	  var $ = layui.jquery
	  ,upload = layui.upload;
	  
	  //普通图片上传
	  var uploadInst = upload.render({
	    elem: '#test1'
	    ,url: '/upload/'
	    ,before: function(obj){
	      //预读本地文件示例，不支持ie8
	      obj.preview(function(index, file, result){
	        $('#demo1').attr('src', result); //图片链接（base64）
	      });
	    }
	    ,done: function(res){
	      //如果上传失败
	      if(res.code > 0){
	        return layer.msg('上传失败');
	      }
	      //上传成功
	    }
	    ,error: function(){
	      //演示失败状态，并实现重传
	      var demoText = $('#demoText');
	      demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
	      demoText.find('.demo-reload').on('click', function(){
	        uploadInst.upload();
	      });
	    }
	  });
	  
	  //多图片上传
	  upload.render({
	    elem: '#test2'
	    ,url: '/upload/'
	    ,multiple: true
	    ,before: function(obj){
	      //预读本地文件示例，不支持ie8
	      obj.preview(function(index, file, result){
	        $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
	      });
	    }
	    ,done: function(res){
	      //上传完毕
	    }
	  });
	  
	  //指定允许上传的文件类型
	  upload.render({
	    elem: '#test3'
	    ,url: '/upload/'
	    ,accept: 'file' //普通文件
	    ,done: function(res){
	      console.log(res)
	    }
	  });
	  upload.render({ //允许上传的文件后缀
	    elem: '#test4'
	    ,url: '/upload/'
	    ,accept: 'file' //普通文件
	    ,exts: 'zip|rar|7z' //只允许上传压缩文件
	    ,done: function(res){
	      console.log(res)
	    }
	  });
	  upload.render({
	    elem: '#test5'
	    ,url: '/upload/'
	    ,accept: 'video' //视频
	    ,done: function(res){
	      console.log(res)
	    }
	  });
	  upload.render({
	    elem: '#test6'
	    ,url: '/upload/'
	    ,accept: 'audio' //音频
	    ,done: function(res){
	      console.log(res)
	    }
	  });
	  
	  //设定文件大小限制
	  upload.render({
	    elem: '#test7'
	    ,url: '/upload/'
	    ,size: 60 //限制文件大小，单位 KB
	    ,done: function(res){
	      console.log(res)
	    }
	  });
	  
	  //同时绑定多个元素，并将属性设定在元素上
	  upload.render({
	    elem: '.demoMore'
	    ,before: function(){
	      layer.tips('接口地址：'+ this.url, this.item, {tips: 1});
	    }
	    ,done: function(res, index, upload){
	      var item = this.item;
	      console.log(item); //获取当前触发上传的元素，layui 2.1.0 新增
	    }
	  })
	  
	  //选完文件后不自动上传
	  upload.render({
	    elem: '#test8'
	    ,url: '/upload/'
	    ,auto: false
	    //,multiple: true
	    ,bindAction: '#test9'
	    ,done: function(res){
	      console.log(res)
	    }
	  });
	  
	  //拖拽上传
	  upload.render({
	    elem: '#test10'
	    ,url: '/upload/'
	    ,done: function(res){
	      console.log(res)
	    }
	  });
	  
	  //多文件列表示例
	  var demoListView = $('#demoList')
	  ,uploadListIns = upload.render({
	    elem: '#testList'
	    ,url: '../notice/uploadFile?fileId='+fileId
	    ,accept: 'file'
	    ,multiple: true
	    ,auto: false
	    ,bindAction: '#wtgl_infoBtn'
	    ,choose: function(obj){   
	      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
	      //读取本地文件
	      obj.preview(function(index, file, result){
	        var tr = $(['<tr id="upload-'+ index +'">'
	          ,'<td>'+ file.name +'</td>'
	          ,'<td>等待上传</td>'
	          ,'<td>'	            
	            ,'<a href="javascript:void(0);" class="oc">删除</a>'
	          ,'</td>'
	        ,'</tr>'].join(''));
	        
	        //单个重传
	        tr.find('.demo-reload').on('click', function(){
	          obj.upload(index, file);
	        });
	        
	        //删除
	        tr.find('.oc').on('click', function(){
	          delete files[index]; //删除对应的文件
	          tr.remove();
	          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
	        });
	        
	        demoListView.append(tr);
	      });
	    }
	    ,done: function(res, index, upload){
	      if(res.status == 'ok'){ //上传成功
	        var tr = demoListView.find('tr#upload-'+ index)
	        ,tds = tr.children();
	        tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
	        return delete this.files[index]; //删除文件队列已经上传成功的文件
	      }
	      this.error(index, upload);
	    }
	    ,error: function(index, upload){
	      var tr = demoListView.find('tr#upload-'+ index)
	      ,tds = tr.children();
	      tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
	      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
	    }
	  });	  	  
	  
	});