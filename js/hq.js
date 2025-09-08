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
if(hasUpgrade("hq",23))eff=eff.pow(3)
if(player.hq.points.lt(1))eff=n(1)

        return eff
    },  
 qgain() {


        let eff = buyableEffect("hq", 11).max(1)
if(hasUpgrade("hq",11))eff=eff.mul(upgradeEffect("hq",11))
if(hasMilestone("hq",37))mult=mult.mul(challengeEffect("hq", 11).plus(10).log10())
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
if(hasMilestone("sbg",5))mult=mult.mul(player.sbg.points.plus(1))
if(hasUpgrade("hq",13))mult=mult.mul(upgradeEffect("hq",13))
       return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)

        return exp
    },
buyables: {
       
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(2).pow(x.pow(hasMilestone("hq",33)?1.49:1.5)).floor()

                return c
 },
            display() { return `基础诡异能量获取<br />为${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}诡异(不消耗)<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.hq.points.gte(this.cost()) },
            buy() {
                
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "诡异层"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
let pow=n(2)
if(hasMilestone("hq",13)) pow=x.plus(2)
if(hasUpgrade("hq",21)) pow=pow.mul(upgradeEffect("hq",21))
if(hasMilestone("sbg",6)) pow=pow.mul(player.sbg.points.add(1))
                 let eff = n(pow).pow(x);

                return eff
            },
            unlocked() { return true },
        },
  
    },
 upgrades: {
 11: {
            description: "诡异和购买升级数量加成诡异能量获取",
            cost() { return n(1000) },
 effect() {
                let b = player.hq.points.add(1).pow(player.hq.upgrades.length**0.5)
               
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
            unlocked() { return true },

        },
      12: {
            description: "诡异加成生成器和增幅器底数",
            cost() { return n(5000) },
 effect() {
                let b = player.hq.points.add(10).log10().add(10).log10()
               
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
            unlocked() { return true },

        },
  13: {
            description: "障碍灵魂和诡异加成自身获取",
            cost() { return n(5e8) },
 effect() {
                let b = player.hq.points.add(10).log10()
               
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
            unlocked() { return true },

        },
 14: {
            description: "生成器能量效果^1.1",
            cost() { return n(1e15) },

            unlocked() { return true },

        },
21: {
            description: "超级增幅器加成诡异层生产底数",
            cost() { return n(5e16) },
effect() {
                let b = player.sbg.points.add(1).log10().add(1)
               
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
            unlocked() { return true },

        },
22: {
            description: "诡异提供免费的时间胶囊,空间能量,增强子和前3空间建筑",
            cost() { return n(1e20) },
effect() {
                let b = player.hq.points.add(10).log10().pow(0.5)
               
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())  },
            unlocked() { return true },

        },
23: {
            description: "障碍灵魂的效果变为原来的3次方",
            cost() { return n(5e21) },

            unlocked() { return true },

        },
24: {
            description: "时间能量的效果被提升到1.75次幂",
            cost() { return n(1.5e23) },

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
10: {
        requirementDescription: "5诡异层",
        effectDescription: "自动购买第一个空间建筑",
        done() { return getBuyableAmount(this.layer, 11).gte(5)}
    },
11: {
        requirementDescription: "500障碍灵魂和诡异",
        effectDescription: "障碍灵魂和诡异加成增强获取",
        done() { return player.hq.points.gte(500) }
    },
12: {
        requirementDescription: "在升级荒漠中获得1e47点数",
        effectDescription: "解锁诡异升级,自动购买第二个空间建筑",
        done() { return challengeEffect("hq", 11).gte(1e47) }
    },
13: {
        requirementDescription: "1000障碍灵魂和诡异",
        effectDescription: "诡异层底数基于自身增加",
        done() { return player.hq.points.gte(1000) }
    },
14: {
        requirementDescription: "在升级荒漠中获得1e60点数",
        effectDescription: "降低超级增幅器和生成器价格",
        done() { return challengeEffect("hq", 11).gte(1e60) }
    },
15: {
        requirementDescription: "7诡异层",
        effectDescription: "自动购买第三个空间建筑",
        done() { return getBuyableAmount(this.layer, 11).gte(7)}
    },
16: {
        requirementDescription: "在升级荒漠中获得1e107点数",
        effectDescription: "解锁空间力量,它加成空间建筑效果,基于空间能量获得加成",
        done() { return challengeEffect("hq", 11).gte(1e107) }
    },
17: {
        requirementDescription: "8诡异层",
        effectDescription: "第一个障碍最高点数的对数加成增强获取",
        done() { return getBuyableAmount(this.layer, 11).gte(8)}
    },
18: {
        requirementDescription: "1e6障碍灵魂和诡异",
        effectDescription: "解锁第4空间建筑",
        done() { return player.hq.points.gte(1e6)}
    },
19: {
        requirementDescription: "9诡异层",
        effectDescription: "诡异层免费赠送增强子等级",
        done() { return getBuyableAmount(this.layer, 11).gte(9)}
    },
20: {
        requirementDescription: "在升级荒漠中获得1e152点数",
        effectDescription: "bg升级33对点数生效",
        done() { return challengeEffect("hq", 11).gte(1e152) }
    },
21: {
        requirementDescription: "10诡异层",
        effectDescription: "解锁第2个障碍",
        done() { return getBuyableAmount(this.layer, 11).gte(10)}
    },
22: {
        requirementDescription: "在速度之翼中获得1.798e308点数",
        effectDescription: "超级增幅器和生成器底数+0.25",
        done() { return challengeEffect("hq", 12).gte("1.798e308") }
    },
23: {
        requirementDescription: "11诡异层",
        effectDescription: "每个增强子获得2倍点数",
        done() { return getBuyableAmount(this.layer, 11).gte(11)}
    },
24: {
        requirementDescription: "12诡异层",
        effectDescription: "每个生成器获得2倍生成器能量",
        done() { return getBuyableAmount(this.layer, 11).gte(12)}
    },
25: {
        requirementDescription: "在升级荒漠中获得1e268点数",
        effectDescription: "1e32的第一个奖励在指数前生效",
        done() { return challengeEffect("hq", 11).gte(1e268) }
    },
26: {
        requirementDescription: "在速度之翼中获得1e843点数",
        effectDescription: "1e308奖励对超级生成器修改为每1e308就+0.25",
        done() { return challengeEffect("hq", 12).gte("1e843") }
    },
27: {
        requirementDescription: "15诡异层",
        effectDescription: "解锁第3个障碍",
        done() { return getBuyableAmount(this.layer, 11).gte(15)}
    },
28: {
        requirementDescription: "在空间紧缺中获得1e3135点数",
        effectDescription: "从1e3000开始,该障碍中每1e100最高点数的平方根增加1%空间力量",
        done() { return challengeEffect("hq", 21).gte("1e3135") }
    },
29: {
        requirementDescription: "在速度之翼中获得1e1000点数",
        effectDescription: "1e308奖励对超级生成器修改为每1e250就+0.25",
        done() { return challengeEffect("hq", 12).gte("1e1000") }
    },
30: {
        requirementDescription: "1e24500生成器能量",
        effectDescription: "生成器能量加成超级生成器能量获取",
        done() { return player.bg.g.gte("1e24500")}
    },
31: {
        requirementDescription: "16诡异层",
        effectDescription: "降低前2个空间建筑价格",
        done() { return getBuyableAmount(this.layer, 11).gte(16)}
    },
32: {
        requirementDescription: "在升级荒漠中获得1e365点数",
        effectDescription: "tes升级32修改为在空间建筑3后生效",
        done() { return challengeEffect("hq", 11).gte("1e365") }
    },
33: {
        requirementDescription: "在升级荒漠中获得1e454点数",
        effectDescription: "降低诡异层价格",
        done() { return challengeEffect("hq", 11).gte("1e454") }
    },
34: {
        requirementDescription: "18诡异层",
        effectDescription: "重置时保留tes里程碑",
        done() { return getBuyableAmount(this.layer, 11).gte(18)}
    },
35: {
        requirementDescription: "在速度之翼中获得1e1250点数",
        effectDescription: "1e308奖励对超级增幅器公式修改为(0.25x(lgx/1000)^0.5)",
        done() { return challengeEffect("hq", 12).gte("1e1250") }
    },
36: {
        requirementDescription: "19诡异层",
        effectDescription: "提升超级生成器能量的效果公式(lgx>lgx^1.1)",
        done() { return getBuyableAmount(this.layer, 11).gte(19)}
    },
37: {
        requirementDescription: "在升级荒漠中获得1e521点数",
        effectDescription: "该挑战最高点数的对数加成时间能量和诡异能量获取",
        done() { return challengeEffect("hq", 11).gte("1e521") }
    },
38: {
        requirementDescription: "在速度之翼中获得1e1375点数",
        effectDescription: "超级生成器能量加成自身获取",
        done() { return challengeEffect("hq", 12).gte("1e1375") }
    },
39: {
        requirementDescription: "在空间紧缺中获得1e3550点数",
        effectDescription: "该障碍中最高点数降低空间建筑3价格",
        done() { return challengeEffect("hq", 21).gte("1e3550") }
    },
40: {
        requirementDescription: "20诡异层",
        effectDescription: "解锁第4个障碍",
        done() { return getBuyableAmount(this.layer, 11).gte(20)}
    },
41: {
        requirementDescription: "在弱化中获得1e248点数",
        effectDescription: "解锁新层级",
        done() { return challengeEffect("hq", 22).gte("1e248") }
    },
42: {
        requirementDescription: "在升级荒漠中获得1e775点数",
        effectDescription: "阳光获取x(里程碑-40)",
        done() { return challengeEffect("hq", 11).gte("1e775") }
    },
},
challenges: {
11: {
            name: "升级荒漠",
            challengeDescription: "p升级只有第一个生效",
            unlocked() { return true },
            rewardDescription(){
               
                return "见里程碑"
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
12: {
            name: "速度之翼",
            challengeDescription: "增幅器和生成器底数被极大消减",
            unlocked() { return hasMilestone("hq",21) },
            rewardDescription(){
               
                return "见里程碑"
            },
            canComplete: false,
            completionLimit: Infinity,
            goal: Infinity,
            goalDescription(){return "更多点数"},
                       rewardEffect() {
let re=n(0)
  if(inChallenge("hq",12)) re=re.max(player.points).max(challengeEffect("hq", 12))
 if(!inChallenge("hq",12))re=re.max(player.hq.challenges[12])
return re
            },
           
unlock(){return },
            onExit() {
                player.hq.challenges[12] = player.points.max(challengeEffect("hq", 12)).max(0)
            },
            rewardDisplay(){return `最高点数:${format(this.rewardEffect())}`}
        },
21: {
            name: "空间紧缺",
            challengeDescription: "你的空间力量变为0%",
            unlocked() { return hasMilestone("hq",27) },
            rewardDescription(){
               
                return "见里程碑"
            },
            canComplete: false,
            completionLimit: Infinity,
            goal: Infinity,
            goalDescription(){return "更多点数"},
                       rewardEffect() {
let re=n(0)
  if(inChallenge("hq",21)) re=re.max(player.points).max(challengeEffect("hq", 21))
 if(!inChallenge("hq",21))re=re.max(player.hq.challenges[21])
return re
            },
           
unlock(){return },
            onExit() {
                player.hq.challenges[21] = player.points.max(challengeEffect("hq", 21)).max(0)
            },
            rewardDisplay(){return `最高点数:${format(this.rewardEffect())}`}
        },
22: {
            name: "弱化",
            challengeDescription: "只有声望升级和第一建筑能增益点数获取",
            unlocked() { return hasMilestone("hq",40) },
            rewardDescription(){
               
                return "见里程碑"
            },
            canComplete: false,
            completionLimit: Infinity,
            goal: Infinity,
            goalDescription(){return "更多点数"},
                       rewardEffect() {
let re=n(0)
  if(inChallenge("hq",22)) re=re.max(player.points).max(challengeEffect("hq", 22))
 if(!inChallenge("hq",22))re=re.max(player.hq.challenges[22])
return re
            },
           
unlock(){return },
            onExit() {
                player.hq.challenges[22] = player.points.max(challengeEffect("hq", 22)).max(0)
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
["display-text",function () {
                   return  `你有${format(player.hq.milestones.length)}里程碑`},
                    
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
 "upg": {
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
                "upgrades",

            ],
            unlocked() { return hasMilestone("hq",12) }
        },
    },
 
  hotkeys: [
        { key: "h", description: "h: 进行障碍灵魂和诡异重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
 update(diff) {
    player.hq.q=player.hq.q.add(layers.hq.qgain().mul(diff))
if(hasMilestone("oss",5))player.hq.points=player.hq.points.max(5)
    },
 doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
           
                
               kept.push("challenges")
            layerDataReset(this.layer, kept)
        }

    },
})