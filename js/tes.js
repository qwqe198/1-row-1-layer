addLayer("tes", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `TES`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
ts: new ExpantaNum(0),
te: new ExpantaNum(0),
        }
    },

     
    requires() { return new ExpantaNum(hasMilestone("hq",3)?"1":"1e30") },
    color: "#cc00ffff",
    resource: "增强", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },

    exponent: 0.15,
    baseAmount() { return player.points },//基础资源数量
    baseResource: "点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
if(hasUpgrade("tes",34))mult=mult.mul(upgradeEffect("tes",34))
if(hasMilestone("hq",10))mult=mult.mul(player.hq.points.plus(1))
if(hasMilestone("hq",17))mult=mult.mul(challengeEffect("hq", 11).plus(10).log10())
       return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)

        return exp
    },
  tegain() { 
var pow=n(2)
if(hasMilestone("sbg",1))var pow=n(player.tes.ts).plus(2)
pow=pow.add(getBuyableAmount(this.layer, 13))
pow=pow.mul(buyableEffect("oss",23))
        var gain = n(pow).pow(getBuyableAmount(this.layer, 12).add(getBuyableAmount(this.layer, 13)))
gain=gain.mul(layers.hq.heff())
if(hasMilestone("hq",37))gain=gain.mul(challengeEffect("hq", 11).plus(10).log10())
gain=gain.mul(layers.oss.seeff2())
if(hasUpgrade("tes",61))gain=gain.mul(upgradeEffect("tes",61))
if(getBuyableAmount(this.layer, 12).lt(1))gain=n(0)
        return gain
    },
  ll() { 
var ll=n(1)
if(hasMilestone("hq",16))ll=ll.add(player.tes.ts.mul(0.01))
if(hasMilestone("hq",28))ll=ll.add(challengeEffect("hq", 21).div("1e3000").max(1).log10().div(100).root(2).mul(0.01))
if(hasUpgrade("tes",62))ll=ll.add(0.08)
ll=ll.mul(layers.oss.sseff1())
if(inChallenge("hq",21))ll=n(0)
        return ll
    },
