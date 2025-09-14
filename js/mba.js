addLayer("mba", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "MBA", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
            total: new ExpantaNum(0),
            ys: new ExpantaNum(0),
            jj: new ExpantaNum(0),
            xj: new ExpantaNum(0),
        }
    },

    requires() { return new ExpantaNum("1e10000") },
    color: "#d75fc9ff",
    resource: "魔法和平衡", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },
 yseff() {
let pow=n(1)

        let eff = n(player.mba.ys).plus(1).pow(pow)

        return eff
    },
 jjgain() {
let pow=n(1)

        let eff = n(player.mba.points).pow(pow)
if(player.mba.points.lt(1))eff=n(0)
        return eff
    },
 jjeff() {
let pow=n(0.5)

        let eff = n(player.mba.jj).add(1).log10().add(1).log10().add(1).pow(pow)

        return eff
    },
 xjgain() {
let pow=n(1)

        let eff = n(player.mba.points).pow(pow)
if(player.mba.points.lt(1))eff=n(0)
        return eff
    },
 xjeff() {
let pow=n(0.4)

        let eff = n(player.mba.xj).add(1).log10().add(1).pow(pow)

        return eff
    },
    effectDescription() { return `` },


    exponent() {
        let req = n(0.001)


        return req
    },
    buyables: {



        11: {
            title: "装载增幅器",
            gain() {
                return player.mba.points.sub(getBuyableAmount(this.layer, this.id)).floor().max(0)
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = x.add(1).log10().add(1).log10().add(1).pow(0.35)

                return eff
            },
            display() { // Everything else displayed in the buyable button after the title

                let display = ("增加 " + format(tmp[this.layer].buyables[this.id].gain) + " 等级\n" +

                    "等级: " + format(player[this.layer].buyables[this.id]) + ((player[this.layer].buyables[this.id].gain || n(1)).eq(1) ? "" : (" x " + format(player[this.layer].buyables[this.id].effect)))) + "\n" +
                    ("效果: 增幅器底数^" + format(tmp[this.layer].buyables[this.id].effect))
                return display;
            },
            unlocked() { return hasMilestone("mba", 1) },
            canAfford() { return player.mba.points.gte(1) },
            buy() {

                player.mba.buyables[this.id] = (player.mba.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain)).min(player.mba.total);
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style: { 'height': '140px', 'width': '140px' },

        },

    },
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
    layerShown() { return player.bg.points.gte(100) || player.mba.points.gte(1) },
    row: "6", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排


    milestones: {
        1: {
            requirementDescription: "1魔法和平衡",
            effectDescription: "自动购买第5空间建筑,解锁第一个法术(施法不消耗,但是等级不超过总魔法)",
            done() { return player.mba.points.gte(1) }
        },

    },
    update(diff) {
        player.mba.ys = player.mba.ys.max(getBuyableAmount(this.layer, 11))
player.mba.jj=player.mba.jj.add(layers.mba.jjgain().mul(diff))
player.mba.xj=player.mba.xj.add(layers.mba.xjgain().mul(diff))
    },
    tabFormat: {

        "buy": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function () {
                    return `你有${format(player.mba.ys)}妖术,增幅障碍灵魂和诡异,太阳能量和子空间能量获取x${format(layers.mba.yseff())}`
                },
                ],
["display-text", function () {
                    return `你有${format(player.mba.jj)}积极(+${format(layers.mba.jjgain())}/s),加成子空间和时间胶囊底数x${format(layers.mba.jjeff())}`
                },
                ],
["display-text", function () {
                    return `你有${format(player.mba.xj)}消极(+${format(layers.mba.xjgain())}/s),加成诡异层底数x${format(layers.mba.xjeff())}`
                },
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
                ["display-text", function () {
                    return `你有${format(player.mba.ys)}妖术,增幅障碍灵魂和诡异,太阳能量和子空间能量获取x${format(layers.mba.yseff())}`
                },
                ],
["display-text", function () {
                    return `你有${format(player.mba.jj)}积极(+${format(layers.mba.jjgain())}/s),加成子空间和时间胶囊底数x${format(layers.mba.jjeff())}`
                },
                ],
["display-text", function () {
                    return `你有${format(player.mba.xj)}消极(+${format(layers.mba.xjgain())}/s),加成诡异层底数x${format(layers.mba.xjeff())}`
                },
                ],
                "milestones",

            ],
            unlocked() { return true }
        },
    },
    hotkeys: [
        { key: "m", description: "m: 进行魔法和平衡重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]



            layerDataReset(this.layer, kept)
        }

    },
})