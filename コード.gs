function getTopics() {
  const url = 'https://www.yahoo.co.jp/';
  const topicsClass = '._2j0udhv5jERZtYzddeDwcv';
  const content = UrlFetchApp.fetch(url).getContentText();
  const $ = Cheerio.load(content);
  const outs = ['NEW', 'LIVE'];

  // ニュースタイトルを抽出
  let topics = [];
  $(topicsClass).each((i, element) => {
    topics.push($(element).text());
  })

  // URL を取得する実験
  let urls = [];
  $(topicsClass).each((i, element) => {
    urls.push($(element).find('a').attr('href'));
  })


  // ニュースタイトルをスプレッドシート書き込む
  const sheet = SpreadsheetApp.getActiveSheet();
  let i = sheet.getLastRow() + 1;
  const ptime = new Date();
  // sheet.getRange(i, 1).setValue(ptime);

  // urls 用のインデックス
  let j = 0;

  for(topic of topics) {
    // 末尾の NEW, LIVE を除去
    for(out0 of outs) {
      if(topic.indexOf(out0) != -1) {
        topic = topic.slice(0, topic.length - out0.length);
      }
    }

    sheet.getRange(i, 1).setValue(ptime);
    sheet.getRange(i, 2).setValue(topic);
    sheet.getRange(i++, 3).setValue(urls[j++]);
  }
}
