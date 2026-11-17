// freenetsave calendars and panchangam. Runs only on the visitor's device; nothing is sent or saved.
/* calendar maths: Sun and Moon positions (Meeus), Lahiri ayanamsa, Tamil solar date */
var CAL=(function(){
var R=Math.PI/180;function n360(x){x%=360;return x<0?x+360:x;}function S(x){return Math.sin(x*R);}
function jd(y,m,d,h){if(m<=2){y--;m+=12;}var A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5+(h||0)/24;}
function sun(J){var T=(J-2451545)/36525,L=280.46646+36000.76983*T+0.0003032*T*T,M=357.52911+35999.05029*T-0.0001537*T*T;
 var C=(1.914602-0.004817*T-0.000014*T*T)*S(M)+(0.019993-0.000101*T)*S(2*M)+0.000289*S(3*M);
 return n360(L+C-0.00569-0.00478*S(125.04-1934.136*T));}
var MT=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],[2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],[0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],[2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110]];
function moon(J){var T=(J-2451545)/36525,L=218.3164477+481267.88123421*T-0.0015786*T*T,D=297.8501921+445267.1114034*T-0.0018819*T*T,M=357.5291092+35999.0502909*T-0.0001536*T*T,Mp=134.9633964+477198.8675055*T+0.0087414*T*T,F=93.272095+483202.0175233*T-0.0036539*T*T,E=1-0.002516*T-0.0000074*T*T,s=0;
 MT.forEach(function(t){var e=Math.abs(t[1])===1?E:Math.abs(t[1])===2?E*E:1;s+=t[4]*e*S(t[0]*D+t[1]*M+t[2]*Mp+t[3]*F);});
 s+=3958*S(119.75+131.849*T)+1962*S(L-F)+318*S(53.09+479264.29*T);return n360(L+s/1e6);}
function ayan(J){return 23.85292+0.013964*(J-2451545)/365.25;}
function sidSun(J){return n360(sun(J)-ayan(J));}function sidMoon(J){return n360(moon(J)-ayan(J));}
var TM=["Chithirai","Vaikasi","Aani","Aadi","Aavani","Purattasi","Aippasi","Karthigai","Margazhi","Thai","Maasi","Panguni"];
var TMT=["சித்திரை","வைகாசி","ஆனி","ஆடி","ஆவணி","புரட்டாசி","ஐப்பசி","கார்த்திகை","மார்கழி","தை","மாசி","பங்குனி"];
var NK=["Ashwini","Bharani","Karthigai","Rohini","Mirugasirisham","Thiruvathirai","Punarpoosam","Poosam","Ayilyam","Magam","Pooram","Uthiram","Hastham","Chithirai","Swathi","Visakam","Anusham","Kettai","Moolam","Pooradam","Uthiradam","Thiruvonam","Avittam","Sathayam","Poorattathi","Uthirattathi","Revathi"];
var NKT=["அஸ்வினி","பரணி","கார்த்திகை","ரோகிணி","மிருகசீரிடம்","திருவாதிரை","புனர்பூசம்","பூசம்","ஆயில்யம்","மகம்","பூரம்","உத்திரம்","அஸ்தம்","சித்திரை","சுவாதி","விசாகம்","அனுஷம்","கேட்டை","மூலம்","பூராடம்","உத்திராடம்","திருவோணம்","அவிட்டம்","சதயம்","பூரட்டாதி","உத்திரட்டாதி","ரேவதி"];
var YR=["Prabhava","Vibhava","Sukla","Pramodoota","Prachorpaththi","Aangirasa","Srimukha","Bhava","Yuva","Dhaatu","Eesvara","Vehudhanya","Pramathi","Vikrama","Vishu","Chitrabhanu","Subhanu","Dharana","Parthiba","Viya","Sarvajith","Sarvadhari","Virodhi","Vikruthi","Kara","Nandhana","Vijaya","Jaya","Manmatha","Dhunmuki","Hevilambi","Vilambi","Vikari","Sarvari","Plava","Subakrith","Sobakrith","Krodhi","Visuvaasuva","Parabhaava","Plavanga","Keelaka","Saumya","Sadharana","Virodhikrithu","Paridhaabi","Pramaadhisa","Aanandha","Rakshasa","Nala","Pingala","Kalayukthi","Siddharthi","Raudhri","Dunmathi","Dhundubhi","Rudhrodhgaari","Rakthakshi","Krodhana","Akshaya"];
var WT=["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"];
var TI=["Prathamai","Dvitiyai","Tritiyai","Chaturthi","Panchami","Sashti","Saptami","Ashtami","Navami","Dasami","Ekadasi","Dvadasi","Trayodasi","Chaturdasi"];
/* Surya Siddhanta (the old method behind Vakyam-style panchangams): mean motions from the Kali epoch plus one epicycle correction */
function ssAh(J){return J+75.7683/360-588465.5;}
function ssEq(mean,apo,ce,co){var k=apo-mean,c=ce-(ce-co)*Math.abs(S(k));return Math.asin(c/360*S(k))/R;}
function ssSun(J){var m=n360(ssAh(J)*360*4320000/1577917828);return n360(m+ssEq(m,77.2833,14,13.6667));}
function ssMoon(J){var d=ssAh(J),ms=n360(d*360*4320000/1577917828),m=n360(d*360*57753336/1577917828),ap=n360(90+d*360*488203/1577917828),es=ssEq(ms,77.2833,14,13.6667);
 return n360(m+ssEq(m,ap,32,31.6667)+es*57753336/4320000/365.2588);}
var SYS={t:{sun:sidSun,moon:sidMoon,cut:6.5},v:{sun:ssSun,moon:ssMoon,cut:12.6}};
function rasi(y,m,d,s){return Math.floor(s.sun(jd(y,m,d,s.cut))/30);}
function tamil(y,m,d,k){var s=SYS[k||"t"],r=rasi(y,m,d,s),day=1,t=new Date(Date.UTC(y,m-1,d));
 for(var i=0;i<33;i++){t=new Date(t.getTime()-864e5);if(rasi(t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate(),s)!==r)break;day++;}
 var ty=(m<=4&&r>=8)?y-1:y,tv=(m===1&&r===8)?y+30:y+31;
 return {month:TM[r],monthT:TMT[r],day:day,year:YR[((ty-1987)%60+60)%60],valluvar:tv,wdT:WT[new Date(Date.UTC(y,m-1,d)).getUTCDay()],rasi:r};}
function julian(y,m,d){var J=Math.floor(jd(y,m,d,12)+0.5),c=J+32082,dd=Math.floor((4*c+3)/1461),e=c-Math.floor(1461*dd/4),mm=Math.floor((5*e+2)/153);return {d:e-Math.floor((153*mm+2)/5)+1,m:mm+3-12*Math.floor(mm/10),y:dd-4800+Math.floor(mm/10)};}
var YRT=["பிரபவ","விபவ","சுக்ல","பிரமோதூத","பிரசோற்பத்தி","ஆங்கீரச","ஸ்ரீமுக","பவ","யுவ","தாது","ஈஸ்வர","வெகுதானிய","பிரமாதி","விக்கிரம","விஷு","சித்திரபானு","சுபானு","தாரண","பார்த்திப","விய","சர்வஜித்","சர்வதாரி","விரோதி","விக்ருதி","கர","நந்தன","விஜய","ஜய","மன்மத","துன்முகி","ஹேவிளம்பி","விளம்பி","விகாரி","சார்வரி","பிலவ","சுபகிருது","சோபகிருது","குரோதி","விசுவாவசு","பராபவ","பிலவங்க","கீலக","சௌமிய","சாதாரண","விரோதகிருது","பரிதாபி","பிரமாதீச","ஆனந்த","ராட்சச","நள","பிங்கள","காளயுக்தி","சித்தார்த்தி","ரௌத்திரி","துன்மதி","துந்துபி","ருத்ரோத்காரி","ரக்தாட்சி","குரோதன","அட்சய"];
var TIT=["பிரதமை","துவிதியை","திருதியை","சதுர்த்தி","பஞ்சமி","சஷ்டி","சப்தமி","அஷ்டமி","நவமி","தசமி","ஏகாதசி","துவாதசி","திரயோதசி","சதுர்த்தசி"];
var YG=["Vishkambham","Preethi","Ayushman","Saubhagyam","Sobhanam","Athigandam","Sukarmam","Thruthi","Soolam","Gandam","Viruthi","Dhruvam","Vyagatham","Harshanam","Vajram","Siddhi","Vyatheepatham","Variyan","Parigam","Sivam","Siddham","Sathyam","Subham","Subram","Brahmam","Aindram","Vaidhruthi"];
var YGT=["விஷ்கம்பம்","பிரீதி","ஆயுஷ்மான்","சௌபாக்கியம்","சோபனம்","அதிகண்டம்","சுகர்மம்","திருதி","சூலம்","கண்டம்","விருத்தி","துருவம்","வியாகாதம்","ஹர்ஷணம்","வஜ்ரம்","சித்தி","வியதீபாதம்","வரியான்","பரிகம்","சிவம்","சித்தம்","சாத்தியம்","சுபம்","சுப்பிரம்","பிராமியம்","ஐந்திரம்","வைதிருதி"];
var KR=["Bavam","Balavam","Kaulavam","Thaithulam","Garasai","Vanisai","Bathirai"],KRT=["பவம்","பாலவம்","கௌலவம்","தைதுலம்","கரசை","வணிசை","பத்திரை"];
function karana(k){if(k===0)return ["Kimsthugnam","கிம்ஸ்துக்னம்"];if(k===57)return ["Sakuni","சகுனி"];if(k===58)return ["Chathushpadam","சதுஷ்பாதம்"];if(k===59)return ["Nagavam","நாகவம்"];return [KR[(k-1)%7],KRT[(k-1)%7]];}
function tithiName(ti){if(ti===14)return ["Pournami (full moon)","பௌர்ணமி"];if(ti===29)return ["Amavasai (new moon)","அமாவாசை"];return [TI[ti%15]+(ti<15?", growing moon (Valarpirai)":", shrinking moon (Theipirai)"),(ti<15?"வளர்பிறை ":"தேய்பிறை ")+TIT[ti%15]];}
/* sunrise and sunset in UT hours for a place (NOAA method) */
function solar(y,m,d,lon){var J0=jd(y,m,d,12)-lon/360,T=(J0-2451545)/36525,L=n360(280.46646+36000.76983*T),M=357.52911+35999.05029*T,ec=0.016708634-0.000042037*T,
 C=(1.914602-0.004817*T)*S(M)+(0.019993-0.000101*T)*S(2*M)+0.000289*S(3*M),lam=L+C-0.00569-0.00478*S(125.04-1934.136*T),ob=23.439291-0.0130042*T+0.00256*Math.cos((125.04-1934.136*T)*R),
 dec=Math.asin(S(ob)*S(lam))/R,yy=Math.pow(Math.tan(ob/2*R),2),eq=4/R*(yy*S(2*L)-2*ec*S(M)+4*ec*yy*S(M)*Math.cos(2*L*R)-0.5*yy*yy*S(4*L)-1.25*ec*ec*S(2*M));return {noon:(720-4*lon-eq)/60,dec:dec};}
