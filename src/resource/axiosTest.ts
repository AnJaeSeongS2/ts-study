const axios = require('axios')
const CORS_PROXY:string = 'https://cors-anywhere.herokuapp.com/'
const PAGING_COUNT:number = 20

// all req
// function getClusterListURL():string {
//     return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=12&lat=37.5274304&lon=127.0372217&btm=37.4155773&lft=126.8969744&top=37.639116&rgt=127.177469&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&pCortarNo=`
// }
// function getArticleListURL(lgeo:string, page:number):string {
//     return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${lgeo}&mapKey=&lgeo=${lgeo}&showR0=&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=12&lat=37.5274304&lon=127.0372217&btm=37.4155773&lft=126.8969744&top=37.639116&rgt=127.177469&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&totCnt=171&cortarNo=&sort=rank&page=${page}`
// }

// min req
function getClusterListURL():string {
    return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=18&lat=37.5566433&lon=127.0240977&btm=37.5548976&lft=127.0219063&top=37.558389&rgt=127.0262891&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&pCortarNo=`
}
function getArticleListURL(lgeo:string, page:number):string {
    return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${lgeo}&mapKey=&lgeo=${lgeo}&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=18&lat=37.5566433&lon=127.0240977&btm=37.5548976&lft=127.0219063&top=37.558389&rgt=127.0262891&cortarNo=&showR0=&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&page=${page}`
}
function getArticleInfoURL(articleNo:number):string {
    return `https://m.land.naver.com/article/info/${articleNo}`
}
function getSearchDescStr():string {
    return `올수리`
}

function getArticleList(lgeo:string, maxPage:number, articleArray:Array<Article>):Array<Promise<any>> {
    let searched:Array<Promise<any>> = []
    for (let page:number = 1; page <= maxPage; page++) {
        searched.push(axios.get(getArticleListURL(lgeo, page)).then(res => {
            res.data.body.forEach(body => {
                if (body.atclFetrDesc != null && body.atclFetrDesc.includes(getSearchDescStr())) {
                    articleArray.push(new Article(body.atclNo, body.atclFetrDesc))
                }
            })
        }))
    }
    return searched
}

function getAllArticleListFromClusterList() {
    let articleArray:Array<Article> = []
    let allArticleReq:Array<Promise<any>> = []
    axios.get(getClusterListURL()).then(res => {
        res.data.data.ARTICLE.forEach(article => {
            console.log(`${article.lgeo}'s count: ${article.count}, article list :\n`)
            getArticleList(article.lgeo, parseInt((article.count/PAGING_COUNT).toString()) + 1, articleArray).forEach(promise => {
                allArticleReq.push(promise)
            })
        })

        Promise.all(allArticleReq).then(() => {
            console.log(`\n\nSearched article count : ${articleArray.length}\n\n`)
            articleArray.forEach(article => {
                console.log(`${article.no} : ${article.desc}\n\turl: ${getArticleInfoURL(article.no)}`)
            })
        })
    })
}

class Article {
    no:number
    desc:string

    constructor(no:number, desc:string) {
        this.no = no
        this.desc = desc
    }
}
function getSearchedArticleList():void {
    getAllArticleListFromClusterList();
}

export default {
    getSearchedArticleList
}