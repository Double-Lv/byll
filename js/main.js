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
		initDragresize : function(){
			var dragresize = new DragResize('dragresize',{ minWidth: 50, minHeight: 50, minLeft: 0, minTop: 0, allowBlur:false });
			dragresize.isElement = function(elm){
				if ($(elm).hasClass('customtext') || $(elm).hasClass('custombuble')) return true;
			};
			dragresize.isHandle = function(elm){
				if ($(elm).hasClass('customtext') || $(elm).hasClass('custombuble')) return true;
			};
			dragresize.apply(document);
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

	util.initDragresize();

	var container = $('.container');
	container.on('click', '.insertbtn', function(){
		var ctl = $(this).closest('.ctlpanel');
		var text = $('<div class="customtext"><div contenteditable>输入你的创意吧...</div></div>');
		var lastTextTop = parseInt($('.customtext', ctl).last().css('top')) || 0;
		text.css({top : (lastTextTop+20)+'px', left : '20px'}).appendTo('.targetarea', ctl).focus();
	});

	container.on('click', '.generatebtn', function(){
		var phase = $(this).closest('.phase');
		var cvt = $('.convertpanel', phase);
		cvt.html($('.targetarea', phase).html());
		util.convert(cvt[0], $('.previewimg', phase));
	});

	container.on('click', '.insertbublebtn', function(){
		var ctl = $(this).closest('.ctlpanel');
		console.log(ctl);
		var text = $('<div class="custombuble"><img class="bgimg" src="img/talk1.png" /><div class="textdiv" contenteditable></div></div>');
		var lastTextTop = parseInt($('.custombuble', ctl).last().css('top')) || 0;
		text.css({top : (lastTextTop+20)+'px', left : '20px'}).appendTo(ctl.find('.targetarea')).focus();
	});

	container.on('mousedown', '.textdiv', function(event){
		//event.stopPropagation();
	});

});