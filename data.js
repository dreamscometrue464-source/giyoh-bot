// Mahsulotlar va kasallik bo'limlari.
// Matnlar yorliqlardagi matndan lotin yozuviga o'girilgan.

const ILIQ_SAQLASH = "Quruq, yorug'likdan himoyalangan joyda, +5°C dan +25°C gacha haroratda saqlansin.";

export const products = {
  romashka: {
    name: "Romashka, Kalendula, Tisyachelistnik yig'masi",
    tarkibi: "Romashka, Kalendula, Tisyachelistnik.",
    foydasi:
      "Oshqozon gastriti, pankreatit, qorataloq shishganda, enterokolit (ingichka ichak) kasalliklarida foyda beradi. " +
      "Ovqat hazmiga foyda berib, jig'ildon qaynashini davolaydi, ishtahani ochadi, xiltlarni pishiradi, tozalovchi xususiyatga ega. " +
      "Ayniqsa balg'am mizojlarga yaxshi foyda beradi.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  kalendula: {
    name: "Kalendula (Tirnoqgul)",
    tarkibi: "Kalendula.",
    foydasi:
      "Kalendula ming dardga da'vodir. Uyqu sifatini yaxshilab, tinchlantiruvchi ta'sirga ega, yurak urishini mo'tadillashtiradi, " +
      "o'pkada havo almashinuvini yaxshilaydi, arterial bosimni tushiradi. Gastrit, 12 barmoqli ichak yaralarida, yo'g'on ichak kolitida, " +
      "teri toshmalarida, ugrida yordam beradi. Jigar, buyrak, ayol va erkak kasalliklarida tengi yo'q giyohdir.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa oldin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  qizilmiya: {
    name: "Qizilmiya ildizi (Koren solodki)",
    tarkibi: "Qizilmiya ildizi.",
    foydasi:
      "Yuqori nafas yo'llaridan qiyin ajraluvchi balg'amli yo'tallarda. Antivirus, antibakterial. " +
      "Oshqozon gastritini davolab, jigar faoliyatini tiklaydi. Yuqori qon bosimini normallashtirib, asabni tinchlantiradi. " +
      "Limfani tozalaydi va suyultiradi. Metabolizmni yaxshilaydi. Organizmni shlaklardan tozalaydi. " +
      "Siydik haydovchi, ko'ngil aynashiga foydali.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  achchiq_shuvoq: {
    name: "Achchiq shuvoq (Artemisia absinthium)",
    tarkibi: "Achchiq shuvoq.",
    foydasi:
      "Immunitetni ko'taruvchi, umumiy quvvatlovchi; ko'z, burun, tomoq shamollashida. " +
      "Yurak-qon tomir va asab kasalliklariga juda yaxshi foyda beradi. Oshqozon-ichak kasalliklari, gepatitda safroni ajratib, savdoni haydaydi. " +
      "Psoriaz, dermatitda va barcha parazitlarga qarshi kurashadi. Artrit, artroz, bo'g'im shamollashi, revmatizmda kasalni qo'zg'atib davolaydi.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa oldin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  achchiq_bodom: {
    name: "Achchiq bodom (Amygdalus amararum)",
    foydasi:
      "Ko'ngil ochuvchi, yurakni quvvatlovchi, hazmni yaxshilovchi, ishtaha ochuvchi. " +
      "Parazit, zamburug', infeksiyalarga qarshi kurashuvchi va immunitetni ko'taruvchi. " +
      "Safrodan bo'lgan bosh og'rig'iga foyda bo'lib, qon bosimini me'yorlashtiruvchi giyohdir.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa oldin ichiladi.",
  },
  rastoropsha: {
    name: "Rastoropsha – Oq qarrak (Silybum)",
    foydasi:
      "Antioksidant. Immunitetni oshiruvchi. Jigar kasalliklari: sirroz, virusli, alkogolli gepatit va jigar zaharlanishida samarali. " +
      "O't qopi diskineziyasi va xolesistitda, o't tosh kasalligida ichiladi. Metabolizm buzilishi, semizlik, qabziyat, gemorroy, " +
      "disbakteriozda foydasi katta. Bachadon endometriozida boshqa giyohlar bilan kompleks holda foydalaniladi.",
    ehtiyot: "Bachadon, tuxumdon, ko'krak bezi rakida mumkin emas.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
  },
  zveroboy: {
    name: "Zveroboy – Dalachoy (Hypericum)",
    foydasi:
      "Gijja haydovchi. Shamollashga qarshi. Infeksiyaga qarshi. Qon to'xtatuvchi. Safro haydovchi. " +
      "Vena qon tomirlarida qon aylanishini yaxshilaydi. Ichki organ mikrosirkulyatsiyasini yaxshilaydi. Gripp simptomlarini yengillashtiradi. " +
      "Nevrozda tinchlantiruvchi. Ayollar kasalliklari: premenstrual sindrom, klimaksda foyda. " +
      "Bosh og'rig'i va uyqusizlik bilan kechuvchi nevrozda foydali.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 30 daqiqa keyin ichiladi.",
  },
  toloknyanka: {
    name: "Toloknyanka – Ayiqquloq (Arctostaphylos uva-ursi)",
    foydasi:
      "Buyrak va peshob yo'li kasalliklarida: sistit, uretrit, pielonefritni davolaydi. Shishlarni haydovchi. " +
      "Zamburug', infeksiyalar va yallig'lanishga qarshi vosita bo'lib, stafilokokk, streptokokk, enterokokklarga qarshi kurashadi.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
  },
  uzun_murch: {
    name: "Uzun murch – Perets dlinniy (Piper longum)",
    foydasi:
      "Hamma mizojga foydali. Issiqlikni oshiradi. O'pka kasalliklari, bronxitda, yo'talda yaxshi. " +
      "Hazmni yaxshilaydi, ishtahani ochadi; jig'ildon qaynashida, qorin dam bo'lishi va ich ketganda foyda beradi. " +
      "Ayollar va erkaklar kasalliklarida, depressiyaga yaxshi ta'sir ko'rsatib, ozdiruvchi hamdir.",
    ehtiyot: "2 yoshdan kattalarga mumkin.",
    qollanilishi:
      "Kattalarga: 5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin.\n" +
      "Bolalarga: 2,5 ml ni 50 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin.",
  },
  universal: {
    name: "Universal qon suyultiruvchi",
    tarkibi: "Ginkgo biloba, Chabrets, Boyarishnik, Dolchin, Lipa, Moychechak.",
    foydasi:
      "Qonni suyultiradi, tromboz xavfini pasaytiradi. Yurak-qon tomirni quvvatlaydi. Antioksidant himoyaga ega. " +
      "Hujayralarni erkin radikallardan himoya qiladi. Varikoz, tromb, gipertoniya va infarkt xavfini kamaytiradi. " +
      "Limfa va jigarni tozalashda samarali.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 30 daqiqa oldin ichiladi.",
  },
};

