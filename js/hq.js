addLayer("hq", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `HQ`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
h: new ExpantaNum(0),
q: new ExpantaNum(0),
        }
    },

   heff() {
let pow=player.points.plus(1).log10().plus(1).log10().plus(1)

        let eff = player.hq.points.plus(10).log10().plus(2).mul(pow).pow(pow).max(1)

if(player.hq.points.lt(1))eff=n(1)

        return eff
    },  
 qgain() {


        let eff = buyableEffect("hq", 11).max(1)

if(player.hq.points.lt(1))eff=n(0)
        return eff
    },  
 qeff() {
let pow=n(2)

        let eff = player.hq.q.max(1).pow(pow)


        return eff
    },  
    requires() { return n("1e10000") },
    color: "#473a0bff",
    resource: "障碍灵魂和诡异", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },

   exponent: 0.001,

    baseAmount() { return player.bg.g },//基础资源数量
    baseResource: "生成器能量",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)


       return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)

        return exp
    },
buyables: {
       
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(2).pow(x.pow(1.5)).floor()

                return c
 },
            display() { return `诡异能量获取<br />为${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}诡异(不消耗)<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.hq.points.gte(this.cost()) },
            buy() {
                
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "诡异层"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
let pow=n(2)
                 let eff = n(pow).pow(x);

                return eff
            },
            unlocked() { return true },
        },
  
    },
milestones: {
    1: {
        requirementDescription: "1障碍灵魂和诡异",
        effectDescription: "自动购买增强子，且它的效果x1.25,每个自动的购买都会在重置时保留1个",
        done() { return player.hq.points.gte(1) }
    },
  2: {
        requirementDescription: "2障碍灵魂和诡异",
        effectDescription: "自动获得时间胶囊和空间能量，且修改它的价格公式",
        done() { return player.hq.points.gte(2) }
    },
3: {
        requirementDescription: "3障碍灵魂和诡异",
        effectDescription: "降低增强需求",
        done() { return player.hq.points.gte(3) }
    },
4: {
        requirementDescription: "5障碍灵魂和诡异",
        effectDescription: "自动获得额外时间胶囊，且修改它的价格公式",
        done() { return player.hq.points.gte(5) }
    },
5: {
        requirementDescription: "3诡异层",
        effectDescription: "重置时保留bg里程碑",
        done() { return getBuyableAmount(this.layer, 11).gte(3)}
    },
6: {
        requirementDescription: "10障碍灵魂和诡异",
        effectDescription: "生成器提升生成器能量效果",
        done() { return player.hq.points.gte(10) }
    },
  7: {
        requirementDescription: "50障碍灵魂和诡异",
        effectDescription: "自动获得超级增幅器和生成器",
        done() { return player.hq.points.gte(50) }
    },
8: {
        requirementDescription: "100障碍灵魂和诡异",
        effectDescription: "解锁第一个障碍",
        done() { return player.hq.points.gte(100) }
    },
9: {
        requirementDescription: "在升级荒漠中获得1e32点数",
        effectDescription: "该障碍最高点数加成生成器能量,其对数加成超级生成器能量",
        done() { return challengeEffect("hq", 11).gte(1e32) }
    },
},
challenges: {
11: {
            name: "升级荒漠",
            challengeDescription: "p升级只有第一个生效",
            unlocked() { return true },
            rewardDescription(){
               
                return ""
            },
            canComplete: false,
            completionLimit: Infinity,
            goal: Infinity,
            goalDescription(){return "更多点数"},
                       rewardEffect() {
let re=n(0)
  if(inChallenge("hq",11)) re=re.max(player.points).max(challengeEffect("hq", 11))
 if(!inChallenge("hq",11))re=re.max(player.hq.challenges[11])
return re
            },
           

            onExit() {
                player.hq.challenges[11] = player.points.max(challengeEffect("hq", 11)).max(0)
            },
            rewardDisplay(){return `最高点数:${format(this.rewardEffect())}`}
        },
},
    layerShown() { return player.hq.points.gte(1)||hasUpgrade("tes",55)||getBuyableAmount(this.layer, 11).gte(1)},
    row: 4, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
tabFormat: {

        "buy": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",function () {
                   return `你的障碍灵魂将点数和时间能量获取变为原来的` + format(layers.hq.heff()) + `倍 (由点数提升)`},
                    
                ],
    ["display-text",function () {
                   return getBuyableAmount("hq", 11).gte(1) ? `你有${format(player.hq.q)}诡异能量(+${format(layers.hq.qgain())}/s),使点数和生成器能量获取x${format(layers.hq.qeff())}`:""},
                    
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
                   return `你的障碍灵魂将点数和时间能量获取变为原来的` + format(layers.hq.heff()) + `倍 (由点数提升)`},
                    
                ],
    ["display-text",function () {
                   return getBuyableAmount("hq", 11).gte(1) ? `你有${format(player.hq.q)}诡异能量(+${format(layers.hq.qgain())}/s),使点数和生成器能量获取x${format(layers.hq.qeff())}`:""},
                    
                ],
                "milestones",

            ],
            unlocked() { return true }
        },
    "chal": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",function () {
                   return `你的障碍灵魂将点数和时间能量获取变为原来的` + format(layers.hq.heff()) + `倍 (由点数提升)`},
                    
                ],
    ["display-text",function () {
                   return getBuyableAmount("hq", 11).gte(1) ? `你有${format(player.hq.q)}诡异能量(+${format(layers.hq.qgain())}/s),使点数和生成器能量获取x${format(layers.hq.qeff())}`:""},
                    
                ],
                "challenges",

            ],
            unlocked() { return hasMilestone("hq",8) }
        },
    },
 
  hotkeys: [
        { key: "h", description: "h: 进行障碍灵魂和诡异重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
 update(diff) {
    player.hq.q=player.hq.q.add(layers.hq.qgain().mul(diff))
    },
})