addLayer("tes", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `TES`, // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
ts: new ExpantaNum(0),
        }
    },

     
    requires() { return new ExpantaNum("1e30") },
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

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)

        return exp
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
},
buyables: {
       
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n(2).pow(x.pow(1.5))

                return c
 },
            display() { return `声望获取<br />x${format(n(1.8).pow(buyableEffect(this.layer, this.id).mul(2).pow(1.3)))},增幅器和生成器底数+${format(buyableEffect(this.layer, this.id))} .花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}增强子<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.tes.points.gte(this.cost()) },
            buy() {
                player.tes.points = player.tes.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "增强子"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                 let eff = x.mul(0.8);

                return eff
            },
            unlocked() { return true },
        },
    },
tabFormat: {
        "buy": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",function () {
                   return hasMilestone("tes", 2) ? `你有${format(player.tes.ts)}时间胶囊和空间能量(制作中)`:""},
                    
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
                   return hasMilestone("tes", 2) ? `你有${format(player.tes.ts)}时间胶囊和空间能量(制作中)`:""},
                    
                ],
                "milestones",

            ],
            unlocked() { return true }
        },
    
    },
  hotkeys: [
        { key: "t", description: "t: 进行增强点数,时间胶囊和空间能量重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],

})