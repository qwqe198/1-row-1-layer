addLayer("sbg", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "SBG", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
g:new ExpantaNum(0),
        }
    },
      
    requires() { return new ExpantaNum(hasMilestone("hq", 13)?"97":"100") },
    color: "#3300ffff",
    resource: "超级增幅器和生成器", // 重置获得的资源名称
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },
    effectDescription() { return `增幅器底数x${format(this.beff())}<br>你有${format(player.sbg.g)}超级生成器能量(+${format(layers.sbg.ggain())}/s),生成器底数x${format(this.geff())}.` },
    beff() {
let pow=n(1.5)
if(hasMilestone("hq",22))pow=pow.add(hasMilestone("hq",35)?n(0.25).mul(challengeEffect("hq", 12).log10().div(1000).root(2)).max(0.25):0.25)
        let eff = n(pow).pow(player.sbg.points)

        return eff
    },
ggain() {
let pow=n(1.5)
if(hasMilestone("hq",22))pow=pow.add(hasMilestone("hq",26)?n(0.25).mul(challengeEffect("hq", 12).log10().div(hasMilestone("hq",29)?250:308)).max(0.25):0.25)
        let eff = n(pow).pow(player.sbg.points)
if(hasMilestone("hq",9))eff=eff.mul(challengeEffect("hq", 11).plus(10).log10())
if(hasMilestone("hq",30))eff=eff.mul(player.bg.g.plus(10).log10())
if(hasMilestone("hq",38))eff=eff.mul(player.sbg.g.plus(10).log10())
if(player.sbg.points.lt(1))eff=n(0)
        return eff
    },
geff() {
let pow=n(hasMilestone("hq",36)?1.1:hasUpgrade("tes", 55)?1:0.5)

        let eff = player.sbg.g.plus(1).log10().plus(1).pow(pow)
if (hasMilestone("sbg",3))eff=eff.mul(player.sbg.points.plus(1).log10().plus(1))
        return eff
    },
    exponent(){
let req=n(1.15)


return req
} ,
 base: 1.2,
    baseAmount() { return player.bg.points },//基础资源数量
    baseResource: "增幅器和生成器",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(0.5)

        return exp
    },
    layerShown() { return player.bg.points.gte(100)||player.sbg.points.gte(1) },
    row: "3", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   update(diff) {
                player.sbg.g =  player.sbg.g.add(this.ggain().mul(diff))

        },

milestones: {
    1: {
        requirementDescription: "1超级增幅器和生成器",
        effectDescription: "重置时保留tes里程碑,时间胶囊底数基于自身增加",
        done() { return player.sbg.points.gte(1) }
    },
 2: {
        requirementDescription: "2超级增幅器和生成器",
        effectDescription: "自动购买tes升级,bg升级13到16效果基于时间胶囊和空间能量增加",
        done() { return player.sbg.points.gte(2) }
    },
3: {
        requirementDescription: "3超级增幅器和生成器",
        effectDescription: "每秒自动获得100%增强点,超级生成器能量效果基于超级增幅器和生成器增强",
        done() { return player.sbg.points.gte(3) }
    },
4: {
        requirementDescription: "4超级增幅器和生成器",
        effectDescription: "p升级33效果基于超级增幅器和生成器增强",
        done() { return player.sbg.points.gte(4) }
    },
5: {
        requirementDescription: "5超级增幅器和生成器",
        effectDescription: "超级增幅器和生成器加成障碍灵魂和诡异获取",
        done() { return player.sbg.points.gte(5) }
    },
6: {
        requirementDescription: "6超级增幅器和生成器",
        effectDescription: "超级增幅器和生成器加成诡异层底数",
        done() { return player.sbg.points.gte(6) }
    },
},
     autoPrestige() { return hasMilestone("hq",7) },
 
 resetsNothing() { return hasMilestone("oss",2) },
hotkeys: [
        { key: "s", description: "s: 进行超级增幅器和生成器重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],

})