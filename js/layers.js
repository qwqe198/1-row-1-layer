
addLayer("p", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `P`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),

        }
    },

     
    requires() { return new ExpantaNum("10") },
    color: "#31aeb0",
    resource: "声望点", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },

    exponent: 0.5,
    baseAmount() { return player.points },//基础资源数量
    baseResource: "点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
if(hasUpgrade("p",21))mult=mult.mul(1.8)
if(hasUpgrade("bg",11))mult=mult.mul(upgradeEffect("bg",11))
if(hasUpgrade("bg",12))mult=mult.mul(upgradeEffect("bg",12))
if(hasUpgrade("p",23))mult=mult.mul(upgradeEffect("p",23))
if(hasUpgrade("p",31))mult=mult.pow(1.05)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)

        return exp
    },
    layerShown() { return true },
    row: 0, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排

    upgrades: {
        11: {
            description: "每秒获得1点数",
            cost() { return new ExpantaNum(1) },
            unlocked() { return true },

        },
 12: {
            description: "声望加成点数获取",
            cost() { return new ExpantaNum(1) },
            unlocked() { return hasUpgrade("p",11) },
 effect() {
                let b = player.p.points.plus(2).pow(0.5)
                
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
        },
 13: {
            description: "点数加成点数获取",
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade("p",12) },
 effect() {
                let b = player.points.plus(1).log10().pow(0.75).plus(1)
                
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍" },
        },
 21: {
            description: "声望获取增加80%",
            cost() { return new ExpantaNum(20) },
            unlocked() { return hasUpgrade("p",13) },

        },
22: {
				description: "点数获取基于你已购买的声望升级更快。",
				cost() { return new ExpantaNum(75) },
				effect() {
					let eff = n(1.4).pow(player.p.upgrades.length);
					
					return eff;
				},
				unlocked() { return hasUpgrade("p",21) },
				effectDisplay() { return format(this.effect()) + "倍"  },
			
			},
23: {
				description: "点数加成声望获取",
				cost() { return new ExpantaNum(5000) },
				effect() {
					let eff = player.points.plus(1).log10().pow(0.5).plus(1)
					if(hasUpgrade("bg",22))eff=eff.pow(1.5)
					return eff;
				},
				unlocked() { return hasUpgrade("p",22) },
				effectDisplay() { return format(this.effect()) + "倍"  },
			
			},
 31: {
            description: "声望获取变成原来的1.05次幂",
            cost() { return new ExpantaNum(1e18) },
            unlocked() { return hasUpgrade("p",23) },

        },
51: {
				description: "ex(指原版没有的)降低增幅器和生成器需求",
				cost() { return new ExpantaNum(5000000) },
				unlocked() { return hasUpgrade("p",23) },
				
			
			},
52: {
				description: "ex修改gp效果公式lgx^2>lgx^(lgx^0.375)",
				cost() { return new ExpantaNum(1e9) },
				unlocked() { return hasUpgrade("p",51) },
				
			
			},
    },
  doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
           
                
              if (hasMilestone("bg", 1)) kept.push("upgrades")
            layerDataReset(this.layer, kept)
        }
    },
 passiveGeneration() {
        if (hasMilestone("bg", 2)) return 1
        return 0
    },
})
addLayer("bg", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "BG", // 这是节点上显示的字母
    position: 3, // 节点顺序
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
    effectDescription() { return `点数获取x${format(this.beff())}<br>你有${format(player.bg.g)}gp(+${format(layers.bg.ggain())}/s),点数获取x${format(this.geff())}.` },
    beff() {
let pow=n(2)
if(hasUpgrade("bg",14))pow=pow.add(upgradeEffect("bg",14))
if(hasUpgrade("bg",16))pow=pow.add(upgradeEffect("bg",16))
        let eff = n(pow).pow(player.bg.points)

        return eff
    },
ggain() {
let pow=n(2)
if(hasUpgrade("bg",13))pow=pow.add(upgradeEffect("bg",13))
if(hasUpgrade("bg",15))pow=pow.add(upgradeEffect("bg",15))
        let eff = n(pow).pow(player.bg.points)
if(hasUpgrade("bg",23))eff=eff.mul(upgradeEffect("bg",23))
if(hasUpgrade("bg",21))eff=eff.pow(2)
if(player.bg.points.lt(1))eff=n(0)
        return eff
    },
geff() {
let pow=n(2)
if(hasUpgrade("p",52))pow=player.bg.g.plus(1).log10().pow(0.375).plus(2)
        let eff = player.bg.g.plus(1).log10().plus(1).pow(pow)
if(hasUpgrade("bg",24))eff=eff.pow(1.2)
        return eff
    },
    exponent(){
let req=n(1.25)
if(hasUpgrade("p",51))req=n(1.2)
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
},
      upgrades: {
 11: {
            description: "生成器加成声望获取",
            cost() { return new ExpantaNum(3) },
 effect() {
                let b = player.bg.points.pow(0.5).add(1)
                
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
                
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())  },
            unlocked() { return hasUpgrade("bg",14) },

        },
21: {
            description: "gp获取^2",
            cost() { return new ExpantaNum(8) },

            unlocked() { return hasUpgrade("bg",15) },

        },
22: {
            description: "p层级升级23效果^1.5",
            cost() { return new ExpantaNum(6) },

            unlocked() { return hasUpgrade("bg",16) },

        },
23: {
            description: "gp加成gp获取",
            cost() { return new ExpantaNum(1e14) },
 effect() {
                let b = player.bg.g.plus(1).log10().plus(1)
                
                return b;
            },
 currencyDisplayName: "gp",
            currencyInternalName: "g",
            currencyLayer: "bg",
            effectDisplay() { return format(this.effect()) + "倍"  },
            unlocked() { return hasUpgrade("bg",21) },

        },
24: {
            description: "gp效果^1.2",
            cost() { return new ExpantaNum(1e17) },
 
 currencyDisplayName: "gp",
            currencyInternalName: "g",
            currencyLayer: "bg",

            unlocked() { return hasUpgrade("bg",22) },

        },

    },
})