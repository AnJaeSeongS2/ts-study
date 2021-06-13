import { TupleType } from "typescript";

const axios = require('axios')
const CORS_PROXY:string = 'https://cors-anywhere.herokuapp.com/'
const PAGING_COUNT:number = 20
const delay = (ms:number) => {
    console.log(`delay ${ms}`)
    return new Promise(resolve => setTimeout(resolve, ms))
};
const syncCall = async (ms:number, func:Function, ...args) => {
    await delay(ms)
    console.log('after await')
    return func(args)
}
let countCall = 0
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        console.log(countCall++)
        await delay(1250)
        await callback(array[index], index, array)
    }
}

// all req
// function getClusterListURL():string {
//     return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=12&lat=37.5274304&lon=127.0372217&btm=37.4155773&lft=126.8969744&top=37.639116&rgt=127.177469&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&pCortarNo=`
// }
// function getArticleListURL(lgeo:string, page:number):string {
//     return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${lgeo}&mapKey=&lgeo=${lgeo}&showR0=&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=12&lat=37.5274304&lon=127.0372217&btm=37.4155773&lft=126.8969744&top=37.639116&rgt=127.177469&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&totCnt=171&cortarNo=&sort=rank&page=${page}`
// }
// function getClusterListURL():string {
//     return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5561777&lon=127.0149165&btm=37.5422106&lft=126.9973856&top=37.5701422&rgt=127.0324474&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&pCortarNo=`
// }
// function getArticleListURL(itemId:string, lgeo:string, page:number):string {
//     return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${itemId}&mapKey=&lgeo=${lgeo}&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5561777&lon=127.0149165&btm=37.5430443&lft=126.9973856&top=37.5693088&rgt=127.0324474&cortarNo=&showR0=&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&page=${page}`
// }

class ListURL {
    clusterList:Function
    articleList:Function
    constructor(clusterList:Function, articleList:Function) {
        this.clusterList = clusterList
        this.articleList = articleList
    }
}

const getListURL:Array<ListURL> = []
// TRHEE
// getListURL.push(new ListURL(():string => {
//     return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5561777&lon=127.0149165&btm=37.5422106&lft=126.9973856&top=37.5701422&rgt=127.0324474&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&pCortarNo=`
// }, 
// (itemId:string, lgeo:string, page:number):string => {
//     return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${itemId}&mapKey=&lgeo=${lgeo}&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5561777&lon=127.0149165&btm=37.5430443&lft=126.9973856&top=37.5693088&rgt=127.0324474&cortarNo=&showR0=&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&page=${page}`
// }))

// getListURL.push(new ListURL(():string => {
//     return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5416151&lon=127.0673161&btm=37.5284791&lft=127.0497852&top=37.5547488&rgt=127.0848471&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&pCortarNo=15_1121510700`
// }, 
// (itemId:string, lgeo:string, page:number):string => {
//     return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${itemId}&mapKey=&lgeo=${lgeo}&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5407304&lon=127.067917&btm=37.5275942&lft=127.050386&top=37.5538642&rgt=127.0854479&cortarNo=&showR0=&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&page=${page}`
// }))

//TWOROOM
getListURL.push(new ListURL(():string => {
    return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5416151&lon=127.0673161&btm=37.5284791&lft=127.0497852&top=37.5547488&rgt=127.0848471&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=TWOROOM&pCortarNo=15_1121510700`
}, 
(itemId:string, lgeo:string, page:number):string => {
    return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${itemId}&mapKey=&lgeo=${lgeo}&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5407304&lon=127.067917&btm=37.5275942&lft=127.050386&top=37.5538642&rgt=127.0854479&cortarNo=&showR0=&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=TWOROOM&page=${page}`
}))

getListURL.push(new ListURL(():string => {
    return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5416151&lon=127.0673161&btm=37.5284791&lft=127.0497852&top=37.5547488&rgt=127.0848471&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=TWOROOM&pCortarNo=15_1121510700`
}, 
(itemId:string, lgeo:string, page:number):string => {
    return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${itemId}&mapKey=&lgeo=${lgeo}&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=15&lat=37.5407304&lon=127.067917&btm=37.5275942&lft=127.050386&top=37.5538642&rgt=127.0854479&cortarNo=&showR0=&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=TWOROOM&page=${page}`
}))

