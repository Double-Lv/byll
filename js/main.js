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
		convert : function(el, targetImg){
		    html2canvas(el, {
		      onrendered: function(canvas) {
		      	
		        var dataUrl = canvas.toDataURL("image/png");

		        $.ajax({
		            url : './php/convert.php',
		            type : 'POST',
		            data : {image : dataUrl},
		            success : function(data){
		                var phase = $(el).closest('.phase');
				        phase.find('.downbtn').attr('href', data).attr('download', data.split('\/').pop());
				        phase.find('.previewimg').attr('src', data)
				        phase.find('.downloadpanel').show();
		            }
		        });

		        
		      }
		    });
		}
	}

	var container = $('.container');
	container.on('click', '.insertbtn', function(){
		var ctl = $(this).closest('.ctlpanel');
		var text = $('<p class="customtext" contenteditable>输入你的创意吧...</p>');
		var lastTextTop = parseInt($('.customtext', ctl).last().css('top')) || 0;
		text.css('top', (lastTextTop+20)+'px').appendTo('.targetarea', ctl).focus();
		util.draggable(text);
	});

	container.on('click', '.generatebtn', function(){
		var phase = $(this).closest('.phase');
		var cvt = $('.convertpanel', phase);
		cvt.html($('.targetarea', phase).html());
		util.convert(cvt[0], $('.previewimg', phase));
	});

});