// Kasallik bo'limlari: har bir mahsulot bir nechta bo'limda turishi mumkin.
export const categories = [
  { id: "oshqozon", title: "Oshqozon-ichak, hazm", items: ["romashka", "kalendula", "qizilmiya", "achchiq_shuvoq", "achchiq_bodom", "rastoropsha", "uzun_murch"] },
  { id: "jigar", title: "Jigar va o't yo'llari", items: ["rastoropsha", "kalendula", "qizilmiya", "achchiq_shuvoq", "universal"] },
  { id: "buyrak", title: "Buyrak va siydik yo'llari", items: ["toloknyanka", "kalendula", "qizilmiya"] },
  { id: "yurak", title: "Yurak, qon bosimi, qon tomirlar", items: ["universal", "kalendula", "qizilmiya", "achchiq_shuvoq", "achchiq_bodom", "zveroboy"] },
  { id: "nafas", title: "Shamollash, yo'tal, immunitet", items: ["qizilmiya", "uzun_murch", "achchiq_shuvoq", "zveroboy", "achchiq_bodom", "rastoropsha"] },
  { id: "ayollar", title: "Ayollar salomatligi", items: ["kalendula", "rastoropsha", "zveroboy", "uzun_murch"] },
  { id: "erkaklar", title: "Erkaklar salomatligi", items: ["kalendula", "uzun_murch"] },
  { id: "asab", title: "Asab, uyqu, bosh og'rig'i", items: ["zveroboy", "kalendula", "qizilmiya", "achchiq_shuvoq", "achchiq_bodom", "uzun_murch"] },
  { id: "teri", title: "Teri kasalliklari", items: ["kalendula", "achchiq_shuvoq"] },
  { id: "parazit", title: "Parazit, zamburug', infeksiya", items: ["achchiq_shuvoq", "achchiq_bodom", "zveroboy", "toloknyanka"] },
  { id: "bogim", title: "Bo'g'imlar, revmatizm", items: ["achchiq_shuvoq"] },
  { id: "modda", title: "Modda almashinuvi, ozish", items: ["qizilmiya", "rastoropsha", "uzun_murch"] },
  { id: "hammasi", title: "Barcha mahsulotlar", items: Object.keys(products) },
];
