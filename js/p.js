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
effectDescription() { return `这是一个基于声望树的mod,内容是把原版层级按照重置顺序合并为一行,为更快解锁不同的内容,加快了前期速度` },
    exponent: 0.5,
    baseAmount() { return player.points },//基础资源数量
    baseResource: "点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
if(hasUpgrade("p",21)&&!inChallenge("hq",11))mult=mult.mul(1.8)
if(hasUpgrade("bg",11))mult=mult.mul(upgradeEffect("bg",11))
if(hasUpgrade("bg",12))mult=mult.mul(upgradeEffect("bg",12))
if(hasUpgrade("bg",33))mult=mult.mul(upgradeEffect("bg",33))
if(hasUpgrade("p",23))mult=mult.mul(upgradeEffect("p",23))
if(hasUpgrade("tes",13))mult=mult.mul(upgradeEffect("tes",13))
mult=mult.mul(n(1.8).pow(buyableEffect("tes", 11).mul(2).pow(1.3)))
mult=mult.mul(layers.tes.teeff())
mult=mult.mul(buyableEffect("tes",22))
if(hasUpgrade("p",31)&&!inChallenge("hq",11))mult=mult.pow(1.05)
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
if(hasMilestone("oss",4))b=b.mul(1e25)
                if(b.gte("1e1000"))b=b.log10().pow(1000/3)
if(inChallenge("hq",11))b=n(1)
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
                if(hasUpgrade("p",33))b=b.pow(upgradeEffect("p",33))
if(inChallenge("hq",11))b=n(1)
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
					let eff = n(hasUpgrade("p",32)?1.6:1.4).pow(player.p.upgrades.length);
					if(inChallenge("hq",11))eff=n(1)
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
if(hasUpgrade("p",33))eff=eff.pow(upgradeEffect("p",33))
if(inChallenge("hq",11))eff=n(1)
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
 32: {
            description: "p升级22效果变得更好",
            cost() { return new ExpantaNum(1e63) },
            unlocked() { return hasUpgrade("p",31) },

        },
33: {
            description: "上面两个升级基于声望变得更好",
 effect() {
                let b = player.p.points.plus(1).log10().pow(0.1).plus(1)
                if (hasMilestone("sbg",4))b=b.mul(player.sbg.points.plus(1))
if(inChallenge("hq",11))b=n(1)
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())  },
            cost() { return new ExpantaNum(1e153) },
            unlocked() { return hasUpgrade("p",32) },

        },
51: {
				description: "降低增幅器和生成器需求",
				cost() { return new ExpantaNum(5000000) },
				unlocked() { return hasUpgrade("p",23) },
				
			
			},
52: {
				description: "修改生成器能量效果公式lgx^2>lgx^(lgx^0.375)",
				cost() { return new ExpantaNum(1e9) },
				unlocked() { return hasUpgrade("p",51) },
				
			
			},
53: {
				description: "再次降低增幅器和生成器需求",
				cost() { return new ExpantaNum("1e561") },
				unlocked() { return hasUpgrade("p",33) },
				
			
			},
    },
  doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
           
                
              if (hasMilestone("bg", 1)||hasMilestone("tes", 3)) kept.push("upgrades")
            layerDataReset(this.layer, kept)
        }
    },
 passiveGeneration() {
        if (hasMilestone("bg", 2)) return 1
        return 0
    },
hotkeys: [
        { key: "p", description: "p: 进行声望重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
 autoUpgrade() { return hasMilestone("tes", 1)  },
})