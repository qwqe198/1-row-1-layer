addLayer("bg", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "BG", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
g:new ExpantaNum(0),
        }
    },
      
    requires() { return new ExpantaNum("200") },
    color: "#00FFFF",
    resource: "增幅器和生成器", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },
    effectDescription() { return `点数获取x${format(this.beff())}<br>你有${format(player.bg.g)}生成器能量(+${format(layers.bg.ggain())}/s),点数获取x${format(this.geff())}.` },
    beff() {
let pow=n(2)
pow=pow.add(buyableEffect("tes", 11))
if(hasUpgrade("bg",14))pow=pow.add(upgradeEffect("bg",14))
if(hasUpgrade("tes",11))pow=pow.add(upgradeEffect("tes",11))
if(hasUpgrade("bg",16))pow=pow.add(upgradeEffect("bg",16))
pow=pow.mul(layers.sbg.beff())
if(hasUpgrade("hq",12))pow=pow.mul(upgradeEffect("hq",12))
if(hasUpgrade("tes",32))pow=pow.pow(upgradeEffect("tes",32))
pow=pow.mul(buyableEffect("tes",23))
        let eff = n(pow).pow(player.bg.points)
if(eff.gte(1e100))eff=eff.root(5).mul(1e80)
        return eff
    },
ggain() {
let pow=n(2)
pow=pow.add(buyableEffect("tes", 11))
if(hasUpgrade("bg",13))pow=pow.add(upgradeEffect("bg",13))
if(hasUpgrade("bg",15))pow=pow.add(upgradeEffect("bg",15))
if(hasUpgrade("tes",11)&&!hasUpgrade("tes",15))pow=pow.add(upgradeEffect("tes",11))
if(hasUpgrade("tes",15))pow=pow.mul(upgradeEffect("tes",11))
if(hasUpgrade("bg",31))pow=pow.mul(upgradeEffect("bg",31))
pow=pow.mul(buyableEffect("tes",23))
pow=pow.mul(layers.sbg.geff())
if(hasUpgrade("hq",12))pow=pow.mul(upgradeEffect("hq",12))
        let eff = n(pow).pow(player.bg.points)
if(hasUpgrade("bg",23))eff=eff.mul(upgradeEffect("bg",23))
if(hasUpgrade("tes",25))eff=eff.mul(upgradeEffect("tes",25))
if(hasUpgrade("tes",22))eff=eff.mul(upgradeEffect("tes",22))
if(hasUpgrade("tes",42))eff=eff.mul(layers.tes.teeff())
if(hasUpgrade("tes",43))eff=eff.mul(buyableEffect("tes",21))
if(hasUpgrade("tes",43))eff=eff.mul(buyableEffect("tes",22))
eff=eff.mul(layers.hq.qeff())
if(hasUpgrade("bg",21))eff=eff.pow(2)
if(hasUpgrade("bg",32))eff=eff.pow(1.28)
if(hasUpgrade("tes",54))eff=eff.pow(1.0675)
if(hasMilestone("hq",9))eff=eff.mul(challengeEffect("hq", 11))
if(player.bg.points.lt(1))eff=n(0)
        return eff
    },
geff() {
let pow=n(2)
if(hasUpgrade("p",52)&&!inChallenge("hq",11))pow=player.bg.g.plus(1).log10().pow(hasUpgrade("bg",25)?0.425:hasUpgrade("tes",12)?0.4:0.375).plus(2)
        let eff = player.bg.g.plus(1).log10().plus(1).pow(pow)
if(hasUpgrade("bg",24))eff=eff.pow(1.2)
if(hasUpgrade("tes",23))eff=eff.pow(upgradeEffect("tes",23))
if(hasMilestone("hq",6))eff=eff.pow(player.bg.points.add(1).log10().mul(0.1).add(1))
        return eff
    },
    exponent(){
let req=n(1.25)
if(hasUpgrade("p",51)&&!inChallenge("hq",11))req=req.sub(0.04)
if(hasUpgrade("p",53)&&!inChallenge("hq",11))req=req.sub(0.01)
return req
} ,
 base: 5,
    baseAmount() { return player.points },//基础资源数量
    baseResource: "点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(0.5)

        return exp
    },
    layerShown() { return hasUpgrade("p",13)||player.bg.points.gte(1) },
    row: "1", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   update(diff) {
                player.bg.g =  player.bg.g.add(this.ggain().mul(diff))

        },
canBuyMax() { return hasMilestone("bg", 3) },
 resetsNothing() { return hasMilestone("tes",6) },