/* hours from solar noon until the Sun is at the given altitude (degrees); NaN if it never gets there */
function hourAngle(alt,lat,dec){return Math.acos((S(alt)-S(lat)*S(dec))/(Math.cos(lat*R)*Math.cos(dec*R)))/R/15;}
/* next time the Moon is at a given angle from the Sun (0 new, 90 first quarter, 180 full, 270 last quarter) */
function nextPhase(J,ang){function f(x){var e=n360(moon(x)-sun(x)-ang);return e>180?e-360:e;}var a=J+n360(ang-(moon(J)-sun(J)))/12.19;for(var i=0;i<8;i++)a-=f(a)/12.19;return a;}
function sunTimes(y,m,d,lat,lon){var J0=jd(y,m,d,12)-lon/360,T=(J0-2451545)/36525,L=n360(280.46646+36000.76983*T),M=357.52911+35999.05029*T,ec=0.016708634-0.000042037*T,
 C=(1.914602-0.004817*T)*S(M)+(0.019993-0.000101*T)*S(2*M)+0.000289*S(3*M),lam=L+C-0.00569-0.00478*S(125.04-1934.136*T),ob=23.439291-0.0130042*T+0.00256*Math.cos((125.04-1934.136*T)*R),
 dec=Math.asin(S(ob)*S(lam))/R,yy=Math.pow(Math.tan(ob/2*R),2),eq=4/R*(yy*S(2*L)-2*ec*S(M)+4*ec*yy*S(M)*Math.cos(2*L*R)-0.5*yy*yy*S(4*L)-1.25*ec*ec*S(2*M)),
 ha=Math.acos((Math.cos(90.833*R)-S(lat)*S(dec))/(Math.cos(lat*R)*Math.cos(dec*R)))/R,noon=720-4*lon-eq;return {rise:(noon-4*ha)/60,set:(noon+4*ha)/60};}
/* when does f(J) next move into a new slot of the given size? */
function nextChange(f,size,J){var cur=Math.floor(f(J)/size),a=J,b=J;for(var i=0;i<80;i++){b=a+0.05;if(Math.floor(f(b)/size)!==cur)break;a=b;}for(i=0;i<30;i++){var c=(a+b)/2;if(Math.floor(f(c)/size)===cur)a=c;else b=c;}return b;}
var RS=["Mesham","Rishabam","Mithunam","Kadagam","Simmam","Kanni","Thulam","Viruchigam","Dhanusu","Makaram","Kumbam","Meenam"],RST=["மேஷம்","ரிஷபம்","மிதுனம்","கடகம்","சிம்மம்","கன்னி","துலாம்","விருச்சிகம்","தனுசு","மகரம்","கும்பம்","மீனம்"];
function panchang(y,m,d,lat,lon,k){var s=SYS[k||"t"],st=sunTimes(y,m,d,lat,lon),Jr=jd(y,m,d,0)+st.rise/24,Js=jd(y,m,d,0)+st.set/24,t=tamil(y,m,d,k);
 function elong(J){return n360(s.moon(J)-s.sun(J));}function yogaL(J){return n360(s.sun(J)+s.moon(J));}
 var ti=Math.floor(elong(Jr)/12),nk=Math.floor(s.moon(Jr)/(360/27)),yg=Math.floor(yogaL(Jr)/(360/27)),ka=Math.floor(elong(Jr)/6),tn=tithiName(ti),kn=karana(ka),w=new Date(Date.UTC(y,m-1,d)).getUTCDay(),seg=(Js-Jr)/8,mr=Math.floor(s.moon(Jr)/30);
 function part(q){return [Jr+(q-1)*seg,Jr+q*seg];}
 return {ti:ti,nk:nk,yg:yg,ka:ka,mr:mr,rise:Jr,set:Js,month:t.month,monthT:t.monthT,day:t.day,rasi:t.rasi,year:t.year,yearT:YRT[YR.indexOf(t.year)],valluvar:t.valluvar,wdT:t.wdT,
  tithi:tn[0],tithiT:tn[1],tithiEnd:nextChange(elong,12,Jr),nak:NK[nk],nakT:NKT[nk],nakEnd:nextChange(s.moon,360/27,Jr),
  yoga:YG[yg],yogaT:YGT[yg],yogaEnd:nextChange(yogaL,360/27,Jr),kar:kn[0],karT:kn[1],karEnd:nextChange(elong,6,Jr),mrasi:RS[mr],mrasiT:RST[mr],
  rahu:part([8,2,7,5,6,4,3][w]),yama:part([5,4,3,2,1,7,6][w]),kuli:part([7,6,5,4,3,2,1][w])};}
function newMoon(J){function el(x){return n360(moon(x)-sun(x));}var a=J-el(J)/12.19;for(var i=0;i<6;i++){var e=el(a);if(e>180)e-=360;a-=e/12.19;}return a;}
function lunar(y,m,d){var J=jd(y,m,d,0.5);function el(x){return n360(moon(x)-sun(x));}
 function nm(x){var a=x-el(x)/12.19;for(var i=0;i<6;i++){var e=el(a);if(e>180)e-=360;a-=e/12.19;}return a;}
 var a=nm(J),b=nm(a+32),r=Math.floor(sidSun(a)/30),r2=Math.floor(sidSun(b)/30),ti=Math.floor(el(J)/12),mi=(r+1)%12,adhik=r===r2;
 var saka=y-78;if(m<=4&&mi>=9)saka=y-79;
 return {mi:mi,adhik:adhik,ti:ti,saka:saka,yr:YR[((saka+11)%60+60)%60]};}
function nakAt(J,k){return Math.floor(SYS[k||"t"].moon(J)/(360/27));}
function tithiAt(J,k){var s=SYS[k||"t"];return Math.floor(n360(s.moon(J)-s.sun(J))/12);}
return {tamil:tamil,panchang:panchang,julian:julian,jd:jd,SYS:SYS,tithiAt:tithiAt,nakAt:nakAt,solar:solar,hourAngle:hourAngle,nextPhase:nextPhase,newMoon:newMoon,sunLon:sun,elong:function(J){return n360(moon(J)-sun(J));},NK:NK,NKT:NKT,lunar:lunar,TI:TI,tithiName:tithiName,sunTimes:sunTimes,ssSun:ssSun,ssMoon:ssMoon,sidSun:sidSun,sidMoon:sidMoon};
})();

