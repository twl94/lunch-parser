const fetch = require("node-fetch");

/** 
 * 원하는 키워드를 입력하여 학교를 검색할 수 있습니다.
 * (비동기 함수로 받아야 됨)
 * @example
 * // 사용 예시
 * async function parseSchools(){
 *   let data = await getSchool("학교")
 * }
*/
const getSchool = async (name) => {
    const schoolAPI = 'https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=100&SCHUL_NM='
    let schools = []

    const res = await fetch(`${schoolAPI}${name}`);
    const json = await res.json();
    
    if (json['schoolInfo'][1] && json['schoolInfo'][1]["row"]) {
        for (let i = 0; i < json['schoolInfo'][1]["row"].length; i++) {
            let schoolData = json['schoolInfo'][1]["row"][i];

            let jsonData = {
                regionCode: schoolData.ATPT_OFCDC_SC_CODE,
                schoolCode: schoolData.SD_SCHUL_CODE,
                schoolName: schoolData.SCHUL_NM,
                schoolWebsite: schoolData.HMPG_ADRES,
                schoolFax: schoolData.ORG_FAXNO,
                schoolAddress: schoolData.ORG_RDNMA,
            }

            schools.push(jsonData)
        }
    }

    return schools;
}

/**
 * 받은 학교 정보로 급식을 조회 할 수 있습니다.
 * (비동기 함수로 받아야 됨)
 * 
 * date - 가져올 급식의 날짜 (예: 20250307) 
 * 
 * regionCode - 학교 지역코드 (예: X10)
 * 
 * schoolCode - 학교 코드 (예: 123456)
 * 
 * @example
 * // 사용 예시
 * async function getLunch() {
 *   let data = await lunchAPI.getLunch("20250307", "X10", "123456");
 *   console.log(data);
 * }
 */
const getLunch = async (date, regionCode, schoolCode) => {
    let lunchAPI = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolCode}&MMEAL_SC_CODE=2&MLSV_YMD=${date}`;
    const res = await fetch(lunchAPI);
    const json = await res.json();

    let mealData = json.mealServiceDietInfo[1]['row'][0]['DDISH_NM']
    let ntr = json.mealServiceDietInfo[1]['row'][0]['NTR_INFO']
    let origin = json.mealServiceDietInfo[1]['row'][0]['ORPLC_INFO']
    let data = {
        mealData: mealData.split('<br/>'),
        ntrInfo: ntr.split('<br/>'),
        origin: origin.split('<br/>'),
        calories: json.mealServiceDietInfo[1]['row'][0]['CAL_INFO']
    }

    return data
} 


module.exports.getSchool = getSchool;
module.exports.getLunch = getLunch;