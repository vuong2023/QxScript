var requestUrl = $request.url;
var body = $response.body;
var obj = JSON.parse(body);
try {
  if (/^https:\/\/api\.coolapk\.com\/v6\/user\/profile/.test(requestUrl)) {
    obj.data.next_level_percentage = "98.09";
    obj.data.experience = 4819162;
    obj.data.next_level_experience = 4913000;
    obj.data.fans = parseInt(Math.random() * 9999999);
    obj.data.follow = parseInt(Math.random() * 9999);
    obj.data.level = 17;
    obj.data.be_like_num = 999999999;
  } else if (
    /^https:\/\/api\.coolapk\.com\/v6\/user\/space/.test(requestUrl) &&
    obj.data.hasOwnProperty("homeTabCardRows") &&
    obj.data.homeTabCardRows.length
  ) {
    if (
      obj.data.homeTabCardRows[0].hasOwnProperty("title") &&
      obj.data.homeTabCardRows[0].title.indexOf("他") == -1 &&
      obj.data.homeTabCardRows[0].title.indexOf("TA") == -1 &&
      obj.data.homeTabCardRows[0].title.indexOf("她") == -1
    ) {
      obj.data.next_level_percentage = "98.09";
      obj.data.experience = 4819162;
      obj.data.next_level_experience = 4913000;
      obj.data.fans = parseInt(Math.random() * 9999999);
      obj.data.follow = parseInt(Math.random() * 9999);
      obj.data.be_like_num = parseInt(Math.random() * 999999999);
      obj.data.level = 17;
      obj.data.verify_icon = "v_green";
      obj.data.verify_title = "小帽认证：尊贵大佬";
      obj.data.isDeveloper = 1;
      obj.data.verify_status = 1;
    }
  } else if (
    /^https:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(requestUrl)
  ) {
    if (obj.data.length) {
      var i = obj.data.length;
      while (i--) {
        if (
          obj.data[i].hasOwnProperty("entityTemplate") &&
          obj.data[i].entityTemplate == "imageCarouselCard_1"
        ) {
          if (obj.data[i].hasOwnProperty("entities")) {
            obj.data[i].entities = obj.data[i].entities.filter(
              (el) =>
                (el.title != "jd" && el.title.indexOf("今日酷安") != -1) ||
                el.title.indexOf("众测") != -1
            );
          }
        } else if (
          obj.data[i].hasOwnProperty("entityTemplate") &&
          obj.data[i].entityTemplate == "listCard"
        ) {
          obj.data.splice(i, 1);
        } else if (
          obj.data[i].hasOwnProperty("extra_title") &&
          obj.data[i].extraTitle != ""
        ) {
          obj.data[i].hasOwnProperty("extra_title")
            ? (obj.data[i].extra_title = "")
            : "";
          obj.data[i].hasOwnProperty("extra_pic")
            ? (obj.data[i].extra_pic = "")
            : "";
          obj.data[i].hasOwnProperty("extra_key")
            ? (obj.data[i].extra_key = "")
            : "";
          obj.data[i].hasOwnProperty("extra_type")
            ? (obj.data[i].extra_type = "")
            : "";
          obj.data[i].hasOwnProperty("extra_url")
            ? (obj.data[i].extra_url = "")
            : "";
          obj.data[i].hasOwnProperty("extra_info")
            ? (obj.data[i].extra_info = "")
            : "";
          obj.data[i].hasOwnProperty("extra_entities")
            ? (obj.data[i].extra_entities = [])
            : "";
          obj.data[i].hasOwnProperty("extra_fromApi")
            ? (obj.data[i].extra_fromApi = "")
            : "";
          obj.data[i].hasOwnProperty("goodsListInfo")
            ? delete obj.data[i].goodsListInfo
            : "";
        }
      }
    }
  } else if (
    /^https:\/\/api\.coolapk\.com\/v6\/page\/dataList/.test(requestUrl)
  ) {
    if (obj.data.length) {
      obj.data.forEach((el) => {
        if (el.entityTemplate == "imageSquareScrollCard") {
          el.entities.unshift({
            title: "#美女#",
            pic: "http://image.coolapk.com/feed_tag/2023/0305/11/25640219_3a17b9f9_7113_9655_566@1000x1000.jpeg",
            url: "/t/美女?type=8",
            entityType: "picCategory",
          });
        }
        el.hasOwnProperty("extra_title") ? (el.extra_title = "") : "";
        el.hasOwnProperty("extra_pic") ? (el.extra_pic = "") : "";
        el.hasOwnProperty("extra_key") ? (el.extra_key = "") : "";
        el.hasOwnProperty("extra_type") ? (el.extra_type = "") : "";
        el.hasOwnProperty("extra_url") ? (el.extra_url = "") : "";
        el.hasOwnProperty("extra_info") ? (el.extra_info = "") : "";
        el.hasOwnProperty("extra_entities") ? (el.extra_entities = []) : "";
        el.hasOwnProperty("extra_fromApi") ? (el.extra_fromApi = "") : "";
        el.hasOwnProperty("goodsListInfo") ? delete el.goodsListInfo : "";
      });
    }
  } else if (
    /^https:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(requestUrl)
  ) {
    if (obj.data.length) {
      obj.data[0].entities = [];
    }
  } else if (/^https:\/\/api\.coolapk\.com\/v6\/main\/init/.test(requestUrl)) {
    if (obj.data.length) {
      let list = [];
      obj.data.forEach((el) => {
        if (
          el.url.indexOf("item.m.jd") == -1 ||
          el.title.indexOf("启动页") == -1
        ) {
          if (el.entityTemplate == "configCard") {
            let objTem = {
              cardId: el.extraDataArr.cardId,
              cardPageName: el.extraDataArr.cardPageName,
              selectedHomeTab: el.extraDataArr.selectedHomeTab,
            };
            el.extraDataArr = objTem;
            el.extraData = JSON.stringify(objTem);
          }
          list.push(el);
        }
      });
      obj.data.filter(
        (el) =>
          el.url.indexOf("item.m.jd") == -1 || el.title.indexOf("启动页") == -1
      );
      obj.data = list;
    }
  } else if (
    /^https:\/\/api\.coolapk\.com\/v6\/feed\/detail/.test(requestUrl)
  ) {
    obj.data.hasOwnProperty("include_goods")
      ? (obj.data.include_goods = [])
      : "";
    obj.data.hasOwnProperty("detailSponsorCard")
      ? (obj.data.detailSponsorCard = [])
      : "";
    obj.data.hasOwnProperty("extra_title") ? (obj.data.extra_title = "") : "";
    obj.data.hasOwnProperty("extra_pic") ? (obj.data.extra_pic = "") : "";
    obj.data.hasOwnProperty("extra_key") ? (obj.data.extra_key = "") : "";
    obj.data.hasOwnProperty("extra_type") ? (obj.data.extra_type = "") : "";
    obj.data.hasOwnProperty("extra_url") ? (obj.data.extra_url = "") : "";
    obj.data.hasOwnProperty("extra_info") ? (obj.data.extra_info = "") : "";
    obj.data.hasOwnProperty("extra_fromApi")
      ? (obj.data.extra_fromApi = "")
      : "";
    obj.data.hasOwnProperty("goodsListInfo")
      ? delete obj.data.goodsListInfo
      : "";
    obj.data.hasOwnProperty("extra_entities")
      ? (obj.data.extra_entities = [])
      : "";
    let str = obj.data.hasOwnProperty("message") ? obj.data.message : "";
    if (str != undefined && str.length && str.indexOf("查看链接") != -1) {
      let list = str.match(/查看链接/g);
      let dealList = [];
      if (list.length) {
        let strIndex = 0;
        list.forEach((el, index) => {
          if (index == 0) {
            strIndex = str.indexOf("查看链接");
            let hrefFirstIndex = str.substring(0, strIndex).lastIndexOf("href");
            let hrefLastIndex = str
              .substring(hrefFirstIndex + 6, strIndex)
              .indexOf('"');
            let sub_href = str.substring(
              hrefFirstIndex + 6,
              hrefFirstIndex + 6 + hrefLastIndex
            );
            if (sub_href != "") {
              dealList.push({ index: index + 1, href: sub_href });
            }
          } else {
            let strIndexNext = strIndex;
            strIndex = str.indexOf("查看链接", strIndex + 1);
            let hrefFirstIndex = str
              .substring(strIndexNext, strIndex)
              .lastIndexOf("href");
            let hrefLastIndex = str
              .substring(strIndexNext + hrefFirstIndex + 6, strIndex)
              .indexOf('"');
            let sub_href = str.substring(
              strIndexNext + hrefFirstIndex + 6,
              strIndexNext + hrefFirstIndex + 6 + hrefLastIndex
            );
            if (sub_href != "") {
              dealList.push({ index: index + 1, href: sub_href });
            }
          }
        });
        if (dealList.length) {
          let returnHref =
            "🎯捕获到 -" +
            obj.data.username +
            " 动态「" +
            obj.data.title.replace(/\s*/g, "").replace(/\r\n/g, "").toString() +
            "」详情中链接，共捕获" +
            dealList.length +
            "个原始链接" +
            "\n\n";
          dealList.forEach((url) => {
            returnHref =
              returnHref +
              "🔗第" +
              url.index +
              "个" +
              "：" +
              "\n" +
              url.href +
              "\n\n";
          });
          $notify("📌动态链接捕获成功", "🎯点击查看详情", returnHref);
        } else {
          $notify("XiaoMao提示", "", "动态链接捕获发生致命错误!");
        }
      }
    }
  } else if (
    /^https:\/\/api\.coolapk\.com\/v6\/topic\/newTagDetail/.test(requestUrl)
  ) {
    obj.data.hasOwnProperty("recommendRows")
      ? (obj.data.recommendRows = [])
      : "";
    if (obj.data.hasOwnProperty("tabList")) {
      function sortList(arr) {
        if (arr.some((e) => e.title == "最近回复")) {
          if (arr.findIndex((e) => e.title == "最近回复") != 0) {
            arr.push(arr.shift());
            sortList(arr);
          }
        }
        return arr;
      }
      obj.data.tabList = sortList(obj.data.tabList);
    }
  } else if (
    /^https:\/\/api\.coolapk\.com\/v6\/feed\/(replyList|replyDetail)/.test(
      requestUrl
    )
  ) {
    let dealList = [];
    let getList = obj.data;
    if (
      /^https:\/\/api\.coolapk\.com\/v6\/feed\/replyDetail/.test(requestUrl)
    ) {
      dealReplayList(getList.message, dealList, getList.username);
    } else {
      if (getList.length) {
        getList.forEach((item) => {
          let str = item.message;
          dealReplayList(str, dealList, item.username);
          if (item.replyRows && item.replyRows.length) {
            item.replyRows.forEach((row) => {
              let str2 = row.message;
              dealReplayList(str2, dealList, row.username);
            });
          }
        });
      }
    }
    if (dealList.length) {
      let returnHref =
        "🎯捕获到评论区的链接，共捕获" +
        dealList.length +
        "个原始链接" +
        "\n\n";
      dealList.forEach((url, index) => {
        returnHref =
          returnHref +
          "🔗第" +
          (index + 1) +
          "个" +
          "（来自 - " +
          url.name +
          " 的回复）" +
          "：" +
          "「" +
          url.msg +
          "」" +
          "\n" +
          url.href.replace(/\s*/g, "").replace(/\r\n/g, "").toString() +
          "\n\n";
      });
      $notify("📌评论区链接捕获成功", "🎯点击查看详情", returnHref);
    }
    function dealReplayList(str, dealList, username) {
      if (str != undefined && str.length && str.indexOf("查看链接") != -1) {
        let list = str.match(/查看链接/g);
        if (list.length) {
          let strIndex = 0;
          list.forEach((el, index) => {
            if (index == 0) {
              strIndex = str.indexOf("查看链接");
              let hrefFirstIndex = str
                .substring(0, strIndex)
                .lastIndexOf("href");
              let hrefLastIndex = str
                .substring(hrefFirstIndex + 6, strIndex)
                .indexOf('"');
              let sub_href = str.substring(
                hrefFirstIndex + 6,
                hrefFirstIndex + 6 + hrefLastIndex
              );
              if (sub_href != "") {
                dealList.push({
                  name: username,
                  href: sub_href,
                  msg: str.substring(0, str.indexOf("<")) + "...",
                });
              }
            } else {
              let strIndexNext = strIndex;
              strIndex = str.indexOf("查看链接", strIndex + 1);
              let hrefFirstIndex = str
                .substring(strIndexNext, strIndex)
                .lastIndexOf("href");
              let hrefLastIndex = str
                .substring(strIndexNext + hrefFirstIndex + 6, strIndex)
                .indexOf('"');
              let sub_href = str.substring(
                strIndexNext + hrefFirstIndex + 6,
                strIndexNext + hrefFirstIndex + 6 + hrefLastIndex
              );
              if (sub_href != "") {
                dealList.push({
                  name: username,
                  href: sub_href,
                  msg: str.substring(0, str.indexOf("<")) + "...",
                });
              }
            }
          });
        }
      }
    }
  }
} catch (e) {
  console.log(e);
}
body = JSON.stringify(obj);
$done({ body });
