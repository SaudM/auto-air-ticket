// launchApp("酷狗音乐");
// desc("播放").findOne().click()
// log(currentActivity());
// text("新增乘机人").findOne().click();
// id("checkbox_read").findOne().parent().click();
// id("tv_passenger_name").className("android.widget.TextView").text("GAO/ZIHENG").findOne().click();
// index()
index();
function index() {
    var sleepTime = 2000;
    var year = 2020;
    var time = null;
    var myCarsX = new Array();
    var myCarsY = new Array();
    var loadingTime = 0;
    var lock = threads.lock();
    var timers = new Array("08-07 周五", "08-14 周五", "08-21 周五", "08-28 周五")
    var timeIndex = 0
    while (true) {
        lock.lock();
        var loading = className("android.widget.TextView").findOne()

        if (loading.getText() == "加载中请稍候…") {
            sleep(100)
            loadingTime++
            if (loadingTime > 10 * 3) {
                loadingTime = 0
                back();
                id("searchBtn").findOne().click()
                sleep(2000)
                log("loadingTime", loadingTime)
            }
            continue
        }

        loadingTime = 0
        var flights = className("android.view.ViewGroup").find();
        var status = false;
        flights.forEach((item, position) => {
            try {
                var 是否有效航班 = item.find(text("含税费参考价"))[0];
                if (!是否有效航班) {
                    return true;
                }
                log("是否有效航班", 是否有效航班)
                item.parent().click();
                status = true;
                return false;
            } catch (err) {
                log(err)
            }
        });
        if (!status) {
            sleep(sleepTime / 2);
            log("timeView", "timeView")
            var timeView = id("flightlist_calendarinternational_middle_tv").textContains("-").findOne()
            if (timeView != null) {
                // time = timeView.getText();
                timeView.parent().click();
                log("timeIndex>>>>", timeIndex)
                log("timers.size>>>>", timers.length)
                if (timeIndex == timers.length) {
                    timeIndex = 0;
                }
                time = timers[timeIndex]
                timeIndex++;
                log("时间>>>>", time)
                clickCalender(time)
            } else if (time != null) {
                log("时间----", time)
                clickCalender(time)
            }

            continue
        }
        lock.unlock();
        // log("startActivity", "com.ceair.module_main.berth_list.activity.BerthListActivity");
        waitForActivity("com.ceair.module_main.berth_list.activity.BerthListActivity")
        textContains("订购").waitFor();
        var infos = text("订购").find();
        // log("订购数====>", infos.size())
        if (infos.size() == 0) {
            continue
        }
        try {
            infos[0].parent().click();
        }
        catch (err) {
            log(err)
        }
        log(currentActivity());
        //         waitForActivity("com.example.module_pay.activity.InformationFillingActivity");
        waitForActivity("com.ceair.module_main.berth_list.activity.BerthListActivity");

        try {
            sleep(sleepTime / 5);
            text("我知道了").findOne.click();
        } catch (err) {
            log(err)
        }
        id("tv_passenger_name").className("android.widget.TextView").findOne().parent().click();
        id("checkbox_read").findOne().click();
        text("下一步").findOne().click()
        waitForActivity("com.ceair.module_pay.activity.PayActivity");
        // waitForActivity("com.ceair.module_pay.activity.InformationFillingActivity");
        launchApp("酷狗音乐");
        try {
            sleep(9000);
            text("取消").findOne().click();
            desc("播放器入口").findOne().click();
            desc("播放").findOne().click();
        } catch (err) {
            try {
                desc("播放器入口").findOne().click();
                desc("播放").findOne().click();
            } catch (err) {
                desc("播放").findOne().click();
            }
        }
        exit();
    }

    function clickCalender(time) {
        sleep(sleepTime / 2)
        var xing = time.substring(6);
        var ri = parseInt(time.substr(3, 2), 10);
        var month = parseInt(time.substring(2, 0), 10);
        var calendar = id("dpv_calendar").find();
        calendar.forEach(function (child) {
            var calendarP = 0.636
            var marginP = 0.2072101
            var left = child.bounds().left;
            var right = child.bounds().right;
            var top = child.bounds().top;
            var bottom = child.bounds().bottom;
            var singleW = (right - left) * 0.98 / 7
            var viewH = bottom - top
            var singleH = viewH * calendarP / 5
            var marginTop = viewH * marginP
            for (i = 0; i < 34; i++) {
                myCarsX[i] = i % 7 * singleW + singleW / 2;
                myCarsY[i] = top + marginTop + (parseInt(i / 7) * singleH) + (singleH / 2)
            }
            var date = new Date(year + '/' + month + '/' + '01')
            oneWeek = date.getDay();
            index = ri + oneWeek - 1
            click(myCarsX[index], myCarsY[index])
            date = null;
        });
    }
}