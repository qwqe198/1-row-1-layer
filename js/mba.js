addLayer("mba", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "MBA", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
total: new ExpantaNum(0),
ys:new ExpantaNum(0),
jj:new ExpantaNum(0),
xj:new ExpantaNum(0),
        }
    },
      
    requires() { return new ExpantaNum("1e10000") },
    color: "#d75fc9ff",
    resource: "魔法和平衡", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {



        return 0
    },

    effectDescription() { return `` },


    exponent(){
let req=n(0.001)


return req
} ,
buyables: {
       

  
			21: {
				title: "装载增幅器",
				gain() { return player.mba.points.floor()
 },
				effect(x = getBuyableAmount(this.layer, this.id)) { 
					let eff = x.add(1).log10().add(1).log10().add(1).pow(0.35)
					
					return eff
				},
				display() { // Everything else displayed in the buyable button after the title
                   
                    let display = ("增加 "+format(tmp[this.layer].buyables[this.id].gain)+" 等级\n"+
					
					"等级: " + format(player[this.layer].buyables[this.id])+((player[this.layer].buyables[this.id].gain||n(1)).eq(1)?"":(" x "+format(player[this.layer].buyables[this.id].effect))))+"\n"+
					("效果: 增幅器底数^"+format(tmp[this.layer].buyables[this.id].effect) )
					return display;
                },
                unlocked() { return hasMilestone("mba",1) }, 
                canAfford() { return player.mba.points.gte(1) },
                buy() { 
                    
					player.mba.buyables[this.id] = (player.mba.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain)).min(player.mba.total);
                },
                buyMax() {
					// I'll do this later ehehe
				},
                style: {'height':'140px', 'width':'140px'},
				
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
    layerShown() { return player.bg.points.gte(100)||player.mba.points.gte(1) },
    row: "6", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
   update(diff) {
              

        },

milestones: {
    1: {
        requirementDescription: "1魔法和平衡",
        effectDescription: "自动购买第5空间建筑,解锁第一个法术(施法不消耗,但是等级不超过总魔法)(效果未实装)",
        done() { return player.mba.points.gte(1) }
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