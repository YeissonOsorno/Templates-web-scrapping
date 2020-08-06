(function () {
    var out = {};
    out.pic = true;
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 2,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var html_jobs = document.querySelectorAll("div.newArrivals");
    var jobs = []; for (var x in html_jobs) {
      if (typeof html_jobs[x] == "function") continue;
      if (typeof html_jobs[x] == "number") continue;
      var job = {};
      var elem = html_jobs[x];
      let locs = elem.querySelector('div.place').textContent.trim().replace(/ /g, '').split('/');
      locs.forEach(locF => {
        let jobx = {}
  
        jobx.title = elem.querySelector("h3.caption").textContent.trim();
        if (jobx.title == undefined || jobx.title.trim() == "") jobx.title = elem.querySelector('div.caption').textContent.trim();
        /* Clean Job title */
        jobx.title = jobx.title.replace(/\[.*?\]/g, '').replace(/\＜.*?\＞/g, '').replace(/\《.*?\》/g, '').replace(/\（.*?\）/g, '').replace(/\【.*?\】/g, '');;
        jobx.title = jobx.title.replace(/\≪.*?\≫/g, '');
        jobx.title = jobx.title.replace(/★|◇|◎|♪|◆|～OK|☆|＊|■|○|✨|✿|^|�|～|＼|…/gi, "");
  
        jobx.url = elem.querySelector("h3.caption>a").href.trim();
        jobx.location = replaceLocation(locF);
        /* validate if take some location */
        if(jobx.location.length >25)// If contain large text, this location is wrong
          jobx.location = "日本";
        else if(jobx.location.length < 1)
          jobx.location = "日本";
        else
          jobx.location = jobx.location+" 日本";
  
        /* Extract Empname and validate if exists */
        jobx.source_empname = elem.querySelector("div.ttl.clf h2 a").textContent.trim().replace(/\＜.*?\＞/g, '').replace(/\《.*?\》/g, '').replace(/\（.*?\）/g, '').replace(/\【.*?\】/g, '');
        if (jobx.source_empname.length<1 ) jobx.source_empname = "Sangyo.net"; // JobBoard Empname            
  
        jobx.temp = 1;
  
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();            
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
  
        if(jobx.title.length > 0 && jobx.location.length > 0) 
          jobs.push(jobx);
  
      })
    }
  
    out["jobs"] = jobs;
    out["pass_it"]["jobs"] = jobs.length;
    return out;
  })();
  function replaceLocation(locationInput) {
    locationInput = locationInput.replace("（地図）", "");
    locationInput = locationInput.replace("求人", "").trim();
    locationInput = locationInput.replace("京急", "").trim();
    locationInput = locationInput.replace("他各", "").trim();
    locationInput = locationInput.replace("全国", "").trim();  // todo el país
    locationInput = locationInput.replace("空港", "").trim(); //aeropuerto
    locationInput = locationInput.replace("所在", "").trim();//hotel
    locationInput = locationInput.replace("徒歩", "").trim();//Caminar
    locationInput = locationInput.replace("周辺エリアで", "");  // en los alrededores
    locationInput = locationInput.replace(/無料シャトルバス/gi, "").trim();
    locationInput = locationInput.replace(/の営業所/gi, "").trim();
    locationInput = locationInput.replace(/から徒歩/gi, "").trim();
    locationInput = locationInput.replace(/より徒歩/gi, "").trim();
    locationInput = locationInput.replace(/地下鉄/gi, "").trim();
    locationInput = locationInput.replace(/アクセス/gi, "").trim();
    locationInput = locationInput.replace(/ください/gi, "").trim();
    locationInput = locationInput.replace(/本社お/gi, "").trim();
    locationInput = locationInput.replace(/を参照/gi, "").trim();
    locationInput = locationInput.replace(/が最寄/gi, "").trim();
    locationInput = locationInput.replace(/オフィス/gi, "").trim();
    locationInput = locationInput.replace(/住所 /gi, "").trim();
    locationInput = locationInput.replace(/その他/gi, "").trim();
    locationInput = locationInput.replace(/メトロ/gi, "").trim();
    locationInput = locationInput.replace(/時間/gi, "").trim();
    locationInput = locationInput.replace(/本社/gi, "").trim();
    locationInput = locationInput.replace(/直結/gi, "").trim();
    locationInput = locationInput.replace(/以内/gi, "").trim();
    locationInput = locationInput.replace(/程度/gi, "").trim();
    locationInput = locationInput.replace(/無料/gi, "").trim();
    locationInput = locationInput.replace(/勤務/gi, "").trim();
    locationInput = locationInput.replace(/で約/gi, "").trim();
    locationInput = locationInput.replace(/バス/gi, "").trim();
    locationInput = locationInput.replace(/など/gi, "").trim();
    locationInput = locationInput.replace(/ビル/gi, "").trim();
    locationInput = locationInput.replace(/より/gi, "").trim();
    locationInput = locationInput.replace(/各/gi, "").trim();
    locationInput = locationInput.replace(/■/gi, "").trim();
    locationInput = locationInput.replace(/★/gi, "").trim();
    locationInput = locationInput.replace(/☆/gi, "").trim();
    locationInput = locationInput.replace(/：/gi, "").trim();
    locationInput = locationInput.replace(/！/gi, "").trim();
    locationInput = locationInput.replace(/▼/gi, "").trim();
    locationInput = locationInput.replace(/◆/gi, "").trim();
    locationInput = locationInput.replace(/◇/gi, "").trim();
    locationInput = locationInput.replace(/♪/gi, "").trim();
    locationInput = locationInput.replace(/＜/gi, "").trim();
    locationInput = locationInput.replace(/＞/gi, "").trim();
    locationInput = locationInput.replace(/／/gi, "").trim();
    locationInput = locationInput.replace(/－/gi, "").trim();
    locationInput = locationInput.replace(/━/gi, "").trim();
    locationInput = locationInput.replace(/-/gi, "").trim();
    locationInput = locationInput.replace(/ＪＲ/gi, "").trim();
    locationInput = locationInput.replace(/欄/gi, "").trim();
    locationInput = locationInput.replace(/朝/gi, "").trim();
    locationInput = locationInput.replace(/JR/gi, "").trim();
    locationInput = locationInput.replace(/線/gi, "").trim();
    locationInput = locationInput.replace(/駅/gi, "").trim();
    locationInput = locationInput.replace(/分/gi, "").trim();
    locationInput = locationInput.replace(/地/gi, "").trim();
    locationInput = locationInput.replace(/〒/gi, "").trim();
    locationInput = locationInput.replace(/0/gi, "").trim();
    locationInput = locationInput.replace(/1/gi, "").trim();
    locationInput = locationInput.replace(/2/gi, "").trim();
    locationInput = locationInput.replace(/3/gi, "").trim();
    locationInput = locationInput.replace(/4/gi, "").trim();
    locationInput = locationInput.replace(/5/gi, "").trim();
    locationInput = locationInput.replace(/6/gi, "").trim();
    locationInput = locationInput.replace(/7/gi, "").trim();
    locationInput = locationInput.replace(/8/gi, "").trim();
    locationInput = locationInput.replace(/9/gi, "").trim();
  
  
    if (locationInput.indexOf('北海道') > -1) { locationInput = "北海道"; }//Hokkaido
    if (locationInput.indexOf('関東') > -1) { locationInput = "関東"; }//Kanto
    if (locationInput.indexOf('中部') > -1) { locationInput = "中部"; }//Chubu
    if (locationInput.indexOf('近畿') > -1) { locationInput = "近畿"; }//Kinki
    if (locationInput.indexOf('中国') > -1) { locationInput = "中国"; }//Chugoku
    if (locationInput.indexOf('四国') > -1) { locationInput = "四国"; }//Shikoku
    if (locationInput.indexOf('東北') > -1) { locationInput = "東北地方"; }// Tohoku
    if (locationInput.indexOf('名古屋') > -1) { locationInput = "名古屋"; } // Nagoya
    if (locationInput.indexOf('丸亀') > -1) { locationInput = "丸亀市"; } // Marugame
    if (locationInput.indexOf('関西') > -1) { locationInput = "丸亀市"; } // Kansai
    if (locationInput.indexOf('那覇') > -1) { locationInput = "丸亀市"; } // Naha
    if (locationInput.indexOf('金沢市') > -1) { locationInput = "金沢市"; } // Kanazawa
    if (locationInput.indexOf('白山市') > -1) { locationInput = "白山市"; } // Hakusan
    if (locationInput.indexOf('九州') > -1) { locationInput = "九州"; }//Kyushu 
    if (locationInput.indexOf('上田市') > -1) { locationInput = "上田市"; }//Ueda
    if (locationInput.indexOf('九州・沖縄') > -1) { locationInput = "九州・沖縄"; }//Kyushu y Okinawa
    if (locationInput.indexOf('青森') > -1) { locationInput = "青森 東北地方"; }//Aomori
    if (locationInput.indexOf('岩手') > -1) { locationInput = "岩手 東北地方"; }//Iwate
    if (locationInput.indexOf('宮城') > -1) { locationInput = "宮城 東北地方"; }//Miyagi
    if (locationInput.indexOf('秋田') > -1) { locationInput = "秋田 東北地方"; }//Akita
    if (locationInput.indexOf('山形') > -1) { locationInput = "山形 東北地方"; }//Yamagata
    if (locationInput.indexOf('福島') > -1) { locationInput = "福島 東北地方"; }//Fukushima
    if (locationInput.indexOf('福島市') > -1) { locationInput = "福島 東北地方"; }//Fukushima
    if (locationInput.indexOf('茨城') > -1) { locationInput = "茨城 関東"; }//Ibaraki
    if (locationInput.indexOf('栃木') > -1) { locationInput = "栃木 関東"; }//Tochigu
    if (locationInput.indexOf('群馬') > -1) { locationInput = "群馬 関東"; }//Gunma
    if (locationInput.indexOf('埼玉') > -1) { locationInput = "埼玉 関東"; }//Saitama
    if (locationInput.indexOf('千葉') > -1) { locationInput = "千葉 関東"; }//Chiba
    if (locationInput.indexOf('東京') > -1) { locationInput = "東京"; }//Tokio
    if (locationInput.indexOf('首都圏') > -1) { locationInput = "東京 関東"; }//Tokio
    if (locationInput.indexOf('神奈川') > -1) { locationInput = "神奈川 関東"; }//Kanagawa
    if (locationInput.indexOf('新潟') > -1) { locationInput = "新潟 中部"; }//Niigata
    if (locationInput.indexOf('富山') > -1) { locationInput = "富山 中部"; }//Toyama
    if (locationInput.indexOf('石川') > -1) { locationInput = "石川 中部"; } //Ishikawa
    if (locationInput.indexOf('福井') > -1) { locationInput = "福井 中部"; } //Fukui
    if (locationInput.indexOf('沖縄') > -1) { locationInput = "沖縄 中部"; }//Yamanashi
    if (locationInput.indexOf('長野') > -1) { locationInput = "長野 中部"; }//Nagano
    if (locationInput.indexOf('岐阜') > -1) { locationInput = "岐阜県 中部"; }//Gifu
    if (locationInput.indexOf('静岡') > -1) { locationInput = "静岡 中部"; }//Shizuika
    if (locationInput.indexOf('愛知') > -1) { locationInput = "愛知 中部"; }//Aichi
    if (locationInput.indexOf('三重') > -1) { locationInput = "三重 近畿"; }//Mie
    if (locationInput.indexOf('滋賀') > -1) { locationInput = "滋賀 近畿"; }//Shiga
    if (locationInput.indexOf('京都') > -1) { locationInput = "京都 近畿"; }//Kyoto
    if (locationInput.indexOf('大阪') > -1) { locationInput = "大阪 近畿"; }//Osaka
    if (locationInput.indexOf('兵庫') > -1) { locationInput = "兵庫 近畿"; }//Hyogo
    if (locationInput.indexOf('奈良') > -1) { locationInput = "奈良 近畿"; }//Nara
    if (locationInput.indexOf('美濃市') > -1) { locationInput = "岐阜県 中部"; }//Gifu
    if (locationInput.indexOf('揖斐川町') > -1) { locationInput = "岐阜県 中部"; }//Ibigawa = Gifu
    if (locationInput.indexOf('輪之内町') > -1) { locationInput = "岐阜県 中部"; }//Wanouchi= Gifu
    if (locationInput.indexOf('和歌山県') > -1) { locationInput = "和歌山県 近畿"; }//Wakayama
    if (locationInput.indexOf('鳥取') > -1) { locationInput = "鳥取 中国"; }//Tottori
    if (locationInput.indexOf('島根') > -1) { locationInput = "島根 中国"; }//Shimane
    if (locationInput.indexOf('岡山') > -1) { locationInput = "岡山 中国"; }//Okayama
    if (locationInput.indexOf('広島') > -1) { locationInput = "広島 中国地方"; }//Hiroshima
    if (locationInput.indexOf('山口') > -1) { locationInput = "山口 中国"; }//Yamaguchi
    if (locationInput.indexOf('徳島') > -1) { locationInput = "徳島 四国"; }//Tokushima
    if (locationInput.indexOf('香川') > -1) { locationInput = "香川 四国"; }//Kagawa
    if (locationInput.indexOf('愛媛') > -1) { locationInput = "愛媛 四国"; }//Ehime
    if (locationInput.indexOf('高知') > -1) { locationInput = "高知 四国"; }//Kochi
    if (locationInput.indexOf('福岡') > -1) { locationInput = "福岡市博多区"; }//Fukuoka 
    if (locationInput.indexOf('佐賀') > -1) { locationInput = "佐賀 九州・沖縄"; }//Saga
    if (locationInput.indexOf('長崎') > -1) { locationInput = "長崎 九州・沖縄"; }//Nagasaki
    if (locationInput.indexOf('熊本') > -1) { locationInput = "熊本 九州・沖縄"; }//Kumamoto
    if (locationInput.indexOf('大分') > -1) { locationInput = "大分 九州・沖縄"; }//Oita
    if (locationInput.indexOf('宮崎') > -1) { locationInput = "宮崎 九州・沖縄"; }//Miyazaki
    if (locationInput.indexOf('鹿児島') > -1) { locationInput = "鹿児島 九州・沖縄"; }//Kagoshima
    if (locationInput.indexOf('京浜') > -1) { locationInput = "東京"; }//Keihin = Tokio
    if (locationInput.indexOf('鶴見') > -1) { locationInput = "横浜 神奈川 関東"; }//Tsurumi = Yokohama
    if (locationInput.indexOf('京急') > -1) { locationInput = "神奈川 関東"; }//Keikyu=Kanagawa
    if (locationInput.indexOf('南武') > -1) { locationInput = "南武 山梨 中部"; }//Nambu=Yamanashi
    if (locationInput.indexOf('横浜') > -1) { locationInput = "横浜 神奈川 関東"; }//Yokohama,Kanagawa
    if (locationInput.indexOf('小田原') > -1) { locationInput = "小田原 神奈川 関東"; }//Odawara,Kanagawa  
    if (locationInput.indexOf('横須賀') > -1) { locationInput = "横須賀 神奈川 関東"; }//Yokosuka,Kanagawa 
    if (locationInput.indexOf('金沢市') > -1) { locationInput = "小田原 中部"; }//Kanazawa,Chubu
    if (locationInput.indexOf('中之島') > -1) { locationInput = "大阪 近畿"; }//Nakanoshima = Osaka
    if (locationInput.indexOf('天王寺') > -1) { locationInput = "大阪 近畿"; }//Tennoji = Osaka
    if (locationInput.indexOf('なんば') > -1) { locationInput = "大阪 近畿"; }//Namba = Osaka
    if (locationInput.indexOf('西中島') > -1) { locationInput = "大阪 近畿"; }//Nishinakajima = Osaka
    if (locationInput.indexOf('東淀川') > -1) { locationInput = "東淀川 大阪 近畿"; }//higashiyodogawa, Osaka
    if (locationInput.indexOf('淀川') > -1) { locationInput = "淀川 大阪 近畿"; }//Yodogawa, Osaka
    if (locationInput.indexOf('甲府') > -1) { locationInput = "甲府"; }//kofu
    if (locationInput.indexOf('京橋') > -1) { locationInput = "東京"; }//Kyobashi = Tokio
    if (locationInput.indexOf('心斎橋') > -1) { locationInput = "大阪 近畿"; }//Shinsaibashi = Osaka
    if (locationInput.indexOf('大阪') > -1) { locationInput = "大阪 浪速区 近畿"; }//Osaka
    if (locationInput.indexOf('枚方') > -1) { locationInput = "大阪 枚方 近畿"; }//Hirakata,Osaka
    if (locationInput.indexOf('堺') > -1) { locationInput = "堺 大阪 近畿"; }//Sakai,Osaka
    if (locationInput.indexOf('阪神') > -1) { locationInput = "阪神 兵庫 近畿"; }//Hanshin,Hyogo
    if (locationInput.indexOf('山手') > -1) { locationInput = "横浜 神奈川 関東"; }//Yamate,Yokohama
    if (locationInput.indexOf('銀座') > -1) { locationInput = "東京"; }//Ginza,Tokio  
    if (locationInput.indexOf('東急') > -1) { locationInput = "東京"; }//Tokyu = Tokio
    if (locationInput.indexOf('西新宿') > -1) { locationInput = "東京"; } // Nishi = tokio
    if (locationInput.indexOf('京葉線') > -1) { locationInput = "東京"; }// tren ubicado en tokio
    if (locationInput.indexOf('六甲ライナー') > -1) { locationInput = "神戸市 兵庫 近畿"; }//Rokko Liner(tren) = Hyogo
    if (locationInput.indexOf('神戸') > -1) { locationInput = "神戸市 兵庫 近畿"; }//Ciudad Kobe, Hyogo
    if (locationInput.indexOf('和歌山') > -1) { locationInput = "和歌山 近畿"; }//Wakayama,Kinki
    if (locationInput.indexOf('世田谷') > -1) { locationInput = "東京 関東"; }//Setagaya, Tokio
    if (locationInput.indexOf('梅田') > -1) { locationInput = "大阪 近畿"; }//Umeda = Osaka	
    if (locationInput.indexOf('玉造') > -1) { locationInput = "島根 中国"; }//Tamatsukuri = Shimane
    if (locationInput.indexOf('針中野') > -1) { locationInput = "大阪 近畿"; }//Harinakano = Osaka	
    if (locationInput.indexOf('谷町') > -1) { locationInput = "大阪 近畿"; }//Tanimachi = Osaka	
    if (locationInput.indexOf('淀屋橋') > -1) { locationInput = "大阪 近畿"; }//Yodoyabashi  = Osaka
    if (locationInput.indexOf('阿倍野') > -1) { locationInput = "大阪 近畿"; }//Abeno  = Osaka
    if (locationInput.indexOf('肥後橋') > -1) { locationInput = "大阪 近畿"; }//Higobashi = Osaka
    if (locationInput.indexOf('北加賀屋') > -1) { locationInput = "大阪 近畿"; }//Kitakagaya = Osaka
    if (locationInput.indexOf('函館') > -1) { locationInput = "函館 北海道"; }//hakodate, Hokkaido
    if (locationInput.indexOf('旭川') > -1) { locationInput = "旭川市 北海道"; }//Asahikawa, Hokkaido
    if (locationInput.indexOf('札幌') > -1) { locationInput = "札幌市 北海道"; }//Sapporo, Hokkaido
    if (locationInput.indexOf('さっぽろ') > -1) { locationInput = "札幌市 北海道"; }//Sapporo, Hokkaido
    if (locationInput.indexOf('芽室') > -1) { locationInput = "北海道"; }//Memuro, Hokkaido
    if (locationInput.indexOf('仙台') > -1) { locationInput = "仙台"; }//Sendai
    if (locationInput.indexOf('成田') > -1) { locationInput = "成田"; }//Narita
    if (locationInput.indexOf('汐留') > -1) { locationInput = "汐留"; }//	Minato-ku
    if (locationInput.indexOf('大崎') > -1) { locationInput = "大崎"; }//	Shinagawa-ku 
    if (locationInput.indexOf('博多') > -1) { locationInput = "福岡市博多区"; }//Hakata-ku, Fukuoka 
    if (locationInput.indexOf('千代田') > -1) { locationInput = "千代田区 東京"; }//Chiyoda, Tokio 
    if (locationInput.indexOf('愛知') > -1) { locationInput = "清須市"; }//Kiyosu, Aichi
    if (locationInput.indexOf('仙台') > -1) { locationInput = "仙台 東北地方"; }//Sendai, Tohoku
    if (locationInput.indexOf('青山店') > -1) { locationInput = "青山店 東京"; }//Aoyama, Tokio
    if (locationInput.indexOf('山梨') > -1) { locationInput = "山梨 中部"; }//Yamanashi
    if (locationInput.indexOf('丸の内') > -1) { locationInput = "東京"; }//Marunouchi, Tokio
    if (locationInput.indexOf('日立') > -1) { locationInput = "茨城 関東"; } // Hitachi
    if (locationInput.indexOf('久留米市') > -1) { locationInput = "福岡市博多区"; } // Kurume, Fukuoka
  
    return locationInput;
  }