teeff() { 
var pow=n(1.5)
let eff = player.tes.te.plus(1).log10().plus(1).pow(pow)
if(hasUpgrade("tes",41))eff=eff.pow(upgradeEffect("tes",41))
if(hasUpgrade("hq",24))eff=eff.pow(1.75)
        return eff
    },
    layerShown() { return player.points.gte(1e30)||player.tes.points.gte(1)||getBuyableAmount(this.layer, 11).gte(1) },
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
milestones: {
    1: {
        requirementDescription: "4增强子",
        effectDescription: "自动购买p升级",
        done() { return getBuyableAmount(this.layer, 11).gte(4) }
    },
  2: {
        requirementDescription: "5增强子",
        effectDescription: "解锁时间胶囊和空间能量",
        done() { return getBuyableAmount(this.layer, 11).gte(5) }
    },
3: {
        requirementDescription: "2时间胶囊和空间能量",
        effectDescription: "重置时保留p升级,解锁空间建筑2",
        done() { return player.tes.ts.gte(2) }
    },
4: {
        requirementDescription: "3时间胶囊和空间能量",
        effectDescription: "重置时保留bg里程碑,自动获取增幅器和生成器",
        done() { return player.tes.ts.gte(3) }
    },
5: {
        requirementDescription: "4时间胶囊和空间能量",
        effectDescription: "自动购买bg升级",
        done() { return player.tes.ts.gte(4) }
    },
6: {
        requirementDescription: "5时间胶囊和空间能量",
        effectDescription: "bg不重置任何东西",
        done() { return player.tes.ts.gte(5) }
    },
7: {
        requirementDescription: "10时间胶囊和空间能量",
        effectDescription: "解锁额外时间胶囊(计入时间胶囊效果,除特别说明外不计入升级加成)",
        done() { return player.tes.ts.gte(10) }
    },
},
buyables: {
       
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(2).pow(x.pow(1.5))
if(inChallenge("hq",31))c=Infinity
                return c
 },
            display() { return `声望获取<br />x${format(n(1.8).pow(buyableEffect(this.layer, this.id).mul(2).pow(1.3)))},增幅器和生成器底数+${format(buyableEffect(this.layer, this.id))} .花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}增强<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.tes.points.gte(this.cost()) },
            buy() {
                player.tes.points = player.tes.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "增强子"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
if(hasUpgrade("tes",14))x=x.add(1);
if(hasUpgrade("tes",21))x=x.add(2);
if(hasUpgrade("tes",33))x=x.add(upgradeEffect("tes",33));
if(hasUpgrade("tes",51))x=x.add(upgradeEffect("tes",51));
if(hasMilestone("hq",19))x=x.add(getBuyableAmount("hq", 11))
if(hasUpgrade("hq",22))x=x.add(upgradeEffect("hq",22));
                 let eff = x.mul(hasMilestone("hq", 1)?1:0.8);

                return eff
            },
            unlocked() { return true },
        },
   12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(1000).pow(x.mul(2).pow(1.25))
if(hasMilestone("hq", 2))c=n(n(10).pow(x.pow(1.875)))
if(hasUpgrade("oss", 11))c=n(n(8).pow(x.pow(1.875)))
if(inChallenge("hq",31))c=Infinity
                return c
 },
            display() { return `花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}增强` },
            canAfford() { return player.tes.points.gte(this.cost()) },
            buy() {
                player.tes.points = player.tes.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "获得时间胶囊和空间能量"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
if(hasUpgrade("hq",22))x=x.add(upgradeEffect("hq",22));
                 let eff = x;

                return eff
            },
            unlocked() { return hasMilestone("tes", 2) },
        },
13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(180).add(x.mul(5).pow(1.25))
if(hasMilestone("hq", 4))c=n(180).add(x.pow(2))
                return c
 },
            display() { return `你有:${format(buyableEffect(this.layer, this.id))}额外时间胶囊 花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}增幅器` },
            canAfford() { return player.bg.points.gte(this.cost()) },
            buy() {
                player.bg.points = player.bg.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "获得额外时间胶囊"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                 let eff = x;

                return eff
            },
            unlocked() { return hasMilestone("tes", 7) },
        },
 21: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasMilestone("hq",31)?10:1e50).pow(n(1.05).pow(x))
c=c.div(layers.oss.sseff2())
                return c.max(1)
 },
            display() { return `点数获取<br />x${format(buyableEffect(this.layer, this.id))}(基于空间能量提升).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}生成器能量<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.bg.g.gte(this.cost()) },
            buy() {
                player.bg.g = player.bg.g.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "空间建筑1"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
if(hasUpgrade("hq",22))x=x.add(upgradeEffect("hq",22));
if(hasUpgrade("tes",53))x=x.mul(buyableEffect("tes",23));
if(hasUpgrade("tes",24))x=x.pow(1.5);
if(hasUpgrade("tes",31))x=x.pow(1.5);
x=x.pow(buyableEffect("tes",25).add(1));
                 let eff = x.add(1).pow(player.tes.ts);
if(hasMilestone("hq",16))eff=eff.pow(layers.tes.ll())
                return eff
            },
            unlocked() { return getBuyableAmount("tes", 12).gte(1) },
 style: {'height':'120px','width':'120px'},
        },