// min req
// function getClusterListURL():string {
//     return `https://m.land.naver.com/cluster/clusterList?view=atcl&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=18&lat=37.5566433&lon=127.0240977&btm=37.5548976&lft=127.0219063&top=37.558389&rgt=127.0262891&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&pCortarNo=`
// }
// function getArticleListURL(lgeo:string, page:number):string {
//     return `https://m.land.naver.com/cluster/ajax/articleList?itemId=${lgeo}&mapKey=&lgeo=${lgeo}&rletTpCd=APT%3AOPST%3AVL&tradTpCd=B1&z=18&lat=37.5566433&lon=127.0240977&btm=37.5548976&lft=127.0219063&top=37.558389&rgt=127.0262891&cortarNo=&showR0=&wprcMin=20000&wprcMax=40000&spcMin=33&spcMax=132&tag=THREEROOM&page=${page}`
// }
function getArticleInfoURL(articleNo:number):string {
    return `https://m.land.naver.com/article/info/${articleNo}`
}
function getSearchDescStr():string {
    return `임대사업자`
}

// function getArticleList(itemId:string, lgeo:string, maxPage:number, articleArray:Array<Article>, getArticleListURL:Function):Array<Promise<any>> {
//     let searched:Array<Promise<any>> = []
//     for (let page:number = 1; page <= maxPage; page++) {
//         searched.push(axios.get(getArticleListURL(itemId, lgeo, page)).then(res => {
//             res.data.body.forEach(body => {
//                 if (body.atclFetrDesc != null && body.atclFetrDesc.includes(getSearchDescStr())) {
//                     articleArray.push(new Article(body.atclNo, body.atclFetrDesc))
//                 }
//             })
//         }))
//     }
//     return searched
// }

function getArticleListURLs(itemId:string, lgeo:string, maxPage:number, articleArray:Array<Article>, getArticleListURL:Function):Array<string> {
    let urls:Array<string> = []
    for (let page:number = 1; page <= maxPage; page++) {
        urls.push(getArticleListURL(itemId, lgeo, page))
    }
    return urls
}

var testCount:number = 0
async function getArticlePage(url:string, articleArray:Array<Article>):Promise<any> {
    return axios.get(url).then(res => {
        res.data.body.forEach(body => {
            if (body.atclFetrDesc != null && body.atclFetrDesc.includes(getSearchDescStr())) {
                articleArray.push(new Article(body.atclNo, body.atclFetrDesc))
            }
        })
    })
}

// function getAllArticleListFromClusterList() {
//     let articleArray:Array<Article> = []
//     let allArticleReq:Array<Promise<any>> = []

//     asyncForEach(getListURL, async (entry) => {
//         await axios.get(entry.clusterList()).then(async res => {
//             res.data.data.ARTICLE.forEach(article => {
//                 console.log(`${article.lgeo}'s count: ${article.count}, article list :\n`)
//                 if (article.count == 1) {
//                     getArticleList(article.itemId, article.lgeo, parseInt((article.count/PAGING_COUNT).toString()) + 1, articleArray, entry.articleList).forEach(promise => {
//                         allArticleReq.push(promise)
//                     })
//                 } else {
//                     getArticleList(article.lgeo, article.lgeo, parseInt((article.count/PAGING_COUNT).toString()) + 1, articleArray, entry.articleList).forEach(promise => {
//                         allArticleReq.push(promise)
//                     })
//                 }
//             })

//             await Promise.all(allArticleReq).then(() => {
//                 console.log(`\n\nSearched article count : ${articleArray.length}\n\n`)
//                 articleArray.forEach(article => {
//                     console.log(`${article.no} : ${article.desc}\n\turl: ${getArticleInfoURL(article.no)}`)
//                 })
//             })
//         })
//     })
// }

async function getAllArticleListFromClusterList2() {
    let articleArray:Array<Article> = []
    let allArticleReq:Array<Promise<any>> = []
    let allArticleListURLs:Array<string> = []
    let articleCount:number = 0
    await asyncForEach(getListURL, async (entry) => {
        await axios.get(entry.clusterList()).then(async res => {
            res.data.data.ARTICLE.forEach(article => {
                console.log(`${article.lgeo}'s count: ${article.count}, article list :\n`)
                if (article.count == 1) {
                    getArticleListURLs(article.itemId, article.lgeo, parseInt((article.count/PAGING_COUNT).toString()) + 1, articleArray, entry.articleList).forEach(url => {
                        allArticleListURLs.push(url)
                    })
                } else {
                    getArticleListURLs(article.lgeo, article.lgeo, parseInt((article.count/PAGING_COUNT).toString()) + 1, articleArray, entry.articleList).forEach(url => {
                        allArticleListURLs.push(url)
                    })
                }
                articleCount += article.count
            })
        })
    })
            
    console.log(`all articleCount: ${articleCount}`)
    await asyncForEach(allArticleListURLs, async url => {
        allArticleReq.push(await getArticlePage(url, articleArray))
    })

    console.log(`\n\nSearched article count : ${articleArray.length}\n\n`)
    articleArray.forEach(article => {
        console.log(`${article.no} : ${article.desc}\n\turl: ${getArticleInfoURL(article.no)}`)
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
    getAllArticleListFromClusterList2();
}

export default {
    getSearchedArticleList
}