$(function(){

	var util = {
		draggable : function(el){
	    
		    el.css('cursor', 'move');
		 
		    var eventX, eventY, startX, startY, drag;
		    el.on('mousedown', function(event){
		        eventX = event.clientX;
		        eventY = event.clientY;
		        startX = parseInt(el.css('left'));
		        startY = parseInt(el.css('top'));
		        drag = true;
		        if(this.setCapture){this.setCapture();}
		    }).on('mouseup', function(event){
		        drag = false;
		        if(this.releaseCapture){this.releaseCapture();}
		    });
		 
		    var dragTarget = el[0].setCapture ? el[0] : document;
		    dragTarget.addEventListener('mousemove', function(){
		        if(drag){
		            var l = startX + (event.clientX - eventX);
		            var t = startY + (event.clientY - eventY);
		            el.css({left : l, top : t,});
		        }
		    }, true);
		 
		    /*防止出现mouseup后仍然能拖动的bug情况*/
		    $(document).on('mouseup', function(){
		        drag = false;
		    });
		 
		},
		convert : function(id, targetImg){
		    html2canvas( document.getElementById(id) , {
		      onrendered: function(canvas) {
		        var dataUrl = canvas.toDataURL("image/png");
		        targetImg.attr('src', dataUrl);
		        /*$.ajax({
		            url : 'convert.php',
		            type : 'POST',
		            data : {image : dataUrl2},
		            success : function(data){
		                console.log(data);
		                document.getElementById('img2').src = data;
		            }
		        });*/

		        
		      }
		    });
		}
	}





	var scope = $('#byll_1');
	
	$('.insertbtn', scope).on('click', function(){
		var text = $('<p class="customtext" contenteditable>今天我和朋友</p>')
		$('.targetarea', scope).append(text);
		util.draggable(text);
	});

	$('.generatebtn', scope).on('click', function(){
		$('.convertpanel', scope).html($('.targetarea', scope).html());
		util.convert('byll_img_1', $('.previewimg', scope));
	});

});