22: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasMilestone("hq",31)?10:1e70).pow(n(1.05).pow(x))
c=c.div(layers.oss.sseff2())
                return c.max(1)
 },
            display() { return `声望获取<br />x${format(buyableEffect(this.layer, this.id))}(基于空间能量提升).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}生成器能量<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.bg.g.gte(this.cost()) },
            buy() {
                player.bg.g = player.bg.g.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "空间建筑2"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
if(hasUpgrade("hq",22))x=x.add(upgradeEffect("hq",22));
if(hasUpgrade("tes",53))x=x.mul(buyableEffect("tes",23));
if(hasUpgrade("tes",24))x=x.pow(1.5);
x=x.pow(buyableEffect("tes",25).add(1));
if(hasUpgrade("tes",31))x=x.pow(1.5);
                 let eff = x.add(1).pow(player.tes.ts);
if(hasMilestone("hq",16))eff=eff.pow(layers.tes.ll())
                return eff
            },
            unlocked() { return hasMilestone("tes", 3) },
 style: {'height':'120px','width':'120px'},
        },
23: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e3550").pow(n(1.05).pow(x))
if(hasMilestone("hq",39))c=c.div(challengeEffect("hq", 21))
c=c.div(layers.oss.sseff2())
                return c.max(1)
 },
            display() { return `增幅器和生成器效果底数<br />x${format(buyableEffect(this.layer, this.id))}(基于空间能量提升).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}生成器能量<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.bg.g.gte(this.cost()) },
            buy() {
                player.bg.g = player.bg.g.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "空间建筑3"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
if(hasUpgrade("hq",22))x=x.add(upgradeEffect("hq",22));
if(hasUpgrade("tes",64))x=x.add(upgradeEffect("tes",64));
x=x.mul(buyableEffect("tes",25).add(1));
                 let eff = x.mul(player.tes.ts.mul(0.01)).add(1);
if(hasMilestone("hq",16))eff=eff.mul(layers.tes.ll())

eff=eff.max(1)
                return eff
            },
            unlocked() { return hasUpgrade("tes",44) },
 style: {'height':'120px','width':'120px'},
        },
24: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e14500").pow(n(1.1).pow(x))
c=c.div(layers.oss.sseff2())
                return c.max(1)
 },
            display() { return `<br />增幅器和生成器价格增长开${format(buyableEffect(this.layer, this.id))}次根.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}生成器能量<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.bg.g.gte(this.cost()) },
            buy() {
                player.bg.g = player.bg.g.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "空间建筑4"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
x=x.add(buyableEffect("tes",25).mul(10).pow(0.5));
if(hasUpgrade("oss",23))x=x.add(buyableEffect("oss",23));
                 let eff = n(1.01).pow(x);
if(hasMilestone("hq",16))eff=eff.pow(layers.tes.ll())
if(eff.gte(1.25))eff=eff.root(2).mul(n(1.25).pow(n(1).sub(1/2)))
                return eff
            },
            unlocked() { return hasMilestone("hq", 18) },
 style: {'height':'120px','width':'120px'},
        },
25: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e57500").pow(n(1.47).pow(x))
c=c.div(layers.oss.sseff2())
                return c.max(1)
 },
            display() { return `<br />1,2建筑等级^${format(buyableEffect(this.layer, this.id).add(1))}第三x${format(buyableEffect(this.layer, this.id).add(1))},第四+${format(buyableEffect(this.layer, this.id).mul(10).pow(0.5))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}生成器能量<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.bg.g.gte(this.cost()) },
            buy() {
                player.bg.g = player.bg.g.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "空间建筑5"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {

                 let eff = x.mul(0.1)

                return eff
            },
            unlocked() { return hasUpgrade("tes",65) },
 style: {'height':'120px','width':'120px'},
        },
    },
upgrades: {
 11: {
            description: "增幅器和生成器提升自身基数",
            cost() { return new ExpantaNum(500000) },
 effect() {
                let b = player.bg.points.plus(1).log10().plus(1)
                
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())  },
            unlocked() { return true },

        },
     12: {
				description: "修改生成器能量效果公式lgx^(lgx^0.375)<br />>lgx^(lgx^0.4)",
				cost() { return new ExpantaNum(5e10) },
				unlocked() { return hasUpgrade("tes",11) },
				
			
			}, 
