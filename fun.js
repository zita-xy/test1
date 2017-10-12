var _hmt = _hmt || [];
(function () {
    var bp = document.createElement('script');
    bp.src = '//push.zhanzhang.baidu.com/push.js';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?318e126a8da2b31ef17eff85b276d397";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
var isMobileBoolean = /(SymbianOS|MeeGo|BlackBerry|iPad|iPod|Windows Phone|iPhone|Android)/i.test(navigator.userAgent);

//鐧诲綍000
function login(flash, code) {
    if (flash == "code") {
        var obj = $(".flash_collected");//flash瑙﹀彂闇€瑕侀獙璇佺殑瑙嗛鏉ユ敹钘�
        obj.text() == "鏀惰棌" && obj.attr({"class": "flash_collect", "data-code": code});
    } else if ($(".login_div").size()) {
        $(".login_div").show();
    } else {
        var html = '<div class="login_div"><form action="#"><div class="login_box"><h2><a href="javascript:void(0)"></a>鐧诲綍</h2> ' +
            '<ul><li><label>鎵嬫満/閭/鍛樺伐璐﹀彿</label><div class="login_name"><input type="text" class="" name="username" maxlength="100" autocomplete="off"/></div><span></span></li>' +
            '<li><label>瀵嗙爜</label><div class="login_password"><input type="password" class="" name="password" value="" autocomplete="off" maxlength="18"/></div><span></span></li>' +
            '<li><p class="clearfix"><input type="checkbox" class="input_check" checked="checked" value="1" name="rememberMe"/>' +
            '<span>璁颁綇鎴�</span><a href="/findpass.php" class="forget_password">蹇樿瀵嗙爜锛�</a></p></li>' +
            '<li><button type="button" class="login_btn" id="login_btn">鐧诲綍</button></li>' +
            '<li><span id="wxLoginBtn" style="float: right;padding-left: 5px;" ><img src="/app/templates/image/wxlogin.png" /></span><span id="qqLoginBtn" style="float: right"></span><label>娌℃湁甯愬彿锛�<a href="/index2.php?action=register" class="forget_password">鍏嶈垂娉ㄥ唽</a></label></li>' +
            '</ul></div></form>' +
            '</div>';
        $("body").append(html);
//鏇挎崲榛樿鍥炬爣
        setTimeout(function () {
            $("#qqLoginBtn img").attr("src", "/app/templates/image/qqlogin.png");
        }, 1);
        $("#wxLoginBtn").click(function () {
            window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=wx717e5d4c439e8e1c&redirect_uri=http://www.mycs.cn/app/apps/AppWechatLogin.php&response_type=code&scope=snsapi_login&state=login#wechat_redirect";
        });
//鑾峰彇鐒︾偣
        $(".login_box input").focus(function () {
            $(this).parent().css("border-color", "#a1cd06").next("span").hide();
        }).blur(function () {
            $(this).parent().css("border-color", "#dedede");
        });
//鐧诲綍
        var btn = $("#login_btn").click(function () {
            if ($.trim(btn.text()) != "鐧诲綍") {
                return false
            }
            var u = $.trim($("input[name='username']").val()), p = $("input[name='password']").val(),
                r = $("input[name='rememberMe']:checked").size() ? 1 : 0;
            if (u.length < 3) {
                $("input[name='username']").parent().css({"border": "1px solid #ff5959"}).next("span").text("鎵嬫満/閭/鍛樺伐璐﹀彿涓嶈兘灏戜簬3涓瓧绗︼紒").show();
                return false;
            } else if (p.length < 6) {
                $("input[name='password']").parent().css({"border": "1px solid #ff5959"}).next("span").text("瀵嗙爜涓嶈兘灏戜簬6涓瓧绗︼紒").show();
                return false;
            } else {
                btn.text("璇风◢鍊欌€�");
                deal_cookie("msg", "");
                $.post("/app/apps/login.php", {
                    username: u,
                    password: p,
                    device: 1,
                    escapeCaptcha: 1,
                    userType: 1,
                    rememberMe: r
                }, function (json) {
                    if (1 == json.code) {
                        public_top(true);
                        $(".login_div").remove();
                        $(".buy_form").text() == "璇峰厛鐧诲綍" && location.reload();
//2鍒嗛挓鎾斁鐧诲綍鍚庡埛鏂伴〉闈�
                        location.href.indexOf("/player/") && location.reload();
//flash && thisMovie("play").web_afresh();
                    } else {
                        btn.text("鐧诲綍");
                        $("input[name=" + (~json.msg.indexOf("瀵嗙爜") ? 'password' : 'username') + "]").parent().css({"border": "1px solid #ff5959"}).next("span").text(json.msg).show();
                    }
                }, "json");
            }
        });
        $(".login_box h2 a").click(function () {
            $(".login_div").hide()
        });
        $(document).keydown(function (e) {
            e = e || event;
            var code = e.which || e.keyCode;
            (code == 13 || code == 32) && $("input[name='password']").is(":focus") && $("#login_btn").click();
        });
        if (QC.Login.check()) QC.Login.signOut();//濡傛灉QQ鐧诲綍 鍚屾椂閫€鍑篞Q
        QC.Login({
            btnId: "qqLoginBtn",
            size: "B_M"
        }, function (reqData, opts) {
            var name = QC.String.escHTML(reqData.nickname);
            if (QC.Login.check()) {
                QC.Login.getMe(function (openId, accessToken) {
                    $.post('/app/apps/thirdLogin.php', {
                        userType: 1,
                        type: 'qq',
                        name: name,
                        openId: openId,
                        accessToken: accessToken
                    }, function (json) {
                        if (1 == json.code) {
                            flash && thisMovie("play").web_afresh();
                            $(".top ul").hide().eq(1).show().find(".user_info").html("娆㈣繋鎮細<a href='home.php'>" + json.data.realname + "</a>");
//瑙ｉ櫎鍩硅骞冲彴鐨勫鍚戝皝閿�
                            $("#platform").attr("href", "http://www.mycs.cn/video.php");
                            $(".login_div").remove();
                            public_top(true);
                        } else {
                            scscms_alert(json.msg, 'info');
                        }
                    }, "json");
                });
            }
        }, function (opts) {
        });
    }
}
//鍏敤椤堕儴鍑芥暟 xzy 2015-06-05
function public_top(exit) {
//鍒ゆ柇鏄惁鐧诲綍
    if (deal_cookie("fn")) {
//鎾斁椤甸潰璇勮妗嗙櫥褰曟寜閽�
        $(".commemt h3>a:first-child").text("宸茬櫥褰�");
        var _url = "/home.php";
        if (deal_cookie("faid") == 183 || deal_cookie("faid") == 5) {
            _url = "/totalStatisticsNew.php";
        }
        $(".top_bar li:eq(1)").html('<a href="' + _url + '">' + deal_cookie("fn") + '</a>').show();
        $(".logined .user").html('<em></em>' + deal_cookie("fn"));
        $(".fix_top .logined,.top_bar li:eq(2)").show();
        $(".fix_top .nologin,.top_bar li:eq(0)").hide();
    } else {
        $(".commemt h3>a:first-child").text("鐧诲綍");
        $(".fix_top .logined,.top_bar li:eq(1),.top_bar li:eq(2)").hide();
        $(".fix_top .nologin,.top_bar li:eq(0)").show();
    }
    if (exit) return;
    getMsg();
//鐧诲綍
    $(".top_bar").delegate("a", "click", function () {
//$(this).text() == "鐧诲綍" && (location.host.substring(0,4) == "www." ? login() : location.replace("/login.php"));
//$(this).text() == "鐧诲綍" && login();
        $(this).text() == "閫€鍑�" && $(".logined a:eq(2)").click();
        if ($(this).text() == "鎴戠殑鏀惰棌") {
            if (deal_cookie("fn")) {
                $(this).attr("href", "http://www.mycs.cn/collection.php");
            } else {
                location.replace("/login.php")
            }
        }
    });
    $(".nologin a:eq(0)").click(function () {
        location.host.substring(0, 4) == "www." ? login() : location.replace("/login.php");
    });
//閫€鍑�
    $(".logined .exit").click(function () {
        $.post("/login.php?action=logout", function (json) {
            json.code == 1 && public_top(true);
        }, "json");
    });
//top鎼滅储
    $(".search button").click(function () {
        var _key = $(this).nextAll("input").val();
        "" != _key && location.replace("/search.php?keyword=" + _key + "&type=content");
    });
    $(document).keydown(function (e) {
        e = e || event;
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(".search input").each(function () {
                $(this).is(":focus") && $(this).prev().click();
            })
        }
    });
//img load
    $("img[data-src]").each(function () {
        imgLoad($(this).attr("data-src"), this, function (url, obj) {
            obj.src = url
        });
        $(this).removeAttr("data-src");
    });
//鎼滅储鍏抽敭璇�
    $(".hot_key a").each(function (i, item) {
        var cl = "#" + ["6dd3dd", "e4929a", "7cbb77", "f49956", "9b9fd6", "bebd73"][i % 6];
        $(item).data("color", cl).css({borderColor: cl, color: cl}).hover(function () {
            $(this).css({backgroundColor: $(this).data("color"), color: "#fff"});
        }, function () {
            $(this).css({backgroundColor: "#fff", color: $(this).data("color")});
        })
    });
//鍥炲埌椤堕儴
    $(window).scroll(function () {
        $(".to-top").toggle($(window).scrollTop() > 740);
    });
    $(".to-top").click(function () {
        $("body,html").animate({scrollTop: 0}, 1000);
    });
//鎺堟潈涔�
    $(".shouquan").click(function () {
        if ($(".shouquan-img").find("img").size() == 0) {
            $(".shouquan-img").append('<img src="/app/templates/images/shouquan.jpg"/>')
        }
        $(".shouquan-img").show();
    });
    $(".shouquan-img").click(function () {
        $(this).hide()
    });
//蹇€熻烦杞� 2015-12-22
    var pages = $("input[name='page_count']").val(), num = $("input[name='page_num']").val(), i = 1, htmlstr = "",
        data = [];
    while (i <= pages) {
        var o = {id: i, text: '绗�' + i + '椤�'};
        data.push(o);
        i++;
    }
    $("#jump").combobox({
        data: data,
        valueField: 'id',
        textField: 'text',
        onSelect: function (n) {
            n && location.replace($("input[name='page_onchange']").val() + n.id);
        }
    });
    setTimeout(function () {
        $("#jump").combobox("setValue", num)
    }, 2);
}
//鏇存柊淇℃伅
function getMsg() {
    var n = deal_cookie("msg"), span = $(".logined span");
    if (n == "") {
        deal_cookie("fu") && $.getJSON("/app/apps/message.php?action=msgCount", function (json) {
            n = json.data;
            deal_cookie("msg", n, {domain: location.host.replace(/^[^.]+/, ""), expires: 1 / 144});
            n > 0 ? span.css("padding", "3px").html(n > 99 ? "99+" : n).show() : span.hide();
        })
    } else {
        n > 0 ? span.css("padding", "3px").html(n > 99 ? "99+" : n).show() : span.hide();
    }
    setTimeout(arguments.callee, 600000);
}
//鎿嶄綔绛夊€�
function public_waiting(ac) {
    "close" == ac ? $("#public_waiting").remove() : $('<div id="public_waiting"><img src="/app/templates/css/images/load.gif" alt="璇风◢鍊�.." /></div>').height($(document).height()).appendTo($("body"));
    $(window).resize(function () {
        $("#public_waiting").height($(document).height());
    })
}
//璇剧▼璇︽儏
function course_detail() {
    public_top();
    index_focus_banner(".course_flash");
    var navs = $(".course_tab li"), navHover = $(".hover"), navWidth, navLeft;
    navs.on("click", function () {
        if (!$(this).hasClass("on")) {
            navWidth = $(this).innerWidth();
            navLeft = $(this).position().left + 10;
            $(this).addClass("on").siblings("li").removeClass("on");
            $(".course_tab_area").hide().eq($(this).index()).show();
            navHover.css({width: navWidth, left: navLeft});
        }
    }).eq(0).trigger("click");
    var nav_cur = $(".course_tab li.on");
    navWidth = nav_cur.innerWidth();
    navLeft = nav_cur.position().left + 10; //鍔ㄧ敾婊戝潡
    navs.on("mouseover", function () {
        var index = $(this).index();
        var a_cur = $(".course_tab").find("li").eq(index);//榧犳爣绉诲姩鍒扮殑a鍏冪礌
//鍒╃敤瑙﹀彂鐨刟鍏冪礌绱㈠紩鑾峰彇鍏秎eft浣嶇疆鍜屽畠鐨勫搴�
        var width = a_cur.innerWidth();
        var left = a_cur.position().left + 10;
//璁剧疆鍔ㄧ敾婊戝潡浣嶇疆
        navHover.stop().animate({
            width: width,
            left: left
        }, 300)
    });
    navs.on("mouseout", function () {
        navHover.stop().animate({
            width: navWidth,
            left: navLeft
        })
    });
//绠€浠嬫洿澶氬尰甯堣疆鎾�
    var ul = $(".mobile"), lis = ul.find("li"), li_len = lis.length;
    if (li_len >= 4) {
        lis.each(function () {
            var _this = $(this), ind = _this.index();
            if (ind == 0) {
                ul.append("<li>" + _this.html() + "</li>");
            } else if (ind == li_len - 1) {
                ul.prepend("<li>" + _this.html() + "</li>").css("left", "-218px");
            }
        })
        $(".but_right").click(function () {
            ul.animate({left: -436}, function () {
                $(this).css('left', '-218px').append(this.children[0])
            })
        });
        $(".but_left").click(function () {
            ul.animate({left: 0}, function () {
                $(this).css('left', '-218px').prepend(this.children[li_len - 1])
            })
        });
    }
//鐐硅禐 鏀惰棌 澶勭悊
    $("#praise,#collect").click(function () {
        if ($(this).hasClass('on')) {
            return false;
        }
        var _this = $(this), coursePackId = $("input[name='comment_cid']").val(),
            obj = {action: $(this).attr('id'), coursePackId: coursePackId}, num = $(this).find('.num').text();
        $.post("/app/newApi/coursePack.php", obj, function (json) {
            if (json.code == 1) {
                _this.addClass('on').find('.num').text(parseInt(num) + 1);
            } else {
                json.msg == "璇峰厛鐧诲綍" ? login() : scscms_alert(json.msg, 'error');
            }
        }, "json");
    });
//textarea鏄剧ず涓庨檺鍒惰緭鍏ュ瓧鏁�
    $(".input_div textarea").keydown(function () {
        changeNum($(this));
    }).keyup(function () {
        changeNum($(this));
    });
    function changeNum(cls) {
        var _this = cls, div = _this.closest("div"),
            curLength = _this.val().length;
        if (curLength > 150) {
            _this.val(_this.val().substr(0, 150));
        } else {
            div.find("p span").text(150 - curLength);
        }
    }

//璇勮
    var Object = {
        comment_type: $("input[name='comment_type']").val(),
        comment_cid: $("input[name='comment_cid']").val(),
        id: $("input[name='id']").val()
    };
//璇勮
    $(".input_div .but_green").click(function () {
        var content = $.trim($("textarea[name='comment']").val()),
            page = parseInt($("a.on_page:eq(0)").text() || 1, 10);
        if (content.length >= 5) {
            Object.content = content;
            $.post("/app/newApi/comment.php?action=send", Object, function (json) {
                if (json.code == 1) {
                    $("textarea[name='comment']").val("");
                    json.data.name = deal_cookie("fn");
                    json.data.time = format_time("Y-M-D", json.data.addTime * 1000) + " " + format_time("h:m:s", json.data.addTime * 1000);
                    json.data.content = json.data.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    $($("#comment").html().replace(/\{(.+?)\}/ig, function (a, b) {
                        return json.data[b]
                    })).prependTo($(".comment_list ul")).find(".name i").remove();
                    $(".comment_list ul").find("li.empty").remove();
                    get_comment(page);//鍙戣瘎璁哄彲浠ュ強鏃舵洿鏂伴〉鐮�
                } else {
                    json.msg == "璇峰厛鐧诲綍" ? login() : scscms_alert(json.msg, 'error');
                }
            }, "json");
        } else {
            scscms_alert("璇疯緭鍏�5鑷�150涓瓧绗︼紒", 'error');
        }
    });
//璇勮鍒楄〃
    function get_comment(curPage) {
        Object.pageSize = 10;
        Object.page = curPage;
        $.post("/app/newApi/comment.php?action=list", Object, function (json) {
            if (json.code == 1) {
                var total = json.data.total, list = json.data.list, html = $("#comment").html(), str = "", i, l;
                for (i = 0, l = list.length; i < l; i++) {
                    list[i].isPraised = list[i].isPraised == 1 ? 'on' : '';
                    list[i].content = list[i].text.replace(/</g, "").replace(/>/g, "");
                    str += html.replace(/\{(.+?)\}/ig, function (a, b) {
                        return list[i][b]
                    });
                }
                $(".comment_list ul").html(str == "" ? "<li class='empty'>鏆傛棤鏁版嵁</li>" : str).find("dl").each(function () {
                    $(this).attr("data-replyUid") == 0 && $(this).find(".name i").hide();
                });
//鍒嗛〉
                var countPage = Math.ceil(total / Object.pageSize), arr = [];

                function setPageList(b, e) {
                    for (var i = b; i <= e; i++) {
                        arr.push('<a # ' + (i == curPage ? 'class="on_page"' : '') + '>' + i + '</a>');
                    }
                }

                curPage > 1 && arr.push('<a class="prev_page" #>涓婁竴椤�</a>');
                if (countPage <= 10) {
                    setPageList(1, countPage);
                } else {
                    if (curPage <= 4) {
                        setPageList(1, 5);
                        arr.push('<a #>...</a><a #>' + countPage + '</a>');
                    } else if (curPage >= countPage - 3) {
                        arr.push('<a #>1</a><a #>...</a>');
                        setPageList(countPage - 4, countPage);
                    } else {
                        arr.push('<a #>1</a><a #>...</a>');
                        setPageList(curPage - 2, curPage + 2);
                        arr.push('<a #>...</a><a #>' + countPage + '</a>');
                    }
                }
                curPage < countPage && arr.push('<a class="next_page" #>涓嬩竴椤�</a>');
                $(" .foot_page").html(arr.join("").replace(/#/g, 'href="javascript:void(0)"'));
            }
        }, "json");
    }

    get_comment(1);
//鐐瑰嚮鍒嗛〉
    $(".foot_page").on("click", "a", function () {
        var txt = $(this).text(), page = parseInt($("a.on_page:eq(0)").text(), 10);
        if (!$(this).hasClass("on_page") && txt != "...") {
            if (txt == "涓婁竴椤�") {
                page--;
            } else if (txt == "涓嬩竴椤�") {
                page++;
            } else {
                page = parseInt(txt, 10);
            }
            get_comment(page);
        }
    });
    var replyName = "";
    $(".comment_list").on("click", ".comment_menu a", function () {
        var _this = $(this), index = _this.index();
        if (index) {//鍥炲
            replyName = _this.closest("dl").find(".name").contents().filter(function () {
                return this.nodeType == 3
            }).text();
            _this.closest("dd").next("dd.input_area").toggle("slow").find("textarea").attr("placeholder", "鍥炲" + replyName + ":浣犳兂璇寸偣浠€涔�...");
        } else {//璧�
            if (!_this.hasClass("on")) {
                var num = _this.find("em").text();
                $.post("/app/newApi/coursePack.php?action=praise", {
                    "target_type": "1",
                    "target_id": _this.closest("dl").attr("data-id")
                }, function (json) {
                    if (json.code == 1) {
                        _this.addClass("on").find("em").text(parseInt(num, 10) + 1);
                    } else {
                        json.msg == "璇峰厛鐧诲綍" ? login() : scscms_alert(json.msg, 'error');
                    }
                }, "json")
            }
        }
    }).on("click", ".comment_reply a", function () {
        var a_txt = $(this).text();
        if (a_txt == "鍙栨秷") {
            $(this).closest("dd.input_area").hide("slow").find("textarea").val("");
        } else {//鍥炲
            var _this = $(this), dl = _this.closest("dl"),
                content = $.trim(dl.find("textarea").val()),
                page = parseInt($("a.on_page:eq(0)").text() || 1, 10);
            if (content.length >= 5) {
                Object.content = content;
                Object.reply_id = dl.attr("data-id");
                Object.toUid = dl.attr("data-uid");
                $.post("/app/newApi/comment.php?action=send", Object, function (json) {
                    if (json.code == 1) {
                        $("textarea[name='comment']").val("");
                        json.data.name = deal_cookie("fn");
                        json.data.replyName = replyName;
                        json.data.time = format_time("Y-M-D", json.data.addTime * 1000) + " " + format_time("h:m:s", json.data.addTime * 1000);
                        json.data.content = json.data.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        $($("#comment").html().replace(/\{(.+?)\}/ig, function (a, b) {
                            return json.data[b]
                        })).prependTo($(".comment_list ul"));
                        get_comment(page);//鍙戣瘎璁哄彲浠ュ強鏃舵洿鏂伴〉鐮�
                    } else {
                        json.msg == "璇峰厛鐧诲綍" ? login() : scscms_alert(json.msg, 'error');
                    }
                }, "json");
            } else {
                scscms_alert("璇疯緭鍏�5鑷�150涓瓧绗︼紒", 'error');
            }
        }
    })
}
//棣栭〉 mars 2016-02-26
function home() {
    public_top();
    (function () {
        $('.top_banner').slideDown(1500);
//璁剧疆寤舵椂鍑芥暟
//30绉掗挓鍚庤嚜鍔ㄦ敹璧�
        var t = setTimeout(function () {
            $('.top_banner a.up').hide();
            $('.top_banner').slideUp('slow')
        }, 30000);
//鐐瑰嚮鎸夐挳鏀惰捣
        $('.top_banner a.up').live('click', function () {
            clearTimeout(t);
            $(this).hide();
            $('.top_banner').slideUp('slow')
        });
    })();
//鐒︾偣鍥剧墖
    index_focus_banner(".banner_flash");
    $(".newslist_li_main").each(function () {
        $(this).find("li").first().addClass("picnews");
    });
//fix_top
    var fix_top = $(".fix_top");
    $(window).scroll(function () {
        fix_top.toggle($(window).scrollTop() > 740);
    }).resize(function () {
        $(".fix_logo").toggle($(window).width() > 1520);
    });
//鍚嶇鍚嶉櫌
//var _index5=0;
    var ul = $(".mobile"), lis = ul.find("li"), li_len = lis.length;
    if (li_len >= 6) {
        lis.each(function () {
            var _this = $(this), ind = _this.index();
            if (ind == 0) {
                ul.append("<li>" + _this.html() + "</li>");
            } else if (ind == li_len - 1) {
                ul.prepend("<li>" + _this.html() + "</li>").css("left", "-198px");
            }
        })
        $(".but_right").click(function () {
            ul.animate({left: -386}, function () {
                $(this).css('left', '-198px').append(this.children[0])
            })
        });
        $(".but_left").click(function () {
            ul.animate({left: 0}, function () {
                $(this).css('left', '-198px').prepend(this.children[li_len - 1])
            })
        });
    }
//鐚滀綘鍠滄
    $(".change").click(function () {
        var _this = $(this);
        if (_this.data("ajax") == "loading") {
            return;
        }
        _this.data("ajax", "loading").css({backgroundImage: "url(/app/templates/index/images/change.gif)"});
        $.getJSON("/app/apps/getIndexData.php?action=getIndexDoctor&ajax=1&ran=" + Math.random(), function (json) {
            _this.data("ajax", "loaded").css({backgroundImage: "url(/app/templates/index/images/change.png)"});
            if (json.code == 1) {

                var list = json.data, str = "", html = $("#docList").html();
                for (var i = 0, l = list.length; i < l; i++) {
                    str += html.replace(/\{(.+?)\}/ig, function (a, b) {
                        return list[i][b]
                    });
                }
                $(".doctor_list").find('ul').html(str).find("img[data-src]").each(function () {
                    imgLoad($(this).attr("data-src"), this, function (url, obj) {
                        obj.src = url
                    });
                    $(this).removeAttr("data-src");
                });
            } else {
                scscms_alert(json.msg, "error");
            }
        });
    });
    /********/
    /****娲诲姩鍊掕鏃�****/
    /********/
    $('.time').children().hide();
    function getRTime() {
        var endTime = parseInt($('input[name="endTime"]').val()) * 1000; //鎴鏃堕棿
        var nowTime = parseInt(new Date().getTime());
        var startTime = parseInt($('input[name="startTime"]').val()) * 1000;
        var t = +endTime - nowTime;
        if (startTime > nowTime) {
            $('.time').children().hide();
            $('.nobegin').show();
        } else if (nowTime >= startTime && endTime >= nowTime) {
            var d = Math.floor(t / 1000 / 60 / 60 / 24);
            var h = Math.floor(t / 1000 / 60 / 60 % 24);
            var m = Math.floor(t / 1000 / 60 % 60);
            var s = Math.floor(t / 1000 % 60);
            d = d ? d : 0;
            h = h ? h : 0;
            m = m ? m : 0;
            s = s ? s : 0;
            $('.time').children().hide();
            $(".counting").show();
            $(".t_d").html(d);
            $(".t_h").html(h);
            $(".t_m").html(m);
            $(".t_s").html(s);
        } else {
            $('.time').children().hide();
            $('.overing').show();
            clearInterval(timer);
        }

    }

    var timer = setInterval(getRTime, 1000);
}
//鏃犲咖瀛﹂櫌xzy 2015-06-11
function wyxy() {
    public_top();
//tab
    $(".index_cat dd:eq(2)").addClass("focus");
    $(".index_cat dd:nth-child(n+3)").click(function () {
        $(this).closest("div").nextAll("ul").hide().eq($(this).addClass("focus").siblings().removeClass("focus").end().index() - 2).show();
        $(this).closest(".yxleft").next().find("ul").hide().eq($(this).index() - 2).show();
    });
    index_focus_banner(".focus_pic");
    $('.public_pic div p').each(function () {
        var _this = $(this);
        _this.text().length > 50 && _this.text(_this.text().substr(0, 50) + '...');
    });
}
//鍖诲 xzy 2015-06-10
function yx() {
    public_top();
    var moreLink = $(".li_more a").attr("href");
    $(".index_cat dd:gt(0)").click(function () {
        $(this).closest("div").nextAll("ul").hide().eq($(this).addClass("on").siblings().removeClass("on").end().index() - 1).show();
        var linkIndex = $(this).index();
        $(".li_more a").attr("href", function () {
            if (linkIndex == 1) {
                return moreLink + "&sort=videoId";
            } else if (linkIndex == 2) {
                return moreLink + "&sort=click";
            } else if (linkIndex == 3) {
                return moreLink + "&sort=commentTotal";
            }
        });
    });
    $('.public_pic div p').each(function () {
        var _this = $(this);
        _this.text().length > 50 && _this.text(_this.text().substr(0, 50) + '...');
    });
//鐒︾偣鍥剧墖
    index_focus_banner(".focus_pic");
    swwy_select();
}
//琛屼笟璧勮 xzy 2015-06-10
function hyzx() {
    public_top();
    swwy_select();
}
//浼佷笟涓婚〉
function enterprise_home() {
    public_top();
    swwy_select();
    index_cat(1);//鍐呭鍒囨崲
    waterfall(".zhuanzhu > div");
    $(".pers_top div a").click(function () {
        var arr = $(this).attr("userid");
        if (!$(this).hasClass("on")) {
            if (arr) {
                $.get("/app/apps/createFavCommon.php?action=add&type=5&dataId=" + arr, function (json) {
                    if (json.code == 1) {
                        $(".pers_top div a").addClass("on");
                        scscms_alert("鏀惰棌鎴愬姛锛�", "info");
                    } else {
                        scscms_alert(json.msg, "error");
                    }
                }, "json");
            }
        } else {
            scscms_alert("宸叉敹钘�", "info");
        }
    });
//鍚嶅尰涓撳杞挱
    var divBanner = $(".doctor_list div"), dl = divBanner.find("dl").hide();
    dl.first().show();
    divBanner.hover(function () {
        divBanner.data("stop", 1)
    }, function () {
        divBanner.data("stop", 0)
    });
    $(".doctor_list").delegate("a", "click", function () {
        !this.className && $(this).siblings("a").removeAttr('class').end().addClass("on") && dl.stop().hide().eq($(this).index() - 1).show();
    }).delegate("i", "click", function () {
        var txt = $(this).text(), i = $('.doctor_list a.on').index() - 1;
        if (txt == "<") {
            i--;
            i <= -1 && (i = 2);
        }
        if (txt == ">") {
            i++;
            i >= 3 && (i = 0);
        }
        dl.stop().hide().eq(i).show();
        $('.doctor_list a').eq(i).siblings("a").removeAttr('class').end().addClass("on");
    });
    setInterval(function () {
        if (!divBanner.data("stop")) {
            var o = dl.filter(":visible"), i = dl.index(o) + 1;
            i >= dl.size() && (i = 0);
            o.hide();
            dl.eq(i).show();
            $(".doctor_list a").eq(i).addClass("on").siblings().removeAttr("class");
        }
    }, 4000);
}
//鍖荤敓涓汉涓婚〉
function personal_home() {
    public_top();
//swwy_select();
    index_cat(1);//鍐呭鍒囨崲
    waterfall(".zhuanzhu > div");
//涓汉涓婚〉-鏀惰棌
    $(".pers_top div a").click(function () {
        var arr = $(this).attr("userid");
        if (!$(this).hasClass("on")) {
            if (arr) {
                $.get("/app/apps/createFavCommon.php?action=add&type=1&dataId=" + arr, function (json) {
                    if (json.code == 1) {
                        $(".pers_top div a").addClass("on");
                        scscms_alert("鏀惰棌鎴愬姛锛�", "info");
                    } else {
                        scscms_alert(json.msg, "error");
                    }
                }, "json");
            }
        } else {
            scscms_alert("宸叉敹钘忥紒", "info");
        }
    });

//鎼滅储
    $(".search_box button").click(function () {
        var _key = $(this).prev().val();
        if ("" != _key) {
            location.replace("/space.php?uid=" + $("input[name='uid']").val() + "&action=search&keyword=" + _key);
        }
    });
}
function index_cat(n) {
    $(".index_cat").delegate("dd", "click", function () {
        var i = $(this).parent().find("dd").index(this);
        if (i) {
            $(this).addClass("on").siblings("dd:not(:first)").removeAttr("class");
            $(this).closest(".index_cat").find(".index_cat_div").hide().eq(i - n).show().find("img[data-src]")
                .each(function () {
                    imgLoad($(this).attr("data-src"), this, function (url, obj) {
                        obj.src = url
                    });
                    $(this).removeAttr("data-src");
                })
        }
    }).each(function () {
        $("dd:eq(" + n + ")", this).click();
    });
    cut_out(".index_cat_left .a", 40);
}


function textareaFocus() {
    var textarea = $("textarea[name='comment']");
    if (!textarea || textarea.length == 0)
        return;
    textarea.focus();
}

/*鐎戝竷娴�*/
function waterfall(cls) {
    public_top();
//鏀惰棌
//var id = location.search.match(/uid=(\d+)/i);
//if(id){
//    id = id[1];
//    var a = $(".pers_top div a").click(function() {
//        if(a.data("ajax") != "loading"){
//            a.data("ajax","loading");
//            $.get("http://www.swwy.com/app/apps/createFavDoctor.php", {doctorId:id} , function(json) {
//                a.data("ajax","loaded");
//                json.code == 1 ? a.addClass("on").unbind("click") : scscms_alert(json.msg);
//            })
//        }
//    }, "json")
//}
    if (!$(cls).length) return;//娌℃湁鍏冪礌
//$(".zhuanzhu > div > img").live("click",function() {
//    //$.fancybox.open($(this).attr("src"));
//});
    var obj = {
        Img: $(".zhuanzhu > div > img"),
        p: $(".zhuanzhu > div > p"),
        h2: $(".zhuanzhu > div > h2"),
        l: $(".zhuanzhu > div").size(),
        index: "",
        str: ''
    };
    for (var j = obj.l; j--;) {
        obj.str += '<li><img src="/app/templates/images/honour.jpg" alt="" /></li>';
    }
    $(".zhuanzhu_detail div").find("ul").html(obj.str);
    $(".zhuanzhu_detail a").click(function (e) {
        var txt = $(this).text();
        if (txt == "prev") {
            e.stopPropagation();
            mover_img(--obj.index);
            obj.index < 0 && (obj.index = obj.l - 1);
        } else {
            e.stopPropagation();
            obj.index > obj.l - 2 && (obj.index = -1);
            mover_img(++obj.index);
        }
    });
    function mover_img(i) {
        $(".zhuanzhu_detail div li").eq(i).show().siblings("li").hide();
        $(".zhuanzhu_detail p").text(obj.p.eq(i).text());
        $(".zhuanzhu_detail h2").text(obj.h2.eq(i).text());
        var img = new Image(), url = obj.Img.eq(i).attr('data-url');
        if (url) {
            obj.Img.eq(i).removeAttr('data-url');
            img.onload = function () {
                $(".zhuanzhu_detail li img").eq(i).attr("src", url);
            };
            img.src = url;
        }
    }

    $(".zhuanzhu").delegate("div", "click", function () {
        $(".zhuanzhu").hide();
        $(".zhuanzhu_detail").show();
        mover_img(obj.index = $(this).index());
    });
    var con = {obj: null, l: 0, w: 186, s: 12, list: 0, arr: [], anim: [], n: 0, state: "loading"};
//鏌ユ壘鏁扮粍鏈€澶т笌鏈€灏忓€�
    function get_value(obj, i) {
        if (!Object.prototype.toString.call(obj) === '[object Array]')return 0;
        var arr = obj.concat().sort(function (a, b) {
            return a - b
        });
        return i == 0 ? arr[0] : arr[arr.length - 1];
    }

    con.obj = $(cls);//鍥剧墖div瀵硅薄
    con.l = con.obj.size();//缁熻鍏辨湁澶氬皯涓浘鐗嘾iv
    con.list = Math.floor($(".zhuanzhu").width() / (con.w + con.s));
    $(window).resize(function () {
        var w = Math.floor($(".zhuanzhu").width() / (con.w + con.s));
        if (w != con.list) {
            if ("finish" == con.state) {
                con.list = w;
                con.n = 0;
                fall_pic(0);
            } else {
                con.state = "resize";
            }
        }
    });
    load_pic(0);
    function load_pic(n) {
        if (n < con.l) {
            var obj = con.obj.eq(n);
            var img = new Image();
            img.onload = function () {
                obj.find("img").attr("height", this.height * con.w / this.width);
                n++;
                load_pic(n);
            };
            img.onerror = function () {
                obj.find("img").attr({width: con.w, src: "/app/templates/images/default.jpg"});
                n++;
                load_pic(n);
            };
            img.src = obj.find("img").attr("src");
        } else {
            fall_pic(con.n);
        }
    }

    function fall_pic(n) {
        if (0 == n) con.arr = [];
        if (n < con.l) {
            var obj = con.obj.eq(n);
            var x = 0, y = 0;
            if (n < con.list) {
                x = n * (con.w + con.s);
                con.arr[n] = obj.outerHeight(true) + con.s;
            } else {
                var _i = 0;
                y = con.arr[0];
                for (var i = 0, l = con.arr.length; i < l; i++) {
                    if (y > con.arr[i]) {
                        y = con.arr[i];
                        _i = i;
                        x = i * (con.w + con.s);
                    }
                }
                con.arr[_i] = con.arr[_i] + obj.outerHeight(true) + con.s;
            }
            con.anim[n] = {left: x, top: y};
            n++;
            fall_pic(n);
        } else {
            $(".zhuanzhu").stop().animate({height: Math.max.apply(Math, con.arr)}, "fast");
            $(cls + (con.n > 0 ? ":gt(" + (con.n - 1) + ")" : "")).each(function (i) {
                var coordinate = con.anim[i + con.n];
                if ("ajax" == con.state) {
                    $(this).css(coordinate).hide().fadeIn(400);
                } else {
                    $(this).animate(coordinate, 600);
                }
            });
            setTimeout(function () {
                if ("resize" == con.state && con.list != Math.floor($(".zhuanzhu").width() / (con.w + con.s))) {
                    con.state = "finish";
                    $(window).scroll();
                } else
                    con.state = "finish";
            }, 1000)
        }
    }
}
function personal_commemt() {
    personal_home();
    $(".commemt_text textarea").focus(function () {
        $(this).closest("div").animate({height: 100}, 1000).find("p").show("1000").parents(".commemt_text").find("p").show("1000").end().find("button").show("1000");
    }).keydown(function () {
        changeNum();
    }).keyup(function () {
        changeNum();
    });
    function changeNum() {
        var _this = $(".commemt_text textarea"),
            curLength = _this.val().length;
        $(".commemt_text").find("span").text(curLength != 0 ? "鎮ㄨ繕鍙互杈撳叆" : "璇勮瀛楁暟闄�");
        if (curLength > 300) {
            _this.val(_this.val().substr(0, 300));
        } else {
            $(".commemt_text").find("i").text(300 - curLength);
        }
    }

    $(".commemt_text b").mouseenter(function () {
        $(this).addClass("on").prevAll("b").addClass("on").end().nextAll("b").removeAttr("class");
    }).click(function () {
        var index = $(this).index() + 1;
        $(this).parent("p").attr('curr', index);
        $(this).addClass("on").prevAll("b").addClass("on").end().nextAll("b").removeAttr("class");
    });
    $(".commemt_text p").mouseleave(function () {
        var curr = $(this).attr('curr');
        if (curr) {
            if (curr == 5) {
                $(this).find("b").addClass('on');
            } else {
                $(this).find("b").eq(curr).prevAll('b').addClass('on').end().nextAll('b').removeClass('on');
            }
        } else {
            $(this).find("b").removeClass();
        }
    });
//璇勪环
    $(".commemt_text button").click(function () {
        var div = $("div.commemt_text"),
            obj = {
                toUid: div.attr("toUid"),
                userId: div.attr("uid"),
                content: div.find("textarea[name='comment']").val(),
                score: div.find("b.on").size(),
                rand: Math.random()
            };
        if (deal_cookie("fn")) {
            if (obj.content.length > 0 && obj.content.length <= 300) {
                $.post("/app/apps/doctorEvaluate.php?action=add", obj, function (json) {
                    if (json.code == 1) {
                        $("textarea[name='comment']").val("");
                        div.find("b").removeAttr("class");
                        json.data.praiseNum = 0;
                        json.data.from_uname = deal_cookie("fn");
                        json.data.ymd = format_time("M鏈圖鏃�", json.data.addTime * 1000);
                        json.data.hm = format_time("h:m", json.data.addTime * 1000);
                        json.data.content = json.data.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        $($("#commentHtml").html().replace(/\{(.+?)\}/ig, function (a, b) {
                            return json.data[b];
                        })).prependTo($(".personal_commemt")).find("b:lt(" + json.data.score + ")").addClass("on");
                    } else {
                        scscms_alert(json.msg, 'error');
                    }
                }, "json");
            } else {
                scscms_alert("璇疯緭鍏�1-300涓瓧绗︼紒", "info");
            }
        } else {
            login();
        }
    });
//鐐硅禐
    $(".personal_commemt p a").click(function () {
        var obj = {target_type: 0, userId: $(this).attr("userid"), target_id: $(this).attr("target_id")},
            _this = $(this), i = _this.find("i").text();
        $.post("/app/apps/doctorComment.php?action=changePraise", obj, function (json) {
            if (json.code == 1) {
                if (!_this.hasClass('on')) {
                    _this.addClass('on').find("i").text(parseInt(i, 10) + 1);
                } else {
                    _this.removeClass("on").find("i").text(parseInt(i, 10) - 1);
                }
            }
        }, "json");
    })
}
//鍩硅骞冲彴
function peixun() {
    public_top();
// 鍩硅棣栭〉鍩硅妗堜緥
    $(".peixun_case li.content").hover(function () {
            $(this).children(".txt").stop().animate({height: "360px"}, 200);
            $(this).find(".txt h3").stop().animate({paddingTop: "120"}, 550);
            $(this).find(".txt p").stop().show();
        },
        function () {
            $(this).children(".txt").stop().animate({height: "50px"}, 200);
            $(this).find(".txt h3").stop().animate({paddingTop: "0px"}, 550);
            $(this).find(".txt p").stop().hide();
        });
// 鍩硅棣栭〉甯歌闂鍒嗙被
    var $tab_li = $('#question_tab ul li');
    $tab_li.hover(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var index = $tab_li.index(this);
        $('div.tab_box > ol').eq(index).show().siblings().hide();
    });
//鍩硅甯歌闂鍒楄〃璇︽儏
    $(".issue_con .main ul li h2").click(function () {
        $(this).toggleClass("issue_down").siblings(".issue_con .main ul li h2").removeClass("issue_up");
        $(this).toggleClass("issue_up").siblings(".issue_con .main ul li h2").removeClass("issue_down");
        $(this).next(".issue_con .main ul li p").slideToggle(300).siblings(".issue_con .main ul li p").slideUp(500);
    });
}
//鍩硅甯歌闂鍒楄〃璇︽儏
function issue(m, n) {
    var tli = document.getElementById("menu" + m).getElementsByTagName("dd");
    var mli = document.getElementById("main" + m).getElementsByTagName("ul");
    for (i = 0; i < tli.length; i++) {
        tli[i].className = i == n ? "on" : "";
        mli[i].style.display = i == n ? "block" : "none";
    }
}
function personal_case() {
    personal_home();
//鏌ョ湅鍏ㄩ儴璇勮
    $(".comment ul").each(function () {
        var size = $(this).find("li:gt(2)").hide().size();
        size > 3 && $(".show_all").show();
    });
    $(".show_all").click(function () {
        $(this).hide().closest("div").find("li").show();
    });
    $(".middle_content").delegate("textarea", "focus", function () {
        $(".comment textarea").css("height", "30px").next("button").hide();
        $(this).css("height", "70px").next("button").show();
    }).delegate(".comment p a", "click", function () {
        var index = $(this).index();
        if (index) {//璇勮鎸夐挳
            $(this).closest("div").find("textarea").trigger("focus");
        } else {//璧�
            var obj = {target_type: 1, userId: $(this).attr("userid"), target_id: $(this).attr("target_id")},
                _this = $(this), i = _this.find("i").text();
            $.post("/app/apps/doctorComment.php?action=changePraise", obj, function (json) {
                if (json.code == 1) {
                    if (!_this.hasClass('on')) {
                        _this.addClass('on').find("i").text(parseInt(i, 10) + 1);
                    } else {
                        _this.removeClass("on").find("i").text(parseInt(i, 10) - 1);
                    }
                }
            }, "json");
        }
    }).delegate(".comment li", "click", function () {
        var name = $(this).find("a:eq(0)").text(),
            href = $(this).find("a:eq(0)").attr("href");
        $(this).closest("div").find("textarea").trigger("focus").attr({
            "placeholder": "鍥炲" + name + " 锛�",
            "touid": $(this).find("a:eq(0)").attr("touid"),
            "toname": name
        });
    }).delegate("button", "click", function () {
        var textarea = $(this).prev("textarea"), ul = $(this).closest("div").find("ul");
        obj = {
            action: "add",
            userId: textarea.attr("userid"),
            toUid: textarea.attr("touid"),
            toEid: textarea.attr("toeid"),
            content: textarea.val(),
            target_type: textarea.attr("target_type"),
            target_id: textarea.attr("target_id")
        };
        if (deal_cookie("fn")) {
            if (obj.content.length > 0 && obj.content.length < 300) {
                if (textarea.attr("placeholder") == "鎴戜篃鏉ヨ涓€鍙�...") {//璇勮
                    $.post("/app/apps/doctorComment.php", obj, function (json) {
                        if (json.code == 1) {
                            textarea.val("");
                            json.data.content = json.data.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            json.data.from_uname = deal_cookie("fn");
                            $('<li><a href="http://www.mycs.cn/space.php?uid="' + obj.userId + ' target="_blank">' + json.data.from_uname + '</a>锛�' + json.data.content + '</li>').appendTo(ul);
                        } else {
                            scscms_alert(json.msg, "error");
                        }
                    }, "json");
                } else {//鍥炲
                    $.post("/app/apps/doctorComment.php", obj, function (json) {
                        if (json.code == 1) {
                            textarea.val("");
                            json.data.content = json.data.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            json.data.from_uname = deal_cookie("fn");
                            $('<li><a href="http://www.mycs.cn/space.php?uid="' + obj.userId + ' target="_blank">' + json.data.from_uname + '</a> 鍥炲 <a href="' + href + '" target="_blank">' + textarea.attr("toname") + '</a>锛�' + json.data.content + '</li>').appendTo(ul);
                        } else {
                            scscms_alert(json.msg, "error");
                        }
                    }, "json");
                }
            } else {
                scscms_alert("璇疯緭鍏�1-300涓瓧绗︼紒");
            }
        } else {
            login();
        }
    });

}
//================================================璧勮鍒嗙被=================================================//
function information_class(id) {
    public_top();
    swwy_select();
    id && $.getJSON("/app/apps/news.php?id=" + id, function (json) {
        var ad1 = json.ad1, ad2 = json.ad2, adTop = json.adTop;
        var adurl = ad1.linkURL;
        if (adurl != "") {//鍒ゆ柇骞垮憡閾炬帴鏄惁涓虹┖
            $(".ad1").html('<a href="' + ad1.linkURL + '" target="_blank"><img src="' + ad1.imageSrc + '" width="267" height="100"  alt="' + ad1.imageAlt + '" /></a>');
        } else {
            $(".ad1").html('<img src="' + ad1.imageSrc + '" width="280" alt="' + ad1.imageAlt + '" />');
        }
        var adurl = ad2.linkURL;
        if (adurl != "") {//鍒ゆ柇骞垮憡閾炬帴鏄惁涓虹┖
            $(".ad2").html('<a href="' + ad2.linkURL + '" target="_blank"><img src="' + ad2.imageSrc + '" width="267" alt="' + ad2.imageAlt + '" /></a>');
        } else {
            $(".ad2").html('<img src="' + ad2.imageSrc + '" width="280" alt="' + ad2.imageAlt + '" />');
        }
        var adurl = adTop.linkURL;
        if (adurl != "") {//鍒ゆ柇骞垮憡閾炬帴鏄惁涓虹┖
            $(".adTop").html('<a href="' + adTop.linkURL + '" target="_blank"><img src="' + adTop.imageSrc + '?imageView2/0/w/1190/h/120/q/100"  alt="' + adTop.imageAlt + '" /></a>');
        } else {
            $(".adTop").html('<img src="' + adTop.imageSrc + '?imageView2/0/w/903/h/120/q/100" alt="' + adTop.imageAlt + '" />');
        }

        var hot_sort = json.hot, recommend = json.recommend, html = "";
        for (i = 0; i < hot_sort.length; i++) {
            html += '<li><a href="' + hot_sort[i].linkURL + '"><i></i>' + hot_sort[i].title + '</a></li>';
        }
        $(".hot_sort_list").html(html);
        html = "";
        for (i = 0; i < recommend.length; i++) {
            html += '<li><a href="' + recommend[i].linkURL + '"><i></i>' + recommend[i].title + '</a></li>';
        }
        $(".recommend_list").html(html);
    });
    isMobileBoolean && $("#information_content embed").each(function () {
        var slef = $(this), flv = slef.attr("src");
        if (flv && flv.indexOf("flv.swf?file=") != -1) {
            slef.after('<video src="' + flv.split("flv.swf?file=")[1] + '" controls="controls" width="' + slef.attr("width") + '" height="' + slef.attr("height") + '">').remove();
        }
    })
}
// article_play 椤甸潰  xiaoying 2015-06-05
function article_play() {
    public_top();
    $(".scs_scroll").scs_scroll();
    $("#flash").flash({
        swf: '/app/templates/media/SwwyPlayer.swf?version=3.2.2.6d&id=' + $("input[name='id']").val() + '&activityid=' + $("input[name='activityid']").val() + '&liveid=' + $("input[name='liveid']").val(),
        wmode: 'opaque', width: "100%", allowFullScreen: true, height: "510", id: 'play'
    });
//瑙嗛绐楀彛鏀瑰彉澶у皬
    $(".flash_button").click(function () {
        var text = $(this).text() == ">";
        $(this).text(text ? "<" : ">");
        $(".flash").width(text ? "100%" : "800");
        $(".flash_info").toggle();
    });
//textarea鏄剧ず涓庨檺鍒惰緭鍏ュ瓧鏁�
    $(".commemt textarea").keydown(function () {
        changeNum();
    }).keyup(function () {
        changeNum();
    });
    function changeNum() {
        var _this = $(".commemt textarea"),
            curLength = _this.val().length;
        if (curLength > 300) {
            _this.val(_this.val().substr(0, 300));
        } else {
            $(".commemt span.count").text(curLength);
        }
    }

    var Object = {
        comment_type: $("input[name='comment_type']").val(),
        comment_cid: $("input[name='comment_cid']").val(),
        id: $("input[name='id']").val()
    };
//鐐硅禐
    $(".flash_peak").click(function () {
        var _this = $(this);
        if (!_this.attr("style")) {
            var i = _this.css("cursor", "default").text();
            $.getJSON("/app/apps/updown.php", Object, function (json) {
                json.code == 1 && _this.text(parseInt(i, 10) + 1) && _this.addClass('flash_on') && _this.removeClass('flash_peak')
            });
        }
    });
//椤跺洖澶�
    $(".comment_list").on("click", "a.comment_peak,a.comment_peaked", function () {
        var _this = $(this);
        if (!_this.attr("style")) {
            var i = _this.css("cursor", "default").text();
            $.getJSON("/app/apps/comment.php?action=up", {id: _this.closest("dl").attr("data-id")}, function (json) {
                json.code == 1 && _this.text(parseInt(i, 10) + 1)
            });
        }
    }).on("click", "a.comment_trample", function () {//璇勮鍥炲鍒楄〃
        var _this = $(this), dd = _this.parent().next();
        dd.toggle();
    }).on("click", "a.cancel", function () {//鍙栨秷璇勮
        $(this).parent().prev('textarea').val('');
        $(this).closest("dd").hide();
    }).on("click", "a.send", function () {//鍥炲璇勮
        var _this = $(this), comment = $.trim(_this.parent().prev().val()),
            page = parseInt($("a.on_page:eq(0)").text() || 1, 10);
        if (comment.length >= 5 && comment.length <= 300) {
            Object.content = comment;
            Object.reply_id = $(this).closest("dl").attr("data-id");
            Object.toUid = $(this).closest("dl").attr("data-uid");
            $.post("/app/newApi/comment.php?action=send", Object, function (json) {
                if (json.code == 1) {
                    json.data.name = deal_cookie("fn");
                    json.data.time = "鍒氬垰";
                    json.data.text = json.data.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    $($("#comment").html().replace(/<\/?li>/g, "").replace(/\{(.+?)\}/ig, function (a, b) {
                        return json.data[b]
                    })).prependTo($(".comment_list ul"));
                    var i = parseInt($("span.totality").text(), 10) + 1;
                    $("span.totality").parent().html("鍏ㄩ儴璇勮 (<span>" + i + "</span>)");
                    $(".comment_send div").text(i + "鏉¤瘎璁�");
                    get_comment(page);//鍙戣瘎璁哄彲浠ュ強鏃舵洿鏂伴〉鐮�
                } else {
                    json.msg == "璇峰厛鐧诲綍" ? login() : scscms_alert(json.msg, 'error');
                }
            }, "json");
        } else {
            scscms_alert("璇疯緭鍏�5鑷�300涓瓧绗︼紒", 'error');
        }
    });
//鍙戣瘎璁�
    $(".commemt input[type='button']").click(function () {
        var comment = $.trim($("textarea[name='comment']").val()),
            page = parseInt($("a.on_page:eq(0)").text() || 1, 10);
        if (comment.length >= 5 && comment.length <= 300) {
            Object.content = comment;
            Object.replyId = $(this).closest("dl").attr("data-id");
            $.post("/app/newApi/comment.php?action=send", Object, function (json) {
                if (json.code == 1) {
                    $("textarea[name='comment']").val("");
                    json.data.name = deal_cookie("fn");
                    json.data.time = "鍒氬垰";
                    json.data.text = json.data.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    $($("#comment").html().replace(/\{(.+?)\}/ig, function (a, b) {
                        return json.data[b]
                    })).prependTo($(".comment_list ul")).find("dl i").remove();
                    $(".comment_list ul").find("li.empty").remove();
                    var i = parseInt($("span.totality").text(), 10) + 1;
                    $("span.totality").parent().html("鍏ㄩ儴璇勮 (<span>" + i + "</span>)");
                    $(".comment_send div").text(i + "鏉¤瘎璁�");
                    get_comment(page);//鍙戣瘎璁哄彲浠ュ強鏃舵洿鏂伴〉鐮�
                } else {
                    json.msg == "璇峰厛鐧诲綍" ? login() : scscms_alert(json.msg, 'error');
                }
            }, "json");
        } else {
            scscms_alert("璇疯緭鍏�5鑷�300涓瓧绗︼紒", 'error');
        }
    });
//璇勮鍒楄〃
    function get_comment(curPage) {
        Object.pageSize = 10;
        Object.page = curPage;
        $.post("/app/newApi/comment.php?action=list", Object, function (json) {
            if (json.code == 1) {
                var total = json.data.total, list = json.data.list, html = $("#comment").html(), str = "", i, l;
                $(".totality").text(total);
                for (i = 0, l = list.length; i < l; i++) {
                    list[i].text = list[i].text.replace(/</g, "").replace(/>/g, "");
                    str += html.replace(/\{(.+?)\}/ig, function (a, b) {
                        return list[i][b]
                    });
                }
                $(".comment_list ul").html(str == "" ? "<li class='empty'>鏆傛棤鏁版嵁</li>" : str).find("dl").each(function () {
                    $(this).attr("data-replyUid") == 0 && $(this).find("i").hide();
                });

//鍒嗛〉
                var countPage = Math.ceil(total / Object.pageSize), arr = [];

                function setPageList(b, e) {
                    for (var i = b; i <= e; i++) {
                        arr.push('<a # ' + (i == curPage ? 'class="on_page"' : '') + '>' + i + '</a>');
                    }
                }

                curPage > 1 && arr.push('<a class="prev_page" #>涓婁竴椤�</a>');
                if (countPage <= 10) {
                    setPageList(1, countPage);
                } else {
                    if (curPage <= 4) {
                        setPageList(1, 5);
                        arr.push('<a #>...</a><a #>' + countPage + '</a>');
                    } else if (curPage >= countPage - 3) {
                        arr.push('<a #>1</a><a #>...</a>');
                        setPageList(countPage - 4, countPage);
                    } else {
                        arr.push('<a #>1</a><a #>...</a>');
                        setPageList(curPage - 2, curPage + 2);
                        arr.push('<a #>...</a><a #>' + countPage + '</a>');
                    }
                }
                curPage < countPage && arr.push('<a class="next_page" #>涓嬩竴椤�</a>');
                $(" .foot_page").html(arr.join("").replace(/#/g, 'href="javascript:void(0)"'));
            }
        }, "json");
    }

    get_comment(1);
//鐐瑰嚮鍒嗛〉
    $(".foot_page").on("click", "a", function () {
        var txt = $(this).text(), page = parseInt($("a.on_page:eq(0)").text(), 10);
        if (!$(this).hasClass("on_page") && txt != "...") {
            if (txt == "涓婁竴椤�") {
                page--;
            } else if (txt == "涓嬩竴椤�") {
                page++;
            } else {
                page = parseInt(txt, 10);
            }
            get_comment(page);
        }
    });
//鏀惰棌
    $(".article_play_main").delegate(".add", "click", function () {
        var self = $(this), code = self.attr("data-code");
        if (deal_cookie("fn")) {
            $.getJSON("/app/apps/createFavor.php" + (code ? "?authCode=" + code : ""), {id: $("input[name='id']").val()}, function (json) {
                if (json.code == 1) {
                    self.text("宸叉敹钘�");
                } else {
                    scscms_alert(json.msg, 'error');
                }
            })
        } else {
            login()
        }
    });
    var qrcode = new QRCode(document.getElementById("qrcode"), {width: 112, height: 112});
    qrcode.makeCode(location.href);

}
//==about.xiaoying.2015.6.11========//
function about() {
    public_top();
    $(".dept a").click(function () {
        if (!$(this).hasClass("on")) {
            $(".job").hide().eq($(this).addClass("on").siblings(".on").removeAttr("class").end().index()).show();
        }
    }).eq(0).trigger('click');
    $(".about_right_list div li").click(function () {
        $(".about_right_list > ul").hide().eq($(this).addClass("on").siblings(".on").removeAttr("class").end().index()).show();
    }).eq(0).click();
    $(".contact_right_list div li").click(function () {
        $(".contact_right_list > ul").hide().eq($(this).addClass("on").siblings().removeAttr("class").end().index()).show();
    }).eq(0).click();
    $(".join_nav").click(function () {
        $(this).toggleClass("join_down").siblings(".join_nav").removeClass("join_up");
        $(this).toggleClass("join_up").siblings(".join_nav").removeClass("join_up");
        $(this).next(".nav_main").slideToggle(300).siblings(".navmain").slideUp(500);
    });
    location.href.replace(/action=contact/i, function () {
        var map = new BMap.Map('allmap'), poi = new BMap.Point(113.360911, 23.18555);
        map.centerAndZoom(poi, 18);
        map.enableScrollWheelZoom();
        var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
            '<img src="/app/templates/index/images/swwy_ico.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
            '鍦板潃锛氬箍宸炲ぉ娌冲尯澶╂簮璺�804鍙疯悓鑺�1968鍒涙剰浜т笟鍥瑼07鏍�<br/>鐢佃瘽锛�020-28935158<br/>绠€浠嬶細鈥滆澶╀笅娌℃湁闅惧鐨勫尰鏈€濈敓鍛界瀛︿笌鍖荤枟鎶€鑳芥彁鍗囦簯骞冲彴銆�' +
            '</div>';
//鍒涘缓妫€绱俊鎭獥鍙ｅ璞�
        var searchInfoWindow = null;
        searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
            title: "鍚嶅尰浼犱笘澶фゼ",
            width: 320,
            height: 105,
            panel: "panel",
            enableAutoPan: true,
            searchTypes: [
                BMAPLIB_TAB_SEARCH,
                BMAPLIB_TAB_TO_HERE,
                BMAPLIB_TAB_FROM_HERE
            ]
        });
        var marker = new BMap.Marker(poi);
        marker.enableDragging();
        marker.addEventListener("click", function (e) {
            searchInfoWindow.open(marker);
        });
        map.addOverlay(marker);
    });
    function removeHTMLTag(str) {
        str = str.replace(/<\/?[^>]*>/g, ''); //鍘婚櫎HTML tag
        str = str.replace(/[ | ]*\n/g, '\n'); //鍘婚櫎琛屽熬绌虹櫧
        str = str.replace(/\n[\s| | ]*\r/g, '\n'); //鍘婚櫎澶氫綑绌鸿
        str = str.replace(/&nbsp;/ig, ''); //鍘绘帀&nbsp;
        str = str.replace(/&nbsp/ig, '');
        return str;
    }

    $(".suggest_but").click(function () {
        if (deal_cookie("fn")) {
            var _this = $(this);
            if (!_this.attr("disabled")) {
                var title = $("input[name='title']").val();
                var content = $("textarea[name='content']").val();
                if (title == "") {
                    scscms_alert("璇疯緭鍏ユ爣棰橈紒", "info");
                } else if (content == "") {
                    scscms_alert("璇疯緭鍏ユ偍鐨勫疂璐靛缓璁紒", "info");
                } else {
                    _this.attr("disabled", "disabled");
                    $.post("/suggest.php?action=add", {content: removeHTMLTag(content), title: title}, function (json) {
                        if (json.code == 1) {
                            scscms_alert("鎰熻阿鎮ㄧ殑瀹濊吹鎰忚锛�", "");
                            $("input[name='title']").val("");
                            $("textarea[name='content']").val("");
                        } else {
                            scscms_alert(json.msg, 'error');
                        }
                        _this.removeAttr("disabled");
                    }, "json");
                }
            }
        } else {
            login();
        }
    })
//鍙嬫儏閾炬帴瀛楃鎴彇
    $('.links_list a span').each(function () {
        var _this = $(this);
        _this.text().length > 9 && _this.text(_this.text().substr(0, 9) + '...');
    });
}
function service() {
    public_top();
}
function doctorLib() {
    public_top();
    index_focus_banner(".banner_flash");
    $('.list_title form button[type="submit"]').click(function () {
        var keyword = $(this).siblings('input[type="text"]').val();
        if (keyword == '杈撳叆鍖荤敓鍚嶅瓧') {
            keyword == '';
        }
        window.location.href = '/doctorLib/1-0-' + keyword + '.html';
        return false;
    });
    pager2();

}
function courseLib() {
    public_top();
    index_focus_banner(".banner_flash");
    $('.list_title form button[type="submit"]').click(function () {
        var keyword = $(this).siblings('input[type="text"]').val();
        if (keyword == '杈撳叆鍖荤敓鍚嶅瓧') {
            keyword == '';
        }
        window.location.href = '/courseLib/1-0-' + keyword + '.html';
        return false;
    });
    pager2();
}
function pager2() {
//棣栭〉, 鍚嶅尰姹� , 璇剧▼搴� 蹇€熻烦杞鐞�
    var pages = $("input[name='page_count']").val(), num = $("input[name='page_num']").val(), i = 1, htmlstr = "",
        data = [];
    while (i <= pages) {
        var o = {id: i, text: '绗�' + i + '椤�'};
        data.push(o);
        i++;
    }
    $("#jump").combobox({
        data: data,
        valueField: 'id',
        textField: 'text',
        onSelect: function (n) {
            n && location.replace($("input[name='page_onchange']").val().replace('{page}', n.id));
        }
    });
    setTimeout(function () {
        $("#jump").combobox("setValue", num)
    }, 2);
}

function live_list() {
    public_top();
    $(".live_list li >p").each(function () {
        var str = $(this).text();
        if (str.length > 50) {
            $(this).text(str.substr(0, 47) + '...');
        }
    });
    $('.enter').click(function () {
        var permission = $(this).closest('li').attr('data-ext_permission');
        var room_id = $(this).closest('li').attr('data-id');
        var room_extData = $(this).closest('li').attr('data-ext');
        if (permission == 1) {
//data-ext_permission = 1 鎵€鏈変汉鍙鐪�
            window.location.href = "?action=anchor&id_str=" + room_id;
        } else if (permission == 2) {
//data-ext_permission = 2 闇€瑕佺櫥褰�
            deal_cookie("fn") ? window.location.href = "?action=anchor&id_str=" + room_id + "&extData=" + room_extData : login();
        } else {
//data-ext_permission = 3 闇€瑕侀獙璇佺爜
            var zIndex = 8000;//涓嶈兘澶珮锛屼細鎸′綇涓嬫媺妗�
            var mask = $('<div class="mask_layer" style="z-index: ' + zIndex++ + '"></div>').appendTo($("body"));
            var s = $('<div class="scs_alert code_alert" style="z-index: ' + zIndex++ + '"><div class="alert_title"><a href="javascript:void(0)"></a>楠岃瘉瑙傜湅</div><div class="alert_txt">楠岃瘉鐮侊細<input type="text" name="check_word"/></div><div class="alert_bottom"><button class="alert_ok">纭畾</button><button class="alert_close">鍙栨秷</button></div></div>').appendTo($("body"));
            s.data("close", 1).css("margin-top", -s.height() / 2 + "px");
            var set_t = setInterval(function () {
                mask.css({height: $(document).height()});
            }, 100);

            function close_info(fun) {
                if (s.data("close") == 1) {
                    clearInterval(set_t);
                    mask.remove();
                    s.data("close", 0).fadeOut("fast", function () {
                        $(this).remove();
                    });
                    typeof(fun) == "function" && fun();
                }
            }

            s.find(".alert_ok").click(function () {
                var check_word = $.trim($('input[name="check_word"]').val());
                if (check_word.length != 0) {
                    close_info(function () {
                        $.getJSON('/app/newApi/V2/live.php?action=check', {
                            check_word: check_word,
                            room_id: room_id
                        }, function (json) {
                            json.code == 1 ? window.location.href = "?action=anchor&id_str=" + room_id : scscms_alert(json.msg, 'error');
                        })
                    });
                }
            });
            s.find(".alert_close,a").click(function () {
                close_info(1000);
            });
        }
    })
}
//================================================鍥剧墖鍔犺浇瀹屽嚱鏁板鐞�=================================================//
function imgLoad(url, obj, callback) {
    if (!url) return;
    var img = new Image();
    img.original = obj.src;
    if (img.complete) {
        callback(url, obj);
    } else {
        img.onload = function () {
            img.onload = null;
            callback(url, obj);
        }
    }
    img.onerror = function () {
        img.onload = null;
        callback(img.original, obj);
    };
    img.src = url;
}
//================================================鍐呭鎸夐珮搴︽埅鍙�=================================================//
function cut_out(selector, h) {
    $(selector).each(function () {
        var _this = $(this);
        while (_this.height() > h) {
            _this.text(_this.text().replace(/[\s\S]\.*$/, "..."));
        }
    });
}
//================================================鏂伴椈鐒︾偣鍔ㄧ敾=================================================//
function index_focus_banner(cls) {
    /*banner*/
    $(cls).each(function () {
        var banner = $(this), li = banner.find("ul>li").hide(), l = li.size();
        li.first().show();
        if (l > 1) {
            $('<div><ol><li class="on">' + new Array(l).join("</li><li>") + '</li></ol></div>').appendTo(banner.hover(function () {
                banner.data("stop", 1)
            }, function () {
                banner.data("stop", 0)
            }));
            $("ol li").on("click", function () {
                !this.className && $(this).siblings().removeAttr("class").end().addClass("on") && li.stop().hide().eq($(this).index()).show();
            });
            setInterval(function () {
                if (!banner.data("stop")) {
                    var o = li.filter(":visible"), i = li.index(o) + 1;
                    i >= li.size() && (i = 0);
                    li.eq(i).css({zIndex: 1, display: "block", opacity: 0}).animate({opacity: 1}, 1000, function () {
                        $(this).css({zIndex: 0});
                        o.hide()
                    });
                    $("ol li", banner).eq(i).addClass("on").siblings().removeAttr("class");
                }
            }, 4000);
        }
    })
}
//================================================涓嬫媺妗嗛€夋嫨=================================================//
function swwy_select() {
    $(".swwy_select").delegate("li", "click", function () {
        var _p = $(this).parent();
        if (_p.data("first") || $(this).index()) {
            _p.prepend($(this).removeAttr("style")).css({height: 30}).next().val($(this).attr("data-value"));
            _p.data("first") ? _p.removeData("first") : location.replace($(this).attr("data-url"));
        } else {
            _p.css({height: "auto"});//鎵撳紑
        }
    }).delegate("li", "hover", function () {
        $(this).siblings(":gt(0)").css("background-color", "#fff");
        if ($(this).index()) {
            $(this).css("background-color", "#f0f1f2");
        }
    }).mouseleave(function () {
        $("ul", this).css({height: 30}).children().removeAttr("style");
    }).each(function () {
        var _this = $(this), v = _this.attr("data-value");
        _this.append('<input type="hidden" name="' + _this.attr("data-name") + '" value="' + v + '" />').width(_this.find("ul").data("first", 1).width() + 25)
            .find("li[data-value='" + v + "']").trigger("click");
    });
}

//====================================鍏敤鍑芥暟========================================//
// 浣滅敤锛歝ookie璇诲啓鍑芥暟 鏃ユ湡锛�2013-12-04
function deal_cookie(name, value, options) {
    if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
            } else {
                date = options.expires
            }
            expires = "; expires=" + date.toUTCString()
        }
        var path = options.path ? "; path=" + (options.path) : "";
        var domain = options.domain ? "; domain=" + (options.domain) : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    } else {
        var cookieValue = "";
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                if (cookie.substring(0, name.length + 1) == (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return cookieValue
    }
}
//================================================jq鎻掍欢swf鎻掍欢====================================//
function thisMovie(e) {
    return !~navigator.appName.indexOf("Microsoft") ? document[e] : $("#" + e)[0]
}
// jQuery SWFObject v1.1.1 MIT/GPL @jon_neal
// http://jquery.thewikies.com/swfobject
(function (f, h, i) {
    function k(a, c) {
        var b = (a[0] || 0) - (c[0] || 0);
        return b > 0 || !b && a.length > 0 && k(a.slice(1), c.slice(1))
    }

    function l(a) {
        if (typeof a != g)return a;
        var c = [], b = "";
        for (var d in a) {
            b = typeof a[d] == g ? l(a[d]) : [d, m ? encodeURI(a[d]) : a[d]].join("=");
            c.push(b)
        }
        return c.join("&")
    }

    function n(a) {
        var c = [];
        for (var b in a)a[b] && c.push([b, '="', a[b], '"'].join(""));
        return c.join(" ")
    }

    function o(a) {
        var c = [];
        for (var b in a)c.push(['<param name="', b, '" value="', l(a[b]), '" />'].join(""));
        return c.join("")
    }

    var g = "object", m = true;
    try {
        var j = i.description || function () {
                return (new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
            }()
    } catch (p) {
        j = "Unavailable"
    }
    var e = j.match(/\d+/g) || [0];
    f[h] = {
        available: e[0] > 0,
        activeX: i && !i.name,
        version: {
            original: j,
            array: e,
            string: e.join("."),
            major: parseInt(e[0], 10) || 0,
            minor: parseInt(e[1], 10) || 0,
            release: parseInt(e[2], 10) || 0
        },
        hasVersion: function (a) {
            a = /string|number/.test(typeof a) ? a.toString().split(".") : /object/.test(typeof a) ? [a.major, a.minor] : a || [0, 0];
            return k(e, a)
        },
        encodeParams: true,
        expressInstall: "expressInstall.swf",
        expressInstallIsActive: false,
        create: function (a) {
            if (!a.swf || this.expressInstallIsActive || !this.available && !a.hasVersionFail)return false;
            if (!this.hasVersion(a.hasVersion || 1)) {
                this.expressInstallIsActive = true;
                if (typeof a.hasVersionFail == "function")if (!a.hasVersionFail.apply(a))return false;
                a = {
                    swf: a.expressInstall || this.expressInstall,
                    height: 137,
                    width: 214,
                    flashvars: {
                        MMredirectURL: location.href,
                        MMplayerType: this.activeX ? "ActiveX" : "PlugIn",
                        MMdoctitle: document.title.slice(0, 47) + " - Flash Player Installation"
                    }
                }
            }
            attrs = {
                data: a.swf,
                type: "application/x-shockwave-flash",
                id: a.id || "flash_" + Math.floor(Math.random() * 999999999),
                width: a.width || 320,
                height: a.height || 180,
                style: a.style || ""
            };
            m = typeof a.useEncode !== "undefined" ? a.useEncode : this.encodeParams;
            a.movie = a.swf;
            a.wmode = a.wmode || "opaque";
            delete a.fallback;
            delete a.hasVersion;
            delete a.hasVersionFail;
            delete a.height;
            delete a.id;
            delete a.swf;
            delete a.useEncode;
            delete a.width;
            var c = document.createElement("div");
            c.innerHTML = ["<object ", n(attrs), ">", o(a), "</object>"].join("");
            return c.firstChild
        }
    };
    f.fn[h] = function (a) {
        var c = this.find(g).andSelf().filter(g);
        /string|object/.test(typeof a) && this.each(function () {
            var b = f(this), d;
            a = typeof a == g ? a : {swf: a};
            a.fallback = this;
            if (d = f[h].create(a)) {
                b.children().remove();
                b.html(d)
            }
        });
        typeof a == "function" && c.each(function () {
            var b = this;
            b.jsInteractionTimeoutMs = b.jsInteractionTimeoutMs || 0;
            if (b.jsInteractionTimeoutMs < 660) b.clientWidth || b.clientHeight ? a.call(b) : setTimeout(function () {
                f(b)[h](a)
            }, b.jsInteractionTimeoutMs + 66)
        });
        return c
    }
})(jQuery, "flash", navigator.plugins["Shockwave Flash"] || window.ActiveXObject);
var zIndex = 8000;//涓嶈兘澶珮锛屼細鎸′綇涓嬫媺妗�
function scscms_alert(msg, sign, ok, can) {
    sign = ~"ok,warn,info,error,confirm".indexOf(sign) ? sign : "info";
    var mask = $('<div class="mask_layer" style="z-index: ' + zIndex++ + '"></div>').appendTo($("body"));
    var s = $('<div class="scs_alert" style="z-index: ' + zIndex++ + '"><div class="alert_title"><a href="javascript:void(0)"></a>鎻愮ず</div><div class="alert_txt"><span class="icon_' + sign + '"></span><p>' + msg + '</p></div><div class="alert_bottom"><button class="alert_ok">纭畾</button>' + (sign == "confirm" ? "<button class=\"alert_close\">鍙栨秷</button>" : "") + '</div></div>').appendTo($("body"));
    s.data("close", 1).css("margin-top", -s.height() / 2 + "px").find("button:eq(0)").focus();
    var set_t = setInterval(function () {
        mask.css({height: $(document).height()});
    }, 100);
    typeof can == "number" && setTimeout(function () {
        close_info(ok)
    }, can * 1000);
    function close_info(fun) {
        if (s.data("close") == 1) {
            clearInterval(set_t);
            mask.remove();
            s.data("close", 0).fadeOut("fast", function () {
                $(this).remove();
            });
            typeof(fun) == "function" && fun();
        }
    }

    s.find(".alert_ok").click(function () {
        close_info(ok);
    });
    s.find(".alert_close,a").click(function () {
        close_info(can);
    });
}
//================================================鏍煎紡鍖栨椂闂�================================================//
function format_time(f, s) {
    var t = s && new Date(s), k;
    (!t || t == "Invalid Date") && (t = new Date());
    var obj = {
        Y: t.getFullYear(),
        M: t.getMonth() + 1,
        D: t.getDate(),
        h: t.getHours(),
        m: t.getMinutes(),
        s: t.getSeconds()
    };
    return f.replace(/([a-zA-Z])/g, function (a) {
        k = obj[a];
        return k ? (a == "Y" ? k : ("0" + k).slice(-2)) : a;
    });
}
function flash_call_huodong(btnStr, url) {
    $('<div class="duodong_form"><h3>灏婃暚鐨勭敤鎴凤細<br>瀵逛笉璧凤紝鎮ㄩ渶瑕�' + btnStr + '娲诲姩鎵嶅彲浠ヨ鐪嬭棰�</h3><button type="button">鐐瑰嚮' + btnStr + '娲诲姩</button></div>').appendTo($("#flash")).find("button").click(function () {
        window.open(url);
    });
}
//================================================鏀粯=================================================//
function flash_call_pay(price) {
    if ($(".buy_form").size()) {
        $(".buy_form").show();
        return false;
    }
    var html = '<div class="order_form"><ul><li><h2><a href="javascript:void(0)"></a>纭璁㈠崟</h2></li>' +
        '<li><div><i></i>閫夋嫨鏀粯鏂瑰紡</div><input type="radio" value="alipay" name="payment" checked="checked" /> <span>鏀粯瀹�</span>' +
        '<div><i></i>鎬婚噾棰�</div><span style="margin-left: 35px;font-size:16px">' + price + '.00 鍏�</span></li>' +
        '<li class="but"><form action="/payConfirm.php" target="_blank"><button type="submit">纭鏀粯</button>' +
        '<input type="hidden" value="' + $("input[name=comment_type]").val() + '" name="comment_type" />' +
        '<input type="hidden" value="' + $("input[name=buy_cid]").val() + '" name="buy_cid" />' +
        '</form></li></ul><ul><li><h2><a href="javascript:void(0)"></a>娓╅Θ鎻愰啋</h2></li>' +
        '<li style="padding-top: 10px"><div class="sign"></div>' +
        '<div>浠樻澶勭悊涓�...</div><p>鏀粯瀹屾垚鍓嶈涓嶈鍏抽棴绐楀彛</p><p>鏀粯瀹屾垚鍚庤鏍规嵁缁撴灉閫夋嫨</p></li>' +
        '<li class="but"><button type="button">鏀粯鎴愬姛</button><button type="button" class="cancel">鏀粯澶辫触 閲嶆柊鏀粯</button></li></ul>' +
        '<ul><li><h2><a href="javascript:void(0)"></a>绔嬪埢鐢宠璐拱</h2></li><li><div><i></i>鐣欒█</div></li><li><textarea name="remark"></textarea></li>' +
        '<li class="but"><button type="button">鐢宠绠＄悊鍛樿喘涔�</button></li></ul></div>';
    $("body").append(html);
    $('<div class="buy_form"><h2>椹笂鏀粯鍗冲彲瀹屾暣瑙傜湅</h2><div>' + price + '.00<span>鍏�</span></div><button type="button">绔嬪嵆浠樿垂</button></div>').appendTo($("#flash")).find("button")
        .click(function () {
            $(".order_form").show();
            if (deal_cookie("fut") == 3) {
                $(".order_form ul").hide().eq(2).show();
            }
        });
    $(".order_form a").click(function () {
        $(".order_form").hide()
    });//鍏抽棴
    $(".order_form button").on("click", function () {
        var _this = $(this), _txt = $.trim(_this.text());
        if ("纭鏀粯" == _txt) {
            _this.closest("ul").hide().next().show();
        } else if ("鐢宠绠＄悊鍛樿喘涔�" == _txt) {
            var obj = {
                remark: $.trim($("textarea[name='remark']").val()),
                goodsType: $("input[name='goodsType']").val(),
                goodsId: $("input[name='goodsId']").val(),
                goodsName: $("input[name='goodsName']").val()
            };
            $.post("/app/apps/applyBuy.php", obj, function (json) {
                1 == json.code ? scscms_alert('鐢宠鎴愬姛锛岃绛夊緟绠＄悊鍛樻壒澶嶏紒', 'ok') : scscms_alert(json.msg, 'error');
                $(".order_form").hide().find("textarea").val("");
            }, "json");
        } else {
            $(".order_form,.buy_form").hide();
            "鏀粯鎴愬姛" == _txt && thisMovie("play").web_afresh();
        }
    });
}
function setLogId(params) {
//console.log(params);
    var viewTime = $("input[name='viewTime']").val(), videoTimeSpot = $("input[name='videoTimeSpot']").val(),
        data = {viewTime: viewTime, videoTimeSpot: videoTimeSpot, logId: params[2]};
    if (params[1] == "start") {
//瑙嗛寮€濮�
        $("input[name='logId']").val(params[2]);

    } else if (params[1] == "end") {
//瑙嗛缁撴潫
        if (params[2]) $.ajax({type: 'POST', url: "/app/apps/addStudyLog.php?action=end", data: data, async: false});
    } else if (params[1] == "end_task") {
//鏁翠釜鑰冩牳缁撴潫
        if (params[2]) $.ajax({
            type: 'POST',
            url: "/app/apps/addStudyLog.php?action=end_task",
            data: data,
            async: false
        })
    }
}
function set_time(params) {
    $("input[name='viewTime']").val(params[1]);
    $("input[name='videoTimeSpot']").val(params[2]);
}
function flash2js(cmd) {
    var params = cmd.split(",");
    if (params[0] == "set_log_id") {
        setLogId(params);
    } else if (params[0] == "set_time") {
        set_time(params);
    }
}

//================================================婊氬姩鏉�=================================================//
(function ($) {
    $.extend($.fn, {
        scs_scroll: function (obj, val) {
            var _this = $(this);
            _this.each(function () {
                var _self = $(this), i_outH = _self.height(), i_inH = _self.children(":first").height(),
                    i_percentage = i_outH / i_inH, _data = _self.data("scroll"), _move = false, _y;
                if (i_percentage < 1) {
                    if ("undefined" == typeof _data) {
                        _data = {div: _self.children(), outHeight: i_outH, inHieght: i_inH};
                        _data.bg = $('<div class="scs_scroll_bg" style="height: ' + i_outH + 'px"></div>').appendTo(_self)
                            .mousedown(function (e) {
                                _data = $(this.parentNode).data("scroll");
                                _y = parseInt(e.pageY - $(this).offset().top - _data.bar.height() / 2);
                                _y < 0 && (_y = 0);
                                _y > _data.max && (_y = _data.max);
                                _data.bar.css({top: _y});
                                _data.div.css({top: -1 * _y / _data.max * (_data.inHieght - _data.outHeight)});
                            }).hover(function () {
                                $(this).css("background-color", "#e9e9e9")
                            }, function () {
                                $(this).css("background-color", "#f2f2f2")
                            });
                        _data.bar = $('<div class="scs_scroll_bar" style="height:' + i_percentage * i_outH + 'px"></div>').appendTo(_self)
                            .mousedown(function (e) {
                                _data = $(this.parentNode).data("scroll");
                                _move = true;
                                _y = e.pageY - parseInt($(this).css("top"));
                            }).mousemove(function (e) {
                                var y = e.pageY - _y;
                                if (_move && y >= 0 && y <= _data.max) {
                                    $(this).css({top: y});
//婊氬姩鏁堟灉
                                    _data.div.css({top: -1 * y / _data.max * (_data.inHieght - _data.outHeight)});
                                }
                            }).mouseup(function () {
                                _move = false;
                            }).mouseleave(function () {
                                _move = false;
                            });
                        _data.max = (1 - i_percentage) * i_outH;
                        _self.data("scroll", _data);
                        function scrollFunc(e) {
                            if (_data.bar.is(":visible")) {
                                e = e || window.event;
                                var direct = e.wheelDelta || e.detail || 0, t = parseInt(_data.div.css("top")) || 0,
                                    max = _data.outHeight - _data.inHieght,
                                    isFirefox = navigator.userAgent.toLowerCase().match(/firefox/);
                                isFirefox == null ? t += 30 * (direct < 0 ? -1 : 1) : t += 30 * (direct < 0 ? 1 : -1);//榧犳爣婊戣疆鍏煎Chrome
//t += 30 * (direct < 0 ? 1 : -1);
                                t < max && (t = max);
                                t > 0 && (t = 0);
                                _data.div.css("top", t);
                                _data.bar.css("top", t / max * _data.max);
                                e.preventDefault && e.preventDefault();//闃绘婊氬姩浜嬩欢鍐掓场
                                e.cancelBubble = true;//IE闃绘婊氬姩浜嬩欢鍐掓场
                            }
                            return false;//IE浣庣増鏈樆姝㈡粴鍔ㄤ簨浠跺啋娉�
                        }

                        document.addEventListener && this.addEventListener("DOMMouseScroll", scrollFunc, false);
                        this.onmousewheel = scrollFunc;
                    }
                    if (i_inH != _data.inHieght || i_outH != _data.outHeight) {
                        _data.max = (1 - i_percentage) * i_outH;
                        _y = parseInt(_data.bar.css("top"), 10);
                        if (_y > _data.max) {
                            _y = _data.max;
                            _data.div.css({top: -1 * _y / _data.max * (i_inH - i_outH)});
                        }
                        _data.bar.css({top: _y, height: i_percentage * i_outH});
                        _data.inHieght = i_inH;
                        _data.outHeight = i_outH;
                        _self.data("scroll", _data);
//鍙兘闇插簳浜�
                        if (i_inH < i_outH + Math.abs(_data.div.position().top)) {
                            _data.bar.css({top: _data.max});
                            _data.div.css({top: i_outH - i_inH});
                        }
                    }
                } else if ("object" == typeof _data) {
                    _data.bg.remove();
                    _data.bar.remove();
                    _self.children(":first").css({top: 0});
                    _self.removeData("scroll");//鐩存帴鍒犻櫎鍏冪礌骞剁Щ闄ata
                }
            });
            setTimeout(function () {
                _this.scs_scroll()
            }, 200);
            return _this;
        }
    });
})(jQuery);



