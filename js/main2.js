/*定义一个通用函数*/
			function get(selector) 
			{
    			var method=selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
    		return document[method](selector.substr(1));//这个方括号是什么姿势？obj[method]();
			}

			/*随机生成一个数 支持取值范围*/
			function random(range){
				var max=Math.max(range[0],range[1]);
				var min=Math.min(range[0],range[1]);

				var diff=max-min;//差值
				var number=Math.random()*diff+min;
   				return parseInt(number);

			}
			/*4.输出所有海报*/
	function addPhotos() {
				    var template=get('#wrap').innerHTML;
				    var html=[];
				    var nav=[];
				    for(var i in data){
				        var _html=template
				            .replace('{{index}}',i)
				            .replace('{{caption}}',data[i].caption)
				            .replace('{{img}}',data[i].img)
				            .replace('{{desc}}',data[i].desc);
				        html.push(_html);
				        var _nav='<span id="nav_'+i+'" class="i" onclick="turn(get(\'#photo_'+i+'\'))"></span>';
				        nav.push(_nav);
				    }
				    html.push('<nav id="nav" class="nav">'+nav.join('')+'</nav>');
				    get('#wrap').innerHTML=html.join('');
					resort(random([0,data.length]));
				}
				addPhotos();

				/*计算左右分区的范围*/
				function range() {
				    var range={left:{x:[],y:[]},right:{x:[],y:[]}};
				    var wrap={
				    	w:get('#wrap').clientWidth,
				    	h:get('#wrap').clientHeight
				    };
				    var photo={
				    	w:get('.photo')[0].clientWidth,
				    	h:get('.photo')[0].clientHeight
				    };
				    // range.wrap=wrap;//没什么卵用，增加range的属性
				    // range.photo=photo;

				    range.left.x=[-photo.w/2,wrap.w/2-photo.w/2];
				    range.left.y=[-photo.h/2,wrap.h];
				    range.right.x=[wrap.w/2+photo.w/2,wrap.w-photo.w/2];
				    range.right.y=range.left.y;
				    return range;
				}

				/*5.排序海报*/
				function resort(n){
					var _photos=get('.photo');
					//JS开发的约定 如果一个变量不常用，会以—开头，表示零时变量
					var photos=[];
					for(var s=0;s<_photos.length;s++){
					//不是标准数组，不能用s in _photos写法
			        _photos[s].className=_photos[s].className.replace(/\s*photo_center\s*/,' ');
			        _photos[s].className=_photos[s].className.replace(/\s*photo_front\s*/,' ');
			        _photos[s].className=_photos[s].className.replace(/\s*photo_back\s*/,' ');

			        _photos[s].className+='photo_front';

			        _photos[s].style.left='';
			        _photos[s].style.top='';
			        _photos[s].style['transform']='rotate(0deg) scale(1.3)';
			        ;
			        //连同前后的空格
			        photos.push(_photos[s]);
			    }

					var photo_center = get('#photo_'+n);
					photo_center=photos.splice(n,1)[0];
					//取出中间的那一个
					photo_center.className+=' photo_center ';
					//把海报分为左右
					var photos_left=photos.splice(0,Math.ceil(photos.length/2));
    				var photos_right=photos;
    				var ranges=range();
					for(var i in photos_left){
				        photos_left[i].style.left=random(ranges.left.x)+'px';
				        photos_left[i].style.top=random(ranges.left.y)+'px';
				        photos_left[i].style['transform']='rotate('+random([-150,150])+'deg) scale(1)';
				        	

				    }
				    for (var j in photos_right){
				        photos[j].style.left=
				        random(ranges.right.x)+'px';
				        photos[j].style.top=
				        random(ranges.right.y)+'px';
				        photos_right[j].style['transform']=
				        'rotate('+random([-150,150])+'deg) scale(1)';
				        // photos_right[j].style['display']='none';//又是这个姿势！
				    
				    }
				    var navs = get('.i');
				    for(var s=0;s<navs.length;s++){
				    	navs[s].className=navs[s].className.replace(/\s*i-current\s*/,' ');
				    	navs[s].className=navs[s].className.replace(/\s*i-back\s*/,' ');
				    	navs[s].className=navs[s].className.replace(/\s*i-front\s*/,' ');
				    }
				    get('#nav_'+n).className+=' i-current i-front';	
				}

		/*1.翻面控制*/
			function turn(elem) {
		    	var cls = elem.className;
		    	var n = elem.id.split('_')[1];

		    	if(!/photo_center/.test(cls)){
		    		return resort(n);
		    	}

		    	if(/photo_front/.test(cls)){
		    		cls=cls.replace(/photo_front/,' photo_back ')
		    		get('#nav_'+n).className+=' i-back ';
		    	}else{
		    		cls=cls.replace(/photo_back/,' photo_front ')
		    		get('#nav_'+n).className=get('#nav_'+n).className.replace(/\s*i-back\s*/,' ');
		    	}			
		    	return elem.className=cls;

		    			}