13: {
            description: "增强点数提升声望获取",
            cost() { return new ExpantaNum(1e12) },
 effect() {
                let b = player.tes.points.pow(0.2)
                
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍"  },
            unlocked() { return hasUpgrade("tes",12) },

        },
14: {
				description: "获得一个免费的增强子",
				cost() { return new ExpantaNum(1e14) },
				unlocked() { return hasUpgrade("tes",13) },
				
			
			}, 
15: {
				description: "升级11的效果对助推器改成乘算",
				cost() { return new ExpantaNum(3.5e15) },
				unlocked() { return hasUpgrade("tes",14) },
				
			
			}, 
21: {
          
            description: "再获得2个免费增强子",
            cost() { return n(1e22) },
            unlocked() { return hasUpgrade("tes", 15) },
        },
22: {
          
            description: "增强子加成生成器能量获取",
 effect() {
                let b = n(1.5).pow(buyableEffect(this.layer, 11).mul(2).pow(1.3))
                
                return b;
            },
            effectDisplay() { return format(this.effect()) + "倍"  },
            cost() { return n(1e24) },
            unlocked() { return hasUpgrade("tes", 21) },
        },
23: {
				description: "时间胶囊提升生成器能量效果",
				cost() { return new ExpantaNum(4) },
 effect() {
                let b = player.tes.ts.plus(1).log10().plus(1).pow(0.75)
                if(hasUpgrade("tes",52))b = player.tes.ts.add(buyableEffect("tes",13)).plus(1).log10().plus(1).pow(0.75)
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())  },
				unlocked() { return hasUpgrade("tes",22) },
				currencyDisplayName: "时间胶囊",
            currencyInternalName: "ts",
            currencyLayer: "tes",
			
			}, 
24: {
          
            description: "前2个空间建筑等级^1.5",
            cost() { return n(1e37) },
            unlocked() { return hasUpgrade("tes", 23) },
        },
25: {
            description: "生成器能量再次加成生成器能量获取",
            cost() { return new ExpantaNum(1e44) },
 effect() {
                let b = player.bg.g.plus(1).log10().plus(1).pow(player.bg.g.plus(1).log10().pow(0.3))
                
                return b;
            },
 
            effectDisplay() { return format(this.effect()) + "倍"  },
            unlocked() { return hasUpgrade("tes",24) },

        },
31: {
          
            description: "前2个空间建筑等级再次^1.5",
            cost() { return n(6) },
            unlocked() { return hasUpgrade("tes", 25) },
	currencyDisplayName: "空间能量",
            currencyInternalName: "ts",
            currencyLayer: "tes",
        },
32: {
          
            description: "时间胶囊增加增幅器底数(在空间建筑3前)",
            cost() { return n(2.5e7) },
            unlocked() { return hasUpgrade("tes", 31) },
 effect() {
                let b = player.tes.ts.plus(1).log10().plus(1).pow(0.5)
                if(hasUpgrade("tes",45))b = player.tes.ts.add(buyableEffect("tes",13)).plus(1).log10().plus(1).pow(0.5)
                return b;
            },
 
            effectDisplay() { return "^"+format(this.effect()) },
	currencyDisplayName: "时间能量",
            currencyInternalName: "te",
            currencyLayer: "tes",
        },
33: {
          
            description: "空间能量提供免费增强子",
            cost() { return n(1e66) },
            unlocked() { return hasUpgrade("tes", 32) },
 effect() {
                let b = player.tes.ts.div(hasUpgrade("tes", 35)?1:2)
                
                return b;
            },
 
            effectDisplay() { return "+"+format(this.effect()) },
	
        },
34: {
          
            description: "增幅器和生成器提升增强点数获取",
            cost() { return n(1e71) },
            unlocked() { return hasUpgrade("tes", 33) },
 effect() {
                let b = n(1.1).pow(player.bg.points)
                
                return b;
            },
 
            effectDisplay() { return format(this.effect()) + "倍"  },
	
        },
35: {
          
            description: "tes升级33效果翻倍",
            cost() { return n(1e85) },
            unlocked() { return hasUpgrade("tes", 34) },

	
        },
41: {
          
            description: "时间能量效果基于时间胶囊提升",
            cost() { return n(1e121) },
            unlocked() { return hasUpgrade("tes", 35) },
 effect() {
                let b = player.tes.ts.plus(1)
                
                return b;
            },
 
            effectDisplay() { return "^"+format(this.effect())  },
	
        },
42: {
          
            description: "时间能量效果影响生成器能量获取",
            cost() { return n(1e141) },
            unlocked() { return hasUpgrade("tes", 41) },

	
        },
43: {
          
            description: "前2个空间建筑影响生成器能量获取",
            cost() { return n(1e142) },
            unlocked() { return hasUpgrade("tes", 42) },

	
        },
