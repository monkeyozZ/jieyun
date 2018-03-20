/**
 * Mobiscroll 三级联动插件
 * 
 * @author PromoDJ
 * @link http://www.mobiscroll.cn 
 * @desc 插件定制欢迎联系QQ：964164658
 * @QQ群 20420014
 * 
 */
(function() {
	var ms = mobiscroll,
		$ = ms.$,
		frame = ms.themes.frame,
		cache_key = [],
		//wheels数据
		wheels = [
			{
	            label: '省份',
	            data: []
	        },
	        {
	        	label: '城市',
	            data: []
	        },
	        {
	        	label: '区县',
	            data: []
	        }
		],
		presets = ms.presets.scroller;
	//==========================
	ms.presetShort('area');
	//方法
	presets.area = function(inst) {
		var type = inst.settings.type || false, num = (!type)?3:2;
		//删除多余的列
		if(type){
			wheels.splice(2,1);
		}
		var config;
		var area_fun = {
			//初始化应用程序
			load : function(){
				this.province(true);
			},
			/**
			 * 获取省份数据
			 * @param {Boolean} down 是否执行下级方法
			 */
			province : function(down){
				var run_arr = [];
				$(area_list).each(function(index, val){
					run_arr.push({
						value: index,
						area_id : val.area_id,
	                	display: val.area_name
					})
				})
				
				wheels[0].data = run_arr;
				
				if(down){
					this.city(0);
				}
				
			},
			/**
			 * 获取城市数据
			 * 
			 * @param {Number} province_index 省级索引
			 */
			city : function(province_index){
				var run_arr = [];
				
				$(area_list[province_index].data).each(function(index, val){
					run_arr.push({
						value: index,
						area_id : val.area_id,
	                	display: val.area_name
					})
				})
				
				wheels[1].data = run_arr;
				if(!type){
					//执行下一步
					this.county(province_index, 0);
				}
			},
			/**
			 * 获取区县数据
			 * 
			 * @param {Number} province_index 省份索引
			 * @param {Number} city_index 城市索引
			 */
			county : function(province_index, city_index){
				var data = area_list[province_index].data[city_index].data,
					run_arr = [];
				
				if(typeof(data)=="object"){
					//遍历数据
					$(data).each(function(index, val){
						run_arr.push({
							value: index,
							area_id : val.area_id,
		                	display: val.area_name
						})
					})
					wheels[2].data = run_arr;
				}
				
			}
		}
		
		//初始化地址数据
		area_fun.load()
		
        //配置数据
        config = {
        	compClass : "mbsc-area",
        	circular : false,
        	headerText: false,
        	wheels : [wheels],
        	formatValue : function(data){
        		var str = [];
        		for (var i=0; i<num; i++) {
        			var name = wheels[i].data[data[i]];
        			if(name){
        				str.push(name.display);
        			}
        		}
        		return str.join(" ");
        	},
        	onSet : function(data){
        		var _tempWheelArray = inst._tempWheelArray,
        			run_arr = [];
        		for (var i=0; i<num; i++) {
        			var obj = wheels[i].data[_tempWheelArray[i]];
        			if(obj){
        				run_arr.push({
        					area_id : obj.area_id,
        					area_name : obj.display
        				})
        			}
        		}
        		inst.DataArray = run_arr
        	},
        	validate: function(data) {
        		var index = data.index,
        			run_arr = {},
        			valid = [],
        			direction = data.direction,
        			values = data.values;
        			
        		if(typeof(index)=="undefined") return false;
        		
        		//记录key
        		cache_key = values;
        		
        		//如果转动的是省份
        		if(index==0){
        			area_fun.city(values[0]);
        			//设置数据
        			run_arr = {
        				1: {
					        data: wheels[1].data
					    }
        			}
        			
        			valid = [values[0], 0];
        			
        			if(!type){
        				run_arr["2"] = {
					        data: wheels[2].data
					    }
        				valid = [values[0], 0, 0];
        			}
        			
        		}
        		
        		//如果转动的是城市
        		if(index==1 && !type){
        			area_fun.county(values[0], values[1]);
        			//设置数据
        			run_arr = {
					    2 : {
					        data: wheels[2].data
					    }
        			}
        			valid = [values[0], values[1], 0];
        		}
        		
        		inst.changeWheel(run_arr, 1000);
        		//返回数据
        		var this_index = (!type)?2:1;
        		if(index!=this_index){
        			return {
	                    valid : valid
	                };
        		}
        		
        	}
        }
      	return config;
	}
	
	
}());