milestones: {
    1: {
        requirementDescription: "5增幅器和生成器",
        effectDescription: "重置时保留声望升级",
        done() { return player.bg.points.gte(5) }
    },
  2: {
        requirementDescription: "11增幅器和生成器",
        effectDescription: "每秒自动获取100%的声望点",
        done() { return player.bg.points.gte(11) }
    },
3: {
        requirementDescription: "26增幅器和生成器",
        effectDescription: "你可以购买最大增幅器和生成器",
        done() { return player.bg.points.gte(26) }
    },
},
      upgrades: {
 11: {
            description: "生成器加成声望获取",
            cost() { return new ExpantaNum(3) },
 effect() {
                let b = player.bg.points.pow(0.5).add(1)
                 if(hasUpgrade("bg",26))b=player.bg.points.pow(player.bg.points.pow(0.5)).add(1)
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
            unlocked() { return true },

        },
        12: {
            description: "增幅器加成声望获取",
            cost() { return new ExpantaNum(3) },
 effect() {
                let b = player.bg.points.pow(0.5).add(1)
                if(hasUpgrade("bg",26))b=player.bg.points.pow(player.bg.points.pow(0.5)).add(1)
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
            unlocked() { return true },

        },

13: {
            description: "增幅器加成生成器底数",
            cost() { return new ExpantaNum(4) },
 effect() {
                let b = player.bg.points.add(1).log10()
                if(hasMilestone("sbg",2))b=b.mul(player.tes.ts.plus(1))
            return b;
            },
            effectDisplay() { return "+"+format(this.effect())  },
            unlocked() { return hasUpgrade("bg",11) },

        },
14: {
            description: "生成器加成增幅器底数",
            cost() { return new ExpantaNum(4) },
 effect() {
                let b = player.bg.points.add(1).log10()
                if(hasMilestone("sbg",2))b=b.mul(player.tes.ts.plus(1))
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())  },
            unlocked() { return hasUpgrade("bg",12) },

        },
15: {
            description: "声望加成生成器底数",
            cost() { return new ExpantaNum(5) },
 effect() {
                let b = player.p.points.add(1).log10().add(1).log10()
                if(hasMilestone("sbg",2))b=b.mul(player.tes.ts.plus(1))
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())  },
            unlocked() { return hasUpgrade("bg",13) },

        },
16: {
            description: "声望加成增幅器底数",
            cost() { return new ExpantaNum(5) },
 effect() {
                let b = player.p.points.add(1).log10().add(1).log10()
                if(hasMilestone("sbg",2))b=b.mul(player.tes.ts.plus(1))
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())  },
            unlocked() { return hasUpgrade("bg",14) },

        },
21: {
            description: "生成器能量获取^2",
            cost() { return new ExpantaNum(8) },

            unlocked() { return hasUpgrade("bg",15) },

        },
22: {
            description: "p层级升级23效果^1.5",
            cost() { return new ExpantaNum(6) },

            unlocked() { return hasUpgrade("bg",16) },

        },
23: {
            description: "生成器能量加成生成器能量获取",
            cost() { return new ExpantaNum(1e14) },
 effect() {
                let b = player.bg.g.plus(1).log10().plus(1)
                
                return b;
            },
 currencyDisplayName: "生成器能量",
            currencyInternalName: "g",
            currencyLayer: "bg",
            effectDisplay() { return format(this.effect()) + "倍"  },
            unlocked() { return hasUpgrade("bg",21) },

        },
24: {
            description: "生成器能量效果^1.2",
            cost() { return new ExpantaNum(1e17) },
 
 currencyDisplayName: "生成器能量",
            currencyInternalName: "g",
            currencyLayer: "bg",

            unlocked() { return hasUpgrade("bg",22) },

        },
 25: {
            description: "修改生成器能量效果公式lgx^(lgx^0.4)<br />>lgx^(lgx^0.425)",
            cost() { return new ExpantaNum("1e375") },

            unlocked() { return hasUpgrade("bg",24) },
 currencyDisplayName: "生成器能量",
            currencyInternalName: "g",
            currencyLayer: "bg",
        },
26: {
            description: "前两个升级使用更好的公式",
            cost() { return new ExpantaNum(91) },

            unlocked() { return hasUpgrade("bg",25) },

        },
31: {
            description: "生成器加成自身基础",
            cost() { return new ExpantaNum(132) },
 effect() {
                let b = player.bg.points.div(75).plus(1)
                
                return b;
            },
            effectDisplay() { return "x"+format(this.effect())  },
            unlocked() { return hasUpgrade("bg",26) },

        },
32: {
            description: "生成器能量获取^1.28",
            cost() { return new ExpantaNum(175) },

            unlocked() { return hasUpgrade("bg",31) },

        },
33: {
            description: "超级增幅器提升声望获取",
 effect() {
                let b = n(1000).pow(player.sbg.points.pow(2))
                
                return b;
            },
            effectDisplay() { return "x"+format(this.effect())  },
            cost() { return new ExpantaNum("1e3300") },
            unlocked() { return hasUpgrade("bg",24) },
 currencyDisplayName: "生成器能量",
            currencyInternalName: "g",
            currencyLayer: "bg",
        },
    },
 doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
           
                
              if (hasMilestone("tes",4)||hasMilestone("hq",5)) kept.push("milestones")
            layerDataReset(this.layer, kept)
        }

    },
autoPrestige() { return hasMilestone("tes",4) },
hotkeys: [
        { key: "b", description: "b: 进行增幅器和生成器重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
autoUpgrade() { return hasMilestone("tes", 5)  },
})