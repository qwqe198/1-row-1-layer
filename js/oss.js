addLayer("oss", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "OSS", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
se:new ExpantaNum(0),
ss:new ExpantaNum(0),
ss2:new ExpantaNum(0),
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
if(eff.gte(9))eff=eff.root(2).mul(3)
        return eff
    },
seeff2() {
let pow=n(1)

        let eff = player.oss.se.pow(pow).add(1)

        return eff
    },
ssgain() {


        let eff = buyableEffect("oss", 11)
if(hasMilestone("oss",4))eff=eff.mul(this.seeff1())
if(hasUpgrade("oss",13))eff=eff.mul(upgradeEffect("oss",13))
if (hasMilestone("sbg",7))eff=eff.mul(player.sbg.points.plus(1))
        return eff
    },
sseff1() {
let pow=n(0.5)

        let eff = player.oss.ss.plus(1).log10().pow(pow).div(100).add(1)
if(hasUpgrade("oss",12))eff=eff.pow(upgradeEffect("oss",12))
        return eff
    },
sseff2() {
let pow=n(10)

        let eff = player.oss.ss.add(1).pow(pow)
if(hasMilestone("hq",43))eff=eff.pow(2)
if(hasUpgrade("oss",12))eff=eff.pow(upgradeEffect("oss",12))
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
mult=mult.mul(buyableEffect("oss",21))
if(hasMilestone("hq",42))mult=mult.mul(player.hq.milestones.length-40).max(1)
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
player.oss.ss2 =  player.oss.ss2.max(getBuyableAmount(this.layer, 11))
        },
 upgrades: {
 11: {
            description: "时间胶囊和空间能量价格的底数下降(10>8)",
            cost() { return n(25000) },
            unlocked() { return true },
currencyDisplayName: "子空间能量",
            currencyInternalName: "ss",
            currencyLayer: "oss",
        },
      12: {
            description: "子空间能量加成所有子空间效果",
            cost() { return n(3) },
            unlocked() { return true },
 effect() {
                let b = player.oss.ss.plus(1).log10().plus(10).log10().pow(0.5)
                
                return b;
            },
 
            effectDisplay() { return "^"+format(this.effect()) },
currencyDisplayName: "子空间",
            currencyInternalName: "ss2",
            currencyLayer: "oss",
        },
 13: {
            description: "诡异加成子空间能量获取",
            cost() { return n(1.5e6) },
            unlocked() { return true },
 effect() {
                let b = player.hq.points.plus(10).log10()
                
                return b;
            },
 
            effectDisplay() { return "x"+format(this.effect()) },
currencyDisplayName: "子空间能量",
            currencyInternalName: "ss",
            currencyLayer: "oss",
        },
 21: {
            description: "降低超级增幅器和生成器价格",
            cost() { return n(25000000) },
            unlocked() { return true },
currencyDisplayName: "子空间能量",
            currencyInternalName: "ss",
            currencyLayer: "oss",
        },
   22: {
            description: "太阳核心的效果变得更好",
            cost() { return n(10) },
            unlocked() { return true },

currencyDisplayName: "子空间",
            currencyInternalName: "ss2",
            currencyLayer: "oss",
        },
    },
buyables: {
       
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(hasMilestone("oss",15)?2:10).pow(x.pow(hasMilestone("oss",15)?1.5:2)).floor()

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
pow=pow.mul(buyableEffect("oss",23))
                 let eff = n(pow).pow(x);
if(getBuyableAmount(this.layer, this.id).lt(1))eff=n(0)
                return eff
            },
            unlocked() { return true },
        },
  
			21: {
				title: "太阳核心",
				gain() { return player.oss.points.div(2).root(1.5).pow(1).floor()
 },
				effect(x = getBuyableAmount(this.layer, this.id)) { 
					let eff = x.add(1).log10().add(1)
					if(hasUpgrade("oss",22))eff=x.add(1).log10().add(1).mul(x.add(1).log10().add(1).log10().add(1))
					return eff
				},
				display() { // Everything else displayed in the buyable button after the title
                   
                    let display = ("献祭你所有的阳光，获得 "+format(tmp[this.layer].buyables[this.id].gain)+" 太阳核心\n"+
					"需要: 2阳光\n"+
					"数量: " + format(player[this.layer].buyables[this.id])+((player[this.layer].buyables[this.id].gain||n(1)).eq(1)?"":(" x "+format(player[this.layer].buyables[this.id].effect))))+"\n"+
					("效果: 加成阳光获取 "+format(tmp[this.layer].buyables[this.id].effect) + 'x')
					return display;
                },
                unlocked() { return hasMilestone("oss",5) }, 
                canAfford() { return player.oss.points.gte(2) },
                buy() { 
                    player.oss.points = n(0);
					player.oss.buyables[this.id] = player.oss.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain);
                },
                buyMax() {
					// I'll do this later ehehe
				},
                style: {'height':'140px', 'width':'140px'},
				
			},
