jQuery(document).ready(function($) {
	/*构造具体日历*/
	function createCal(year, month) {
		var m = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31); //每个月的日数
		//ans用来计算所求年份的1月1日开头空多少日；sum用来计算所求月份开头空多少日；num用来做换行的计数
		var i, j, k, ans = 1, sum = 0, num = 0;

		//闰年判断，若是闰年，二月份就为29天 
		if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) m[2]=29;

		//*************************判断所求年份year的1月1号的位置 *********************** 
		for (i = 1900; i <= year-1; i++) {
			ans++;
		 	if (ans == 7) ans = 0;
		 	if ((i % 4 == 0 && i % 100 != 0) || (i % 400 == 0)) { //若中途有闰年出现，则再+1
				ans++;
				if (ans == 7) ans = 0;
			}
		}
		//************************判断所求月份month1月1日的位置****************************** 		
		if (month == 1) sum = ans;//如果要求1月份的日历，则开始空出的日期直接等于ans 
		else {
			for (i = 1; i <= month-1; i++)//计算那年从1月到month-1个月有多少天 
				sum += m[i];
			sum = sum - (7 - ans);
			sum %= 7;//sum最终得到的结果是所求月份1月1日前应当空出多少日 
		}

		//----------------------------输出日历-------------------------------------------------- 
		var tempDate = new Date();
		var calMain = $(".cal-main");
		var calDate = $("#date");
		var titleDate = "";
		var calContent = "";

		titleDate += year + "年" + month + "月";

		calContent += "<div class='cal-content'><table><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
		
		//输出日历的格式（星期）
		calContent +=  "<tr>";

		for (k = 1; k <= sum; k++) { //输出空出的日子，用空格代替
			calContent +=  "<td class='grey-font'>" + (m[month - 1] - sum + k) + "</td>";
			num++;
		}
		for (j = 1; j <= m[month]; j++) { //输出日期
			if (year == tempDate.getFullYear() && month == tempDate.getMonth() + 1 && j == tempDate.getDate())
				calContent = calContent + "<td class='current-day'>" + j + "</td>";
			else 
				calContent = calContent + "<td>" + j + "</td>";
			num++;
			if (num == 7){ //满7天就换行 
				calContent = calContent + "</tr>" +  "<tr>"
				num = 0;
			}
			if (j == m[month] && 0 < num && num < 7) { //当到每月最后一天时，用下个月的日期来补全当前行
				for (k = 1; k <= 7 - num; k++)
					calContent +=  "<td class='grey-font'>" + k + "</td>";
			}
		}

		calContent = calContent + "</tr>" + "</table>";

		calDate.html(titleDate);
		calMain.html(calContent);		
	}	


	var currentDate = new Date(); //获取当前时间
	var year, month, date;
	year = currentDate.getFullYear();
	month = currentDate.getMonth();
	date = currentDate.getDate();
	createCal(year, month + 1);

	/*点左箭头*/
	$("#left-arrow").unbind('click').click(function(event) {
		if (month - 1 >= 0) month -= 1;
		else {  //上一年
			month = 11;
			year -= 1;
		}
		createCal(year, month + 1);
		/*为选中的单元格添加.active*/
		$("td").on("click", function(event) {
			$(".active").removeClass("active");
			$(this).addClass("active");
		});		
	});

	/*点右箭头*/
	$("#right-arrow").click(function(event) {
		if (month + 1 <= 11) month += 1;
		else {  //下一年
			month = 0;
			year += 1;
		}
		createCal(year, month + 1);
		/*为选中的单元格添加.active*/
		$("td").on("click", function(event) {
			$(".active").removeClass("active");
			$(this).addClass("active");
		});		
	});

	/*为选中的单元格添加.active*/
	$("td").on("click", function(event) {
		$(".active").removeClass("active");
		$(this).addClass("active");
	});
});