44: {
          
            description: "解锁第三空间建筑",
            cost() { return n(14) },
            unlocked() { return hasUpgrade("tes", 43) },
	currencyDisplayName: "空间能量",
            currencyInternalName: "ts",
            currencyLayer: "tes",
        },
45: {
          
            description: "额外时间胶囊对升级32生效",
            cost() { return n(1e32) },
            unlocked() { return hasUpgrade("tes", 44) },

	currencyDisplayName: "时间能量",
            currencyInternalName: "te",
            currencyLayer: "tes",
        },
51: {
          
            description: "额外时间胶囊提供免费增强子",
            cost() { return n(1e34) },
            unlocked() { return hasUpgrade("tes", 45) },
 effect() {
                let b = buyableEffect("tes",13).plus(1)
                
                return b;
            },
 
            effectDisplay() { return "+"+format(this.effect()) },
	currencyDisplayName: "时间能量",
            currencyInternalName: "te",
            currencyLayer: "tes",
        },
52: {
          
            description: "额外时间胶囊对升级23生效",
            cost() { return n(1e41) },
            unlocked() { return hasUpgrade("tes", 51) },

	currencyDisplayName: "时间能量",
            currencyInternalName: "te",
            currencyLayer: "tes",
        },
53: {
          
            description: "第3空间建筑加成前2空间建筑等级",
            cost() { return n("1e367") },
            unlocked() { return hasUpgrade("tes", 52) },

	
        },
54: {
          
            description: "生成器能量获取^1.0675",
            cost() { return n("1e386") },
            unlocked() { return hasUpgrade("tes", 53) },

	
        },
55: {
          
            description: "超级生成器能量效果变得更好(lgx^0.5>lgx),解锁新层级",
            cost() { return n("1e390") },
            unlocked() { return hasUpgrade("tes", 54) },

	
        },
61: {
          
            description: "增强加成时间能量获取",
            cost() { return n("1e1000") },
            unlocked() { return hasMilestone("oss", 11) },
 effect() {
                let b = player.tes.points.add(10).log10().pow(10)
                
                return b;
            },
 
            effectDisplay() { return "x"+format(this.effect()) },

        },
62: {
          
            description: "空间力量提高8%",
            cost() { return n("1e1015") },
            unlocked() { return hasMilestone("oss", 11) },

	
        },
63: {
          
            description: "建筑等级加成生成器能量获取",
            cost() { return n("1e1080") },
            unlocked() { return hasMilestone("oss", 11) },
 effect() {
                let b = n(10).pow(getBuyableAmount(this.layer, 21).add(getBuyableAmount(this.layer, 22)).add(getBuyableAmount(this.layer, 23)).add(getBuyableAmount(this.layer, 24)))
                
                return b;
            },
 
            effectDisplay() { return "x"+format(this.effect()) },

        },
64: {
          
            description: "非额外时间胶囊提供免费空间建筑3",
            cost() { return n("1e1200") },
            unlocked() { return hasMilestone("oss", 11) },
 effect() {
                let b = getBuyableAmount(this.layer, 12).pow(0.75)
                
                return b;
            },
 
            effectDisplay() { return "+"+format(this.effect()) },

        },
65: {
          
            description: "解锁第五建筑",
            cost() { return n("1e1250") },
            unlocked() { return hasMilestone("oss", 11) },

	
        },
    },
tabFormat: {
"upg": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",function () {
                   return hasMilestone("tes", 2) ? `你有${format(player.tes.ts)}时间胶囊和空间能量，`:""},
                    
                ],
    ["display-text",function () {
                   return getBuyableAmount("tes", 12).gte(1) ? `你有${format(player.tes.te)}时间能量(+${format(layers.tes.tegain())}/s),使点数和声望获取x${format(layers.tes.teeff())}`:""},
                    
                ],
["display-text",function () {
                   return hasMilestone("hq", 16) ? `你有${format(layers.tes.ll().mul(100))+"%"}空间力量`:""},
                    
                ],
                "upgrades",

            ],
            unlocked() { return true }
        },
        "buy": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",function () {
                   return hasMilestone("tes", 2) ? `你有${format(player.tes.ts)}时间胶囊和空间能量`:""},
                    
                ],
    ["display-text",function () {
                   return getBuyableAmount("tes", 12).gte(1) ? `你有${format(player.tes.te)}时间能量(+${format(layers.tes.tegain())}/s),使点数和声望获取x${format(layers.tes.teeff())}`:""},
                    
                ],