22: {
				title: "差旋层电浆",
				gain() { return player.oss.points.div(1e5).mul(player.oss.se.div(1e7).root(3)).root(1.5).pow(1).floor()
 },
				effect(x = getBuyableAmount(this.layer, this.id)) { 
					let eff = x.add(1).log10().add(1).log10().add(1).pow(0.5)
					
					return eff
				},
				display() { // Everything else displayed in the buyable button after the title
                   
                    let display = ("献祭你所有的阳光和太阳能量，获得 "+format(tmp[this.layer].buyables[this.id].gain)+" 差旋层电浆\n"+
					"需要: 1e5阳光和1e7阳光能量\n"+
					"数量: " + format(player[this.layer].buyables[this.id])+((player[this.layer].buyables[this.id].gain||n(1)).eq(1)?"":(" x "+format(player[this.layer].buyables[this.id].effect))))+"\n"+
					("效果: 加成超级增幅器底数(x)和诡异层(^)"+format(tmp[this.layer].buyables[this.id].effect) )
					return display;
                },
                unlocked() { return hasMilestone("oss",10) }, 
                canAfford() { return player.oss.points.gte(1e5)&&player.oss.se.gte(1e8) },
                buy() { 
                    player.oss.points = n(0);
player.oss.se = n(0);
					player.oss.buyables[this.id] = player.oss.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain);
                },
                buyMax() {
					// I'll do this later ehehe
				},
                style: {'height':'140px', 'width':'140px'},
				
			},
		23: {
				title: "对流能",
				gain() { return player.oss.points.div(1e8).mul(player.oss.se.div(1e10).root(4)).mul(player.oss.ss2.div(10).pow(2)).root(1.8).pow(1).floor()
 },
				effect(x = getBuyableAmount(this.layer, this.id)) { 
					let eff = x.add(1).log10().add(1).log10().add(1)
					
					return eff
				},
				display() { // Everything else displayed in the buyable button after the title
                   
                    let display = ("献祭你所有的阳光,太阳能量和子空间，获得 "+format(tmp[this.layer].buyables[this.id].gain)+" 对流能\n"+
					"需要: 1e8阳光,1e10阳光能量和10子空间\n"+
					"数量: " + format(player[this.layer].buyables[this.id])+((player[this.layer].buyables[this.id].gain||n(1)).eq(1)?"":(" x "+format(player[this.layer].buyables[this.id].effect))))+"\n"+
					("效果: 加成时间胶囊和子空间底数x"+format(tmp[this.layer].buyables[this.id].effect) )
					return display;
                },
                unlocked() { return hasMilestone("oss",16) }, 
                canAfford() { return player.oss.points.gte(1e8)&&player.oss.se.gte(1e10)&&player.oss.ss2.gte(10) },
                buy() { 
                    player.oss.points = n(0);
player.oss.se = n(0);
player.oss.buyables[11] =n(0)
player.oss.ss2 = n(0);
					player.oss.buyables[this.id] = player.oss.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain);
                },
                buyMax() {
					// I'll do this later ehehe
				},
                style: {'height':'140px', 'width':'140px'},
				
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
 4: {
        requirementDescription: "50阳光",
        effectDescription: "p升级12效果x1e25,阳光能量效果1加成子空间能量获取",
        done() { return player.oss.points.gte(50) }
    },
5: {
        requirementDescription: "100阳光",
        effectDescription: "你的障碍灵魂和诡异不会低于5,解锁第一个阳光购买项",
        done() { return player.oss.points.gte(100) }
    },
6: {
        requirementDescription: "25太阳核心",
        effectDescription: "重置时保留sbg里程碑",
        done() { return getBuyableAmount(this.layer, 21).gte(25) }
    },
7: {
        requirementDescription: "1000阳光",
        effectDescription: "解锁子空间升级",
        done() { return player.oss.points.gte(1000) }
    },
8: {
        requirementDescription: "25000阳光",
        effectDescription: "解锁第5个障碍",
        done() { return player.oss.points.gte(25000) }
    },
9: {
        requirementDescription: "完成1次永恒",
        effectDescription: "自动购买hq升级",
        done() { return player.hq.challenges[31]>=1 }
    },
10: {
        requirementDescription: "100000阳光",
        effectDescription: "解锁第二个阳光购买项",
        done() { return player.oss.points.gte(100000) }
    },
11: {
        requirementDescription: "1差旋层电浆",
        effectDescription: "解锁新的增强升级",
        done() { return getBuyableAmount(this.layer, 22).gte(1) }
    },
12: {
        requirementDescription: "2.5e6阳光",
        effectDescription: "阳光加成诡异能量获取",
        done() { return player.oss.points.gte(2.5e6) }
    },
13: {
        requirementDescription: "完成2次永恒",
        effectDescription: "自动购买诡异层",
        done() { return player.hq.challenges[31]>=2 }
    },
14: {
        requirementDescription: "29诡异层",
        effectDescription: "重置时保留hq里程碑,差旋层电浆对超级生成器底数也生效",
        done() { return getBuyableAmount("hq", 11).gte(29)}
    },
15: {
        requirementDescription: "1e7阳光",
        effectDescription: "降低子空间价格",
        done() { return player.oss.points.gte(1e7) }
    },
16: {
        requirementDescription: "1e8阳光",
        effectDescription: "解锁第三个阳光购买项",
        done() { return player.oss.points.gte(1e8) }
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
  "upg": {
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
                "upgrades",

            ],
            unlocked() { return hasMilestone("oss",7) }
        },
    }, 
 

hotkeys: [
        { key: "o", description: "o: 进行阳光和子空间重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],

})