(function(){
var el=function(i){return document.getElementById(i);},CFG=window.ALM||{};
var MN=["January","February","March","April","May","June","July","August","September","October","November","December"];
var ZO=["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"],ZC="鼠牛虎兔龙蛇马羊猴鸡狗猪";
var ML=["Medam","Edavam","Mithunam","Karkidakam","Chingam","Kanni","Thulam","Vrischikam","Dhanu","Makaram","Kumbham","Meenam"],MLN=["മേടം","ഇടവം","മിഥുനം","കർക്കടകം","ചിങ്ങം","കന്നി","തുലാം","വൃശ്ചികം","ധനു","മകരം","കുംഭം","മീനം"];
var BN=["Boishakh","Joishtho","Asharh","Shrabon","Bhadro","Ashwin","Kartik","Ogrohayon","Poush","Magh","Falgun","Choitro"],BNN=["বৈশাখ","জ্যৈষ্ঠ","আষাঢ়","শ্রাবণ","ভাদ্র","আশ্বিন","কার্তিক","অগ্রহায়ণ","পৌষ","মাঘ","ফাল্গুন","চৈত্র"];
var HM=["चैत्र","वैशाख","ज्येष्ठ","आषाढ़","श्रावण","भाद्रपद","आश्विन","कार्तिक","मार्गशीर्ष","पौष","माघ","फाल्गुन"],HW=["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"];
var HTE=["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima (full moon)","Amavasya (new moon)"],HT=["प्रतिपदा","द्वितीया","तृतीया","चतुर्थी","पंचमी","षष्ठी","सप्तमी","अष्टमी","नवमी","दशमी","एकादशी","द्वादशी","त्रयोदशी","चतुर्दशी","पूर्णिमा","अमावस्या"];
var HNE=["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"],HN=["अश्विनी","भरणी","कृत्तिका","रोहिणी","मृगशिरा","आर्द्रा","पुनर्वसु","पुष्य","आश्लेषा","मघा","पूर्वाफाल्गुनी","उत्तराफाल्गुनी","हस्त","चित्रा","स्वाति","विशाखा","अनुराधा","ज्येष्ठा","मूल","पूर्वाषाढ़ा","उत्तराषाढ़ा","श्रवण","धनिष्ठा","शतभिषा","पूर्वाभाद्रपद","उत्तराभाद्रपद","रेवती"];
var HYE=["Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyan","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"],HY=["विष्कम्भ","प्रीति","आयुष्मान","सौभाग्य","शोभन","अतिगण्ड","सुकर्मा","धृति","शूल","गण्ड","वृद्धि","ध्रुव","व्याघात","हर्षण","वज्र","सिद्धि","व्यतीपात","वरीयान","परिघ","शिव","सिद्ध","साध्य","शुभ","शुक्ल","ब्रह्म","इन्द्र","वैधृति"];
var HKE=["Bava","Balava","Kaulava","Taitila","Gara","Vanija","Vishti (Bhadra)","Shakuni","Chatushpada","Naga","Kimstughna"],HK=["बव","बालव","कौलव","तैतिल","गर","वणिज","विष्टि (भद्रा)","शकुनि","चतुष्पद","नाग","किंस्तुघ्न"];
var HRE=["Mesha (Aries)","Vrishabha (Taurus)","Mithuna (Gemini)","Karka (Cancer)","Simha (Leo)","Kanya (Virgo)","Tula (Libra)","Vrishchika (Scorpio)","Dhanu (Sagittarius)","Makara (Capricorn)","Kumbha (Aquarius)","Meena (Pisces)"],HR=["मेष","वृषभ","मिथुन","कर्क","सिंह","कन्या","तुला","वृश्चिक","धनु","मकर","कुंभ","मीन"];
var LM=["Chaitra","Vaisakha","Jyeshtha","Ashadha","Shravana","Bhadrapada","Ashwayuja","Kartika","Margasira","Pushya","Magha","Phalguna"],LMT=["చైత్రం","వైశాఖం","జ్యేష్ఠం","ఆషాఢం","శ్రావణం","భాద్రపదం","ఆశ్వయుజం","కార్తీకం","మార్గశిరం","పుష్యం","మాఘం","ఫాల్గుణం"],LMK=["ಚೈತ್ರ","ವೈಶಾಖ","ಜ್ಯೇಷ್ಠ","ಆಷಾಢ","ಶ್ರಾವಣ","ಭಾದ್ರಪದ","ಆಶ್ವಯುಜ","ಕಾರ್ತಿಕ","ಮಾರ್ಗಶಿರ","ಪುಷ್ಯ","ಮಾಘ","ಫಾಲ್ಗುಣ"];
var CD=["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"],CM=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],GZ=["甲乙丙丁戊己庚辛壬癸","子丑寅卯辰巳午未申酉戌亥"];
var PL=[["Chennai, India",13.0827,80.2707,"Asia/Kolkata"],["Madurai, India",9.9252,78.1198,"Asia/Kolkata"],["Jaffna, Sri Lanka",9.6615,80.0255,"Asia/Colombo"],["Colombo, Sri Lanka",6.9271,79.8612,"Asia/Colombo"],["Singapore",1.3521,103.8198,"Asia/Singapore"],["Kuala Lumpur, Malaysia",3.139,101.6869,"Asia/Kuala_Lumpur"],["Dubai, UAE",25.2048,55.2708,"Asia/Dubai"],["London, UK",51.5074,-0.1278,"Europe/London"],["Paris, France",48.8566,2.3522,"Europe/Paris"],["Toronto, Canada",43.6532,-79.3832,"America/Toronto"],["New York, USA",40.7128,-74.006,"America/New_York"],["Sydney, Australia",-33.8688,151.2093,"Australia/Sydney"],["New Delhi, India",28.6139,77.209,"Asia/Kolkata"],["Mumbai, India",19.076,72.8777,"Asia/Kolkata"],["Kolkata, India",22.5726,88.3639,"Asia/Kolkata"],["Bengaluru, India",12.9716,77.5946,"Asia/Kolkata"],["Hyderabad, India",17.385,78.4867,"Asia/Kolkata"],["Ahmedabad, India",23.0225,72.5714,"Asia/Kolkata"],["Pune, India",18.5204,73.8567,"Asia/Kolkata"],["Kathmandu, Nepal",27.7172,85.324,"Asia/Kathmandu"]];
if(CFG.region==="in")PL.sort(function(a,b){return (/India|Nepal/.test(b[0])?1:0)-(/India|Nepal/.test(a[0])?1:0);});
var sys="t";
function fillPl(sel){el("pl").innerHTML="";PL.forEach(function(p,i){var o=document.createElement("option");o.value=i;o.textContent=p[0];el("pl").appendChild(o);});if(sel!=null)el("pl").value=sel;}
fillPl();if(CFG.place){for(var pi=0;pi<PL.length;pi++)if(PL[pi][0].indexOf(CFG.place)===0)el("pl").value=pi;}
el("geo").addEventListener("click",function(){var g=el("geomsg");if(!navigator.geolocation){g.textContent="This device cannot share its location.";return;}g.textContent="Finding your location…";
  navigator.geolocation.getCurrentPosition(function(q){var tz="UTC";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC";}catch(e){}if(PL[PL.length-1][4])PL.pop();PL.push(["My location",q.coords.latitude,q.coords.longitude,tz,1]);fillPl(PL.length-1);g.textContent="Using your location. It stays on this device.";show();thithi();},function(){g.textContent="Could not get your location. Pick a city instead.";},{maximumAge:6e5,timeout:15000});});
function num(n,loc){try{return Number(n).toLocaleString(loc,{useGrouping:false});}catch(e){return String(n);}}
function ord(n){var s=["th","st","nd","rd"],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}
function intl(loc,cal,dt,opt){try{var f=new Intl.DateTimeFormat(loc+"-u-ca-"+cal,opt||{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});if(f.resolvedOptions().calendar!==cal)return null;return f.format(dt);}catch(e){return null;}}
function chRaw(cal,dt){try{var f=new Intl.DateTimeFormat("en-u-ca-"+cal,{day:"numeric",month:"numeric",year:"numeric",timeZone:"UTC"});if(f.resolvedOptions().calendar!==cal)return null;var o={};f.formatToParts(dt).forEach(function(p){o[p.type]=p.value;});return {m:parseInt(o.month,10),d:parseInt(o.day,10),y:parseInt(o.relatedYear||o.year,10),leap:/bis|L/i.test(o.month)};}catch(e){return null;}}
/* the browser's lunar date, with the day checked against our own new moon (China time, or Korea time for the Korean calendar) */
function chinese(cal,dt){var r=chRaw(cal,dt);if(!r)return null;var tz=cal==="dangi"?9:8,jn=Math.round(dt.getTime()/864e5+2440587.5+0.5),nm=CAL.newMoon(jn+0.5-tz/24-0.0001),own=jn-Math.floor(nm+tz/24+0.5)+1,o;
  if(own===r.d||own<1||own>30)return r;
  if(own===1&&r.d>=29){o=chRaw(cal,new Date(dt.getTime()+864e5));if(o&&o.d===1)return {m:o.m,d:1,y:o.y,leap:o.leap};return r;}
  if(own>=29&&r.d===1){o=chRaw(cal,new Date(dt.getTime()-864e5));if(o)return {m:o.m,d:own,y:o.y,leap:o.leap};return r;}
  if(Math.abs(own-r.d)===1)return {m:r.m,d:own,y:r.y,leap:r.leap};return r;}
function bengali(y,m,d){var t=Date.UTC(y,m-1,d),ny=Date.UTC(y,3,14),by=y-593;if(t<ny){ny=Date.UTC(y-1,3,14);by=y-594;}var n=Math.round((t-ny)/864e5),gy=new Date(ny).getUTCFullYear()+1,leap=(gy%4===0&&gy%100!==0)||gy%400===0,L=[31,31,31,31,31,31,30,30,30,30,leap?30:29,30],i=0;while(i<11&&n>=L[i]){n-=L[i];i++;}return [(n+1)+" "+BN[i]+" "+by,num(n+1,"bn-BD")+" "+BNN[i]+" "+num(by,"bn-BD")];}
function isoWeek(dt){var t=new Date(dt.getTime()),dn=(t.getUTCDay()+6)%7;t.setUTCDate(t.getUTCDate()-dn+3);var y=t.getUTCFullYear(),f=new Date(Date.UTC(y,0,4)),w=1+Math.round(((t-f)/864e5-3+((f.getUTCDay()+6)%7))/7);return "Week "+w+" of "+y;}
function row(a,b,c,nat){return "<tr><td>"+a+(c?"<small>"+c+"</small>":"")+"</td><td>"+b+(nat?"<small>"+nat+"</small>":"")+"</td></tr>";}
function show(){var v=el("d").value,p=v?v.split("-").map(Number):null;el("err").textContent="";
  if(!p||p.length!==3||!p[0]||p[0]<1600||p[0]>2400){el("err").textContent=v?"Please pick a year between 1600 and 2400.":"";return;}
  var y=p[0],m=p[1],d=p[2],dt=new Date(Date.UTC(y,m-1,d)),wd=dt.toLocaleDateString("en",{weekday:"long",timeZone:"UTC"});
  el("long").textContent=wd+", "+MN[m-1]+" "+d+", "+y+" · "+(intl("ta-IN","gregory",dt,{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})||"");
  var pl=PL[+el("pl").value||0],tz=pl[3],a=CAL.panchang(y,m,d,pl[1],pl[2],sys),o=CAL.panchang(y,m,d,pl[1],pl[2],sys==="t"?"v":"t");
  var tf=new Intl.DateTimeFormat("en",{hour:"numeric",minute:"2-digit",timeZone:tz}),df=new Intl.DateTimeFormat("en-CA",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:tz});
  function tm(J){return tf.format(new Date((J-2440587.5)*864e5));}
  function till(J){var dd=new Date((J-2440587.5)*864e5),nx=df.format(dd)>v;return ["till "+tm(J)+(nx?" (next day)":""),(CFG.region==="in"?tm(J)+(nx?" (अगले दिन)":"")+" तक":tm(J)+(nx?" (மறுநாள்)":"")+" வரை")];}
  function r2(en,ta,ve,vt){return "<tr><td>"+en+"<small class='nat'>"+ta+"</small></td><td>"+ve+"<small>"+vt+"</small></td></tr>";}
  function end(en,ta,ve,vt,J){var t=till(J);return r2(en,ta,ve+"<small>"+t[0]+"</small>",vt+" · "+t[1]);}
  var h;
  if(CFG.region==="in"){var lu=CAL.lunar(y,m,d),sk=a.ti<15,pm=(!sk&&!lu.adhik)?(lu.mi+1)%12:lu.mi,tix=a.ti===14?14:a.ti===29?15:a.ti%15,kx=a.ka===0?10:a.ka===57?7:a.ka===58?8:a.ka===59?9:(a.ka-1)%7;
   h=r2("Lunar month (South and West India)","चंद्र मास (अमान्त)",(lu.adhik?"Adhika ":"")+LM[lu.mi],(lu.adhik?"अधिक ":"")+HM[lu.mi])
    +r2("Lunar month (North India)","चंद्र मास (पूर्णिमान्त)",(lu.adhik?"Adhika ":"")+LM[pm],(lu.adhik?"अधिक ":"")+HM[pm])
    +r2("Paksha","पक्ष",sk?"Shukla Paksha (moon growing)":"Krishna Paksha (moon shrinking)",sk?"शुक्ल पक्ष":"कृष्ण पक्ष")
    +end("Tithi","तिथि",HTE[tix],HT[tix],a.tithiEnd)
    +end("Nakshatra","नक्षत्र",HNE[a.nk],HN[a.nk],a.nakEnd)
    +end("Yoga","योग",HYE[a.yg],HY[a.yg],a.yogaEnd)
    +end("Karana","करण",HKE[kx],HK[kx],a.karEnd)
    +r2("Day (Vara)","वार",wd,HW[dt.getUTCDay()])
    +r2("Moon sign (Chandra rashi)","चंद्र राशि",HRE[a.mr],HR[a.mr])
    +r2("Vikram Samvat","विक्रम संवत",String(lu.saka+135),"विक्रम संवत "+(lu.saka+135))
    +r2("Shaka Samvat","शक संवत",String(lu.saka),"शक संवत "+lu.saka)
    +r2("Samvatsara (year name, South India)","संवत्सर",lu.yr,"")
    +r2("Sunrise","सूर्योदय",tm(a.rise),"")+r2("Sunset","सूर्यास्त",tm(a.set),"")
    +r2("Rahu Kaal","राहु काल",tm(a.rahu[0])+" – "+tm(a.rahu[1]),"")
    +r2("Yamaganda","यमगण्ड",tm(a.yama[0])+" – "+tm(a.yama[1]),"")
    +r2("Gulika Kaal","गुलिक काल",tm(a.kuli[0])+" – "+tm(a.kuli[1]),"");}
  else{
  h=r2("Tamil date","தமிழ் தேதி",a.month+" "+a.day,a.monthT+" "+a.day)
   +r2("Tamil year","ஆண்டு",a.year,a.yearT+" வருடம்")
   +r2("Thiruvalluvar year","திருவள்ளுவர் ஆண்டு",String(a.valluvar),"தி.பி. "+a.valluvar)
   +r2("Day","கிழமை",wd,["ஞாயிற்றுக்கிழமை","திங்கட்கிழமை","செவ்வாய்க்கிழமை","புதன்கிழமை","வியாழக்கிழமை","வெள்ளிக்கிழமை","சனிக்கிழமை"][dt.getUTCDay()])
   +end("Tithi (moon day)","திதி",a.tithi,a.tithiT,a.tithiEnd)
   +end("Nakshatra (star)","நட்சத்திரம்",a.nak,a.nakT,a.nakEnd)
   +end("Yogam","யோகம்",a.yoga,a.yogaT,a.yogaEnd)
   +end("Karanam","கரணம்",a.kar,a.karT,a.karEnd)
   +r2("Moon sign (rasi)","சந்திர ராசி",a.mrasi,a.mrasiT)
   +r2("Sunrise","சூரிய உதயம்",tm(a.rise),"")
   +r2("Sunset","சூரிய அஸ்தமனம்",tm(a.set),"")
   +r2("Rahu kalam","ராகு காலம்",tm(a.rahu[0])+" – "+tm(a.rahu[1]),"")
   +r2("Yamagandam","எமகண்டம்",tm(a.yama[0])+" – "+tm(a.yama[1]),"")
   +r2("Kuligai","குளிகை",tm(a.kuli[0])+" – "+tm(a.kuli[1]),"");
}
  el("pan").innerHTML=h;
  var df2=[];if(a.month!==o.month||a.day!==o.day)df2.push("Tamil date");if(a.tithi!==o.tithi)df2.push("tithi");if(a.nak!==o.nak)df2.push("nakshatra");if(a.yoga!==o.yoga)df2.push("yogam");if(a.kar!==o.kar)df2.push("karanam");
  el("diff").hidden=!df2.length;el("diff").textContent=df2.length?"On this day the two methods differ in: "+df2.join(", ")+". Tap "+(sys==="t"?"Vakyam":"Thirukanitham")+" above to compare.":"";
  var t=CAL.tamil(y,m,d,"t"),c=chinese("chinese",dt),ch="";
  if(c){ch=row("Chinese lunar date",ord(c.d)+" day of the "+ord(c.m)+(c.leap?" (leap)":"")+" month","",GZ[0].charAt(((c.y-4)%10+10)%10)+GZ[1].charAt(((c.y-4)%12+12)%12)+"年 "+(c.leap?"闰":"")+CM[c.m-1]+CD[c.d-1])+row("Zodiac year","Year of the "+ZO[((c.y-4)%12+12)%12],"Chinese year that began in "+c.y,ZC.charAt(((c.y-4)%12+12)%12)+"年");}
  else ch=row("Chinese lunar date","Not available in this browser");
  el("chi").innerHTML=ch;
  h="";var x,k=chinese("dangi",dt),j=CAL.julian(y,m,d),ty=(m<=4&&t.rasi>=8)?y-1:y,doy=Math.round((dt-Date.UTC(y,0,1))/864e5)+1,L={day:"numeric",month:"long",year:"numeric",timeZone:"UTC"};
  function add(name,cal,note,loc,opt){x=intl("en",cal,dt,opt);if(x){var nv=intl(loc,cal,dt,loc==="ja-JP"?opt:L);h+=row(name,x,note,nv&&!/^\d{6,}/.test(nv)?nv:"");}}
  add("Islamic (Hijri)","islamic-umalqura","Umm al-Qura. Moon sighting can shift it by a day","ar-SA");
  add("Hebrew (Jewish)","hebrew","The day begins at sunset the evening before","he-IL");
  add("Persian (Solar Hijri)","persian","Iran and Afghanistan","fa-IR");
  add("Indian national (Saka)","indian","India's official civil calendar","hi-IN");
  var ky=y-(((m>8)||(m===8&&t.rasi>=4))?824:825),bg=bengali(y,m,d);
  var lu=CAL.lunar(y,m,d),lt=(lu.ti<15?"Shukla (bright half) ":"Krishna (dark half) ")+(lu.ti===14?"Purnima":lu.ti===29?"Amavasya":CAL.TI[lu.ti%15]);
  h+=row("Telugu / Kannada / Marathi (lunar)",(lu.adhik?"Adhika ":"")+LM[lu.mi]+", "+lt,"Shalivahana Saka "+lu.saka+", year "+lu.yr+". Month runs new moon to new moon",LMT[lu.mi]+" · "+LMK[lu.mi]+" · "+(lu.ti<15?"శుక్ల పక్షం":"కృష్ణ పక్షం"));
  h+=row("Malayalam (Kollam era)",t.day+" "+ML[t.rasi]+" "+ky,"Kerala. May differ by a day",num(t.day,"ml-IN")+" "+MLN[t.rasi]+" "+ky);
  h+=row("Bengali",bg[0],"Bangladesh national version",bg[1]);
  h+=row("Vikram Samvat year","Year "+(ty+57),"Nepal and North India. Year only, counted from mid-April","विक्रम संवत् "+String(ty+57).replace(/\d/g,function(c){return "०१२३४५६७८९".charAt(+c);}));
  add("Buddhist era","buddhist","Thailand, Sri Lanka, Cambodia","th-TH");
  if(k)h+=row("Korean lunar (Dangi)",ord(k.d)+" day of the "+ord(k.m)+(k.leap?" (leap)":"")+" month","Vietnam's lunar date is almost always the same as the Chinese one",intl("ko-KR","dangi",dt,L));
  add("Japanese","japanese","Years counted by the emperor's era","ja-JP",{era:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"});
  add("Minguo","roc","Taiwan","zh-TW");
  add("Ethiopian","ethiopic","13 months","am-ET");
  add("Coptic","coptic","Egypt's Coptic church","ar-EG");
  h+=row("Julian",j.d+" "+MN[j.m-1]+" "+j.y,"Used by some Orthodox churches",j.d+" "+new Intl.DateTimeFormat("ru",{month:"long",day:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(2001,j.m-1,5))).replace(/^\d+\s*/,"")+" "+j.y+" г.");
  h+=row("Gregorian (English)",wd+", "+MN[m-1]+" "+d+", "+y,"The world's civil calendar");
  h+=row("ISO week",isoWeek(dt),"Used in business and Europe");
  h+=row("Day of the year","Day "+doy+" of "+y);
  var md=Math.floor(CAL.jd(y,m,d,12)+0.5)-584283,TZ=["Imix","Ik'","Ak'bal","K'an","Chikchan","Kimi","Manik'","Lamat","Muluk","Ok","Chuwen","Eb","Ben","Ix","Men","Kib","Kaban","Etz'nab","Kawak","Ajaw"],HB=["Pop","Wo'","Sip","Sotz'","Sek","Xul","Yaxk'in","Mol","Ch'en","Yax","Sak'","Keh","Mak","K'ank'in","Muwan","Pax","K'ayab","Kumk'u","Wayeb"],hb=((md+348)%365+365)%365;
  if(md>=0)h+=row("Maya",(((md+3)%13)+1)+" "+TZ[(md+19)%20]+" · "+(hb%20)+" "+HB[Math.floor(hb/20)],"Tzolk'in (260-day count) and Haab'. Long Count "+[Math.floor(md/144000),Math.floor(md%144000/7200),Math.floor(md%7200/360),Math.floor(md%360/20),md%20].join("."));
  h+=row("Julian Day Number",String(Math.floor(CAL.jd(y,m,d,12)+0.5)),"Used by astronomers");
  el("tbl").innerHTML=h;month();details();times();}
var PM={mwl:["Muslim World League",18,17,0],isna:["ISNA (North America)",15,15,0],uq:["Umm al-Qura (Makkah)",18.5,0,90],egypt:["Egyptian General Authority",19.5,17.5,0],karachi:["Karachi (South Asia)",18,18,0]};
function times(){var T=el("tim");if(!CFG.times||!T)return;var v=el("d").value;if(!v){T.innerHTML="";return;}var p=v.split("-").map(Number),pl=PL[+el("pl").value||0],lat=pl[1],lon=pl[2],tz=pl[3],tf=new Intl.DateTimeFormat("en",{hour:"numeric",minute:"2-digit",timeZone:tz}),h="";
  function at(y,m,d,hrs){if(isNaN(hrs))return "—";return tf.format(new Date((CAL.jd(y,m,d,0)+hrs/24-2440587.5)*864e5));}
  if(CFG.times==="pray"){var s=CAL.solar(p[0],p[1],p[2],lon),M=PM[el("pm").value]||PM.mwl,f=el("asr").value==="2"?2:1,ha=function(a){return CAL.hourAngle(a,lat,s.dec);},
     sr=s.noon-ha(-0.833),ss=s.noon+ha(-0.833),asr=s.noon+ha(Math.atan(1/(f+Math.tan(Math.abs(lat-s.dec)*Math.PI/180)))*180/Math.PI),isha=M[3]?ss+M[3]/60:s.noon+ha(-M[2]);
    h=row("Fajr",at(p[0],p[1],p[2],s.noon-ha(-M[1])),"Dawn prayer","الفجر")+row("Sunrise",at(p[0],p[1],p[2],sr),"Fajr ends","الشروق")+row("Dhuhr",at(p[0],p[1],p[2],s.noon+1/60),"Just after midday","الظهر")+row("Asr",at(p[0],p[1],p[2],asr),f===2?"Hanafi":"Shafi, Maliki, Hanbali","العصر")+row("Maghrib",at(p[0],p[1],p[2],ss),"Sunset. The fast ends","المغرب")+row("Isha",at(p[0],p[1],p[2],isha),"Night prayer","العشاء");
    el("timn").textContent="Times for "+pl[0]+", "+M[0]+" method. Mosques may add a few minutes, so follow your local mosque's timetable. Very far north in summer some times cannot be worked out.";}
  else if(CFG.times==="shabbat"){var dt=new Date(Date.UTC(p[0],p[1]-1,p[2])),w=dt.getUTCDay(),fr=new Date(dt.getTime()+((5-w+7)%7)*864e5),sa=new Date(fr.getTime()+864e5);if(w===6){sa=dt;fr=new Date(dt.getTime()-864e5);}
    function st(c,alt){var y=c.getUTCFullYear(),m=c.getUTCMonth()+1,d=c.getUTCDate(),s=CAL.solar(y,m,d,lon);return [y,m,d,s.noon+CAL.hourAngle(alt,lat,s.dec)];}
    var a=st(fr,-0.833),b=st(sa,-8.5),t0=CAL.solar(p[0],p[1],p[2],lon),h0=CAL.hourAngle(-0.833,lat,t0.dec);
    h=row("Shabbat candle lighting",at(a[0],a[1],a[2],a[3]-18/60),gd(fr)+" · 18 minutes before sunset","הדלקת נרות")+row("Shabbat ends (Havdalah)",at(b[0],b[1],b[2],b[3]),gd(sa)+" · nightfall, Sun 8.5° below the horizon","הבדלה")+row("Sunrise on the chosen day",at(p[0],p[1],p[2],t0.noon-h0),"","זריחה")+row("Sunset on the chosen day",at(p[0],p[1],p[2],t0.noon+h0),"The Jewish date changes at sunset","שקיעה");
    el("timn").textContent="Times for "+pl[0]+". Some communities light earlier (Jerusalem lights 40 minutes before sunset) or end Shabbat later, so follow your own community's times.";}
  T.innerHTML=h;}
function tzOff(ms,tz){var f=new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"}),o={};f.formatToParts(new Date(ms)).forEach(function(p){o[p.type]=+p.value;});return Date.UTC(o.year,o.month-1,o.day,o.hour,o.minute)-Math.floor(ms/6e4)*6e4;}
function thithi(){var v=el("dd").value,out=el("thi"),er=el("derr");er.textContent="";out.innerHTML="";el("thinote").hidden=true;if(!v)return;
  var p=v.split("-").map(Number),y=p[0],m=p[1],d=p[2],now=new Date(),ty=now.getFullYear(),todayS=ty+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
  if(!y||y<1600||v>todayS){er.textContent="Please pick a date from 1600 up to today.";return;}
  var pl=PL[+el("pl").value||0],tz=pl[3],J,tv=el("dt").value;
  if(tv){var q=tv.split(":").map(Number),g=Date.UTC(y,m-1,d,q[0],q[1]),u=g-tzOff(g,tz);u=g-tzOff(u,tz);J=u/864e5+2440587.5;}
  else J=CAL.jd(y,m,d,0)+CAL.sunTimes(y,m,d,pl[1],pl[2]).rise/24;
  var ti=CAL.tithiAt(J,sys),tn=CAL.tithiName(ti),tm0=CAL.tamil(y,m,d,sys);
  function find(yr){var res=[],on=false;for(var t=Date.UTC(yr,0,1);t<Date.UTC(yr+1,1,25);t+=864e5){var c=new Date(t),cy=c.getUTCFullYear(),cm=c.getUTCMonth()+1,cd=c.getUTCDate(),tt=CAL.tamil(cy,cm,cd,sys);
      if(tt.rasi!==tm0.rasi){if(on)break;continue;}if(!on){if(tt.day!==1)continue;on=true;}
      var st=CAL.sunTimes(cy,cm,cd,pl[1],pl[2]),j0=CAL.jd(cy,cm,cd,0),len=st.set-st.rise,n=0;for(var i=0;i<=8;i++){if(CAL.tithiAt(j0+(st.rise+len*(0.6+0.2*i/8))/24,sys)===ti)n++;}
      if(n)res.push([n,c]);}
    var o=[];for(var a=0;a<res.length;a++){var pv=res[a-1],nx=res[a+1],adjP=pv&&res[a][1]-pv[1]===864e5,adjN=nx&&nx[1]-res[a][1]===864e5;if((adjP&&pv[0]>=res[a][0])||(adjN&&nx[0]>res[a][0]))continue;o.push(res[a][1]);}return o;}
  function fmt(c){return c.toLocaleDateString("en",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});}
  function fta(c){return intl("ta-IN","gregory",c,{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})||"";}
  function cell(list){if(!list.length)return ["This thithi does not fall in this Tamil month this year. Please ask your priest.","இந்த ஆண்டு இந்த மாதத்தில் இந்தத் திதி வரவில்லை."];
    var e=list.map(function(c){var s=c.toISOString().slice(0,10);return fmt(c)+(s<todayS?" (passed)":s===todayS?" (today)":"");}).join("<br>or ")+(list.length>1?"<br><span style='font-weight:500'>The thithi comes twice in this month. Many families keep the second one.</span>":"");
    return [e,list.map(fta).join(" / ")];}
  function r2(en,ta,ve,vt){return "<tr><td>"+en+"<small class='nat'>"+ta+"</small></td><td>"+ve+"<small>"+vt+"</small></td></tr>";}
  var G=[find(ty-1),find(ty),find(ty+1),find(ty+2)],inY=[],nxt=null;
  G.forEach(function(g){var k=g.filter(function(c){return c.getUTCFullYear()===ty;});if(k.length)inY=inY.concat(g.length>1&&k.length===g.length?[g]:k.map(function(c){return [c];}));if(!nxt&&g.length&&g[g.length-1].toISOString().slice(0,10)>=todayS&&g[g.length-1].getUTCFullYear()>ty)nxt=g;});
  var a=inY.length?[inY.map(function(g){return cell(g)[0];}).join("<br>and "),inY.map(function(g){return cell(g)[1];}).join(" / ")]:["No thithi day falls inside "+ty+". See the next one below.","இந்த ஆண்டில் திதி நாள் இல்லை."],b=cell(nxt||[]);
  out.innerHTML=r2("Tamil month of passing","இறந்த தமிழ் மாதம்",tm0.month+" "+tm0.day,tm0.monthT+" "+tm0.day)+r2("Thithi of passing","இறந்த திதி",tn[0],tn[1])+r2("Thithi in "+ty,ty+" திதி நாள்",a[0],a[1])+r2("Thithi after "+ty,ty+"க்குப் பின் திதி நாள்",b[0],b[1]);
  el("thinote").hidden=false;}
var MC=[["tt","Tamil (Thirukanitham) · திருக்கணிதம்"],["tv","Tamil (Vakyam) · வாக்கியம்"],["chinese","Chinese lunar · 农历"],["islamic-umalqura","Islamic (Hijri)"],["hebrew","Hebrew (Jewish)"],["persian","Persian (Solar Hijri)"],["indian","Indian national (Saka)"],["lunar","Hindu lunar (Telugu / Kannada / Marathi / Gujarati)"],["ml","Malayalam (Kollam era)"],["bn","Bengali"],["dangi","Korean lunar"],["ethiopic","Ethiopian"],["coptic","Coptic"],["buddhist","Buddhist era"],["japanese","Japanese"],["roc","Minguo (Taiwan)"],["julian","Julian"],["maya","Maya (Tzolk'in and Haab')"],["moon","Moon phases"]];
MC.forEach(function(c){var o=document.createElement("option");o.value=c[0];o.textContent=c[1];el("mc").appendChild(o);});if(CFG.mc)el("mc").value=CFG.mc;
var pf={};function parts(cal,dt){var f=pf[cal]||(pf[cal]=new Intl.DateTimeFormat("en-u-ca-"+cal,{day:"numeric",month:"long",year:"numeric",era:cal==="japanese"?"short":undefined,timeZone:"UTC"})),o={};f.formatToParts(dt).forEach(function(p){o[p.type]=p.value;});return o;}
function cellFor(c,y,m,d,dt){var t,x,J;
  if(c==="tt"||c==="tv"){var k=c==="tt"?"t":"v";t=CAL.tamil(y,m,d,k);J=CAL.jd(y,m,d,0.5);var ti=CAL.tithiAt(J,k),nk=CAL.nakAt(J,k),tn=CAL.tithiName(ti);
    return {o:t.day+" "+t.month,s:t.monthT+" "+t.day,x:(ti===14?"🌕 ":ti===29?"🌑 ":"")+CAL.NK[nk]+" · "+tn[0].split(",")[0].replace(/ \(.*/,""),yr:t.year,mo:t.month};}
  if(c==="chinese"||c==="dangi"){x=chinese(c,dt);if(!x)return null;return {o:(x.leap?"Leap ":"")+"M"+x.m+" · D"+x.d,s:c==="chinese"?(x.leap?"闰":"")+CM[x.m-1]+CD[x.d-1]:"",x:x.d===1?"🌑 New moon":x.d===15?"🌕 Full moon":"",yr:"Year of the "+ZO[((x.y-4)%12+12)%12],mo:ord(x.m)+" month"};}
  if(c==="lunar"){x=CAL.lunar(y,m,d);return {o:(x.ti<15?"S":"K")+(x.ti%15+1)+" "+LM[x.mi],s:(x.adhik?"Adhika ":"")+(x.ti<15?"Shukla":"Krishna"),x:x.ti===14?"🌕 Purnima":x.ti===29?"🌑 Amavasya":LMT[x.mi],yr:"Saka "+x.saka+" · "+x.yr,mo:LM[x.mi]};}
  if(c==="ml"){t=CAL.tamil(y,m,d,"t");var ky=y-(((m>8)||(m===8&&t.rasi>=4))?824:825);return {o:t.day+" "+ML[t.rasi],s:MLN[t.rasi],x:"",yr:"Kollam "+ky,mo:ML[t.rasi]};}
  if(c==="bn"){x=bengali(y,m,d);var q=x[0].split(" ");return {o:q[0]+" "+q[1],s:x[1].split(" ").slice(0,2).join(" "),x:"",yr:q[2]+" BS",mo:q[1]};}
  if(c==="julian"){x=CAL.julian(y,m,d);return {o:x.d+" "+MN[x.m-1],s:"",x:"",yr:String(x.y),mo:MN[x.m-1]};}
  if(c==="maya"){var my=maya(dt);return {o:my.num+" "+TZK[my.ti],s:my.hd+" "+HAB[my.hm],x:TZM[my.ti],yr:"Long Count "+my.lc.split(".").slice(0,3).join(".")+"…",mo:HAB[my.hm]};}
  if(c==="moon"){var J=CAL.jd(y,m,d,12),e=CAL.elong(J),ph=phaseOn(dt),ic=Array.from("🌑🌒🌓🌔🌕🌖🌗🌘")[Math.floor(((e+22.5)%360)/45)];return {o:(ph?ph[0]:ic)+" "+Math.round((1-Math.cos(e*Math.PI/180))/2*100)+"%",s:ph?ph[1]:(e<180?"Waxing":"Waning"),x:ph&&ph[1]==="Full moon"?FMN[m-1]:"",yr:String(y),mo:MN[m-1]};}
  if(c==="japanese"){var rk=rokuyo(dt),jp=parts(c,dt);return {o:rk?rk[0]:"",s:rk?rk[1]:"",x:"",yr:(jp.era||"")+" "+jp.year,mo:jp.month};}
  try{x=parts(c,dt);if(pf[c].resolvedOptions().calendar!==c)return null;return {o:x.day+" "+x.month,s:"",x:"",yr:(x.era&&c==="japanese"?x.era+" ":"")+(x.relatedYear||x.year)+(c==="islamic-umalqura"?" AH":c==="persian"?" AP":c==="buddhist"?" BE":c==="roc"?" Minguo":""),mo:x.month};}catch(e){return null;}}
function month(){var v=el("d").value;if(!v)return;var p=v.split("-").map(Number),y=p[0],m=p[1],c=el("mc").value,n=new Date(Date.UTC(y,m,0)).getUTCDate(),st=new Date(Date.UTC(y,m-1,1)).getUTCDay(),now=new Date(),ts=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
  var h=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(function(w){return "<div class='wd'>"+w+"</div>";}).join(""),mos=[],yrs=[];for(var i=0;i<st;i++)h+="<div></div>";
  for(var d=1;d<=n;d++){var ds=y+"-"+String(m).padStart(2,"0")+"-"+String(d).padStart(2,"0"),x=cellFor(c,y,m,d,new Date(Date.UTC(y,m-1,d)));
    if(x){if(mos.indexOf(x.mo)<0)mos.push(x.mo);if(yrs.indexOf(x.yr)<0)yrs.push(x.yr);}
    h+="<button type='button' class='dc"+(ds===v?" sel":"")+(ds===ts?" tdy":"")+"' data-d='"+ds+"'><b>"+d+"</b>"+(x?"<span class='o'>"+x.o+"</span>"+(x.s?"<small>"+x.s+"</small>":"")+(x.x?"<small class='x'>"+x.x+"</small>":""):"")+"</button>";}
  el("mg").innerHTML=h;var nm=MC.filter(function(q){return q[0]===c;})[0][1];
  el("mt").innerHTML=MN[m-1]+" "+y+"<small>"+nm+": "+(mos.length?mos.join(" – ")+" · "+yrs.join(" – "):"not available in this browser")+"</small>";}
var ST=[["Chunfen","春分","Spring Equinox"],["Qingming","清明","Clear and Bright"],["Guyu","谷雨","Grain Rain"],["Lixia","立夏","Start of Summer"],["Xiaoman","小满","Grain Buds"],["Mangzhong","芒种","Grain in Ear"],["Xiazhi","夏至","Summer Solstice"],["Xiaoshu","小暑","Minor Heat"],["Dashu","大暑","Major Heat"],["Liqiu","立秋","Start of Autumn"],["Chushu","处暑","End of Heat"],["Bailu","白露","White Dew"],["Qiufen","秋分","Autumn Equinox"],["Hanlu","寒露","Cold Dew"],["Shuangjiang","霜降","Frost's Descent"],["Lidong","立冬","Start of Winter"],["Xiaoxue","小雪","Minor Snow"],["Daxue","大雪","Major Snow"],["Dongzhi","冬至","Winter Solstice"],["Xiaohan","小寒","Minor Cold"],["Dahan","大寒","Major Cold"],["Lichun","立春","Start of Spring"],["Yushui","雨水","Rain Water"],["Jingzhe","惊蛰","Awakening of Insects"]];
var EL=["Wood","Wood","Fire","Fire","Earth","Earth","Metal","Metal","Water","Water"],ELC="木木火火土土金金水水",STEM=["Jia","Yi","Bing","Ding","Wu","Ji","Geng","Xin","Ren","Gui"],BR=["Zi","Chou","Yin","Mao","Chen","Si","Wu","Wei","Shen","You","Xu","Hai"];
var pn={};function np(cal,dt){var f=pn[cal]||(pn[cal]=new Intl.DateTimeFormat("en-u-ca-"+cal,{day:"numeric",month:"numeric",year:"numeric",timeZone:"UTC"})),o={};f.formatToParts(dt).forEach(function(p){o[p.type]=p.value;});return {m:parseInt(o.month,10),d:parseInt(o.day,10),y:parseInt(o.relatedYear||o.year,10),mn:o.month};}
function gd(c){return c.toLocaleDateString("en",{weekday:"short",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});}
function scan(dt,test,max){for(var i=0;i<(max||420);i++){var c=new Date(dt.getTime()+i*864e5);try{if(test(c))return c;}catch(e){return null;}}return null;}
function nextOn(cal,mon,day,dt){return scan(dt,function(c){if(cal==="chinese"||cal==="dangi"){var x=chinese(cal,c);return x&&!x.leap&&x.m===mon&&x.d===day;}if(cal==="hebrew"){var q=parts(cal,c);return q.month===mon&&+q.day===day;}var n=np(cal,c);return n.m===mon&&n.d===day;});}
function fest(list,cal,dt){return list.map(function(f){var c=nextOn(cal,f[1],f[2],dt);return c?[f[0],gd(c),f[3]||"",f[4]||""]:null;}).filter(Boolean);}
function mlen(cal,dt){var a=np(cal,dt),n=a.d;for(var i=1;i<40;i++){var b=np(cal,new Date(dt.getTime()+i*864e5));if(b.d===1)break;n=b.d;}return n;}
function moonPhase(J){var e=CAL.elong(J),nm=["New moon","Waxing crescent","First quarter","Waxing gibbous","Full moon","Waning gibbous","Last quarter","Waning crescent"],ic="🌑🌒🌓🌔🌕🌖🌗🌘";var i=Math.floor(((e+22.5)%360)/45);return Array.from(ic)[i]+" "+nm[i]+" · "+Math.round((1-Math.cos(e*Math.PI/180))/2*100)+"% lit";}
var TZK=["Imix","Ik'","Ak'bal","K'an","Chikchan","Kimi","Manik'","Lamat","Muluk","Ok","Chuwen","Eb","Ben","Ix","Men","Kib","Kaban","Etz'nab","Kawak","Ajaw"],TZM=["water lily, crocodile","wind","night","seed, maize","serpent","death","deer","star, rabbit","water","dog","monkey","road","reed","jaguar","eagle","owl, wax","earth","flint","storm","lord, sun"],HAB=["Pop","Wo'","Sip","Sotz'","Sek","Xul","Yaxk'in","Mol","Ch'en","Yax","Sak'","Keh","Mak","K'ank'in","Muwan","Pax","K'ayab","Kumk'u","Wayeb'"];
function maya(dt){var n=Math.round(dt.getTime()/864e5)+2440588-584283,hb=((n+348)%365+365)%365;return {n:n,num:((n+3)%13+13)%13+1,ti:((n+19)%20+20)%20,hd:hb%20,hm:Math.floor(hb/20),lc:[Math.floor(n/144000),Math.floor(n%144000/7200),Math.floor(n%7200/360),Math.floor(n%360/20),n%20].join(".")};}
var FMN=["Wolf Moon","Snow Moon","Worm Moon","Pink Moon","Flower Moon","Strawberry Moon","Buck Moon","Sturgeon Moon","Harvest Moon","Hunter's Moon","Beaver Moon","Cold Moon"];
function phaseOn(dt){var J=dt.getTime()/864e5+2440587.5,a=CAL.elong(J),b=CAL.elong(J+1),k=["New moon","First quarter","Full moon","Last quarter"],ic=["🌑","🌓","🌕","🌗"];for(var i=0;i<4;i++){var t=i*90,x=(a-t+540)%360-180,z=(b-t+540)%360-180;if(x<0&&z>=0&&z-x<40)return [ic[i],k[i]];}return null;}
function orthEaster(y){var a=y%4,b=y%7,c=y%19,d=(19*c+15)%30,e=(2*a+4*b-d+34)%7,mo=Math.floor((d+e+114)/31),da=(d+e+114)%31+1,jdn=367*y-Math.floor(7*(y+5001+Math.trunc((mo-9)/7))/4)+Math.floor(275*mo/9)+da+1729777;return new Date((jdn-2440588)*864e5);}
function church(dt,A,names){var y=dt.getUTCFullYear(),e=orthEaster(y);if(e<dt)e=orthEaster(y+1);var pe=orthEaster(e.getUTCFullYear()-1),D=864e5,lent=new Date(e.getTime()-55*D),w=dt.getUTCDay(),m=dt.getUTCMonth()+1,d=dt.getUTCDate(),why=[];
  var afterE=dt-pe;if(dt>=lent&&dt<e)why.push(names[1]);if((m===11&&d>=25)||m===12||(m===1&&d<=6))why.push(names[2]);if(m===8&&d>=7&&d<=21)why.push(names[3]);
  if((w===3||w===5)&&!(afterE>=0&&afterE<50*D))why.push("Wednesday and Friday fast");
  A("Is this a fasting day?",why.length?"Yes: "+why.join(", "):"No fast today","Wednesdays and Fridays are fast days all year, except the 50 days after Easter");
  A(names[0],gd(e),"Orthodox Easter, by the old Julian reckoning");A(names[1]+" begins",gd(lent),"55 days of fasting before Easter");A("Good Friday",gd(new Date(e.getTime()-2*D)));
  A(names[2],"25 November to 6 January","The fast before Christmas (7 January)");A(names[3],"7 to 21 August","The fast of the Virgin Mary");}
var RK=[["Taian","大安","The luckiest day. Good for weddings, moving and starting things"],["Shakkō","赤口","Unlucky, except around midday"],["Senshō","先勝","Lucky in the morning, unlucky in the afternoon"],["Tomobiki","友引","Good day, but funerals are avoided"],["Senbu","先負","Unlucky in the morning, lucky in the afternoon"],["Butsumetsu","仏滅","The unluckiest day. Weddings are avoided"]];
function rokuyo(dt){var x=chinese("dangi",dt);if(!x)return null;var r=RK[(x.m+x.d)%6];return [r[0],r[1],r[2],x.m,x.d];}
function details(){var v=el("d").value,c=el("mc").value,R=[],nm=MC.filter(function(q){return q[0]===c;})[0][1];if(!v)return;var p=v.split("-").map(Number),y=p[0],m=p[1],d=p[2],dt=new Date(Date.UTC(y,m-1,d)),J=CAL.jd(y,m,d,4),x,i,wdn=function(loc){try{return dt.toLocaleDateString(loc,{weekday:"long",timeZone:"UTC"});}catch(e){return "";}};
  function A(a,b,s,n){R.push([a,b,s||"",n||""]);}
  function F(list,cal){fest(list,cal,dt).forEach(function(f){A(f[0],f[1],f[2],f[3]);});}
  function basic(cal,loc,suffix){var q=parts(cal,dt),n=np(cal,dt);A("Date",q.day+" "+q.month+" "+(q.relatedYear||q.year)+(suffix||""),"",intl(loc,cal,dt,{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}));A("Day of the week",wdn("en"),"",wdn(loc));A("Month",q.month,(isNaN(n.m)?"":"Month "+n.m+" · ")+mlen(cal,dt)+" days long");return n;}
  if(c==="tt"||c==="tv"){A("Tamil panchangam","See the full details just below","Date, year, tithi, nakshatra, yogam, karanam, Rahu kalam and more","கீழே முழு பஞ்சாங்கம்");}
  else if(c==="chinese"||c==="dangi"){x=chinese(c,dt);if(x){var yi=((x.y-4)%60+60)%60,jdn=Math.floor(CAL.jd(y,m,d,12)+0.5),di=((jdn+49)%60+60)%60,kr=c==="dangi";
    A("Lunar date",ord(x.d)+" day of the "+ord(x.m)+(x.leap?" (leap)":"")+" month","",kr?intl("ko-KR","dangi",dt,{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}):(x.leap?"闰":"")+CM[x.m-1]+CD[x.d-1]);
    A("Zodiac year","Year of the "+EL[yi%10]+" "+ZO[yi%12],"Began in "+x.y+". The animal repeats every 12 years",kr?"":ELC.charAt(yi%10)+ZC.charAt(yi%12)+"年");
    A("Year name (stem and branch)",STEM[yi%10]+"-"+BR[yi%12],"Year "+(yi+1)+" of the 60-year cycle",GZ[0].charAt(yi%10)+GZ[1].charAt(yi%12)+"年");
    A("Day name (stem and branch)",STEM[di%10]+"-"+BR[di%12]+" · "+ZO[di%12]+" day","Day "+(di+1)+" of the 60-day cycle",GZ[0].charAt(di%10)+GZ[1].charAt(di%12)+"日");
    A("Moon",moonPhase(J),"The lunar month starts at the new moon; day 15 is near the full moon");
    var si=Math.floor(CAL.sunLon(CAL.jd(y,m,d,16))/15),nx=scan(new Date(dt.getTime()+864e5),function(q){return Math.floor(CAL.sunLon(CAL.jd(q.getUTCFullYear(),q.getUTCMonth()+1,q.getUTCDate(),16))/15)!==si;},20);
    A("Solar term (season marker)",ST[si][0]+" · "+ST[si][2],"The year has 24 solar terms",kr?"":ST[si][1]);
    if(nx)A("Next solar term",ST[(si+1)%24][0]+" · "+ST[(si+1)%24][2],gd(nx),kr?"":ST[(si+1)%24][1]);
    if(kr)F([["Seollal (Lunar New Year)",1,1,"","설날"],["Daeboreum (first full moon)",1,15,"","정월 대보름"],["Buddha's Birthday",4,8,"","부처님 오신 날"],["Dano",5,5,"","단오"],["Chuseok (harvest festival)",8,15,"","추석"]],c);
    else F([["Chinese New Year (Spring Festival)",1,1,"","春节"],["Lantern Festival",1,15,"","元宵节"],["Dragon Boat Festival",5,5,"","端午节"],["Qixi Festival",7,7,"","七夕"],["Mid-Autumn Festival",8,15,"","中秋节"],["Double Ninth Festival",9,9,"","重阳节"]],c);}}
  else if(c==="islamic-umalqura"){x=basic(c,"ar-SA"," AH");A("Moon",moonPhase(J),"Each month begins with the new crescent moon");var sm=["Sacred month (Muharram)","","","","","","Sacred month (Rajab)","","Month of fasting (Ramadan)","","Sacred month (Dhu al-Qadah)","Month of Hajj (sacred month)"][x.m-1];if(sm)A("Special month",sm,"");
    F([["Islamic New Year (1 Muharram)",1,1,"","رأس السنة الهجرية"],["Ashura",1,10,"","عاشوراء"],["Mawlid (Prophet's birthday)",3,12,"Date kept by many Sunni communities","المولد النبوي"],["Isra and Mi'raj",7,27,"","الإسراء والمعراج"],["Mid-Sha'ban",8,15,"","ليلة النصف من شعبان"],["Start of Ramadan",9,1,"","رمضان"],["Laylat al-Qadr (27th night)",9,27,"The night before this day. Many seek it in the last ten nights","ليلة القدر"],["Eid al-Fitr",10,1,"","عيد الفطر"],["Hajj begins",12,8,"8 to 13 Dhu al-Hijjah","الحج"],["Day of Arafah",12,9,"","يوم عرفة"],["Eid al-Adha",12,10,"","عيد الأضحى"]],c);A("Note","Dates can differ by a day","Many countries wait to see the new moon");}
  else if(c==="hebrew"){x=basic(c,"he-IL","");var hy=parseInt(parts(c,dt).year,10);A("Year type",[0,3,6,8,11,14,17].indexOf(hy%19)>=0?"Leap year (13 months)":"Ordinary year (12 months)","");A("Moon",moonPhase(J),"The day begins at sunset the evening before");
    F([["Rosh Hashanah (New Year)","Tishri",1,"","ראש השנה"],["Yom Kippur","Tishri",10,"","יום כיפור"],["Sukkot","Tishri",15,"","סוכות"],["Hanukkah (first day)","Kislev",25,"","חנוכה"],["Passover (first day)","Nisan",15,"","פסח"],["Shavuot","Sivan",6,"","שבועות"],["Lag BaOmer","Iyar",18,"","ל״ג בעומר"],["Tisha B'Av","Av",9,"A fast day. Moved to Sunday if it falls on Shabbat","תשעה באב"]],c);
    var hq=parts(c,dt),hd=+hq.day,hm=hq.month,wed=[],om=hm==="Nisan"&&hd>=16?hd-15:hm==="Iyar"?hd+15:hm==="Sivan"&&hd<=5?hd+44:0;
    if(om)A("Counting of the Omer","Day "+om+" of 49","From the second day of Passover to Shavuot","ספירת העומר");
    if(dt.getUTCDay()===6)wed.push("Shabbat");if(om&&om<33)wed.push("the Omer period (customs differ)");if((hm==="Tamuz"&&hd>=17)||(hm==="Tammuz"&&hd>=17)||(hm==="Av"&&hd<=9))wed.push("the Three Weeks");
    A("Weddings",wed.length?"Traditionally not held: "+wed.join(", "):"No traditional restriction today","Weddings are also not held on festivals and fast days. Ask your rabbi");A("Note","Each holiday begins at sunset the evening before the date shown","");}
  else if(c==="persian"){x=basic(c,"fa-IR"," AP");A("Season",["Spring","Summer","Autumn","Winter"][Math.floor((x.m-1)/3)],"",["بهار","تابستان","پاییز","زمستان"][Math.floor((x.m-1)/3)]);F([["Nowruz (New Year)",1,1,"","نوروز"],["Sizdah Bedar (Nature Day)",1,13,"","سیزده‌بدر"],["Tirgan",4,13,"","تیرگان"],["Mehregan",7,16,"","مهرگان"],["Yalda Night",9,30,"The longest night of the year","شب یلدا"]],c);}
  else if(c==="indian"){x=basic(c,"hi-IN"," Saka");A("Season (ritu)",["Vasanta (spring)","Grishma (summer)","Varsha (monsoon)","Sharad (autumn)","Hemanta (pre-winter)","Shishira (winter)"][Math.floor(((x.m+10)%12)/2)],"");F([["New Year (1 Chaitra)",1,1]],c);}
  else if(c==="lunar"){x=CAL.lunar(y,m,d);var nk=CAL.nakAt(CAL.jd(y,m,d,0.5),"t");A("Month",(x.adhik?"Adhika ":"")+LM[x.mi],"Month runs new moon to new moon",LMT[x.mi]+" · "+LMK[x.mi]);A("Paksha",x.ti<15?"Shukla (bright half, moon growing)":"Krishna (dark half, moon shrinking)","",x.ti<15?"శుక్ల పక్షం · ಶುಕ್ಲ ಪಕ್ಷ":"కృష్ణ పక్షం · ಕೃಷ್ಣ ಪಕ್ಷ");A("Tithi at sunrise",x.ti===14?"Purnima (full moon)":x.ti===29?"Amavasya (new moon)":CAL.TI[x.ti%15],"Timed for India");A("Nakshatra at sunrise",CAL.NK[nk],"");A("Year name",x.yr,"From the 60-year cycle");A("Shalivahana Saka year",String(x.saka),"");A("Moon",moonPhase(J));
    var ug=scan(new Date(dt.getTime()+864e5),function(q){var a=CAL.lunar(q.getUTCFullYear(),q.getUTCMonth()+1,q.getUTCDate()),b=new Date(q.getTime()-864e5),pb=CAL.lunar(b.getUTCFullYear(),b.getUTCMonth()+1,b.getUTCDate());return a.mi===0&&!a.adhik&&!(pb.mi===0&&!pb.adhik);},420);
    if(ug){var ua=CAL.lunar(ug.getUTCFullYear(),ug.getUTCMonth()+1,ug.getUTCDate());if(ua.ti>0)ug=new Date(ug.getTime()-864e5);A("Ugadi / Gudi Padwa (New Year)",gd(ug),"May differ by a day","ఉగాది · ಯುಗಾದಿ · गुढीपाडवा");}}
  else if(c==="ml"){x=CAL.tamil(y,m,d,"t");var ky=y-(((m>8)||(m===8&&x.rasi>=4))?824:825),nk2=CAL.nakAt(CAL.jd(y,m,d,0.5),"t");A("Date",x.day+" "+ML[x.rasi]+" "+ky,"May differ by a day from a Kerala calendar",x.day+" "+MLN[x.rasi]+" "+ky);A("Day of the week",wdn("en"),"",wdn("ml-IN"));A("Month",ML[x.rasi],"A solar month, like the Tamil one",MLN[x.rasi]);A("Kollam era year",String(ky),"The year begins on 1 Chingam, in mid-August");A("Nakshatra (nal) at sunrise",CAL.NK[nk2],"Tamil-style spelling. Timed for India");A("Moon",moonPhase(J));
    var ch=scan(new Date(dt.getTime()+864e5),function(q){var a=CAL.tamil(q.getUTCFullYear(),q.getUTCMonth()+1,q.getUTCDate(),"t");return a.rasi===4&&a.day===1;},400),vi=scan(new Date(dt.getTime()+864e5),function(q){var a=CAL.tamil(q.getUTCFullYear(),q.getUTCMonth()+1,q.getUTCDate(),"t");return a.rasi===0&&a.day===1;},400);
    if(ch)A("New Year (1 Chingam)",gd(ch),"May differ by a day","ചിങ്ങം 1");if(vi)A("Vishu (1 Medam)",gd(vi),"May differ by a day","വിഷു");}
  else if(c==="bn"){x=bengali(y,m,d);var q2=x[0].split(" "),bi=BN.indexOf(q2[1]);A("Date",x[0]+" BS","Bangladesh national version",x[1]);A("Day of the week",wdn("en"),"",wdn("bn-BD"));A("Month",q2[1],"Month "+(bi+1)+" of 12",BNN[bi]);A("Season (ritu)",["Grishmo (summer)","Borsha (monsoon)","Shorot (autumn)","Hemonto (late autumn)","Sheet (winter)","Boshonto (spring)"][Math.floor(bi/2)],"",["গ্রীষ্ম","বর্ষা","শরৎ","হেমন্ত","শীত","বসন্ত"][Math.floor(bi/2)]);
    A("Pohela Boishakh (New Year)",gd(new Date(Date.UTC(Date.UTC(y,3,14)>dt.getTime()?y:y+1,3,14))),"14 April in Bangladesh. West Bengal often keeps 15 April","পহেলা বৈশাখ");}
  else if(c==="ethiopic"){x=basic(c,"am-ET","");church(dt,A,["Fasika (Easter)","Hudade (Great Lent)","Tsome Nebiyat (Advent fast)","Filseta"]);F([["Enkutatash (New Year)",1,1,"","እንቁጣጣሽ"],["Meskel",1,17,"","መስቀል"],["Genna (Christmas)",4,29,"","ገና"],["Timkat (Epiphany)",5,11,"","ጥምቀት"]],c);A("About","13 months: 12 of 30 days and a short one of 5 or 6 days","The year is 7 to 8 years behind the English calendar");}
  else if(c==="coptic"){x=basic(c,"ar-EG","");church(dt,A,["Easter","Great Lent","Nativity fast","Fast of the Virgin Mary"]);F([["Nayrouz (New Year)",1,1,"","عيد النيروز"],["Christmas",4,29,"","عيد الميلاد"],["Epiphany",5,11,"","عيد الغطاس"]],c);A("About","13 months: 12 of 30 days and a short one of 5 or 6 days","Years are counted from 284 AD");}
  else if(c==="buddhist"){x=basic(c,"th-TH"," BE");
    var J0=CAL.jd(y,m,d,0),PY=["Duruthu","Navam","Medin","Bak","Vesak","Poson","Esala","Nikini","Binara","Vap","Il","Unduvap"],fm=CAL.nextPhase(J0-5.5/24,180),fl=new Date((fm-2440587.5)*864e5+5.5*36e5);
    A("Next Poya day (Sri Lanka)",gd(new Date(Date.UTC(fl.getUTCFullYear(),fl.getUTCMonth(),fl.getUTCDate()))),PY[fl.getUTCMonth()]+" full moon Poya. May differ by a day from the official list","පෝය");
    [[0,"New moon"],[90,"Waxing half moon"],[180,"Full moon"],[270,"Waning half moon"]].map(function(q){var t=CAL.nextPhase(J0-7/24,q[0]),l=new Date((t-2440587.5)*864e5+7*36e5);return [Date.UTC(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),q[1]];}).sort(function(a,b){return a[0]-b[0];}).forEach(function(q,i){A(i?"Then":"Next holy day (Wan Phra, Thailand)",gd(new Date(q[0])),q[1]+". The Thai temple calendar can differ by a day",i?"":"วันพระ");});A("About","Same months and days as the English calendar","The year is 543 ahead");A("Moon",moonPhase(J),"Buddhist holy days follow the moon");}
  else if(c==="japanese"){var jq=parts(c,dt),rk=rokuyo(dt);if(rk)A("Rokuyō (lucky day cycle)",rk[0]+" · "+rk[2],"From the old lunar date: "+ord(rk[4])+" day of the "+ord(rk[3])+" month",rk[1]);A("Date",jq.month+" "+jq.day+", "+(jq.era||"")+" "+jq.year,"",intl("ja-JP","japanese",dt,{era:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}));A("Day of the week",wdn("en"),"",wdn("ja-JP"));A("Era",(jq.era||"")+" "+jq.year,"Years are counted from the start of the emperor's reign");A("Zodiac year (eto)","Year of the "+ZO[((y-4)%12+12)%12],"Japan uses the same 12 animals, starting on 1 January","子丑寅卯辰巳午未申酉戌亥".charAt(((y-4)%12+12)%12)+"年");}
  else if(c==="roc"){x=basic(c,"zh-TW","");A("About","Same months and days as the English calendar","Years are counted from 1912, the first year of the Republic");}
  else if(c==="maya"){var my=maya(dt);A("Tzolk'in (260-day sacred count)",my.num+" "+TZK[my.ti],"Day sign meaning: "+TZM[my.ti]+". 13 numbers run with 20 day signs");A("Haab' (365-day year)",my.hd+" "+HAB[my.hm],"18 months of 20 days, then 5 days called Wayeb'");A("Calendar Round",my.num+" "+TZK[my.ti]+" "+my.hd+" "+HAB[my.hm],"The same pair returns only every 52 years");A("Long Count",my.lc,"Days counted from the Maya starting date in 3114 BC");A("Days since the start of the Long Count",my.n.toLocaleString("en"));
    var ny=scan(new Date(dt.getTime()+864e5),function(q){var k=maya(q);return k.hm===0&&k.hd===0;},370);if(ny)A("Next Haab' new year (0 Pop)",gd(ny));A("Day of the week",wdn("en"));A("Note","Uses the standard GMT correlation (584283)","Day-keepers in Guatemala still follow the Tzolk'in count");}
  else if(c==="moon"){var e0=CAL.elong(J),Jm=CAL.jd(y,m,d,0),age=e0/360*29.53;A("Moon today",moonPhase(J),"Moon age about "+age.toFixed(1)+" days");
    [[180,"Next full moon"],[0,"Next new moon"],[90,"Next first quarter"],[270,"Next last quarter"]].forEach(function(q){var t=CAL.nextPhase(Jm,q[0]),l=new Date((t-2440587.5)*864e5);A(q[1],gd(new Date(Date.UTC(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()))),q[0]===180?"Traditional name: "+FMN[l.getUTCMonth()]+". Date in world (UTC) time":"Date in world (UTC) time");});
    A("Planting by the Moon (folk tradition)",e0<180?"Moon is growing: leafy and above-ground crops":"Moon is shrinking: root crops, pruning and weeding","An old farmers' almanac custom, not proven by science");
    var q0=Math.floor(CAL.sunLon(CAL.jd(y,m,d,24))/90),sn=scan(new Date(dt.getTime()+864e5),function(c2){return Math.floor(CAL.sunLon(CAL.jd(c2.getUTCFullYear(),c2.getUTCMonth()+1,c2.getUTCDate(),24))/90)!==q0;},100);
    if(sn)A("Next change of season",gd(sn),["June solstice (longest day in the north)","September equinox","December solstice (shortest day in the north)","March equinox"][q0]);
    A("Day of the year","Day "+(Math.round((dt-Date.UTC(y,0,1))/864e5)+1)+" of "+y,isoWeek(dt));}
  else if(c==="julian"){x=CAL.julian(y,m,d);A("Date",x.d+" "+MN[x.m-1]+" "+x.y,"Used by some Orthodox churches");A("Day of the week",wdn("en"));A("Days behind the English calendar",String(Math.round((dt.getTime()-Date.UTC(x.y,x.m-1,x.d))/864e5)),"The gap grows by 3 days every 400 years");var oc=new Date(Date.UTC(y,0,7));if(oc<dt)oc=new Date(Date.UTC(y+1,0,7));A("Orthodox Christmas (25 December, Julian)",gd(oc),"7 January in the English calendar");A("Julian New Year (Old New Year)",gd(new Date(Date.UTC(dt>new Date(Date.UTC(y,0,14))?y+1:y,0,14))),"14 January in the English calendar");}
  el("dth").textContent="Details · "+nm;el("det").innerHTML=R.map(function(r){return row(r[0],r[1],r[2],r[3]);}).join("");}
el("mg").addEventListener("click",function(e){var b=e.target.closest(".dc");if(!b)return;el("d").value=b.getAttribute("data-d");show();});
el("mc").addEventListener("change",function(){month();details();});
el("mprint").addEventListener("click",function(){var n=el("mg").querySelectorAll(".dc").length+new Date(Date.UTC(+el("d").value.slice(0,4),+el("d").value.slice(5,7)-1,1)).getUTCDay();el("mg").style.setProperty("--rows",Math.ceil(n/7));document.body.classList.add("pm");window.print();});
window.addEventListener("afterprint",function(){document.body.classList.remove("pm");});
function mshift(n){var v=el("d").value;if(!v)return;var p=v.split("-").map(Number),t=new Date(Date.UTC(p[0],p[1]-1+n,1)),last=new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth()+1,0)).getUTCDate();setD(new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),Math.min(p[2],last))));}
el("mp").addEventListener("click",function(){mshift(-1);});el("mn").addEventListener("click",function(){mshift(1);});
function setD(dt){el("d").value=dt.getUTCFullYear()+"-"+String(dt.getUTCMonth()+1).padStart(2,"0")+"-"+String(dt.getUTCDate()).padStart(2,"0");show();}
function shift(n){var v=el("d").value;if(!v)return;var p=v.split("-").map(Number);setD(new Date(Date.UTC(p[0],p[1]-1,p[2]+n)));}
function now(){var t=new Date();setD(new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())));}
window.FNS_SHARE=function(){var v=el("d").value;if(!v)return null;var p=v.split("-").map(Number),pl=PL[+el("pl").value||0],a=CAL.panchang(p[0],p[1],p[2],pl[1],pl[2],sys),day=el("long").textContent.split(" · ")[0],u=location.origin+location.pathname+"?d="+v,t;
  if(CFG.share==="tamil")t=day+" = Tamil: "+a.month+" "+a.day+" ("+a.monthT+" "+a.day+"), "+a.year+" year. Nakshatra: "+a.nak+" ("+a.nakT+"). Tithi: "+a.tithi+". Full panchangam:";
  else if(CFG.region==="in")t=day+": Tithi "+HTE[a.ti===14?14:a.ti===29?15:a.ti%15]+", Nakshatra "+HNE[a.nk]+". Full panchang:";
  else{var r=el("det").querySelector("tr");t=day+(r?" = "+r.querySelector("td:last-child").textContent.trim().split("\n")[0]:"")+". "+(CFG.shareName||"See it in other calendars")+":";}
  return {url:u,text:t};};
function pick(k){sys=k;el("bT").setAttribute("aria-pressed",k==="t");el("bV").setAttribute("aria-pressed",k==="v");show();thithi();}
el("d").addEventListener("input",show);el("pl").addEventListener("change",function(){show();thithi();});el("pm").addEventListener("change",times);el("asr").addEventListener("change",times);el("dd").addEventListener("input",thithi);el("dt").addEventListener("input",thithi);el("today").addEventListener("click",now);el("prev").addEventListener("click",function(){shift(-1);});el("next").addEventListener("click",function(){shift(1);});
el("bT").addEventListener("click",function(){pick("t");});el("bV").addEventListener("click",function(){pick("v");});
var qd=(location.search.match(/[?&]d=(\d{4}-\d{2}-\d{2})/)||[])[1];if(qd){el("d").value=qd;show();if(!el("pan").innerHTML)now();}else now();
})();