["display-text",function () {
                   return hasMilestone("hq", 16) ? `你有${format(layers.tes.ll().mul(100))+"%"}空间力量`:""},
                    
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
                   return hasMilestone("tes", 2) ? `你有${format(player.tes.ts)}时间胶囊和空间能量`:""},
                    
                ],
 ["display-text",function () {
                   return getBuyableAmount("tes", 12).gte(1) ? `你有${format(player.tes.te)}时间能量(+${format(layers.tes.tegain())}/s),使点数和声望获取x${format(layers.tes.teeff())}`:""},
                    
                ],
["display-text",function () {
                   return hasMilestone("hq", 16) ? `你有${format(layers.tes.ll().mul(100))+"%"}空间力量`:""},
                    
                ],
                "milestones",

            ],
            unlocked() { return true }
        },
    
    },
 doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
           
                
              if (hasMilestone("sbg",1)||hasMilestone("hq",34)) kept.push("milestones")
            layerDataReset(this.layer, kept)
        }

    },
autoUpgrade() { return hasMilestone("sbg",2) },
 passiveGeneration() {
        if (hasMilestone("sbg", 3)) return 1
        return 0
    },
 update(diff) {
player.tes.points=player.tes.points.max(0)
player.tes.ts=player.tes.ts.max(getBuyableAmount(this.layer, 12))
    player.tes.te=player.tes.te.add(layers.tes.tegain().mul(diff))
if(hasMilestone("hq", 1)&&!inChallenge("hq",31))setBuyableAmount(this.layer, 11, player.tes.points.add(1).log10().div(0.3010299956639812).root(1.5).floor().add(1).max(getBuyableAmount("tes", 11)))
if(hasMilestone("hq", 2)&&!inChallenge("hq",31))setBuyableAmount(this.layer, 12, player.tes.points.add(1).log10().div(hasUpgrade("oss", 11)?0.9030899869919435:1).root(1.875).floor().add(1).max(getBuyableAmount("tes", 12)))
if(hasMilestone("hq", 4))setBuyableAmount(this.layer, 13, player.bg.points.sub(179).root(2).max(0).floor().add(1).max(getBuyableAmount("tes", 13)))
if(hasMilestone("hq", 10))setBuyableAmount(this.layer, 21, player.bg.g.max(1).mul(layers.oss.sseff2()).log10().div(hasMilestone("hq",31)?1:50).max(1).log10().div(0.0211892990699380).max(0).floor().add(1).max(getBuyableAmount("tes", 21)))
if(hasMilestone("hq", 12))setBuyableAmount(this.layer, 22, player.bg.g.max(1).mul(layers.oss.sseff2()).log10().div(hasMilestone("hq",31)?1:70).max(1).log10().div(0.0211892990699380).max(0).floor().add(1).max(getBuyableAmount("tes", 22)))
if(hasMilestone("hq", 15))setBuyableAmount(this.layer, 23, player.bg.g.max(1).mul(layers.oss.sseff2()).mul(hasMilestone("hq",39)?challengeEffect("hq", 21):1).log10().div(3550).max(1).log10().div(0.0211892990699380).max(0).floor().add(1).max(getBuyableAmount("tes", 23)))
if(hasMilestone("oss", 1))setBuyableAmount(this.layer, 24, player.bg.g.max(1).mul(layers.oss.sseff2()).log10().div(14500).max(1).log10().div(0.04139268515822507).max(0).floor().add(1).max(getBuyableAmount("tes", 24)))
//永恒
if(hasMilestone("hq", 1)&&inChallenge("hq",31))setBuyableAmount(this.layer, 11, n(10))
if(hasMilestone("hq", 2)&&inChallenge("hq",31))setBuyableAmount(this.layer, 12, n(10))
    },
  hotkeys: [
        { key: "t", description: "t: 进行增强点数,时间胶囊和空间能量重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],

})