addLayer("oss", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "OSS", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
se:new ExpantaNum(0),
ss:new ExpantaNum(0),
        }
    },
      
    requires() { return new ExpantaNum("21") },
    color: "#e5ff51ff",
    resource: "阳光", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },
    effectDescription() { return `` },

segain() {
let pow=n(1)

        let eff = n(player.oss.points).pow(pow)

if(player.oss.points.lt(1))eff=n(0)
        return eff
    },
seeff1() {
let pow=n(1)

        let eff = player.oss.se.plus(1).log10().pow(pow)

        return eff
    },
seeff2() {
let pow=n(1)

        let eff = player.oss.se.pow(pow).add(1)

        return eff
    },
ssgain() {


        let eff = buyableEffect("oss", 11)


        return eff
    },
sseff1() {
let pow=n(0.5)

        let eff = player.oss.ss.plus(1).log10().pow(pow).div(100).add(1)

        return eff
    },
sseff2() {
let pow=n(10)

        let eff = player.oss.ss.add(1).pow(pow)

        return eff
    },
    exponent(){
let req=n(0)


return req
} ,

    baseAmount() { return getBuyableAmount("hq", 11) },//基础资源数量
    baseResource: "诡异层",//基础资源名称
    gainMult() { // 资源获取数量倍率
req=n(21).sub(this.seeff1())
        mult = n(2).pow(getBuyableAmount("hq", 11).sub(req))

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)

        return exp
    },
    layerShown() { return hasMilestone("hq",41)||player.oss.points.gte(1) },
    row: "5", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   update(diff) {
                player.oss.se =  player.oss.se.add(this.segain().mul(diff))
player.oss.ss =  player.oss.ss.add(this.ssgain().mul(diff))

        },

buyables: {
       
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(10).pow(x.pow(2)).floor()

                return c
 },
            display() { return `基础子空间能量获取<br />为${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}阳光(不消耗)<br>数量: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.oss.points.gte(this.cost()) },
            buy() {
                
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "子空间"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
let pow=n(2)

                 let eff = n(pow).pow(x);
if(getBuyableAmount(this.layer, this.id).lt(1))eff=n(0)
                return eff
            },
            unlocked() { return true },
        },
  
    },
milestones: {
    1: {
        requirementDescription: "1阳光",
        effectDescription: "在所有重置中保留hq挑战,自动购买第4空间建筑(太阳能量效果是在公式中减少扣除,重置需求不低于21)",
        done() { return player.oss.points.gte(1) }
    },
 2: {
        requirementDescription: "10阳光",
        effectDescription: "超级增幅器和生成器不重置任何东西(在21诡异层时需要约1500太阳能量获得9阳光)",
        done() { return player.oss.points.gte(10) }
    },
 3: {
        requirementDescription: "20阳光",
        effectDescription: "生成器能量效果公式变得更好(lgx^(lgx^0.425)>lgx^(lgx^0.43))",
        done() { return player.oss.points.gte(20) }
    },
},
    tabFormat: {

        "buy": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",function () {
                   return `你有${format(player.oss.se)}太阳能量(+${format(layers.oss.segain())}/s),减少阳光需求${format(layers.oss.seeff1())},加成时间能量获取x${format(layers.oss.seeff2())}.`},
                    
                ],
    ["display-text",function () {
                   return getBuyableAmount("oss", 11).gte(1) ? `你有${format(player.oss.ss)}子空间能量(+${format(layers.oss.ssgain())}/s),空间力量x${format(layers.oss.sseff1())},建筑价格/${format(layers.oss.sseff2())}.`:""},
                    
                ],
                "buyables",

            ],
            unlocked() { return true }
        },
  "mil": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",function () {
                   return `你有${format(player.oss.se)}太阳能量(+${format(layers.oss.segain())}/s),减少阳光需求${format(layers.oss.seeff1())},加成时间能量获取x${format(layers.oss.seeff2())}.`},
                    
                ],
    ["display-text",function () {
                   return getBuyableAmount("oss", 11).gte(1) ? `你有${format(player.oss.ss)}子空间能量(+${format(layers.oss.ssgain())}/s),空间力量x${format(layers.oss.sseff1())},建筑价格/${format(layers.oss.sseff2())}.`:""},
                    
                ],
                "milestones",

            ],
            unlocked() { return true }
        },
  
    }, 
 

hotkeys: [
        { key: "o", description: "o: 进行阳光和子空间重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],

})